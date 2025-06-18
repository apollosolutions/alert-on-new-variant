import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "schema.graphqls",
	documents: ["src/**/*.{ts,tsx,graphql,gql}"],
	ignoreNoDocuments: true,
	generates: {
		"src/generated/graphql.ts": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-graphql-request",
			],
		},
	},
};

export default config;
