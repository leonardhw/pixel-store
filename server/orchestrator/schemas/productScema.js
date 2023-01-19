const axios = require("axios");
const redis = require("../configs/redis");
// const appUrl = "http://localhost:4002/pub";
// const usersUrl = "http://localhost:4001";
const appUrl = "https://p3-challenge-2-production-5224.up.railway.app/pub";
const usersUrl = "https://p3-challenge-2-production-086f.up.railway.app";

const typeDefs = `#graphql
  type Product {
    id: Int
    name: String
    slug: String
    description: String
    price: Int
    stock: Int
    mainImg: String
    categoryId: Int
    userId: String
    User: User
    Category: Category
    Images: [Image]
  }

  input ProductInput {
    # Bisa untuk validasi di sini pakai ! di akhir dataTypes
    name: String!
    # slug: String
    description: String!
    price: Int!
    stock: Int!
    mainImg: String!
    categoryId: Int
    userId: String
    Images: [ImagesInput]
  }

  input ImagesInput {
    # productId: Int
    imgUrl: String
  }

  type User {
    username: String
    email: String
    password: String
    phoneNumber: String
    address: String
  }

  type Category {
    name: String
  }
  
  type Image {
    productId: Int
    imgUrl: String
  }

  # Get
  type Query {
    getProducts: [Product]
    getProduct(id: ID): Product
  }

  # Post, Put, Patch, Delete
  type Mutation {
    addProduct(newProduct: ProductInput): Product 
    deleteProduct(id: ID): Product
    editProduct(id: ID, newProduct: ProductInput): Product
  }
`;

const resolvers = {
  Query: {
    getProducts: async () => {
      try {
        const cache = await redis.get("productCache");
        if (cache) return JSON.parse(cache);
        const { data } = await axios.get(`${appUrl}/products`);
        await redis.set("productCache", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getProduct: async (_, args) => {
      try {
        const { id } = args;
        const { data: product } = await axios.get(`${appUrl}/products/${id}`);
        const { userId } = product;
        const { data: User } = await axios.get(`${usersUrl}/users/${userId}`);
        product.User = User;
        return product;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addProduct: async (_, args) => {
      try {
        const { newProduct } = args;
        await axios.post(`${appUrl}/products`, newProduct);

        const cache = await redis.get("productCache");
        if (cache) await redis.del("productCache");

        return newProduct;
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.delete(`${appUrl}/products/${id}`);

        const cache = await redis.get("productCache");
        if (cache) await redis.del("productCache");

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editProduct: async (_, args) => {
      try {
        const { id, newProduct } = args;
        const { data } = await axios.put(`${appUrl}/products/${id}`, newProduct);

        const cache = await redis.get("productCache");
        if (cache) await redis.del("productCache");

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
