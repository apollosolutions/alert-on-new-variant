import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
	APOLLO_KEY: z.string().min(1, "APOLLO_KEY must be set"),
	APOLLO_GRAPH_ID: z.string().min(1, "APOLLO_GRAPH_ID must be set"),
	POLLING_INTERVAL: z.coerce
		.number()
		.optional()
		.transform((val) => {
			if (typeof val !== "number" || isNaN(val) || val <= 0) {
				throw new Error("POLLING_INTERVAL must be a positive number");
			}
			// Convert seconds to milliseconds
			val = val * 1000;
			return val;
		})
		.default(30 * 1000), // Default to 30 seconds
	PLATFORM_API_ENDPOINT: z
		.string()
		.url("PLATFORM_API_ENDPOINT must be a valid URL")
		.optional()
		.default("https://api.apollographql.com/graphql"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	console.error(
		"❌ Invalid environment variables:",
		JSON.stringify(parsed.error.format(), null, 4),
	);
	process.exit(1);
}

export default parsed.data;
