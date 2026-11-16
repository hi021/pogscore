import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Position } from '@unovis/ts/types';
import { MultiLineChartComponent } from '../../components/mutli-line-chart.component';
import { DataFetcher } from '../../services/DataFetcher';
import { PageTitle } from '../../services/PageTitle';
import { Utils } from '../../services/Utils';

@Component({
	imports: [MultiLineChartComponent],
	styleUrl: './user.scss',
	templateUrl: './user.html',
})
export class PlayerComponent {
	protected readonly xConfig: PogScore.AxisConfig = {
		position: Position.Bottom,
		tickFormat: (tick: Date) => Utils.formatDate(new Date(tick), true),
	};
	protected readonly yConfig: PogScore.AxisConfig = {
		position: Position.Left,
	};

	protected readonly route = inject(ActivatedRoute);
	protected readonly pageTitle = inject(PageTitle);
	protected readonly player = signal<ScoreApi.UserRankResponse | undefined>(undefined);
	protected readonly errorMsg = signal<string>('');
	protected rankData: Array<{ x: Date | undefined; y: number | undefined }> = [];

	protected tooltipTemplate(
		d: PogScore.Datum<Date>,
		x: number | Date,
		data: Array<PogScore.Datum<Date>>,
		leftNearestDatumIndex?: number,
	) {
		const timestamp = Number(d?.x);
		if (isNaN(timestamp)) return '';

		let tooltipString = "<table class='comparison-tooltip-table'><tbody>";
		// for (const plrId in d.players) tooltipString += tooltipPlayerHTML(d, plrId);

		return `${tooltipString}
      <tr><td colspan='3' style='text-align: center;'>
        <small style="color: var(--color-active);">${Utils.formatDate(new Date(timestamp))}</small>
      </td></tr>
    </tbody>
    </table>`;
	}

	constructor() {
		this.route.params.subscribe(async (params) => {
			try {
				this.pageTitle.setTitle();
				this.errorMsg.set('');
				const player = await DataFetcher.fetchUser(params['idOrName']);
				this.player.set(player);
				this.pageTitle.setTitle(player?.username);
				this.rankData = player?.rank_history
					.filter((entry): entry is ScoreApi.RankHistoryEntry => !!entry?.date)
					.map((entry) => {
						return { x: new Date(entry.date), y: entry.rank };
					});
			} catch (e) {
				this.errorMsg.set(e instanceof Error ? e.message : 'Unknown error');
			}
		});
	}
}
