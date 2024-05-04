const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');

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
      const payload = {
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      };
      const addedThread = await threadRepository.addThread(payload);

      expect(addedThread.id).toEqual('thread-456');
      expect(addedThread.title).toEqual(payload.title);
      expect(addedThread.owner).toEqual(payload.owner);
      expect(addedThread.body).toEqual(payload.body);
      expect(addedThread.date).toEqual(payload.date);

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
      const payload = {
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      };
      await threadRepository.addThread(payload);

      // Action
      const thread = await threadRepository.getThreadById('thread-123');

      expect(thread.id).toEqual('thread-123');
      expect(thread.title).toEqual(payload.title);
      expect(thread.owner).toEqual(payload.owner);
      expect(thread.body).toEqual(payload.body);
      expect(thread.date).toEqual(payload.date);
    });

    it('should return null when thread not found', async () => {
      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, {});

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

      // pre
      await threadRepository.addThread({
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      });

      // Action
      const payload = {
        threadId: 'thread-123',
        comment: 'comment dicoding',
        owner: 'user-threadtest-123',
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

  describe('getCommentById function', () => {
    it('should return comments correctly', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // pre
      await threadRepository.addThread({
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      });

      const payload = {
        threadId: 'thread-123',
        comment: 'comment dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      };
      await threadRepository.addComment(payload);

      // Action
      const comment = await threadRepository.getCommentById('threadComment-123');
      expect(comment.id).toEqual('threadComment-123');
      expect(comment.threadId).toEqual(payload.threadId);
      expect(comment.owner).toEqual(payload.owner);
      expect(comment.comment).toEqual(payload.comment);
      expect(comment.date).toEqual(payload.date);
    });

    it('should return empty array when comment not found', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const comment = await threadRepository.getCommentById('thread-123');
      expect(comment).toBeNull();
    });
  });

  describe('deleteCommentById function', () => {
    it('should delete comment correctly', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // pre
      await threadRepository.addThread({
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      });

      const payload = {
        id: '123',
        threadId: 'thread-123',
        comment: 'comment dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      };
      await threadRepository.addComment(payload);

      // Action
      const deleted = await threadRepository.deleteCommentById('threadComment-123', '2024-08-08T07:22:58.000Z');
      expect(deleted).toEqual(true);

      const comment = await threadRepository.getCommentById('threadComment-123');
      expect(comment.deletedDate).toEqual('2024-08-08T07:22:58.000Z');
    });

    it('should return false when comment not found', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const deleted = await threadRepository.deleteCommentById('threadComment-123', '2024-08-08T07:22:58.000Z');
      expect(deleted).toEqual(false);
    });
  });
});
