import type resources from './i18n/en.json';

type PathImpl<T, K extends keyof T> = K extends string
	? T[K] extends Record<string, any>
		? `${K}.${Path<T[K]>}`
		: K | `${K}.${string}`
	: never;

export type Path<T> = PathImpl<T, keyof T>;

export type FlatObject<T, R> = {
	[K in Path<T>]: R;
};

export type LocaleKey = keyof FlatObject<typeof resources, string>;
