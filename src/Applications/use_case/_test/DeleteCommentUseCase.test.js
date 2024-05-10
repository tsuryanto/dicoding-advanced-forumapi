const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      owner: 'user-123',
    };

    // mock
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const date = '2021-08-08T07:22:13.017Z';

    mockThreadRepository.verifyThreadAvailability = jest.fn();
    mockCommentRepository.verifyCommentAvailability = jest.fn();
    mockCommentRepository.verifyCommentOwnership = jest.fn();
    mockCommentRepository.deleteCommentById = jest.fn();

    const dateNowSpy = jest.spyOn(Date.prototype, 'toISOString');
    dateNowSpy.mockImplementationOnce(() => date);

    // Action
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });
    await deleteCommentUseCase.execute(useCasePayload);

    // reset mock
    dateNowSpy.mockRestore();

    // Assert
    expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentAvailability)
      .toBeCalledWith(useCasePayload.commentId);
    expect(mockCommentRepository.verifyCommentOwnership)
      .toBeCalledWith(useCasePayload.commentId, useCasePayload.owner);
    expect(mockCommentRepository.deleteCommentById).toBeCalledWith(useCasePayload.commentId, date);
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
    mockThreadRepository.verifyThreadAvailability = jest.fn(() => {
      throw new Error('THREAD_REPOSITORY.THREAD_NOT_FOUND');
    });

    // Action
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Assert
    await expect(deleteCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('THREAD_REPOSITORY.THREAD_NOT_FOUND');
    expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
  });

  it('should throw error if payload not contain needed property', async () => {
    // Arrange
    const useCasePayload = {
      owner: 'user-123',
    };
    const deleteCommentUseCase = new DeleteCommentUseCase({});

    // Action & Assert
    await expect(deleteCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if payload not meet data type specification', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 123,
      owner: 'user-123',
    };
    const deleteCommentUseCase = new DeleteCommentUseCase({});

    // Action & Assert
    await expect(deleteCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
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
    const mockCommentRepository = new CommentRepository();
    mockThreadRepository.verifyThreadAvailability = jest.fn();
    mockCommentRepository.verifyCommentAvailability = jest.fn(() => {
      throw new Error('COMMENT_REPOSITORY.COMMENT_NOT_FOUND');
    });

    // Action
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Assert
    await expect(deleteCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('COMMENT_REPOSITORY.COMMENT_NOT_FOUND');
    expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentAvailability)
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
    const mockCommentRepository = new CommentRepository();
    mockThreadRepository.verifyThreadAvailability = jest.fn();
    mockCommentRepository.verifyCommentAvailability = jest.fn();
    mockCommentRepository.verifyCommentOwnership = jest.fn(() => {
      throw new Error('COMMENT_REPOSITORY.NOT_THE_COMMENT_OWNER');
    });

    // Action
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Assert
    await expect(deleteCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('COMMENT_REPOSITORY.NOT_THE_COMMENT_OWNER');
    expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentAvailability)
      .toBeCalledWith(useCasePayload.commentId);
    expect(mockCommentRepository.verifyCommentOwnership)
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
    const mockCommentRepository = new CommentRepository();
    mockThreadRepository.verifyThreadAvailability = jest.fn();
    mockCommentRepository.verifyCommentAvailability = jest.fn();
    mockCommentRepository.verifyCommentOwnership = jest.fn();
    mockCommentRepository.deleteCommentById = jest.fn(() => {
      throw new Error('COMMENT_REPOSITORY.FAILED_TO_DELETE_COMMENT');
    });

    const dateNowSpy = jest.spyOn(Date.prototype, 'toISOString');
    dateNowSpy.mockImplementationOnce(() => date);

    // Action
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Assert
    await expect(deleteCommentUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('COMMENT_REPOSITORY.FAILED_TO_DELETE_COMMENT');
    expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentAvailability)
      .toBeCalledWith(useCasePayload.commentId);
    expect(mockCommentRepository.verifyCommentOwnership)
      .toBeCalledWith(useCasePayload.commentId, useCasePayload.owner);
    expect(mockCommentRepository.deleteCommentById).toBeCalledWith(useCasePayload.commentId, date);

    // reset mock
    dateNowSpy.mockRestore();
  });
});
