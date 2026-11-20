import { Routes } from '@angular/router';
import { About } from './about/about';
import { Compare } from './compare/compare';
import { HomeComponent } from './home/home';
import { RankingComponent } from './ranking/ranking';
import { PlayerComponent } from './user/user';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'player',
		component: HomeComponent,
	},
	{
		path: 'player/:idOrName',
		component: PlayerComponent,
	},
	{
		path: 'ranking/**',
		component: RankingComponent,
	},
	{
		path: 'about',
		component: About,
	},
	{
		path: 'compare/**',
		component: Compare,
	},

	// TODO: 404 failover
	// path: '**'
];
