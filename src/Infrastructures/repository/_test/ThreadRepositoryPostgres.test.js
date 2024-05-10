const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const Thread = require('../../../Domains/threads/entities/Thread');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  beforeAll(async () => {
    UsersTableTestHelper.addUser({ id: 'user-threadtest-123' });
  });

  describe('addThread function', () => {
    it('should persist new thread and return correct data', async () => {
      const fakeIdGenerator = () => '456';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const payload = new AddThread({
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      });
      const addedThread = await threadRepository.addThread(payload);

      expect(addedThread).toStrictEqual(new AddedThread({
        id: 'thread-456',
        title: payload.title,
        body: payload.body,
        owner: payload.owner,
        date: payload.date,
      }));
      const threads = await ThreadsTableTestHelper.findThreadsById('thread-456');
      expect(threads).toHaveLength(1);
    });
  });

  describe('getThreadById function', () => {
    it('should return thread detail correctly', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // pre
      const payload = new AddThread({
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      });
      await threadRepository.addThread(payload);

      // Action
      const thread = await threadRepository.getThreadById('thread-123');
      expect(thread).toStrictEqual(new Thread({
        id: 'thread-123',
        title: payload.title,
        body: payload.body,
        owner: payload.owner,
        date: payload.date,
        username: 'dicoding',
      }));
    });

    it('should return null when thread not found', async () => {
      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, {});

      // Action
      const thread = await threadRepository.getThreadById('thread-12345');

      expect(thread).toBeNull();
    });
  });

  describe('verifyThreadAvailability function', () => {
    it('should no error if thread exists', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // pre
      await threadRepository.addThread(new AddThread({
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      }));

      // action and assert
      await expect(threadRepository.verifyThreadAvailability('thread-123')).resolves.not.toThrowError();
    });

    it('should throw error if thread not found', async () => {
      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepository.verifyThreadAvailability('thread-123')).rejects.toThrowError('THREAD_REPOSITORY.THREAD_NOT_FOUND');
    });
  });
});
