import "dotenv/config";

export const env = {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || "development",
    db: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "databasepass",
        database: process.env.DB_NAME || "multi-tenant",
        dialect: process.env.DB_DIALECT || "postgres",
    },
}