import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
	{
		path: 'ranking/**',
		renderMode: RenderMode.Server,
	},
	{
		path: 'player/:idOrName',
		renderMode: RenderMode.Server,
	},
	{
		path: '**',
		renderMode: RenderMode.Prerender,
	},
];
