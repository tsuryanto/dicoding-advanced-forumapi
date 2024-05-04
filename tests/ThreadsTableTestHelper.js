/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');
const userTableHelper = require('./UsersTableTestHelper');

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-123', title = 'dicoding thread title', body = 'dicoding thread body', owner = 'user-123', date = new Date().toISOString(),
  }) {
    await userTableHelper.addUser({
      id: owner,
    });

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, body, owner, date',
      values: [id, title, body, owner, date],
    };

    await pool.query(query);
  },

  async findThreadsById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async findCommentsById(id) {
    const query = {
      text: 'SELECT * FROM threadcomments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
    await pool.query('DELETE FROM threadcomments WHERE 1=1');
  },
};

module.exports = ThreadsTableTestHelper;
