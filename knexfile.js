// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.HOST,
      database: process.env.DATABASE,
      user: process.env.USER,
       password: process.env.PASSWORD
       
    },
    pool: {
      min: 3,
      max: 100,
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  testing: {
    client: "pg",
    connection: { 
      host: process.env.HOST,
      database: process.env.DATABASE,
      user: process.env.USER,
       password: process.env.PASSWORD
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      }, 
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  staging: {
    client: "pg",
    connection: {
      connection: process.env.DATABASE_URL,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./data/seeds",
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
