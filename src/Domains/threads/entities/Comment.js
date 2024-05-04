class Comment {
  constructor(payload) {
    const {
      id, threadId, comment, owner, date,
    } = payload;

    this.id = id;
    this.threadId = threadId;
    this.comment = comment;
    this.owner = owner;
    this.date = date;
  }
}

module.exports = Comment;
