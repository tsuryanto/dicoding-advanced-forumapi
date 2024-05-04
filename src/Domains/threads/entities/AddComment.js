class AddComment {
  constructor(payload) {
    const {
      threadId, comment, owner, date,
    } = payload;

    if (!threadId || !comment || !owner || !date) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof threadId !== 'string' || typeof comment !== 'string' || typeof owner !== 'string' || typeof date !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.threadId = threadId;
    this.comment = comment;
    this.owner = owner;
    this.date = date;
  }
}

module.exports = AddComment;
