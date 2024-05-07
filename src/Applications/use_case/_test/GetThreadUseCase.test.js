const GetThreadUseCase = require('../GetThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/threads/CommentRepository');
const Comment = require('../../../Domains/threads/entities/Comment');
const Thread = require('../../../Domains/threads/entities/Thread');

describe('GetThreadUseCase', () => {
  it('should orchestrating the get thread action correctly', async () => {
    // Arrange
    const useCasePayload = 'thread-123';
    const expectedUseCase = {
      id: 'thread-123',
      title: 'Hello, Dicoding',
      body: 'Any want to discuss ?',
      date: '2024-04-24T19:23:55.913Z',
      username: 'dicoding',
      comments: [
        {
          id: 'comment-456',
          username: 'john',
          date: '2024-04-20T19:23:55.913Z',
          content: '**komentar telah dihapus**',
        },
        {
          id: 'comment-123',
          username: 'dicoding',
          date: '2024-04-24T19:23:55.913Z',
          content: 'ini comment',
        },
      ],
    };

    // mock
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve(
      new Thread({
        id: 'thread-123',
        title: 'Hello, Dicoding',
        body: 'Any want to discuss ?',
        owner: 'user-123',
        date: '2024-04-24T19:23:55.913Z',
        username: 'dicoding',
      }),
    ));
    mockCommentRepository.getCommentByThreadId = jest.fn(() => Promise.resolve([
      new Comment({
        id: 'comment-456',
        threadId: 'thread-123',
        comment: 'ini comment',
        owner: 'user-124',
        date: '2024-04-20T19:23:55.913Z',
        deletedDate: '2024-04-21T19:23:55.913Z',
        username: 'john',
      }),
      new Comment({
        id: 'comment-123',
        threadId: 'thread-123',
        comment: 'ini comment',
        owner: 'user-123',
        date: '2024-04-24T19:23:55.913Z',
        deletedDate: null,
        username: 'dicoding',
      }),
    ]));

    // Action
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });
    const thread = await getThreadUseCase.execute(useCasePayload);
    expect(thread).toStrictEqual(expectedUseCase);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload);
    expect(mockCommentRepository.getCommentByThreadId).toBeCalledWith(useCasePayload);
  });

  it('should throw error if thread not found', async () => {
    // Arrange
    const useCasePayload = 'thread-123';

    // mock
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve(null));
    mockCommentRepository.getCommentByThreadId = jest.fn(() => Promise.resolve(null));

    // Action
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Assert
    await expect(getThreadUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('GET_THREAD_USE_CASE.NOT_FOUND');
    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload);
    expect(mockCommentRepository.getCommentByThreadId).toBeCalledWith(useCasePayload);
  });
});
