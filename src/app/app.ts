import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

@Component({
	imports: [RouterOutlet, RouterLink, RouterLinkActive, NgxTippyModule],
	selector: 'app-root',
	templateUrl: './app.html',
})
export class App {}
