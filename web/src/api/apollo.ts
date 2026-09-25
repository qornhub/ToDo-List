import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { SetContextLink } from "@apollo/client/link/context";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/";

const httpLink = new HttpLink({
  uri: API_URL,
});

const authLink = new SetContextLink((prevContext) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;