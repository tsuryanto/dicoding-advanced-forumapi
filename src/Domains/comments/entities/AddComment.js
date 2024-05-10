class AddComment {
  constructor(payload) {
    const {
      threadId, content, owner, date,
    } = payload;

    if (!threadId || !content || !owner || !date) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof threadId !== 'string' || typeof content !== 'string' || typeof owner !== 'string' || typeof date !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.threadId = threadId;
    this.content = content;
    this.owner = owner;
    this.date = date;
  }
}

module.exports = AddComment;
