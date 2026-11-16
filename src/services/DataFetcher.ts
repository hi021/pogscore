import { Service } from '@angular/core';
import { Utils } from './Utils';

@Service()
export class DataFetcher {
	public static readonly CACHE_CONTROL_HEADER = 'max-age=1020'; // 17 minutes - roughly half of the refresh cycle; could be pointless, as CF caches the API anyway
	// TODO?: load from env
	public static readonly API_BASE_URL = 'https://score.respektive.pw';
	public static readonly API_USER_URL = DataFetcher.API_BASE_URL + '/u/';

	private constructor() {}

	public static buildUserUrl(idOrName: string | number, queryField: PogScore.PlayerQueryField = 'user_id') {
		const url = new URL(DataFetcher.API_USER_URL + idOrName);
		url.searchParams.set('s', queryField);
		return url.toString();
	}

	public static async fetchUser(idOrName: string | number) {
		const presumedId = Utils.getInteger(idOrName);
		const wasIdProvided = presumedId !== null && presumedId > 1;

		if (!wasIdProvided) {
			try {
				return await DataFetcher.fetchUserByKnownDiscriminator(idOrName, 'username');
			} catch (e) {}
		}

		return await DataFetcher.fetchUserByKnownDiscriminator(idOrName, 'user_id');
	}

	public static async fetchUserByKnownDiscriminator(
		idOrName: string | number,
		queryField: PogScore.PlayerQueryField = 'user_id',
	) {
		const res = await fetch(DataFetcher.buildUserUrl(idOrName, queryField), {
			headers: {
				'Cache-Control': DataFetcher.CACHE_CONTROL_HEADER,
			},
		});
		if (!res.ok)
			throw new Error(`Failed to fetch player with ${queryField} of '${idOrName}': ${res.status} ${res.statusText}`);

		const resJson: ScoreApi.UserRankResponse[] = await res.json();
		if (!(resJson as any)?.[0]?.username)
			throw new Error(
				`No player with ${queryField} of '${idOrName}' found. Remember that the username must be an exact match.`,
			);

		return resJson[0];
	}
}
