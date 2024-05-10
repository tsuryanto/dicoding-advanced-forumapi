class AddThread {
  constructor(payload) {
    const {
      id, title, body, owner, date,
    } = payload;

    if (!id || !title || !body || !owner || !date) {
      throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof title !== 'string' || typeof body !== 'string' || typeof owner !== 'string' || typeof date !== 'string') {
      throw new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.id = id;
    this.title = title;
    this.body = body;
    this.owner = owner;
    this.date = date;
  }
}

module.exports = AddThread;
