export default () => ({
  env: process.env.NODE_ENV ?? 'development',
  PORT: parseInt(process.env.PORT ?? '3001', 10),
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    name: process.env.DB_NAME ?? 'radiation_safety',
    synchronize: (process.env.TYPEORM_SYNC ?? 'true') === 'true',
    ssl: (process.env.DB_SSL ?? 'false') === 'true'
  }
})

