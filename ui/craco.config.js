module.exports = {
  babel: {
    "presets": ["@babel/preset-env"],
    "plugins": [
      ["module-resolver", {
        "root": ["./src"],
        "alias": {
          "@": "./src"
        }
      }]
    ]
  }
}

