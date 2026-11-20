import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Utils } from '../services/Utils';

@Component({
	imports: [RouterLink],
	selector: 'app-user-neighbor-nav',
	styleUrl: './user-neighbor-nav.component.scss',
	templateUrl: './user-neighbor-nav.component.html',
})
export class UserNeighborNavComponent {
	public readonly player = input.required<ScoreApi.UserRankResponse>();
	protected readonly Utils = Utils;
}
