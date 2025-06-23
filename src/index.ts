import env from "./env";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/graphql";
import { newLogger, sleep } from "./utils";

const logger = newLogger();

let startTimestamp = new Date();

// This will store the seen variants to avoid processing the same variant multiple times
// It uses a Map to track the IDs of the variants that have already been processed, and a boolean to indicate if it has
// successfully processed them (aka sent a notification).
let seenVariants = new Map<string, boolean>();

// Get the SDK for making GraphQL requests
const sdk = getSdk(
	new GraphQLClient(env.PLATFORM_API_ENDPOINT, {
		headers: {
			"x-api-key": env.APOLLO_KEY,
			"apollographql-client-name": "polling-example",
			"apollographql-client-version": "0.0.1",
		},
	}),
);

// Allows for async/await usage in the top-level scope
(async () => {
	logger.info("Starting polling");
	while (true) {
		let startTime = performance.now();
		// Poll for updates immediately on startup
		try {
			await pollForUpdates();
		} catch (error) {
			logger.error("Error during polling:", error);
		}
		let endTime = performance.now();

		logger.info(`Polling completed in ${(endTime - startTime).toFixed(2)}ms`);
		// Wait for the specified polling interval before the next poll
		await sleep(env.POLLING_INTERVAL);
	}
})();

/**
 * Polls for updates at regular intervals.
 **/
async function pollForUpdates(): Promise<void> {
	// Gets the list of variants from the platform API
	let resp = await sdk.ListVariants({
		graphId: env.APOLLO_GRAPH_ID,
	});

	// Iterate through the variants returned by the API response
	for (const variant of resp.graph?.variants || []) {
		if (variant.isProposal) {
			logger.debug("Skipping proposal variant");
			continue; // Skip processing if the variant is a proposal
		}

		// Check if the variant has already been seen
		let seen = seenVariants.get(variant.id);

		// If the variant has been processed successfully, skip processing it
		if (seen) {
			logger.debug("Variant already processed, skipping", {
				name: variant.name,
				createdAt: variant.createdAt,
			});
			continue; // Skip processing if the variant has already been processed
		}

		// Parse the creation date of the variant
		let createdAt = new Date(variant.createdAt);

		// Check if the variant was created after the last recorded start timestamp
		if (createdAt > startTimestamp) {
			// Log the new variant detected
			logger.info("New variant detected:", {
				name: variant.name,
				id: variant.id,
				createdAt: createdAt.toISOString(),
			});
			startTimestamp = createdAt; // Update the start timestamp to the latest variant's creation time

			let processed = true; // Simulate processing the variant

			// Here you would typically send a notification or process the variant, and if it fails, you would handle that accordingly.

			seenVariants.set(variant.id, processed); // Set the variant as seen
		}
	}
}
