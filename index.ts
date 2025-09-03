// Use Bun for running
import { serve } from "bun";
import content from "./content.json";
import data from "./data.json";

const server = serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    // / root route
    if (url.pathname === "/") {
      return new Response(
        JSON.stringify({ message: "Machine Learning Newsletter" }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // /data route
    if (url.pathname === "/data") {
      return new Response(JSON.stringify(data, null, 2), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // /content/:id route
    if (url.pathname.startsWith("/content/")) {
      const id = url.pathname.split("/")[2];
      const item = (content as any[]).find((c) => c.id === id);

      if (item) {
        return new Response(JSON.stringify(item, null, 2), {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(
          JSON.stringify({ message: "Content will be coming soon" }),
          { headers: { "Content-Type": "application/json" }, status: 404 }
        );
      }
    }

    // /health route
    if (url.pathname === "/health") {
      return new Response(
        JSON.stringify({ status: "ok", time: new Date().toISOString() }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // Default response for unknown routes
    return new Response("Route not found", { status: 404 });
  },
});

console.log("🚀 Server running at http://localhost:3000");

// Periodic GET request to external /health every 14 minutes
setInterval(async () => {
  try {
    const res = await fetch("https://api.gdgrbu.tech/health");
    const data = await res.json();
    console.log("[Health Check]", data);
  } catch (err) {
    console.error("[Health Check Error]", err);
  }
}, 14 * 60 * 1000); // 14 minutes
