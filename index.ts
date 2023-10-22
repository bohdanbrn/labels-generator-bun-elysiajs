const server = Bun.serve({
    port: process.env.PORT || 3000,
    fetch(req) {
        return new Response("Bun!");
    },
});

console.log(`Listening on http://localhost:${server.port} ...`);
