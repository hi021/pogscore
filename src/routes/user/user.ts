import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	styleUrl: './user.scss',
	templateUrl: './user.html',
})
export class PlayerComponent {
	protected route = inject(ActivatedRoute);
	protected player: PogScore.Player | undefined;

	constructor() {
		this.route.params.subscribe((v) => {
			this.player = { countryCode: 'XD', id: v['idOrName'], name: v['idOrName'] };
		});
	}
}
