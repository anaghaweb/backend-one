const express = require("express")
const cors = require('cors');
const { GracefulShutdownServer } = require("medusa-core-utils")
import { applyCors } from "./src/middleware/cors";
const loaders = require("@medusajs/medusa/dist/loaders/index").default


;(async() => {
  async function start() {
    const app = express();
    const directory = process.cwd() ;
    
    const storeCorsOptions = {
      origin: 'http://192.168.0.102:3000', // Replace with your store domain
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    };

    // CORS options for admin routes
    const adminCorsOptions = {
      origin: 'https://admin-one-inky.vercel.app/', // Replace with your admin domain
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    };

    // Apply CORS middleware for store routes
    app.use('/store', cors(storeCorsOptions));

    // Apply CORS middleware for admin routes
    app.use('/admin', cors(adminCorsOptions));

    app.options("*",cors());

    try {
      const { container } = await loaders({
        directory,
        expressApp: app
      })
      const configModule = container.resolve("configModule")
      const port = process.env.PORT ?? configModule.projectConfig.port ?? 9000

      const server = GracefulShutdownServer.create(
        app.listen(port, (err) => {
          if (err) {
            return
          }
          console.log(`Server is ready on port: ${port}`)
        })
      )
      // Handle graceful shutdown
      const gracefulShutDown = () => {
        server
          .shutdown()
          .then(() => {
            console.info("Gracefully stopping the server.")
            process.exit(0)
          })
          .catch((e) => {
            console.error("Error received when shutting down the server.", e)
            process.exit(1)
          })
      }
      process.on("SIGTERM", gracefulShutDown)
      process.on("SIGINT", gracefulShutDown)
    } catch (err) {
      console.error("Error starting server", err)
      process.exit(1)
    }
  }

  await start()
})()
