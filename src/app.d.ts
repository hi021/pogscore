namespace PogScore {
	// interface Player {
	// 	id: number;
	// 	name: string;
	// 	countryCode: string;
	// }

	type PlayerQueryField = 'username' | 'user_id';
}

namespace ScoreApi {
	interface UserRankResponse {
		rank: number;
		user_id: number;
		username: string;
		score: number;

		rank_highest: RankHighest;
		rank_history: Array<RankHistoryEntry | null>;

		prev: AdjacentUser;
		next: AdjacentUser;
	}

	interface RankHighest {
		rank: number;
		updated_at: string; // ISO 8601 datetime
	}

	interface RankHistoryEntry {
		rank: number;
		date: string; // ISO 8601 datetime
	}

	interface AdjacentUser {
		username: string;
		user_id: number;
		score: number;
	}

	type UserSearchResponse = Pick<ScpApi.UserRankResponse, 'username' | 'user_id' | 'rank'>;
}
