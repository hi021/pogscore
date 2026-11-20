import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Utils } from '../services/Utils';

@Component({
	imports: [FormsModule, RouterLink],
	selector: 'app-user-search',
	templateUrl: './user-search.html',
})
export class UserSearchComponent {
	private readonly router = inject(Router);
	private readonly Utils = Utils;
	query: string = '';
	disabled = false;
	autocompleteEntries: Array<ScoreApi.UserSearchResponse> = [];

	onSubmit() {
		if (!this.query) return;
		this.autocompleteEntries = [];
		this.disabled = true;
		void this.router.navigate(['/player', this.query]);
	}

	onInput() {
		// TODO: need the autocompletion endpoint...
		this.autocompleteEntries = [
			{ rank: 0, user_id: 300961, username: 'Shadow' },
			{ rank: 0, user_id: 494970, username: 'ShadowSoul' },
			{ rank: 1281, user_id: 7801227, username: 'Shady' },
			{ rank: 378, user_id: 5795337, username: 'TheShadowOfDark' },
			{ rank: 1328, user_id: 5795337, username: 'TheShadow0fDark' },
		];
	}
}
