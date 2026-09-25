import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client/react";
import client from "../api/apollo";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="todo"
          options={{
            title: "TO DOs",
            headerBackVisible: false,
          }}
        />
      </Stack>
    </ApolloProvider>
  );
}