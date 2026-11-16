import { Component } from '@angular/core';
import { VisXYContainerModule, VisLineModule, VisAxisModule } from '@unovis/angular';

@Component({
	selector: 'multi-line-chart',
	inputs: ['data', 'width', 'height', 'margin', 'padding'],
	imports: [VisXYContainerModule, VisLineModule, VisAxisModule],
	templateUrl: './multi-line-chart.html',
})
export class MultiLineChartComponent {
	x = (d: PogScore.ChartRecord): number => d.x;
	y = (d: PogScore.ChartRecord): number => d.y;
	data: PogScore.ChartRecord[] = [
		{ x: 0, y: 0 },
		{ x: 1, y: 2 },
		{ x: 2, y: 1 },
	];

	width = 0;
	height = 0;
	margin = { top: 20, right: 20, bottom: 40, left: 50 };
	padding = { top: 10, right: 10, bottom: 10, left: 10 };
}
