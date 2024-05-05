const Jwt = require('@hapi/jwt');
const pool = require('../../database/postgres/pool');
const container = require('../../container');
const createServer = require('../createServer');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');

describe('/threads endpoint', () => {
  afterAll(async () => {
    await UsersTableTestHelper.deleteUserById('user-apitest123');
    await pool.end();
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });

  beforeAll(async () => {
    await UsersTableTestHelper.addUser({ id: 'user-apitest123' });
  });

  describe('when POST /threads', () => {
    it('should response 201 and persisted thread', async () => {
      // Arrange
      const requestPayload = {
        title: 'dicoding',
        body: 'secret',
      };
      const server = await createServer(container);
      const token = await Jwt.token.generate({ id: 'user-apitest123', username: 'dicoding' }, process.env.ACCESS_TOKEN_KEY);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedThread).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {
        body: 'secret',
      };
      const server = await createServer(container);
      const token = await Jwt.token.generate({ id: 'user-apitest123', username: 'dicoding' }, process.env.ACCESS_TOKEN_KEY);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 401 when authentication not found', async () => {
      // Arrange
      const requestPayload = {
        body: 'secret',
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toBeUndefined();
      expect(responseJson.message).toEqual('Missing authentication');
    });
  });

  describe('when POST /threads/{threadId}/comments', () => {
    it('should response 201 and persisted thread', async () => {
      await ThreadsTableTestHelper.addThread({
        id: 'thread-apitest123', title: 'dicoding', body: 'secret', owner: 'user-apitest123',
      });

      // Arrange
      const requestPayload = {
        content: 'dicoding content',
      };
      const server = await createServer(container);
      const token = Jwt.token.generate({ id: 'user-apitest123', username: 'dicoding' }, process.env.ACCESS_TOKEN_KEY);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-apitest123/comments',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedComment).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {};
      const server = await createServer(container);
      const token = Jwt.token.generate({ id: 'user-apitest123', username: 'dicoding' }, process.env.ACCESS_TOKEN_KEY);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/{threadId}/comments',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 401 when authentication not found', async () => {
      // Arrange
      const requestPayload = {
        body: 'secret',
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/{threadId}/comments',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toBeUndefined();
      expect(responseJson.message).toEqual('Missing authentication');
    });
  });

  describe('when DELETE /threads/{threadId}/comments/{commentId}', () => {
    it('should response 200 and delete comment', async () => {
      await ThreadsTableTestHelper.addThread({
        id: 'thread-commentdelete-apitest123',
        owner: 'user-apitest123',
      });

      await ThreadsTableTestHelper.addComment({
        id: 'comment-apitest123', threadId: 'thread-commentdelete-apitest123', content: 'dicoding content', owner: 'user-apitest123',
      });

      // Arrange
      const server = await createServer(container);
      const token = Jwt.token.generate({ id: 'user-apitest123', username: 'dicoding' }, process.env.ACCESS_TOKEN_KEY);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-commentdelete-apitest123/comments/comment-apitest123',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });

    it('should response 401 when authentication not found', async () => {
      // Arrange
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-commentdelete-apitest123/comments/comment-apitest123',
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toBeUndefined();
      expect(responseJson.message).toEqual('Missing authentication');
    });
  });

  describe('when GET /threads/{threadId}', () => {
    it('should response 200 and return thread', async () => {
      await ThreadsTableTestHelper.addThread({
        id: 'thread-get-apitest123',
        title: 'dicoding',
        body: 'secret',
        owner: 'user-apitest123',
      });
      await ThreadsTableTestHelper.addComment({
        id: 'comment-apitest123',
        threadId: 'thread-get-apitest123',
        content: 'dicoding content',
        owner: 'user-apitest123',
      });
      await ThreadsTableTestHelper.addComment({
        id: 'comment-apitest124',
        threadId: 'thread-get-apitest123',
        content: 'dicoding content',
        owner: 'user-apitest123',
      });
      await ThreadsTableTestHelper.deleteCommentById('comment-apitest124');

      // Arrange
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/threads/thread-get-apitest123',
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.thread).toBeDefined();

      expect(responseJson.data.thread.id).toEqual('thread-get-apitest123');
      expect(responseJson.data.thread.title).toEqual('dicoding');
      expect(responseJson.data.thread.body).toEqual('secret');
      expect(responseJson.data.thread.username).toEqual('dicoding');

      expect(responseJson.data.thread.comments).toHaveLength(2);

      expect(responseJson.data.thread.comments[0].id).toEqual('comment-apitest123');
      expect(responseJson.data.thread.comments[0].content).toEqual('dicoding comment');
      expect(responseJson.data.thread.comments[0].username).toEqual('dicoding');

      expect(responseJson.data.thread.comments[1].id).toEqual('comment-apitest124');
      expect(responseJson.data.thread.comments[1].content).toEqual('***komentar telah dihapus***');
      expect(responseJson.data.thread.comments[1].username).toEqual('dicoding');
    });

    it('should response 404 when thread not found', async () => {
      // Arrange
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/threads/thread-get-apitest123',
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('thread tidak ditemukan');
    });
  });
});
