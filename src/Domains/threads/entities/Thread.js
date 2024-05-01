class Thread {
  constructor(data) {
    const {
      id, title, body, owner, date,
    } = data;

    this.id = id;
    this.title = title;
    this.body = body;
    this.owner = owner;
    this.date = date;
  }
}

module.exports = Thread;
