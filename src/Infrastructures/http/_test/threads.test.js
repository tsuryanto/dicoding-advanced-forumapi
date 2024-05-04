const Jwt = require('@hapi/jwt');
const pool = require('../../database/postgres/pool');
const container = require('../../container');
const createServer = require('../createServer');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');

describe('/threads endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe('when POST /threads', () => {
    it('should response 201 and persisted thread', async () => {
      // Arrange
      const requestPayload = {
        title: 'dicoding',
        body: 'secret',
      };
      const server = await createServer(container);
      const token = await Jwt.token.generate({ id: 'user-123', username: 'dicoding' }, process.env.ACCESS_TOKEN_KEY);

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
      const token = await Jwt.token.generate({ id: 'user-123', username: 'dicoding' }, process.env.ACCESS_TOKEN_KEY);

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
        id: 'thread-123', title: 'dicoding', body: 'secret', owner: 'user-123',
      });

      // Arrange
      const requestPayload = {
        content: 'dicoding content',
      };
      const server = await createServer(container);
      const token = Jwt.token.generate({ id: 'user-123', username: 'dicoding' }, process.env.ACCESS_TOKEN_KEY);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments',
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
      const token = Jwt.token.generate({ id: 'user-123', username: 'dicoding' }, process.env.ACCESS_TOKEN_KEY);

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
});
