# Pollen Market Explorer Example

A stunning, real-time single-page dashboard visualizer for the Hive internal market. This example demonstrates how to use the `@srbde/pollen` SDK in a browser environment to build reactive dashboards.

## Key Features Demonstrated

- **Dynamic Multi-Node Initialization:** Uses `Client.fromNectarflower()` to retrieve a list of healthy API nodes directly from the Hive blockchain and handle automatic failovers.
- **Order Book Fetching:** Uses `client.database.listLimitOrders` to retrieve the entire order book (bids/asks) including trader usernames, price spreads, and visualizes market depth dynamically.
- **Ticker Information:** Queries `client.market.getTicker` to show 24-hour volume metrics, latest price, and percentage changes.
- **Trade History:** Queries `client.market.getRecentTrades` to retrieve and format real-time market trade events.

## Getting Started

1. Ensure the parent repository is built:
   ```bash
   pnpm run build
   ```
2. Navigate to this directory:
   ```bash
   cd examples/market-view
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Run the local dev server:
   ```bash
   pnpm run dev
   ```
5. Open the local address printed by Vite (typically `http://localhost:3000`) in your browser.
