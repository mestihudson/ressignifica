let config = require("config");

console.log(config.DBHost);
console.log(config.util.getEnv("NODE_ENV"));
