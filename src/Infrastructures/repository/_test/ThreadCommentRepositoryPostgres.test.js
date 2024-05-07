const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const ThreadCommentRepositoryPostgres = require('../ThreadCommentRepositoryPostgres');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const ThreadCommentsTableTestHelper = require('../../../../tests/ThreadCommentsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddComment = require('../../../Domains/threads/entities/AddComment');
const Comment = require('../../../Domains/threads/entities/Comment');

describe('ThreadCommentRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadCommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  beforeAll(async () => {
    UsersTableTestHelper.addUser({ id: 'user-threadtest-123' });
  });

  describe('addComment function', () => {
    it('should persist new comment and return correct data', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      const commentRepository = new ThreadCommentRepositoryPostgres(pool, fakeIdGenerator);

      // pre
      await threadRepository.addThread(new AddThread({
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      }));

      // Action
      const payload = new AddComment({
        threadId: 'thread-123',
        comment: 'comment dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      });
      const addedComment = await commentRepository.addComment(payload);

      expect(addedComment).toStrictEqual(new Comment({
        id: 'threadComment-123',
        threadId: payload.threadId,
        owner: payload.owner,
        comment: payload.comment,
        date: payload.date,
      }));

      const comments = await ThreadCommentsTableTestHelper.findCommentsById('threadComment-123');
      expect(comments).toHaveLength(1);
    });
  });

  describe('getCommentById function', () => {
    it('should return comments correctly', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      const commentRepository = new ThreadCommentRepositoryPostgres(pool, fakeIdGenerator);

      // pre
      await threadRepository.addThread(new AddThread({
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      }));

      const payload = new AddComment({
        threadId: 'thread-123',
        comment: 'comment dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      });
      await commentRepository.addComment(payload);

      // Action
      const comment = await commentRepository.getCommentById('threadComment-123');
      expect(comment).toStrictEqual(new Comment({
        id: 'threadComment-123',
        threadId: payload.threadId,
        owner: payload.owner,
        comment: payload.comment,
        date: payload.date,
        deletedDate: null,
      }));
    });

    it('should return empty array when comment not found', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const commentRepository = new ThreadCommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const comment = await commentRepository.getCommentById('thread-123');
      expect(comment).toBeNull();
    });
  });

  describe('verifyThreadCommentAvailability function', () => {
    it('should return true if comment exists', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      const commentRepository = new ThreadCommentRepositoryPostgres(pool, fakeIdGenerator);

      // pre
      await threadRepository.addThread(new AddThread({
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      }));

      await commentRepository.addComment(new AddComment({
        threadId: 'thread-123',
        comment: 'comment dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      }));

      // Action
      const available = await commentRepository.verifyCommentAvailability('threadComment-123');
      expect(available).toEqual(true);
    });

    it('should return false if comment not exists', async () => {
      // Arrange
      const commentRepository = new ThreadCommentRepositoryPostgres(pool, {});

      // Action
      const available = await commentRepository.verifyCommentAvailability('threadComment-123');
      expect(available).toEqual(false);
    });
  });

  describe('verifyCommentOwnership function', () => {
    it('should return true if user has comment ownership', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      const commentRepository = new ThreadCommentRepositoryPostgres(pool, fakeIdGenerator);

      // pre
      await threadRepository.addThread(new AddThread({
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      }));

      await commentRepository.addComment(new AddComment({
        threadId: 'thread-123',
        comment: 'comment dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      }));

      // Action
      const ownership = await commentRepository.verifyCommentOwnership('threadComment-123', 'user-threadtest-123');
      expect(ownership).toEqual(true);
    });

    it('should return false if user has no comment ownership', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      const commentRepository = new ThreadCommentRepositoryPostgres(pool, fakeIdGenerator);

      // pre
      await threadRepository.addThread(new AddThread({
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      }));

      await commentRepository.addComment(new AddComment({
        threadId: 'thread-123',
        comment: 'comment dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      }));

      // Action
      const ownership = await commentRepository.verifyCommentOwnership('threadComment-123', 'user-threadtest-456');
      expect(ownership).toEqual(false);
    });
  });

  describe('deleteCommentById function', () => {
    it('should delete comment correctly', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      const commentRepository = new ThreadCommentRepositoryPostgres(pool, fakeIdGenerator);

      // pre
      await threadRepository.addThread(new AddThread({
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      }));

      await commentRepository.addComment(new AddComment({
        threadId: 'thread-123',
        comment: 'comment dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      }));

      // Action
      const deleted = await commentRepository.deleteCommentById('threadComment-123', '2024-08-08T07:22:58.000Z');
      expect(deleted).toEqual(true);

      const comment = await commentRepository.getCommentById('threadComment-123');
      expect(comment.deletedDate).toEqual('2024-08-08T07:22:58.000Z');
    });

    it('should return false when comment not found', async () => {
      const fakeIdGenerator = () => '123';

      // Arrange
      const commentRepository = new ThreadCommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const deleted = await commentRepository.deleteCommentById('threadComment-123', '2024-08-08T07:22:58.000Z');
      expect(deleted).toEqual(false);
    });
  });

  describe('getCommentByThreadId function', () => {
    it('should return comments correctly', async () => {
      const fakeIdGenerator = () => '123';

      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      const commentRepository = new ThreadCommentRepositoryPostgres(pool, fakeIdGenerator);

      // pre
      await threadRepository.addThread(new AddThread({
        title: 'dicoding',
        body: 'body dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      }));

      const payload = new AddComment({
        threadId: 'thread-123',
        comment: 'comment dicoding',
        owner: 'user-threadtest-123',
        date: '2024-08-08T07:22:58.000Z',
      });
      await commentRepository.addComment(payload);

      // Action
      const comments = await commentRepository.getCommentByThreadId('thread-123');
      expect(comments).toHaveLength(1);
      expect(comments[0]).toStrictEqual(new Comment({
        id: 'threadComment-123',
        threadId: payload.threadId,
        owner: payload.owner,
        comment: payload.comment,
        date: payload.date,
        deletedDate: null,
        username: 'dicoding',
      }));
    });
  });
});
