const AddComment = require('../../Domains/threads/entities/AddComment');

class AddThreadCommentUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const {
      comment, owner, threadId,
    } = useCasePayload;

    const date = new Date().toISOString();
    const addComment = new AddComment({
      comment, owner, threadId, date,
    });

    const isExist = await this._threadRepository.verifyThreadAvailability(threadId);
    if (!isExist) {
      throw new Error('ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND');
    }

    const addedComment = await this._threadRepository.addComment(addComment);
    return {
      id: addedComment.id,
      content: addedComment.comment,
      owner: addedComment.owner,
      date: addedComment.date,
    };
  }
}

module.exports = AddThreadCommentUseCase;
