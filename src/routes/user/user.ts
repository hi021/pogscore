import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Position } from '@unovis/ts/types';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { MultiLineChartComponent } from '../../components/mutli-line-chart.component';
import { UserNeighborNavComponent } from '../../components/user-neighbor-nav.component';
import { DataFetcher } from '../../services/DataFetcher';
import { PageTitle } from '../../services/PageTitle';
import { Utils } from '../../services/Utils';

@Component({
	imports: [MultiLineChartComponent, NgClass, NgxTippyModule, RouterLink, UserNeighborNavComponent],
	styleUrl: './user.scss',
	templateUrl: './user.html',
})
export class PlayerComponent {
	protected readonly xConfig: PogScore.AxisConfig = {
		position: Position.Bottom,
	};
	protected readonly yConfig: PogScore.AxisConfig = {
		position: Position.Left,
		tickFormat: (tick: number, i: number, a: number[]) => (Number.isInteger(tick) ? tick.toString() : ''),
	};

	protected readonly route = inject(ActivatedRoute);
	protected readonly pageTitle = inject(PageTitle);
	protected readonly player = signal<ScoreApi.UserRankResponse | undefined>(undefined);
	protected readonly errorMsg = signal<string>('');
	protected readonly Utils = Utils;
	protected rankData: Array<{ x: number | undefined; y: number | undefined }> = [];
	protected peakRankDate = '';

	constructor() {
		this.route.params.subscribe(async (params) => {
			try {
				this.pageTitle.setTitle();
				this.errorMsg.set('');
				const player = await DataFetcher.fetchUser(params['idOrName']);
				this.player.set(player);
				this.pageTitle.setTitle(player?.username);
				this.peakRankDate = Utils.formatDate(new Date(player.rank_highest.updated_at));
				this.rankData = player?.rank_history
					.filter((entry): entry is ScoreApi.RankHistoryEntry => !!entry?.date && !!entry.rank)
					.map((entry) => {
						return { x: new Date(entry.date).getTime(), y: entry.rank };
					});
			} catch (e) {
				this.errorMsg.set(e instanceof Error ? e.message : 'Unknown error');
			}
		});
	}

	protected tooltipTemplate(
		d: PogScore.Datum<number>,
		x: number | Date,
		data: Array<PogScore.Datum<number>>,
		leftNearestDatumIndex?: number,
	) {
		const timestamp = Number(d?.x);
		if (isNaN(timestamp)) return '';

		let tooltipString = "<table class='comparison-tooltip-table'><tbody>";
		// TODO
		// for (const plrId in d.players) tooltipString += tooltipPlayerHTML(d, plrId);

		return `${tooltipString}
      <tr><td colspan='3' style='text-align: center;'>
        <small style="color: var(--color-light-purple);">${Utils.formatDate(new Date(timestamp))}</small>
      </td></tr>
    </tbody>
    </table>`;
	}

	protected getRankTier(rank: number) {
		if (rank === 1) return 'top-1';
		if (rank <= 5) return 'top-5';
		if (rank <= 10) return 'top-10';
		if (rank <= 25) return 'top-25';
		if (rank <= 50) return 'top-50';
		if (rank <= 100) return 'top-100';
		if (rank <= 500) return 'top-500';
		if (rank <= 1000) return 'top-1000';
		if (rank <= 2500) return 'top-2500';
		return '';
	}
}
