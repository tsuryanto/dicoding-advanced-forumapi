class Comment {
  constructor(payload) {
    const {
      id, threadId, comment, owner, date, deletedDate, username,
    } = payload;

    this.id = id;
    this.threadId = threadId;
    this.comment = comment;
    this.owner = owner;
    this.date = date;
    this.deletedDate = deletedDate;
    this.username = username;
  }
}

module.exports = Comment;
