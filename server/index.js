const { client, createTables, createUser, fetchUsers } = require('./db');

const init = async () => {
  console.log('connecting to db');
  await client.connect();
  console.log('connected to db');
  await createTables();
  console.log('tables created');
  const [moe, lucy, larry] = await Promise.all([
    createUser({ username: 'moe', password: '123' }),
    createUser({ username: 'lucy', password: '1234' }),
    createUser({ username: 'larry', password: '12345' }),
  ]);
  console.log(await fetchUsers());
};

init();
