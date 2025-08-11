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

console.log("REDIS_URL:", process.env.REDIS_URL)

module.exports = defineConfig({
  // Worker mode configuration
  workerMode: process.env.MEDUSA_WORKER_MODE || "shared",
  
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL, // Correct camelCase
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },

  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
  },

  modules: [
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
    // Uncomment and configure other modules as needed
  ],
})

