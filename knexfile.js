// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "postgres",
      host: "localhost",
      user: "postgres",
      password: "mysecretpassword",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
  },

  herokuTest: {
    client: 'pg',
    connection: 
      process.env.DATABASE_URL
    ,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    }
  },

  testing:{
    client: 'pg',
    connection: {
      database: 'postgres',
      host: 'localhost',
      user:     'postgres',
      password: 'geoseek-admin'
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
  },

  testing: {
    client: "pg",
    connection: {
      database: "postgres",
      host: "localhost",
      user: "postgres",
      password: "geoseek-admin",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "pg",
    connection: {
      database: "d33m38q4mjfc6o",
      host: "ec2-54-80-184-43.compute-1.amazonaws.com",
      user: "dxwubnggbaufkf",
      password:
        "7770b6ce3c6de9f83d6e96e8743fc4dd8029c24f73554f92e36fae0ebe04e7d0",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "dbmigrations",
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
