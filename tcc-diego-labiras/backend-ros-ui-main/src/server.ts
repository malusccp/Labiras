import app from "./app";

async function start() {
  try {
    await app.listen({ port: 3000 });
    console.log("Server running at http://localhost:3000/");
  } catch (err) {
    console.error(err);
    console.error("Error starting server");
    app.log.error(err);
    process.exit(1);
  }
}

start();
