import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

const token = localStorage.getItem("bloggingtoken");

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: process.env.REACT_APP_APOLLO_CLIENT_URI,
      credentials: "same-origin",
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }),
  ]),
  cache: new InMemoryCache(),
});

// APOLLO BOOST configuration
// const client = new ApolloClient({
//   uri: process.env.REACT_APP_APOLLO_CLIENT_URI,
//   cache: new InMemoryCache(),
//   request: (operation) => {
//     const token = localStorage.getItem("bloggingtoken");
//     operation.setContext({
//       headers: {
//         authorization: token ? `Bearer ${token}` : "",
//       },
//     });
//   },
//   onError: ({ graphQLErrors, networkError }) => {
//     if (graphQLErrors) {
//       console.log("graphQLErrors", graphQLErrors);
//     }
//     if (networkError) {
//       console.log("networkError", networkError);
//     }
//   },
// });

export { client as default };
