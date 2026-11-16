import { Service } from '@angular/core';

@Service()
export class Utils {
	private constructor() {}

	public static getInteger(value?: string | number) {
		if (value === undefined || value === null) {
			return null;
		}

		if (typeof value === 'number') {
			return Math.trunc(value);
		} else if (typeof value === 'string') {
			const num = Number(value);
			if (!isNaN(num) && isFinite(num)) return Math.trunc(num);
		}

		return null;
	}

	public static getAvatarURL(id: number | string) {
		return `https://a.ppy.sh/${id}?0.jpg`;
	}
	public static getOsuProfileURL(idOrName: number | string) {
		return `https://osu.ppy.sh/users/${idOrName}`;
	}
	// public static getOsuStatsURL(name: string){ return `https://osustats.ppy.sh/u/${name}//1/////-/1-50`;}
	// public static getOsuTrackURL(name: string){ return `https://ameobea.me/osutrack/user/${name}`;}
	// public static getOsuAltURL(id: number | string){ return `https://score.kirino.sh/user/${id}`;}
	// public static getOsuDailyURL(name: string){ return `https://osudaily.net/profile.php?u=${name}&s=1&m=0`;}
	// public static getOsuSnipeURL(id: number | string, country = "global"){ return
	// 	`https://snipe.huismetbenen.nl/player/${country.toLowerCase()}/osu/${id}`;}
}
