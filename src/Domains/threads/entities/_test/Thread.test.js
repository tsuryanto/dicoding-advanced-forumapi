const Thread = require('../Thread');

describe('a Thread entities', () => {
  it('should create new Thread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-121',
      title: 'abc',
      body: 'thread body',
      owner: 'user-123',
      date: new Date().toISOString(),
    };
    // Action
    const {
      id, title, body, owner, date,
    } = new Thread(payload);
    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
    expect(date).toEqual(payload.date);
  });
});
