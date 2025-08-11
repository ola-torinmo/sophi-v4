// const { loadEnv, defineConfig } = require('@medusajs/framework/utils')

// loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// module.exports = defineConfig({
//   projectConfig: {
//     databaseUrl: process.env.DATABASE_URL,
//     http: {
//       storeCors: process.env.STORE_CORS,
//       adminCors: process.env.ADMIN_CORS,
//       authCors: process.env.AUTH_CORS,
//       jwtSecret: process.env.JWT_SECRET || "supersecret",
//       cookieSecret: process.env.COOKIE_SECRET || "supersecret",
//       redis_url: process.env.REDIS_URL
//     }
//   }
// })

// const { loadEnv, defineConfig } = require('@medusajs/framework/utils')

// // Load environment variables
// loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// // Detect if we're on Railway or Local
// const isRailway = process.env.MODE === 'railway'

// // Dynamically assign URLs based on mode
// const databaseUrl = isRailway
//   ? process.env.RAILWAY_DATABASE_URL
//   : process.env.LOCAL_DATABASE_URL

// const redisUrl = isRailway
//   ? process.env.RAILWAY_REDIS_URL
//   : process.env.LOCAL_REDIS_URL

// module.exports = defineConfig({
//   projectConfig: {
//     databaseUrl,
//     http: {
//       storeCors: process.env.STORE_CORS,
//       adminCors: process.env.ADMIN_CORS,
//       authCors: process.env.AUTH_CORS,
//       jwtSecret: process.env.JWT_SECRET || "supersecret",
//       cookieSecret: process.env.COOKIE_SECRET || "supersecret",
//       redis_url: redisUrl
//     }
//   }
// })

const { loadEnv, defineConfig } = require('@medusajs/framework/utils')

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  // Worker mode configuration
  workerMode: process.env.MEDUSA_WORKER_MODE || "shared",
  
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL, // Fixed: was redis_url, should be redisUrl
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },

  // Admin configuration
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    // backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
  },

  // Production modules for Railway deployment
  modules: [
    // Redis Cache Module (replaces in-memory cache)
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    // Redis Event Bus Module (for reliable event handling)
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    // Redis Workflow Engine Module (for background jobs)
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
    // Add S3 File Module for production file storage (uncomment and configure when ready)
    // {
    //   resolve: "@medusajs/medusa/file-s3",
    //   options: {
    //     file_url: process.env.S3_FILE_URL,
    //     access_key_id: process.env.S3_ACCESS_KEY_ID,
    //     secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
    //     region: process.env.S3_REGION,
    //     bucket: process.env.S3_BUCKET,
    //   },
    // },
    // Add SendGrid Notification Module (uncomment and configure when ready)
    // {
    //   resolve: "@medusajs/medusa/notification-sendgrid",
    //   options: {
    //     api_key: process.env.SENDGRID_API_KEY,
    //     from: process.env.SENDGRID_FROM,
    //   },
    // },
  ]
})
