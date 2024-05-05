const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteThreadCommentUseCase = require('../DeleteThreadCommentUseCase');

describe('DeleteThreadCommentUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      owner: 'user-123',
    };

    // mock
    const mockThreadRepository = new ThreadRepository();
    const date = '2021-08-08T07:22:13.017Z';

    mockThreadRepository.verifyThreadAvailability = jest.fn(() => true);
    mockThreadRepository.verifyCommentAvailability = jest.fn(() => true);
    mockThreadRepository.verifyCommentOwnership = jest.fn(() => true);
    mockThreadRepository.deleteCommentById = jest.fn(() => true);

    const dateNowSpy = jest.spyOn(Date.prototype, 'toISOString');
    dateNowSpy.mockImplementationOnce(() => date);

    // Action
    const deleteThreadCommentUseCase = new DeleteThreadCommentUseCase({
      threadRepository: mockThreadRepository,
    });
    await deleteThreadCommentUseCase.execute(useCasePayload);

    // reset mock
    dateNowSpy.mockRestore();

    // Assert
    expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
    expect(mockThreadRepository.verifyCommentAvailability).toBeCalledWith(useCasePayload.commentId);
    expect(mockThreadRepository.verifyCommentOwnership)
      .toBeCalledWith(useCasePayload.commentId, useCasePayload.owner);
    expect(mockThreadRepository.deleteCommentById).toBeCalledWith(useCasePayload.commentId, date);
  });

  it('should throw error if thread not found', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      owner: 'user-123',
    };

    // mock
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.verifyThreadAvailability = jest.fn(() => false);

    // Action
    const deleteThreadCommentUseCase = new DeleteThreadCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Assert
    await expect(deleteThreadCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DELETE_COMMENT_USE_CASE.THREAD_NOT_FOUND');
    expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
  });

  it('should throw error if payload not contain needed property', async () => {
    // Arrange
    const useCasePayload = {
      owner: 'user-123',
    };
    const deleteThreadCommentUseCase = new DeleteThreadCommentUseCase({});

    // Action & Assert
    await expect(deleteThreadCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DELETE_COMMENT_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if payload not meet data type specification', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 123,
      owner: 'user-123',
    };
    const deleteThreadCommentUseCase = new DeleteThreadCommentUseCase({});

    // Action & Assert
    await expect(deleteThreadCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DELETE_COMMENT_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when comment not found', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      owner: 'user-123',
    };

    // mock
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.verifyThreadAvailability = jest.fn(() => true);
    mockThreadRepository.verifyCommentAvailability = jest.fn(() => false);

    // Action
    const deleteThreadCommentUseCase = new DeleteThreadCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Assert
    await expect(deleteThreadCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DELETE_COMMENT_USE_CASE.COMMENT_NOT_FOUND');
    expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
    expect(mockThreadRepository.verifyCommentAvailability)
      .toBeCalledWith(useCasePayload.commentId);
  });

  it('should throw error when not the comment owner', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      owner: 'user-123',
    };

    // mock
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.verifyThreadAvailability = jest.fn(() => true);
    mockThreadRepository.verifyCommentAvailability = jest.fn(() => true);
    mockThreadRepository.verifyCommentOwnership = jest.fn(() => false);

    // Action
    const deleteThreadCommentUseCase = new DeleteThreadCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Assert
    await expect(deleteThreadCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DELETE_COMMENT_USE_CASE.NOT_THE_COMMENT_OWNER');
    expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
    expect(mockThreadRepository.verifyCommentAvailability).toBeCalledWith(useCasePayload.commentId);
    expect(mockThreadRepository.verifyCommentOwnership)
      .toBeCalledWith(useCasePayload.commentId, useCasePayload.owner);
  });

  it('should throw error when failed to delete comment', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      owner: 'user-123',
    };
    const date = '2021-08-05T07:22:13.017Z';

    // mock
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.verifyThreadAvailability = jest.fn(() => true);
    mockThreadRepository.verifyCommentAvailability = jest.fn(() => true);
    mockThreadRepository.verifyCommentOwnership = jest.fn(() => true);
    mockThreadRepository.deleteCommentById = jest.fn(() => false);

    const dateNowSpy = jest.spyOn(Date.prototype, 'toISOString');
    dateNowSpy.mockImplementationOnce(() => date);

    // Action
    const deleteThreadCommentUseCase = new DeleteThreadCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Assert
    await expect(deleteThreadCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DELETE_COMMENT_USE_CASE.FAILED_TO_DELETE_COMMENT');
    expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
    expect(mockThreadRepository.verifyCommentAvailability).toBeCalledWith(useCasePayload.commentId);
    expect(mockThreadRepository.verifyCommentOwnership)
      .toBeCalledWith(useCasePayload.commentId, useCasePayload.owner);
    expect(mockThreadRepository.deleteCommentById).toBeCalledWith(useCasePayload.commentId, date);

    // reset mock
    dateNowSpy.mockRestore();
  });
});
