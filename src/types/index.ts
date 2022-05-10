export type ContentSlice = {
	url: string;
	duration: number;
	text: string;
	from?: number;
	to?: number;
	snooURL?: string;
	name?: string;
};

export type ContentSegments = {
	intro?: ContentSlice;
	body?: ContentSlice[];
};
