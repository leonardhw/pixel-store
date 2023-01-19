const axios = require("axios");
// const usersUrl = "http://localhost:4001";
const usersUrl = "https://p3-challenge-2-production-086f.up.railway.app";

const typeDefs = `#graphql
  type User {
    username: String
    email: String
    password: String
    phoneNumber: String
    address: String
  }

  input UserInput {
    # Bisa untuk validasi di sini pakai ! di akhir dataTypes
    username: String!
    email: String!
    password: String!
    phoneNumber: String
    address: String
  }

  # Get
  type Query {
    getUsers: [User]
    getUser(id: ID): User
  }

  # Post, Put, Patch, Delete
  type Mutation {
    addUser(newUser: UserInput): User 
    deleteUser(id: ID): User
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const { data } = await axios.get(`${usersUrl}/users`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getUser: async (_, args) => {
      try {
        // axios
        const { id } = args;
        const { data } = await axios.get(`${usersUrl}/users/${id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        // axios
        const { newUser } = args;
        const { data } = await axios.post(`${usersUrl}/users/register`, newUser);
        return newUser;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { id } = args;
        console.log(id);
        const { data } = await axios.delete(`${usersUrl}/users/${id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  resolvers,
  typeDefs,
};
