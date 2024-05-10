const AddComment = require('../AddComment');

describe('AddComment entities', () => {
  it('should throw error when payload threadId did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'dicoding thread comment',
      owner: 'userId-7187212',
      date: '2021-08-08T07:59:00.000Z',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload threadId did not meet data type specification', () => {
    // Arrange
    const payload = {
      threadId: 123,
      content: 'dicoding thread comment',
      owner: 'userId-7187212',
      date: '2021-08-08T07:59:00.000Z',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload content did not contain needed property', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      owner: 'userId-7187212',
      date: '2021-08-08T07:59:00.000Z',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload content did not meet data type specification', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      content: 123,
      owner: 'userId-7187212',
      date: '2021-08-08T07:59:00.000Z',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload owner did not contain needed property', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      content: 'dicoding thread comment',
      date: '2021-08-08T07:59:00.000Z',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload owner did not meet data type specification', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      content: 'dicoding thread comment',
      owner: 123,
      date: '2021-08-08T07:59:00.000Z',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload date did not contain needed property', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      content: 'dicoding thread comment',
      owner: 'userId-7187212',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload date did not meet data type specification', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      content: 'dicoding thread comment',
      owner: 'userId-7187212',
      date: 123,
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create comment object correctly', () => {
    const payload = {
      threadId: 'thread-123',
      content: 'dicoding thread comment',
      owner: 'userId-7187212',
      date: '2021-08-08T07:59:00.000Z',
    };

    // Action
    const {
      threadId, content, owner, date,
    } = new AddComment(payload);

    // Assert
    expect(threadId).toEqual(payload.threadId);
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
    expect(date).toEqual(payload.date);
  });
});
