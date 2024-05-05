/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-123', title = 'dicoding thread title', body = 'dicoding thread body', owner = 'user-123', date = new Date().toISOString(),
  }) {
    const query = {
      text: 'INSERT INTO threads (id, title, body, owner, date) VALUES($1, $2, $3, $4, $5) RETURNING id, title, body, owner, date',
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

  async addComment({
    id = 'comment-123', comment = 'dicoding comment', owner = 'user-123', threadId = 'thread-123', date = new Date().toISOString(),
  }) {
    const query = {
      text: 'INSERT INTO threadcomments (id, "threadId", comment, owner, date) VALUES($1, $2, $3, $4, $5) RETURNING id, comment, owner, "threadId", date',
      values: [id, threadId, comment, owner, date],
    };

    await pool.query(query);
  },

  async findCommentsById(id) {
    const query = {
      text: 'SELECT * FROM threadcomments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async deleteCommentById(id, date = new Date().toISOString()) {
    const query = {
      text: 'UPDATE threadcomments SET "deletedDate" = $2 WHERE id = $1',
      values: [id, date],
    };

    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
    await pool.query('DELETE FROM threadcomments WHERE 1=1');
  },
};

module.exports = ThreadsTableTestHelper;
