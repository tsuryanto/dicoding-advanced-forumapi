class Comment {
  constructor(payload) {
    const {
      id, threadId, comment, owner, date, deletedDate,
    } = payload;

    this.id = id;
    this.threadId = threadId;
    this.comment = comment;
    this.owner = owner;
    this.date = date;
    this.deletedDate = deletedDate;
  }
}

module.exports = Comment;
