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
}
