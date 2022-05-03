import {useState, useCallback, useEffect} from 'react';
import {
	AbsoluteFill,
	Composition,
	continueRender,
	delayRender,
	getInputProps,
	Sequence,
	random,
} from 'remotion';

import {textToSpeech} from './TextToSpeech';
import {ContentSegments} from './types';
import {AudioTrack} from './Audio';
import {VideoTrack} from './Video/';
import {Comments} from './AudioText/Comments';
import {TextBox} from './components/TextBox';
import {Typography} from '@mui/material';

const inputProps = getInputProps();

export const Main: React.FC<{
	videoFrames: number;
	content: ContentSegments;
}> = ({videoFrames, content}) => {
	return (
		<div
			style={{
				flex: 1,
				backgroundColor: 'white',
			}}
		>
			<Sequence from={0}>
				<div
					style={{
						width: '250px',
						height: '250px',
						zIndex: 5,
						backgroundImage: `url(${
							inputProps.subreddit.data.community_icon ||
							inputProps.subreddit.data.icon_img
						})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
						backgroundColor: 'transparent',
					}}
				>
					<Typography>
						{inputProps.subreddit.data.display_name_prefixed}
					</Typography>
				</div>
			</Sequence>
			<Sequence from={0} durationInFrames={content.intro?.duration}>
				<AbsoluteFill style={{top: '10px', zIndex: 1}}>
					<AudioTrack audio={content.intro?.url as string} />
					<TextBox>
						<Comments selftext={content.intro?.text as string} />
					</TextBox>
				</AbsoluteFill>
			</Sequence>
			{content.body &&
				content.body.map((c, idx) => {
					const xRandom = random(c.duration);
					const yRandom = random(idx);
					return (
						<Sequence
							key={(c.from as number) + c.duration}
							from={(c.from as number) - 2}
							durationInFrames={(c.duration as number) + 1}
						>
							<AbsoluteFill
								style={{
									top: Math.round(yRandom * 1000),
									left: Math.round(xRandom * 1000),
									zIndex: 1,
								}}
							>
								<AudioTrack audio={c.url} />
								<TextBox>
									<Comments selftext={c.text as string} />
								</TextBox>
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
