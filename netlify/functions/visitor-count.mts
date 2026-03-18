import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const store = getStore("visitor-counter");

  if (req.method === "POST") {
    const currentBlob = await store.get("count", { type: "text" });
    const currentCount = currentBlob ? parseInt(currentBlob, 10) : 0;
    const newCount = currentCount + 1;
    await store.set("count", newCount.toString());

    return new Response(JSON.stringify({ count: newCount }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // GET - return current count
  const currentBlob = await store.get("count", { type: "text" });
  const count = currentBlob ? parseInt(currentBlob, 10) : 0;

  return new Response(JSON.stringify({ count }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/api/visitor-count",
};
