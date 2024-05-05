const GetThreadUseCase = require('../GetThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

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
          content: '***komentar telah dihapus***',
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
    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve({
      id: 'thread-123',
      title: 'Hello, Dicoding',
      body: 'Any want to discuss ?',
      date: '2024-04-24T19:23:55.913Z',
      username: 'dicoding',
    }));
    mockThreadRepository.getCommentByThreadId = jest.fn(() => Promise.resolve([
      {
        id: 'comment-456',
        username: 'john',
        date: '2024-04-20T19:23:55.913Z',
        comment: 'ini comment',
        deletedDate: '2024-04-21T19:23:55.913Z',
      },
      {
        id: 'comment-123',
        username: 'dicoding',
        date: '2024-04-24T19:23:55.913Z',
        comment: 'ini comment',
        deletedDate: null,
      },
    ]));

    // Action
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
    });
    const thread = await getThreadUseCase.execute(useCasePayload);
    expect(thread).toStrictEqual(expectedUseCase);
  });

  it('should throw error if thread not found', async () => {
    // Arrange
    const useCasePayload = 'thread-123';

    // mock
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve(null));
    mockThreadRepository.getCommentByThreadId = jest.fn(() => Promise.resolve(null));

    // Action
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Assert
    await expect(getThreadUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('GET_THREAD_USE_CASE.NOT_FOUND');
  });
});
