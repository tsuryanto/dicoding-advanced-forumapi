/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  async addComment({
    id = 'comment-123', content = 'dicoding content', owner = 'user-123', threadId = 'thread-123', date = new Date().toISOString(),
  }) {
    const query = {
      text: 'INSERT INTO threadcomments (id, "threadId", content, owner, date) VALUES($1, $2, $3, $4, $5) RETURNING id, content, owner, "threadId", date',
      values: [id, threadId, content, owner, date],
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
    await pool.query('DELETE FROM threadcomments WHERE 1=1');
  },
};

module.exports = CommentsTableTestHelper;
