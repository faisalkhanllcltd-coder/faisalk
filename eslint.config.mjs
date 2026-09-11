import nextConfig from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "dist/**"],
  },
  ...nextConfig,
];

export default eslintConfig;
