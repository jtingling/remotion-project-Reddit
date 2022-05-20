import {Audio} from 'remotion';

export const AudioTrack: React.FC<{
	audio: string;
}> = ({audio}) => {
	return <>{audio && <Audio src={audio} />}</>;
};
