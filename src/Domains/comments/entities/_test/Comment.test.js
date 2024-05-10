const Comment = require('../Comment');

describe('a Comment entities', () => {
  it('should create new Comment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      content: 'comment content',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
      deletedDate: null,
    };
    // Action
    const {
      id, threadId, content, owner, date, deletedDate, username,
    } = new Comment(payload);
    // Assert
    expect(id).toEqual(payload.id);
    expect(threadId).toEqual(payload.threadId);
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
    expect(date).toEqual(payload.date);
    expect(deletedDate).toEqual(payload.deletedDate);
    expect(username).toEqual(payload.username);
  });
});
