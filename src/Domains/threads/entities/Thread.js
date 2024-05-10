class Thread {
  constructor(data) {
    const {
      id, title, body, owner, date, username,
    } = data;

    if (!id || !title || !body || !owner || !date || !username) {
      throw new Error('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof title !== 'string' || typeof body !== 'string' || typeof owner !== 'string' || typeof date !== 'string' || typeof username !== 'string') {
      throw new Error('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.id = id;
    this.title = title;
    this.body = body;
    this.owner = owner;
    this.date = date;
    this.username = username;
  }
}

module.exports = Thread;
