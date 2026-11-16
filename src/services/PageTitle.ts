import { Service, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Service()
export class PageTitle {
	private readonly documentTitle = inject(Title);

	setTitle(suffix?: string | null): void {
		this.documentTitle.setTitle(suffix ? `pogscore - ${suffix}` : 'pogscore');
	}
}
