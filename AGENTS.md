# Pollen Agent Guide

This document provides technical instructions for agents working on **`@srbde/pollen`**.

## 🛠️ Toolchain

- **Package Manager:** `pnpm` (required). Do not use `npm` or `yarn`.
- **Module System:** Pure ESM (`type: module`).
- **Build System:** `pnpm run build` (uses `tsc` for Node and `esbuild` for Browser).
- **Linter:** `oxlint` (Rust-based). Run with `pnpm run lint`.
- **Formatter:** `oxfmt` (Rust-based). Run with `pnpm run format`.
- **Test Runner:** `vitest`. Run with `pnpm run test` or `pnpm run test:watch`.

## 🧪 Testing Guidelines

- Tests are located in `test/`.
- **Browser/Node Environment:** Use `vitest` for all tests.
- **Node Polyfills:** esbuild handles polyfills for `buffer`, `crypto`, `stream`, etc., for the browser target via aliases in `package.json`.
- **ESM Imports:** All relative imports _must_ include the `.js` extension (even in `.ts` files).

## 🔒 Security Standards

- **Cryptography:** Always use the `@noble` suite from `src/crypto.ts`. Never introduce legacy `secp256k1` or `elliptic` dependencies.
- **Byte Engine:** Use `BinaryWriter` and `BinaryReader` from `src/utils.ts`. Do not use external byte-buffer libraries.
- **PII:** Never log private keys or sensitive user data.

## 🏗️ Build Outputs

- `lib/src/`: Transpiled ESM files for Node.js.
- `dist/pollen.js`: IIFE bundle for legacy browser usage.
- `dist/pollen.mjs`: ESM bundle for modern browser/bundler usage.
- `dist/pollen.d.ts`: Consolidated type declarations.

## 📜 Coding Style

- Standard TypeScript with strict-ish checks.
- No semicolons (`semi: never`).
- Single quotes (`quotes: single`).
- Prefer native `Uint8Array` over Node `Buffer` where possible for cross-platform compatibility.
