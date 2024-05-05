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
    expect(mockThreadRepository.addThread).toHaveBeenCalledWith(getThread);
  });

  it('should throw error if payload not contain needed property', async () => {
    // Arrange
    const useCasePayload = {
      owner: 'user-123',
    };
    const addThreadUseCase = new AddThreadUseCase({});

    // Action & Assert
    await expect(addThreadUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('ADD_THREAD_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if payload not meet data type specification', async () => {
    // Arrange
    const useCasePayload = {
      owner: 'user-123',
      title: true,
      body: 123,
    };
    const addThreadUseCase = new AddThreadUseCase({});

    // Action & Assert
    await expect(addThreadUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('ADD_THREAD_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
