export type ContentSlice = {
	url: string;
	duration: number;
	text: string;
	from?: number;
	to?: number;
};

export type ContentSegments = {
	intro?: ContentSlice;
	body?: ContentSlice[];
};
