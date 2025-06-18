"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
exports.default = config;
