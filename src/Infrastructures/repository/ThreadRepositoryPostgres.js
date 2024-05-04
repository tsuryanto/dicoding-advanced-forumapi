const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const Comment = require('../../Domains/threads/entities/Comment');
const Thread = require('../../Domains/threads/entities/Thread');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(addThread) {
    const {
      title, body, owner, date,
    } = addThread;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, body, owner, date',
      values: [id, title, body, owner, date],
    };

    const result = await this._pool.query(query);

    return new Thread({ ...result.rows[0] });
  }

  async getThreadById(threadId) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      return null;
    }

    return new Thread({ ...result.rows[0] });
  }

  async addComment(addComment) {
    const {
      threadId, comment, owner, date,
    } = addComment;
    const id = `threadComment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threadcomments VALUES($1, $2, $3, $4, $5) RETURNING id, "threadId", comment, owner, date',
      values: [id, threadId, comment, owner, date],
    };

    const result = await this._pool.query(query);

    return new Comment({ ...result.rows[0] });
  }
}

module.exports = ThreadRepositoryPostgres;
