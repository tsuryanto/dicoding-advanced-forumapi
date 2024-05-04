const AddThreadCommentUseCase = require('../AddThreadCommentUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddComment = require('../../../Domains/threads/entities/AddComment');

describe('AddThreadCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      comment: 'dicoding',
      owner: 'user-123',
      threadId: 'thread-123',
    };

    // mock
    const mockThreadRepository = new ThreadRepository();
    const date = '2021-08-08T07:22:13.017Z';
    const getComment = new AddComment({
      comment: useCasePayload.comment,
      owner: useCasePayload.owner,
      threadId: useCasePayload.threadId,
      date,
    });
    mockThreadRepository.addComment = jest.fn(() => Promise.resolve(getComment));
    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve(true));

    const dateNowSpy = jest.spyOn(Date.prototype, 'toISOString');
    dateNowSpy.mockImplementationOnce(() => date);

    // Action
    const addThreadCommentUseCase = new AddThreadCommentUseCase({
      threadRepository: mockThreadRepository,
    });
    const comment = await addThreadCommentUseCase.execute(useCasePayload);

    // reset mock
    dateNowSpy.mockRestore();

    // Assert
    expect();
    expect(comment).toStrictEqual(getComment);
  });

  it('should throw error if payload not contain needed property', async () => {
    // Arrange
    const useCasePayload = {
      owner: 'user-123',
    };
    const addThreadCommentUseCase = new AddThreadCommentUseCase({});

    // Action & Assert
    await expect(addThreadCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('ADD_COMMENT_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if payload not meet data type specification', async () => {
    // Arrange
    const useCasePayload = {
      comment: 123,
      owner: 'user-123',
      threadId: 'thread-123',
    };
    const addThreadCommentUseCase = new AddThreadCommentUseCase({});

    // Action & Assert
    await expect(addThreadCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('ADD_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error if thread not found', async () => {
    // mock
    const date = '2021-08-08T07:22:13.017Z';

    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve(false));
    mockThreadRepository.addComment = jest.fn(() => Promise.resolve());

    const dateNowSpy = jest.spyOn(Date.prototype, 'toISOString');
    dateNowSpy.mockImplementationOnce(() => date);

    // Arrange
    const useCasePayload = {
      comment: 'dicoding',
      owner: 'user-123',
      threadId: 'thread-123',
    };
    const addThreadCommentUseCase = new AddThreadCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // reset mock
    dateNowSpy.mockRestore();

    // Action & Assert
    await expect(addThreadCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND');
  });
});
