import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	imports: [FormsModule],
	selector: 'app-user-search',
	templateUrl: './user-search.html',
})
export class UserSearchComponent {
	private readonly router = inject(Router);
	query: string = '';
	disabled = false;

	onSubmit() {
		if (!this.query) return;
		void this.router.navigate(['/player', this.query]);
	}
}
