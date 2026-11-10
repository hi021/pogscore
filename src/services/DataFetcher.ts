import { Service } from '@angular/core';

@Service()
export class DataFetcher {
	// TODO: load from env
	public static readonly API_BASE_URL = 'https://score.respektive.pw';
	public static readonly API_USER_URL = DataFetcher.API_BASE_URL + '/u/';

	private constructor() {}

	public static buildUserUrl(idOrName: string | number, queryField: PogScore.PlayerQueryField = 'user_id') {
		const url = new URL(DataFetcher.API_USER_URL + idOrName);
		url.searchParams.set('s', queryField);
		return url.toString();
	}

	public static async fetchUser(idOrName: string | number, queryField: PogScore.PlayerQueryField = 'user_id') {
		const res = await fetch(DataFetcher.buildUserUrl(idOrName, queryField));
		if (!res.ok)
			throw new Error(`Failed to fetch player with ${queryField} of '${idOrName}': ${res.status} ${res.statusText}`);

		const resJson: ScoreApi.UserRankResponse[] = await res.json();
		console.log(resJson);
		if (!(resJson as any)?.[0]?.username) throw new Error(`No player with ${queryField} of '${idOrName}' found`);

		return resJson[0];
	}
}
