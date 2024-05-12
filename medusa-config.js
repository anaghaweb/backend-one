const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  ADMIN_CORS || "https://stock-admin-chi.vercel.app/";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = STORE_CORS || "http://192.168.0.103:3000";

const DATABASE_URL =
  DATABASE_URL || "postgres://postgres.oexbuheeoqkcnyxyahkh:supaBase.123@@aws-0-ap-south-1.pooler.supabase.com:5432/postgres";

const REDIS_URL = REDIS_URL || "redis://red-cnirq6821fec73ctpdr0:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  // {
  //   resolve: `@medusajs/file-local`,
  //   options: {
  //     upload_dir: "uploads",
  //   },
  // },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      serve: false,
      backend: "https://backend-stock-pjg4.onrender.com",
      path: "/app",
      outDir: "build",
      develop: {
        open: OPEN_BROWSER !== "false",
        open: false,
        port: 7001,
        logLevel: "error",
        stats: "normal",
        allowedHosts: "auto",
        webSocketURL: undefined,
        
      },
    },
  }, 
  // {
  //   resolve: `medusa-payment-stripe`,
  //   options: {
  //     api_key: STRIPE_API_KEY,
  //     webhook_secret: STRIPE_WEBHOOK_SECRET,
  //   },
  // },   
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: JWT_SECRET,
  cookieSecret: COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
 
  database_extra: NODE_ENV !== "development" ?
      {
        ssl: {
          rejectUnauthorized: false,
        },
      } : {},
  // Uncomment the following lines to enable REDIS
   redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  featureFlags: {
    tax_inclusive_pricing: true,
    product_categories:true,
    order_editing:true,
    sales_channels:true,
    publishable_api_keys:true,
  },
  projectConfig,
  plugins,
  modules,
};
