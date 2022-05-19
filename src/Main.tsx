import * as React from 'react';
import {getInputProps, Sequence} from 'remotion';
import {iSegmentList} from './types';
import {AudioTrack} from './Audio';
import {VideoTrack} from './Video/';
import {Comments} from './AudioText/Comments';
import {TitleCard} from './components/Card/index';
import {TextBox} from './components/TextBox';
import {Content} from './components/Content';

const inputProps = getInputProps();

export const Main: React.FC<{
	videoFrames: number;
	content: iSegmentList;
}> = ({videoFrames, content}) => {
	return (
		<div
			style={{
				flex: 1,
				backgroundImage: `url(${inputProps.subreddit.data.banner_background_image}), url(${inputProps.subreddit.data.banner_img})`,
				backgroundColor: `${inputProps.subreddit.data.key_color}`,
				backgroundSize: 'contain',
				width: '100%',
			}}
		>
			<Sequence from={0}>
				<TitleCard />
			</Sequence>
			{content.segmentsList &&
				content.segmentsList.map((comment) => {
					return (
						<Sequence
							key={(comment.from as number) + comment.duration}
							from={(comment.from as number) - 1}
							durationInFrames={(comment.duration as number) + 1}
						>
							<Content>
								<AudioTrack audio={comment.url} />
								<TextBox
									redditor={comment.name ? comment.name : ''}
									snooImage={
										comment.snooURL ? comment.snooURL : ''
									}
									text={
										<Comments
											selftext={comment.text as string}
											redditor={
												comment.name
													? comment.name
													: inputProps.post.author
											}
										/>
									}
								/>
							</Content>
						</Sequence>
					);
				})}
			<Sequence from={0}>
				<VideoTrack videoFrames={videoFrames} />
			</Sequence>
		</div>
	);
};
