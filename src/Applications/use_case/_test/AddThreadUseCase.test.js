const AddThreadUseCase = require('../AddThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThread = require('../../../Domains/threads/entities/AddThread');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      owner: 'user-123',
      title: 'Hello, Dicoding',
      body: 'Any want to discuss ?',
    };

    // mock
    const mockThreadRepository = new ThreadRepository();
    const date = '2024-04-24T19:23:55.913Z';
    const getThread = new AddThread({
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner: 'user-123',
      date,
    });
    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(getThread));

    const dateNowSpy = jest.spyOn(Date.prototype, 'toISOString');
    dateNowSpy.mockImplementationOnce(() => date);

    // Action
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });
    const thread = await addThreadUseCase.execute(useCasePayload);

    // reset mock
    dateNowSpy.mockRestore();

    // Assert
    expect(thread).toStrictEqual(getThread);
  });
});
