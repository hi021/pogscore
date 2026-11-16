import { Injectable, inject } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { PageTitle } from './PageTitle';

@Injectable()
export class PageTitleStrategy extends TitleStrategy {
	private readonly pageTitle = inject(PageTitle);

	override updateTitle(snapshot: RouterStateSnapshot): void {
		this.pageTitle.setTitle(this.buildTitle(snapshot));
	}
}
