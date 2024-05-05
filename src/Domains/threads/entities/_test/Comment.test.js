const Comment = require('../Comment');

describe('a Comment entities', () => {
  it('should create new Comment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      comment: 'comment content',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
    };
    // Action
    const {
      id, threadId, comment, owner, date, username,
    } = new Comment(payload);
    // Assert
    expect(id).toEqual(payload.id);
    expect(threadId).toEqual(payload.threadId);
    expect(comment).toEqual(payload.comment);
    expect(owner).toEqual(payload.owner);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
  });
});
