import { Component } from '@angular/core';
import { UserSearchComponent } from '../../components/user-search.component';

@Component({
	styleUrl: './home.scss',
	templateUrl: './home.html',
	imports: [UserSearchComponent],
})
export class HomeComponent {}
