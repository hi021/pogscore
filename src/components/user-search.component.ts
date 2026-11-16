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
		this.disabled = true;
		void this.router.navigate(['/player', this.query]);
	}
}
