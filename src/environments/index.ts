export const findEnvFile = (): string => {
	const envFilePath = ".env";
	let nodeEnv = process.env.NODE_ENV;

	if (!nodeEnv && typeof nodeEnv !== "string") {
		return envFilePath;
	}

	nodeEnv = nodeEnv.toLowerCase();

	switch (nodeEnv) {
		case "development":
		case "test":
		case "production":
			return `${envFilePath}.${nodeEnv}`;

		default:
			return envFilePath;
	}
};
