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

//CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS;

  const AUTH_CORS = process.env.AUTH_CORS;

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS;

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://postgres.oexbuheeoqkcnyxyahkh:supaBase.123@@aws-0-ap-south-1.pooler.supabase.com:5432/postgres";

const REDIS_URL = process.env.REDIS_URL || "redis://red-cnirq6821fec73ctpdr0:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      serve: false,
      backend: process.env.MEDUSA_ADMIN_BACKEND_URL,
      path: "/app",
      outDir: "build",
      develop: {
        open: process.env.OPEN_BROWSER !== "false",    
        port: 7001,
        logLevel: "error",
        stats: "normal",
        allowedHosts: "auto",
        webSocketURL: undefined,
        
      },
    },
  },
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY ,
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET ,
      
    },
  },
  {
    resolve:`medusa-payment-paypal`,
    options: {
      sandbox: process.env.PAYPAL_SANDBOX,
      clientId: process.env.PAYPAL_CLIENT_ID,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET,
      authWebhookId: process.env.PAYPAL_AUTH_WEBHOOK_ID,
    },
  },
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
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  auth_cors: AUTH_CORS,
  // Uncomment the following lines to enable REDIS
  redis_url: REDIS_URL,
  worker_mode: "shared",
  database_extra: process.env.NODE_ENV !== "development" ?
      {
        ssl: {
          rejectUnauthorized: false,
        },
      } : {},
  
   http_compression: {
    enabled: true,
    level: 6,
    memLevel: 8,
    threshold: 1024,
  },
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
