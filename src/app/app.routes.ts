import { Routes } from '@angular/router';
import { HomeComponent } from '../routes/home/home';
import { PlayerComponent } from '../routes/user/user';
import { RankingComponent } from '../routes/ranking/ranking';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'player/:idOrName',
		component: PlayerComponent,
	},
	{
		path: 'ranking',
		component: RankingComponent,
	},

	// path: '**'
];
