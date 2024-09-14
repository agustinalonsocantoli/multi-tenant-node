import "dotenv/config";

export const env = {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || "development",
    db: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "multitenant",
        dialect: process.env.DB_DIALECT || "postgres",
    },
    jwtSecret: process.env.JWT_SECRET || "98u2384hjbas32bjk4k3u990u32bn"
}