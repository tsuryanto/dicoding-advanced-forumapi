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
});
