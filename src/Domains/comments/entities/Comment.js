class Comment {
  constructor(payload) {
    const {
      id, threadId, content, owner, date, deletedDate, username,
    } = payload;

    if (!id || !threadId || !content || !owner || !date || !username) {
      throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof threadId !== 'string' || typeof content !== 'string' || typeof owner !== 'string' || typeof date !== 'string' || typeof username !== 'string' || (deletedDate && typeof deletedDate !== 'string')) {
      throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.id = id;
    this.threadId = threadId;
    this.content = content;
    this.owner = owner;
    this.date = date;
    this.deletedDate = deletedDate;
    this.username = username;
  }
}

module.exports = Comment;
