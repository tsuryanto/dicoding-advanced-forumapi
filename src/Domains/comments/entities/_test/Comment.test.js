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

  it('should create new Comment object correctly when deletedDate is not null', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      content: 'comment content',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
      deletedDate: new Date().toISOString(),
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

  it('should throw error when payload id did not contain needed property', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      content: 'comment content',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
      deletedDate: null,
    };
    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload id did not meet data type specification', () => {
    // Arrange
    const payload = {
      threadId: 123,
      content: 'comment content',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
      deletedDate: null,
    };

    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload threadId did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'comment content',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
      deletedDate: null,
    };
    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload threadId did not meet type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 123,
      content: 'comment content',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
      deletedDate: null,
    };
    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload content did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
      deletedDate: null,
    };
    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload content not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      content: 123,
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
      deletedDate: null,
    };

    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload owner did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      content: 'comment content',
      date: new Date().toISOString(),
      username: 'dicoding',
      deletedDate: null,
    };
    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload owner not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      content: 'comment content',
      owner: 123,
      date: new Date().toISOString(),
      username: 'dicoding',
      deletedDate: null,
    };

    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload date did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      content: 'comment content',
      owner: 'user-123',
      username: 'dicoding',
      deletedDate: null,
    };
    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload date not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      content: 'comment content',
      owner: 'user-123',
      date: 123,
      username: 'dicoding',
      deletedDate: null,
    };
    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when deletedDate not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      content: 'comment content',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
      deletedDate: 123,
    };

    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
