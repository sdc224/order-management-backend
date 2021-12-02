export const findEnvFile = (): string => {
	const envFilePath = ".env";

	switch (process.env.NODE_ENV) {
		case "DEVELOPMENT":
			return `${envFilePath}.development`;

		case "TEST":
			return `${envFilePath}.test`;

		case "PRODUCTION":
			return `${envFilePath}.production`;

		default:
			return envFilePath;
	}
};
