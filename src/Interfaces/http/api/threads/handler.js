const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const AddThreadCommentUseCase = require('../../../../Applications/use_case/AddThreadCommentUseCase');
const DeleteThreadCommentUseCase = require('../../../../Applications/use_case/DeleteThreadCommentUseCase');
const GetThreadUseCase = require('../../../../Applications/use_case/GetThreadUseCase');

class ThreadHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.postThreadCommentHandler = this.postThreadCommentHandler.bind(this);
    this.deleteThreadCommentHandler = this.deleteThreadCommentHandler.bind(this);
    this.getThreadByIdHandler = this.getThreadByIdHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { title, body } = request.payload;

    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute({
      title,
      body,
      owner: credentialId,
    });

    const response = h.response({
      status: 'success',
      message: 'Thread berhasil ditambahkan',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async postThreadCommentHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { threadId } = request.params;
    const { content } = request.payload;

    const addCommentUseCase = this._container.getInstance(AddThreadCommentUseCase.name);
    const addedComment = await addCommentUseCase.execute({
      comment: content,
      owner: credentialId,
      threadId,
    });

    const response = h.response({
      status: 'success',
      message: 'Komentar berhasil ditambahkan',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  async deleteThreadCommentHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { threadId, commentId } = request.params;

    const deleteCommentUseCase = this._container.getInstance(DeleteThreadCommentUseCase.name);
    await deleteCommentUseCase.execute({
      threadId,
      commentId,
      owner: credentialId,
    });

    const response = h.response({
      status: 'success',
      message: 'Komentar berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  async getThreadByIdHandler(request) {
    const { threadId } = request.params;

    const getThreadUseCase = this._container.getInstance(GetThreadUseCase.name);
    const thread = await getThreadUseCase.execute(threadId);

    return {
      status: 'success',
      data: {
        thread,
      },
    };
  }
}

module.exports = ThreadHandler;
