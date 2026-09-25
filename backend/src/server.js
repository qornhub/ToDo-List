const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// -------------------------
// In-memory data
// -------------------------

const users = [];

const todos = [];

// -------------------------
// GraphQL Schema
// -------------------------

const typeDefs = `#graphql

  type User {
    id: ID!
    email: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    userId: ID!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!

    createTodo(title: String!): Todo!
    updateTodo(id: ID!, title: String, completed: Boolean): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;

// -------------------------
// GraphQL Resolvers
// -------------------------

const resolvers = {

  Query: {

    todos: (_, __, context) => {

      // Check whether user is logged in
      if (!context.user) {
        throw new Error("You must be logged in");
      }

      // Only return todos belonging to current user
      return todos.filter(
        (todo) => todo.userId === context.user.id
      );
    },

  },

  Mutation: {

    // -------------------------
    // Signup
    // -------------------------

    signup: (_, { email, password }) => {

      // Check if email already exists
      const existingUser = users.find(
        (user) => user.email === email
      );

      if (existingUser) {
        throw new Error("User already exists");
      }

      const user = {
        id: String(users.length + 1),
        email,
        password,
      };

      users.push(user);

      return {
        user: {
          id: user.id,
          email: user.email,
        },

        // Dummy token
        token: `user-${user.id}`,
      };
    },

    // -------------------------
    // Login
    // -------------------------

    login: (_, { email, password }) => {

      const user = users.find(
        (user) =>
          user.email === email &&
          user.password === password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      return {
        user: {
          id: user.id,
          email: user.email,
        },

        token: `user-${user.id}`,
      };
    },

    // -------------------------
    // Create Todo
    // -------------------------

    createTodo: (_, { title }, context) => {

      if (!context.user) {
        throw new Error("You must be logged in");
      }

      const todo = {
        id: String(todos.length + 1),
        title,
        completed: false,
        userId: context.user.id,
      };

      todos.push(todo);

      return todo;
    },

    // -------------------------
    // Update Todo
    // -------------------------

    updateTodo: (_, { id, title, completed }, context) => {

      if (!context.user) {
        throw new Error("You must be logged in");
      }

      const todo = todos.find(
        (todo) =>
          todo.id === id &&
          todo.userId === context.user.id
      );

      if (!todo) {
        throw new Error("Todo not found");
      }

      if (title !== undefined) {
        todo.title = title;
      }

      if (completed !== undefined) {
        todo.completed = completed;
      }

      return todo;
    },

    // -------------------------
    // Delete Todo
    // -------------------------

    deleteTodo: (_, { id }, context) => {

      if (!context.user) {
        throw new Error("You must be logged in");
      }

      const index = todos.findIndex(
        (todo) =>
          todo.id === id &&
          todo.userId === context.user.id
      );

      if (index === -1) {
        throw new Error("Todo not found");
      }

      todos.splice(index, 1);

      return true;
    },

  },

};

// -------------------------
// Apollo Server
// -------------------------

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// -------------------------
// Start server
// -------------------------

startStandaloneServer(server, {

  listen: {
    port: 4000,
  },

  context: async ({ req }) => {

    const authorization = req.headers.authorization;

    if (!authorization) {
      return {
        user: null,
      };
    }

    // Expected:
    // Authorization: Bearer user-1

    const token = authorization.replace("Bearer ", "");

    if (!token.startsWith("user-")) {
      return {
        user: null,
      };
    }

    const userId = token.replace("user-", "");

    const user = users.find(
      (user) => user.id === userId
    );

    return {
      user: user || null,
    };
  },

}).then(({ url }) => {

  console.log(`🚀 GraphQL server ready at ${url}`);

});