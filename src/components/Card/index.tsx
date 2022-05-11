import {Key, ReactChild, ReactFragment, ReactPortal} from 'react';
import {AbsoluteFill, getInputProps, Img} from 'remotion';
import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Badge,
	Chip,
	Typography,
} from '@mui/material';

const inputProps = getInputProps();

export const TitleCard = () => {
	return (
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
				opacity: 0.8,
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
								inputProps.post.link_flair_background_color,
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
	);
};
