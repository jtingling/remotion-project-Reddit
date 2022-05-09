import {Key, ReactChild, ReactFragment, ReactPortal} from 'react';
import * as React from 'react';
import {AbsoluteFill, getInputProps, Sequence, Img} from 'remotion';
import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Badge,
	Chip,
} from '@mui/material';

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
				backgroundImage: `url(${inputProps.subreddit.data.banner_background_image}), url(${inputProps.subreddit.data.banner_img})`,
				backgroundColor: `${inputProps.subreddit.data.key_color}`,
				backgroundSize: 'contain',
				width: '100%',
			}}
		>
			{console.log(inputProps)}
			{console.log(content)}
			<Sequence from={0}>
				<Card
					sx={{
						position: 'absolute',
						left: '0%',
						top: '5%',
						display: 'flex',
						flexDirection: 'column',
						flexWrap: 'wrap',
						justifyContent: 'start',
						alignItems: 'flex-start',
						zIndex: 10,
						opacity: 0.7,
						backgroundColor: 'black',
						borderTopRightRadius: '15px',
						borderBottomRightRadius: '15px',
						color: 'white',
					}}
				>
					<CardHeader
						avatar={
							<Avatar
								alt="subreddit logo"
								srcSet={`${inputProps.subreddit.data.community_icon}, ${inputProps.subreddit.data.icon_img}`}
								sx={{width: '150px', height: '150px'}}
							/>
						}
						titleTypographyProps={{
							variant: 'h3',
						}}
						title={inputProps.subreddit.data.display_name_prefixed}
						subheader={
							<Chip
								label={inputProps.post.link_flair_text}
								sx={{
									backgroundColor:
										inputProps.post
											.link_flair_background_color,
									fontSize: '28px',
								}}
							/>
						}
					/>
					<div style={{paddingLeft: '10px'}}>
						<Typography variant="h6">
							{inputProps.subreddit.data.public_description}
						</Typography>
					</div>
					<CardContent>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								gap: '10px',
								flexWrap: 'wrap',
								zIndex: 15,
							}}
						>
							<Typography variant="h5">Awards:</Typography>
							{inputProps.post.all_awardings.map(
								(award: {
									id: Key | null | undefined;
									count:
										| boolean
										| ReactChild
										| ReactFragment
										| ReactPortal
										| null
										| undefined;
									icon_url: string | undefined;
								}) => {
									return (
										<Badge
											key={award.id}
											badgeContent={award.count}
											color="primary"
										>
											<Img
												src={award.icon_url}
												style={{
													width: 32,
													height: 32,
												}}
											/>
										</Badge>
									);
								}
							)}
						</div>
					</CardContent>
				</Card>
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
