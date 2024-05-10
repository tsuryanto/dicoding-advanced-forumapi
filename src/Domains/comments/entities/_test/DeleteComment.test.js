const DeleteComment = require('../DeleteComment');

describe('a DeleteComment entities', () => {
  it('should throw error if payload id not contain needed property', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
      owner: 'user-123',
    };

    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if payload id not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      threadId: 'thread-123',
      owner: 'user-123',
    };

    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error if payload threadId not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      owner: 'user-123',
    };

    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if payload threadId not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 123,
      owner: 'user-123',
    };

    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error if payload owner not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
    };

    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if payload owner not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 123,
    };

    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should createDeleteComment correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    // Action
    const deleteComment = new DeleteComment(payload);

    // Assert
    expect(deleteComment.id).toEqual(payload.id);
    expect(deleteComment.threadId).toEqual(payload.threadId);
    expect(deleteComment.owner).toEqual(payload.owner);
  });
});
