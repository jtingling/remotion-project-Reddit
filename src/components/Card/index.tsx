/* eslint-disable camelcase */
import {Key, ReactChild, ReactFragment, ReactPortal} from 'react';
import {getInputProps, Img} from 'remotion';
import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Badge,
	Chip,
	Typography,
} from '@mui/material';

const {
	subreddit: {
		data: {
			community_icon,
			icon_img,
			display_name_prefixed,
			public_description,
		},
	},
	post: {link_flair_background_color, link_flair_text, all_awardings},
} = getInputProps();

export const TitleCard = () => {
	return (
		<Card
			sx={{
				position: 'absolute',
				left: '0%',
				top: '2%',
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
						srcSet={`${community_icon}, ${icon_img}`}
						sx={{width: '150px', height: '150px'}}
					/>
				}
				titleTypographyProps={{
					variant: 'h3',
				}}
				title={display_name_prefixed}
				subheader={
					<Chip
						label={link_flair_text}
						sx={{
							backgroundColor: link_flair_background_color,
							fontSize: '28px',
						}}
					/>
				}
			/>
			<div style={{paddingLeft: '10px'}}>
				<Typography variant="h6">{public_description}</Typography>
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
					{all_awardings.map(
						(award: {
							id: Key | null | undefined;
							count:
								| boolean
								| ReactChild
								| ReactFragment
								| ReactPortal
								| null
								| undefined;
							// eslint-disable-next-line camelcase
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
