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
      username: 'dicoding',
    };
    // Action
    const {
      id, title, body, owner, date, username,
    } = new Thread(payload);
    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
  });

  it('should throw error when payload id did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'abc',
      body: 'thread body',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
    };
    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload id did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      title: 'abc',
      body: 'thread body',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
    };
    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload title did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      body: 'thread body',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
    };
    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload title did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 123,
      body: 'thread body',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
    };
    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload body did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'abc',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
    };
    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload body did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'abc',
      body: 123,
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 'dicoding',
    };
    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload owner did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'abc',
      body: 'thread body',
      date: new Date().toISOString(),
      username: 'dicoding',
    };
    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload owner did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'abc',
      body: 'thread body',
      owner: 123,
      date: new Date().toISOString(),
      username: 'dicoding',
    };
    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload date did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'abc',
      body: 'thread body',
      owner: 'user-123',
      username: 'dicoding',
    };
    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload date did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'abc',
      body: 'thread body',
      owner: 'user-123',
      date: 123,
      username: 'dicoding',
    };
    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when payload username did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'abc',
      body: 'thread body',
      owner: 'user-123',
      date: new Date().toISOString(),
    };
    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload username did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'abc',
      body: 'thread body',
      owner: 'user-123',
      date: new Date().toISOString(),
      username: 123,
    };
    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
