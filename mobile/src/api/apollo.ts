import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { SetContextLink } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpLink = new HttpLink({
  uri: "http://192.168.0.124:4000/",
});

const authLink = new SetContextLink(async () => {
  const token = await AsyncStorage.getItem("token");

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;