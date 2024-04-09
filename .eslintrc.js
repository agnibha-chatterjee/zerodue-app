module.exports = {
  root: true,
  extends: ["universe/native", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "react-hooks/exhaustive-deps": "warn",
    "jsx-quotes": ["error", "prefer-double"],
    "no-duplicate-imports": "error",
  },
};
