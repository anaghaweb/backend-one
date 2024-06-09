const { DataSource } = require("typeorm")

export const AppDataSource = new DataSource({
  type: "postgres",
 database_url:"postgres://postgres.asknjfipsxtzlwaqyfwa:supaBase.123@@aws-0-us-west-1.pooler.supabase.com:5432/postgres",
  entities: [
    "dist/models/*.js",
  ],
  migrations: [
    "dist/migrations/*.js",
  ],
})

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err:any) => {
    console.error('Error during Data Source initialization', err);
  });


