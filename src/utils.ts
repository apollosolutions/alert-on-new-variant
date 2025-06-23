import { createLogger, format, transports } from "winston";

const { combine, timestamp, json } = format;
export const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const newLogger = () => {
	let logLevel = "debug";
	if (process.env.NODE_ENV === "DEV") {
		logLevel = "debug";
	}
	return createLogger({
		format: combine(
			timestamp({
				format: "YYYY-MM-DD HH:mm:ss",
			}),
			json(),
		),
		transports: [
			new transports.Console({
				debugStdout: true,
				level: logLevel,
			}),
		],
	});
};
