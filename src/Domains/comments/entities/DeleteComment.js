class DeleteComment {
  constructor(payload) {
    const { id, threadId, owner } = payload;

    if (!id || !threadId || !owner) {
      throw new Error('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof threadId !== 'string' || typeof owner !== 'string') {
      throw new Error('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.id = id;
    this.threadId = threadId;
    this.owner = owner;
  }
}

module.exports = DeleteComment;
