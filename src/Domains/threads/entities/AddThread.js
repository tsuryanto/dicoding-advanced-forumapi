class AddThread {
  constructor(payload) {
    const {
      title, body, owner, date,
    } = payload;

    if (!title || !body || !date) {
      throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY_A');
    }

    if (typeof title !== 'string' || typeof body !== 'string' || typeof owner !== 'string' || typeof date !== 'string') {
      throw new Error('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.title = title;
    this.body = body;
    this.owner = owner;
    this.date = date;
  }
}

module.exports = AddThread;
