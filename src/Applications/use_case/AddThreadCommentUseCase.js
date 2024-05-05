const AddComment = require('../../Domains/threads/entities/AddComment');

class AddThreadCommentUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload);

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

  _verifyPayload(payload) {
    if (!payload.comment || !payload.owner || !payload.threadId) {
      throw new Error('ADD_COMMENT_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof payload.comment !== 'string' || typeof payload.owner !== 'string' || typeof payload.threadId !== 'string') {
      throw new Error('ADD_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddThreadCommentUseCase;
