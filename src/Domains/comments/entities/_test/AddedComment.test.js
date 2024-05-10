const AddedComment = require('../AddedComment');

describe('a AddedComment entities', () => {
  it('should create AddedComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-121',
      content: 'comment body',
      owner: 'user-123',
    };

    // Action
    const {
      id, content, owner,
    } = new AddedComment(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
  });

  it('should throw error when payload id did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'comment body',
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload id did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      content: 'comment body',
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload content did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload content did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 123,
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload owner did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'comment body',
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload owner did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'comment body',
      owner: 123,
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
