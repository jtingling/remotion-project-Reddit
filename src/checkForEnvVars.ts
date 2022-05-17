export const checkForEnvVars = (vars: NodeJS.ProcessEnv) => {
	if (!vars.REMOTION_AZURE_TTS_KEY) {
		throw new Error(
			'REMOTION_AZURE_TTS_KEY environment variable is missing. Read the docs first and complete the setup.'
		);
	}
	if (!vars.REMOTION_AZURE_TTS_REGION) {
		throw new Error(
			'REMOTION_AZURE_TTS_REGION environment variable is missing. Read the docs first and complete the setup.'
		);
	}
	if (!vars.REMOTION_AWS_S3_BUCKET_NAME) {
		throw new Error(
			'REMOTION_AWS_S3_BUCKET_NAME environment variable is missing. Read the docs first and complete the setup.'
		);
	}
	if (!vars.REMOTION_AWS_S3_REGION) {
		throw new Error(
			'REMOTION_AWS_S3_REGION environment variable is missing. Read the docs first and complete the setup.'
		);
	}
	if (!vars.REMOTION_AWS_ACCESS_KEY_ID) {
		throw new Error(
			'REMOTION_AWS_ACCESS_KEY_ID environment variable is missing. Read the docs first and complete the setup.'
		);
	}
	if (!vars.REMOTION_AWS_SECRET_ACCESS_KEY) {
		throw new Error(
			'REMOTION_AWS_SECRET_ACCESS_KEY environment variable is missing. Read the docs first and complete the setup.'
		);
	}
};
