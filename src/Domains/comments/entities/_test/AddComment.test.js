const AddComment = require('../AddComment');

describe('AddComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      comment: 'dicoding thread comment',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      comment: 123,
      owner: true,
      date: '2021-08-08T07:59:00.000Z',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create comment object correctly', () => {
    const payload = {
      threadId: 'thread-123',
      comment: 'dicoding thread comment',
      owner: 'userId-7187212',
      date: '2021-08-08T07:59:00.000Z',
    };

    // Action
    const {
      threadId, comment, owner, date,
    } = new AddComment(payload);

    // Assert
    expect(threadId).toEqual(payload.threadId);
    expect(comment).toEqual(payload.comment);
    expect(owner).toEqual(payload.owner);
    expect(date).toEqual(payload.date);
  });
});