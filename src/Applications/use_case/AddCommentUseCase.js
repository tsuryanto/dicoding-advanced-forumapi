const AddComment = require('../../Domains/comments/entities/AddComment');

class AddCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const {
      content, owner, threadId,
    } = useCasePayload;

    const date = new Date().toISOString();
    const addComment = new AddComment({
      content, owner, threadId, date,
    });

    const isExist = await this._threadRepository.verifyThreadAvailability(threadId);
    if (!isExist) {
      throw new Error('ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND');
    }

    const addedComment = await this._commentRepository.addComment(addComment);
    return addedComment;
  }
}

module.exports = AddCommentUseCase;
