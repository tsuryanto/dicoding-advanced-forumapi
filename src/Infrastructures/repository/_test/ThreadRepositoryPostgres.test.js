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
    });
  });
});
