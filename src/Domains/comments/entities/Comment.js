class Comment {
  constructor(payload) {
    const {
      id, threadId, content, owner, date, deletedDate, username,
    } = payload;

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
