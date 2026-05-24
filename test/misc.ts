import { describe, it, expect } from "vitest";
import { utils } from "../src/index.js";

describe("misc", function () {
  describe("iteratorStream", function () {
    async function* counter(to: number) {
      for (var i = 0; i < to; i++) {
        yield { i };
      }
    }

    async function* errorCounter(to: number, errorAt: number) {
      for (var i = 0; i < to; i++) {
        yield { i };
        if (errorAt === i) {
          throw new Error("Oh noes");
        }
      }
    }

    it("should handle backpressure", async function () {
      const stream = utils.iteratorStream(counter(100));
      const reader = stream.getReader();
      
      // Simulate slow consumer
      await new Promise(r => setTimeout(r, 50));
      
      let lastValue = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        lastValue = value.i;
      }
      
      expect(lastValue).toBe(99);
    });

    it("should handle errors", async function () {
      const stream = utils.iteratorStream(errorCounter(10, 2));
      const reader = stream.getReader();
      
      let lastValue = 0;
      let sawError = false;
      
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          lastValue = value.i;
        }
      } catch (error: any) {
        expect(error.message).toBe("Oh noes");
        expect(lastValue).toBe(2);
        sawError = true;
      }
      
      expect(sawError).toBe(true);
    });
  });
});
