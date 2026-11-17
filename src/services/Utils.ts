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

	public static formatNumber(number: number | string, delimiter = ' ') {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
	}

	public static roundNumber(num: number, betweenSignAndNumber = ''): string {
		let pre: string;
		if (num < 0) pre = '-' + betweenSignAndNumber;
		else pre = betweenSignAndNumber;
		num = Math.abs(num);

		if (num < 10_000) return pre + Utils.formatNumber(num);
		if (num >= 10_000 && num < 1_000_000) return pre + Math.round(num / 10) / 100 + 'k';
		if (num >= 1_000_000 && num < 1_000_000_000) return pre + Math.round(num / 10_000) / 100 + 'M';
		if (num >= 1_000_000_000 && num < 1_000_000_000_000) return pre + Math.round(num / 10_000_000) / 100 + 'B';
		return pre + Math.round(num / 10_000_000_000) / 100 + 'T';
	}

	public static formatDate(date?: Date, utc?: boolean) {
		if (!date) date = new Date();
		const YYYY = utc ? date.getUTCFullYear() : date.getFullYear();
		const MM = ((utc ? date.getUTCMonth() : date.getMonth()) + 1).toString().padStart(2, '0');
		const DD = (utc ? date.getUTCDate() : date.getDate()).toString().padStart(2, '0');
		return `${YYYY}-${MM}-${DD}`;
	}

	// TODO: umm this is gonna be client date
	public static getServerDate() {
		const now = new Date();
		now.setHours(0, 0, 0, 0);
		return now;
	}

	public static addDays(date: Date, days: number) {
		const d = new Date(date);
		d.setDate(d.getUTCDate() + days);
		return d;
	}

	public static getAvatarURL(id: number | string) {
		return `https://a.ppy.sh/${id}?0.jpg`;
	}
	public static getOsuProfileURL(idOrName: number | string) {
		return `https://osu.ppy.sh/users/${idOrName}`;
	}
	public static getOsuStatsURL(name: string) {
		return `https://osustats.ppy.sh/u/${name}//1/////-/1-50`;
	}
	public static getOsuTrackURL(name: string) {
		return `https://ameobea.me/osutrack/user/${name}`;
	}
	public static getOsuAltURL(id: number | string) {
		return `https://score.kirino.sh/user/${id}`;
	}
	public static getOsuDailyURL(name: string) {
		return `https://osudaily.net/profile.php?u=${name}&s=1&m=0`;
	}
	// TODO: pogstats url one day....
}
