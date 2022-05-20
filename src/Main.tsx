/* eslint-disable camelcase */
import * as React from 'react';
import {getInputProps, Sequence} from 'remotion';
import {iSegmentList} from './types';
import {AudioTrack} from './Audio';
import {VideoTrack} from './Video/';
import {Comments} from './AudioText/Comments';
import {TitleCard} from './components/Card/index';
import {TextBox} from './components/TextBox';
import {Content} from './components/Content';

const {
	subreddit: {
		data: {banner_background_image, banner_img, key_color},
	},
	post: {author},
} = getInputProps();

export const Main: React.FC<{
	videoFrames: number;
	content: iSegmentList;
}> = ({videoFrames, content}) => {
	return (
		<div
			style={{
				flex: 1,
				backgroundImage: `url(${banner_background_image}), url(${banner_img})`,
				backgroundColor: `${key_color}`,
				backgroundSize: 'contain',
				width: '100%',
			}}
		>
			<Sequence from={0}>
				<TitleCard />
			</Sequence>
			{content.segmentsList &&
				content.segmentsList.map(
					({from, duration, url, name, snooURL, text}) => {
						return (
							<Sequence
								key={(from as number) + duration}
								from={(from as number) - 1}
								durationInFrames={(duration as number) + 1}
							>
								<Content>
									<AudioTrack audio={url} />
									<TextBox
										redditor={name || ''}
										snooImage={snooURL || ''}
										text={
											<Comments
												selftext={text as string}
												redditor={name || author}
											/>
										}
									/>
								</Content>
							</Sequence>
						);
					}
				)}
			<Sequence from={0}>
				<VideoTrack videoFrames={videoFrames} />
			</Sequence>
		</div>
	);
};
