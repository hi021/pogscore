import { Component } from '@angular/core';
import { UserSearchComponent } from '../../components/UserSearchComponent';

@Component({
	styleUrl: './home.scss',
	templateUrl: './home.html',
	imports: [UserSearchComponent],
})
export class HomeComponent {}
