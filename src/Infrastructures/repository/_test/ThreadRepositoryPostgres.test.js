const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const pool = require('../../database/postgres/pool');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist new thread and return correct data', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const payload = {
        id: '123',
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-123',
        date: '2024-08-08T07:22:58.000Z',
      };
      const addedThread = await threadRepository.addThread(payload);

      expect(addedThread.id).toEqual('thread-123');
      expect(addedThread.title).toEqual(payload.title);
      expect(addedThread.owner).toEqual(payload.owner);
      expect(addedThread.body).toEqual(payload.body);
      expect(addedThread.date).toEqual(payload.date);

      const threads = await ThreadsTableTestHelper.findThreadsById('thread-123');
      expect(threads).toHaveLength(1);
    });
  });

  describe('getThreadById function', () => {
    it('should return thread detail correctly', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      // Action
      const payload = {
        id: '123',
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-123',
        date: '2024-08-08T07:22:58.000Z',
      };
      await threadRepository.addThread(payload);
      const thread = await threadRepository.getThreadById('thread-123');

      expect(thread.id).toEqual('thread-123');
      expect(thread.title).toEqual(payload.title);
      expect(thread.owner).toEqual(payload.owner);
      expect(thread.body).toEqual(payload.body);
      expect(thread.date).toEqual(payload.date);
    });

    it('should return null when thread not found', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const thread = await threadRepository.getThreadById('thread-12345');

      expect(thread).toBeNull();
    });
  });

  describe('addComment function', () => {
    it('should persist new comment and return correct data', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const payload = {
        id: '123',
        threadId: 'thread-123',
        comment: 'comment dicoding',
        owner: 'user-123',
        date: '2024-08-08T07:22:58.000Z',
      };

      const addedComment = await threadRepository.addComment(payload);
      expect(addedComment.id).toEqual('threadComment-123');
      expect(addedComment.threadId).toEqual(payload.threadId);
      expect(addedComment.owner).toEqual(payload.owner);
      expect(addedComment.comment).toEqual(payload.comment);
      expect(addedComment.date).toEqual(payload.date);

      const comments = await ThreadsTableTestHelper.findCommentsById('threadComment-123');
      expect(comments).toHaveLength(1);
    });
  });
});
