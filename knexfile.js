// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'postgres',
      user:     'postgres',
      password: 'geoseek-admin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
    seeds:{
      //location of seed data for the DB
      directory: './data/seeds'
    },
    
  },
  testing:{
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      // location and name of DB
      filename: './data/geoseek.db3'
    },
    migrations: {
      // location of migrations for the DB
      directory: './data/migrations'
    },
    seeds:{
      //location of seed data for the DB
      directory: './data/seeds'
    },
    pool:{
      afterCreate: (conn, done)=>{
        conn.run('PRAGMA foreign_keys = ON',done)
      }

    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
