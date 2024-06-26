const CommentRepository = require('../../Domains/comments/CommentRepository');
const Comment = require('../../Domains/comments/entities/Comment');
const AddedComment = require('../../Domains/comments/entities/AddedComment');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(addComment) {
    const {
      threadId, content, owner, date,
    } = addComment;
    const id = `threadComment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threadcomments (id, "threadId", content, owner, date) VALUES($1, $2, $3, $4, $5) RETURNING id, content, owner',
      values: [id, threadId, content, owner, date],
    };

    const result = await this._pool.query(query);

    return new AddedComment({ ...result.rows[0] });
  }

  async getCommentByThreadId(threadId) {
    const query = {
      text: 'SELECT threadcomments.*, users.username FROM threadcomments JOIN users on users.id = threadcomments.owner WHERE threadcomments."threadId" = $1 ORDER BY threadcomments.date ASC',
      values: [threadId],
    };

    const result = await this._pool.query(query);
    return result.rows.map((comment) => new Comment({ ...comment }));
  }

  async getCommentById(commentId) {
    const query = {
      text: 'SELECT threadcomments.*, users.username FROM threadcomments JOIN users on users.id = threadcomments.owner WHERE threadcomments.id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      return null;
    }

    return new Comment({ ...result.rows[0] });
  }

  async verifyCommentAvailability(commentId) {
    const query = {
      text: 'SELECT id FROM threadcomments WHERE id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new Error('COMMENT_REPOSITORY.COMMENT_NOT_FOUND');
    }
  }

  async verifyCommentOwnership(commentId, owner) {
    const query = {
      text: 'SELECT id FROM threadcomments WHERE id = $1 AND owner = $2',
      values: [commentId, owner],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new Error('COMMENT_REPOSITORY.NOT_THE_COMMENT_OWNER');
    }
  }

  async deleteCommentById(commentId, date) {
    const query = {
      text: 'UPDATE threadcomments SET "deletedDate" = $2 WHERE id = $1',
      values: [commentId, date],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new Error('COMMENT_REPOSITORY.FAILED_TO_DELETE_COMMENT');
    }
  }
}

module.exports = CommentRepositoryPostgres;
