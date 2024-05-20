export function replacer(_v: unknown, value) {
	if (typeof value === 'bigint') {
		return Number(value);
	} else if (value instanceof Error) {
		const error = {};

		Object.getOwnPropertyNames(value).forEach((propName) => {
			error[propName] = value[propName];
		});

		return error;
	}

	return value;
}
