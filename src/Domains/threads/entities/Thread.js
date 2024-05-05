class Thread {
  constructor(data) {
    const {
      id, title, body, owner, date, username,
    } = data;

    this.id = id;
    this.title = title;
    this.body = body;
    this.owner = owner;
    this.date = date;
    this.username = username;
  }
}

module.exports = Thread;
