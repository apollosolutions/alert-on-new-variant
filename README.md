# Alert on New GraphOS Variant

This example shows how to alert on new GraphOS [variants](https://www.apollographql.com/docs/graphos/platform/graph-management/variants) by polling the [Apollo Platform API](https://www.apollographql.com/docs/graphos/platform/platform-api). 

**The code in this repository is experimental and has been provided for reference purposes only. Community feedback is welcome but this project may not be supported in the same way that repositories in the official [Apollo GraphQL GitHub organization](https://github.com/apollographql) are. If you need help you can file an issue on this repository, [contact Apollo](https://www.apollographql.com/contact-sales) to talk to an expert, or create a ticket directly in Apollo Studio.**

## Installation

You will need: 

* NodeJS installed
* Familiarity with Typescript

To install, run `npm install` to install the prerequisite packages.

Next, you'll need two things from GraphOS to run the application: 

* An Apollo API key
* A graph ID (which is the first portion of the graph ref before the `@` sign)
  * For example given a graph ref `demo@polling`, the graph ID would be `demo`

Once you have both, you will need to copy the [`.env.sample`](./.env.sample) file to `.env` and modify the values accordingly (or use the same environment variables). 

## Usage

To run the tool, you can run either: 

* `npm run dev` to run the tool using `nodemon` to reload on changes
* `npm run build && npm run start` to build the tool and then execute the built Javascript file
  * If you have an existing build you'd like to use, you can use `npm run start` alone instead

You will also need to adjust [`src/index.ts`](./README.md#L88) to notify however you require. 

To test the application, you can use: 

```bash
APOLLO_KEY=<APOLLO_KEY_VALUE> rover subgraph publish --name test --schema examples/subgraph.gql --routing-url http://localhost:4000 --allow-invalid-routing-url new-variant-alerting@<variant_name>
```

To publish a new variant.

## Known Limitations

- No explicit notification implementations provided beyond a simple console message

