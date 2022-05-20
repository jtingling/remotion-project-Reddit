export type ContentSlice = {
	url: string;
	duration: number;
	text: string;
	from?: number;
	to?: number;
	snooURL?: string;
	name?: string;
};

export type iSegmentList = {
	segmentsList: ContentSlice[];
	numberOfSegments: 0;
};

export type iComments = [{data: {body: string}; kind: string}];
// eslint-disable-next-line camelcase
export type iUsers = [{data: {snoovatar_img: string; name: string}}];

export type iTextBox = {
	redditor: string;
	snooImage: string;
	text: any;
};
