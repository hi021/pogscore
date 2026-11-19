import { Component, Input } from '@angular/core';
import {
	VisAxisModule,
	VisCrosshairModule,
	VisLineModule,
	VisTooltipModule,
	VisXYContainerModule,
} from '@unovis/angular';
import { Direction, NumericAccessor, Position, Spacing } from '@unovis/ts/types';

@Component({
	selector: 'multi-line-chart',
	imports: [VisXYContainerModule, VisLineModule, VisAxisModule, VisCrosshairModule, VisTooltipModule],
	templateUrl: './multi-line-chart.html',
})
export class MultiLineChartComponent<T> {
	@Input() data: Array<PogScore.Datum<T>> = [];
	@Input() xAccessor: NumericAccessor<PogScore.Datum<T>> = (d) => (d.x == null ? null : Number(d.x));
	@Input() yAccessor: NumericAccessor<PogScore.Datum<T>> = (d) => (d.y == null ? null : Number(d.y));

	@Input() xConfig: PogScore.AxisConfig = {
		position: Position.Bottom,
		label: { labelColor: 'var(--color-lighter)', value: 'X', labelFontSize: '14', labelMargin: 10 },
		tickFormat: (tick) => tick.toString(),
	};
	@Input() yConfig: PogScore.AxisConfig = {
		position: Position.Left,
		label: { labelColor: 'var(--color-lighter)', value: 'Y', labelFontSize: '14', labelMargin: 10 },
		tickFormat: (tick) => tick.toString(),
	};

	@Input() yDirection: Direction | 'west' | 'east' | 'north' | 'south' = Direction.North;

	@Input() yColors = [
		'#B39DDB',
		'#CE93D8',
		'#F48FB1',
		'#EF9A9A',
		'#FFAB91',
		'#FFCC80',
		'#FFE082',
		'#FFF59D',
		'#E6EE9C',
		'#C5E1A5',
	];

	@Input() tooltipTemplate?: (
		d: PogScore.Datum<T>,
		x: number | Date,
		data: Array<PogScore.Datum<T>>,
		leftNearestDatumIndex?: number,
	) => string;

	@Input() width = 0;
	@Input() height = 0;
	@Input() margin: Spacing = { top: 12, right: 16, bottom: 6, left: 18 };
	@Input() padding: Spacing = { top: 2, right: 1, bottom: 1, left: 1 };

	protected getYColor = (d: unknown, i: number, key?: string, ...any: unknown[]) => {
		return this.yColors[i % this.yColors.length];
	};
}
