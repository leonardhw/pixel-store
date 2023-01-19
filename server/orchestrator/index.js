const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const productSchema = require("./schemas/productScema");
const userSchema = require("./schemas/userSchema");

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs: [productSchema.typeDefs, userSchema.typeDefs],
  resolvers: [productSchema.resolvers, userSchema.resolvers],
});

startStandaloneServer(server, {
  listen: { port },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
