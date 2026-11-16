import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MultiLineChartComponent } from '../../components/mutli-line-chart.component';
import { DataFetcher } from '../../services/DataFetcher';

@Component({
	imports: [MultiLineChartComponent],
	styleUrl: './user.scss',
	templateUrl: './user.html',
})
export class PlayerComponent {
	protected route = inject(ActivatedRoute);
	protected player = signal<ScoreApi.UserRankResponse | undefined>(undefined);
	protected rankData: PogScore.ChartRecord[] = [];

	constructor() {
		this.route.params.subscribe(async (params) => {
			const player = await DataFetcher.fetchUser(params['idOrName']);
			this.player.set(player);
			this.rankData =
				player?.rank_history.map((entry) =>
					entry ? { x: new Date(entry.date).getTime(), y: entry.rank } : { x: 0, y: 0 },
				) ?? [];
		});
	}
}
