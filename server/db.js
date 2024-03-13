const pg = require('pg');
const uuid = require('uuid');

const client = new pg.Client(
  process.env.DATABASE_URL || 'postgres://localhost/acme_talent_db'
);

//create Tables
const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS user_skills;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS skills;
    CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL
    );
    CREATE TABLE skills(
        id UUID PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
    );
    CREATE TABLE user_skills(
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id) NOT NULL,
        skill_id UUID REFERENCES skills(id) NOT NULL
    );
    `;
  await client.query(SQL);
};
//Create User
const createUser = async ({ username, password }) => {
  const SQL = `
        INSERT into users(id, username, password)
        VALUES($1, $2, $3)
        RETURNING *
    `;
  const response = await client.query(SQL, [uuid.v4(), username, password]);
  return response.rows[0];
};

//fetch users
const fetchUsers = async () => {
  const SQL = `
          SELECT *
          FROM users
      `;
  const response = await client.query(SQL);
  return response.rows;
};

module.exports = {
  client,
  createTables,
  createUser,
  fetchUsers,
};
