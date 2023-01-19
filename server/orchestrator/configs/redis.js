const Redis = require("ioredis");
const fs = require("fs");

// ! Perbaikin ntar
const redis = new Redis({
  host: "redis-15803.c1.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 15803,
  password: "guj4vmvcwkGAwWi5yZjtsPbWvkeDQ5Bz",
});

module.exports = redis;
