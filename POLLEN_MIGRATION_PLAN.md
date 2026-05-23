# Project Pollen: Migration & Modernization Plan

This document outlines the strategic roadmap for **`@srbde/pollen`**. 

## ✅ Phase 1: Rebranding & Identity (COMPLETED)
- [x] **Package Renaming:** Updated `package.json` to `@srbde/pollen`.
- [x] **Global Search & Replace:** Migrated `dhive` -> `pollen` in all source and tests.
- [x] **README Modernization:** New ecosystem-aligned documentation.
- [x] **Identity:** Sustainable Resource and Business Development Enterprise (SRBDE) established as author.

## ✅ Phase 2: Package Management & Tooling (COMPLETED)
- [x] **pnpm Migration:** Switched from yarn/npm to pnpm for speed and stability.
- [x] **Rust-based Tooling:** Replaced ESLint with **oxlint** and **oxfmt** for instant linting.
- [x] **Vitest Integration:** Replaced Mocha/nyc with **Vitest** for native TS support and instant test startup.

## ✅ Phase 3: Build System Modernization (COMPLETED)
- [x] **Makefile Removal:** Deleted the legacy 2017 Makefile.
- [x] **pnpm Scripts:** Implemented a full suite of cross-platform build scripts in `package.json`.
- [x] **esbuild:** Integrated for high-performance browser bundling.

## 🛠️ Phase 4: Architectural Refactoring (NEXT STEPS)

**Goal:** Transform the internal "mudball" into a high-performance, strictly-typed modern engine.

### 1. Pure ESM Migration (High Priority)
- Currently, the project is a hybrid/CommonJS setup. Moving to **Pure ESM** will:
  - Improve compatibility with modern frameworks (Vite, Next.js, Nuxt).
  - Enable better tree-shaking for smaller client-side bundles.
  - Simplify the `tsconfig.json` and build pipeline.

### 2. Legacy Pruning & Cleanup
- Systematically remove internal functions and fallbacks designed for pre-Hive (Steem) compatibility.
- Target: 20-30% reduction in code volume and bundle size.

### 3. Network Resilience (Backoff & Retry)
- Replace the current custom failover logic with a standard **Exponential Backoff** strategy.
- Improve RPC error handling to distinguish between network timeouts and blockchain-level errors.

### 4. Native Streams & Uint8Arrays
- Replace the legacy `@ecency/bytebuffer` dependency with native Web/Node standard `Uint8Array` operations.
- Migrate from legacy event-emitters to modern async iterators where applicable.

---
*Document updated on Friday, May 22, 2026. Phase 4 is ready for initiation.*
