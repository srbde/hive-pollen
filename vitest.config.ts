import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["test/*.ts"],
    exclude: ["test/_*.ts", "test/_*.js", "node_modules/**", "dist/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/**/*.ts"],
    },
    testTimeout: 60000,
    hookTimeout: 60000,
  },
});
