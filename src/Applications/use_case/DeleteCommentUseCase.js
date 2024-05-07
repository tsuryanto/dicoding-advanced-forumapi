class DeleteCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { threadId, commentId, owner } = useCasePayload;
    const date = new Date().toISOString();

    const isThreadExist = await this._threadRepository.verifyThreadAvailability(threadId);
    if (!isThreadExist) {
      throw new Error('DELETE_COMMENT_USE_CASE.THREAD_NOT_FOUND');
    }

    const isCommentExist = await this._commentRepository.verifyCommentAvailability(commentId);
    if (!isCommentExist) {
      throw new Error('DELETE_COMMENT_USE_CASE.COMMENT_NOT_FOUND');
    }

    const isAllowed = await this._commentRepository.verifyCommentOwnership(commentId, owner);
    if (!isAllowed) {
      throw new Error('DELETE_COMMENT_USE_CASE.NOT_THE_COMMENT_OWNER');
    }

    const isDeleted = await this._commentRepository.deleteCommentById(commentId, date);
    if (!isDeleted) {
      throw new Error('DELETE_COMMENT_USE_CASE.FAILED_TO_DELETE_COMMENT');
    }
  }

  _validatePayload(payload) {
    const { threadId, commentId, owner } = payload;
    if (!threadId || !commentId || !owner) {
      throw new Error('DELETE_COMMENT_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof threadId !== 'string' || typeof commentId !== 'string' || typeof owner !== 'string') {
      throw new Error('DELETE_COMMENT_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DeleteCommentUseCase;
