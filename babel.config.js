module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@components": "./app/components",
            "@constants": "./app/constants",
            "@hooks": "./app/hooks",
            "@screens": "./app/screens",
            "@schemas": "./app/schemas",
            "@config": "./app/config",
            "@utils": "./app/utils",
            "@api": "./app/api",
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};
