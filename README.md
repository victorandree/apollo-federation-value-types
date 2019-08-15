# Value type issues in Apollo Federation

This repository demonstrates an issue with value types in Apollo Federation.

## To reproduce

1. Install and start the services and gateway

    ```shell
    npm install
    npm run start
    ```

2. Run a query which uses the shared value type from the _first_ service where the type was defined. In this case, the following query breaks:

    ```graphql
    query {
      houses {
        id
        address {
          street
        }
      }
    }
    ```

    Direct link: <http://localhost:7000/graphql?query={houses{address{street}}}>

3. The query fails with this response

    ```json
        {
      "errors": [
        {
          "message": "400: Bad Request",
          "extensions": {
            "code": "INTERNAL_SERVER_ERROR",
            "response": {
              "url": "http://localhost:7002/",
              "status": 400,
              "statusText": "Bad Request",
              "body": {
                "errors": [
                  {
                    "message": "Fragment cannot be spread here as objects of type \"_Entity\" can never be of type \"Address\".",
                    "locations": [
                      {
                        "line": 3,
                        "column": 5
                      }
                    ],
                    "extensions": {
                      "code": "GRAPHQL_VALIDATION_FAILED",
                      "exception": {
                        "stacktrace": [
                          "GraphQLError: Fragment cannot be spread here as objects of type \"_Entity\" can never be of type \"Address\".",
                          "    at Object.InlineFragment (/apollo-federation-value-types/node_modules/graphql/validation/rules/PossibleFragmentSpreads.js:45:29)",
                          "    at Object.enter (/apollo-federation-value-types/node_modules/graphql/language/visitor.js:324:29)",
                          "    at Object.enter (/apollo-federation-value-types/node_modules/graphql/language/visitor.js:375:25)",
                          "    at visit (/apollo-federation-value-types/node_modules/graphql/language/visitor.js:242:26)",
                          "    at Object.validate (/apollo-federation-value-types/node_modules/graphql/validation/validate.js:54:22)",
                          "    at validate (/apollo-federation-value-types/node_modules/apollo-server-core/dist/requestPipeline.js:211:32)",
                          "    at Object.<anonymous> (/apollo-federation-value-types/node_modules/apollo-server-core/dist/requestPipeline.js:124:42)",
                          "    at Generator.next (<anonymous>)",
                          "    at fulfilled (/apollo-federation-value-types/node_modules/apollo-server-core/dist/requestPipeline.js:4:58)",
                          "    at processTicksAndRejections (internal/process/task_queues.js:85:5)"
                        ]
                      }
                    }
                  }
                ]
              }
            },
            "exception": {
              "stacktrace": [
                "Error: 400: Bad Request",
                "    at RemoteGraphQLDataSource.<anonymous> (/apollo-federation-value-types/node_modules/@apollo/gateway/dist/datasources/RemoteGraphQLDataSource.js:94:25)",
                "    at Generator.next (<anonymous>)",
                "    at /apollo-federation-value-types/node_modules/@apollo/gateway/dist/datasources/RemoteGraphQLDataSource.js:7:71",
                "    at new Promise (<anonymous>)",
                "    at __awaiter (/apollo-federation-value-types/node_modules/@apollo/gateway/dist/datasources/RemoteGraphQLDataSource.js:3:12)",
                "    at RemoteGraphQLDataSource.errorFromResponse (/apollo-federation-value-types/node_modules/@apollo/gateway/dist/datasources/RemoteGraphQLDataSource.js:84:16)",
                "    at RemoteGraphQLDataSource.<anonymous> (/apollo-federation-value-types/node_modules/@apollo/gateway/dist/datasources/RemoteGraphQLDataSource.js:67:34)",
                "    at Generator.next (<anonymous>)",
                "    at /apollo-federation-value-types/node_modules/@apollo/gateway/dist/datasources/RemoteGraphQLDataSource.js:7:71",
                "    at new Promise (<anonymous>)"
              ]
            }
          }
        }
      ],
      "data": {
        "houses": [
          {
            "address": null
          }
        ]
      }
    }
    ```
