import { Component, inject, signal, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFetcher } from '../../services/DataFetcher';

@Component({
	styleUrl: './user.scss',
	templateUrl: './user.html',
})
export class PlayerComponent {
	protected route = inject(ActivatedRoute);
	protected player = signal<ScoreApi.UserRankResponse | undefined>(undefined);

	constructor() {
		this.route.params.subscribe(async (params) => {
			this.player.set(await DataFetcher.fetchUser(params['idOrName']));
		});
	}
}
