import * as React from 'react';
import {AbsoluteFill, getInputProps, Sequence} from 'remotion';
import {ContentSegments} from './types';
import {AudioTrack} from './Audio';
import {VideoTrack} from './Video/';
import {Comments} from './AudioText/Comments';
import {TitleCard} from './components/Card/index';
import {TextBox} from './components/TextBox';

const inputProps = getInputProps();

export const Main: React.FC<{
	videoFrames: number;
	content: ContentSegments;
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
			{console.log(inputProps)}
			{console.log(content)}
			<Sequence from={0}>
				<TitleCard />
			</Sequence>
			<Sequence from={0} durationInFrames={content.intro?.duration}>
				<AbsoluteFill
					style={{
						display: 'flex',
						justifyContent: 'start',
						alignContent: 'center',
						top: '70%',
						zIndex: 1,
					}}
				>
					<AudioTrack audio={content.intro?.url as string} />
					<TextBox
						redditor={inputProps.user.data.name}
						snooImage={inputProps.user.data.snoovatar_img}
						text={
							<Comments
								selftext={content.intro?.text as string}
								redditor={inputProps.post.author}
							/>
						}
					/>
				</AbsoluteFill>
			</Sequence>
			{content.body &&
				content.body.map((c) => {
					return (
						<Sequence
							key={(c.from as number) + c.duration}
							from={(c.from as number) - 2}
							durationInFrames={(c.duration as number) + 1}
						>
							<AbsoluteFill
								style={{
									display: 'flex',
									justifyContent: 'start',
									alignContent: 'center',
									top: '70%',
									zIndex: 1,
								}}
							>
								<AudioTrack audio={c.url} />
								<TextBox
									redditor={
										!c.name
											? inputProps.post.author
											: c.name
									}
									snooImage={!c.snooURL ? '' : c.snooURL}
									text={
										<Comments
											selftext={c.text as string}
											redditor={
												!c.name
													? inputProps.post.author
													: c.name
											}
										/>
									}
								/>
							</AbsoluteFill>
						</Sequence>
					);
				})}
			<Sequence from={0}>
				<VideoTrack videoFrames={videoFrames} />
			</Sequence>
		</div>
	);
};
