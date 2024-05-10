const DeleteComment = require('../../Domains/comments/entities/DeleteComment');

class DeleteCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const { threadId, commentId, owner } = useCasePayload;
    const date = new Date().toISOString();

    const deleteComment = new DeleteComment({
      id: commentId, threadId, owner,
    });

    await this._threadRepository.verifyThreadAvailability(deleteComment.threadId);
    await this._commentRepository.verifyCommentAvailability(deleteComment.id);
    await this._commentRepository.verifyCommentOwnership(deleteComment.id, deleteComment.owner);
    await this._commentRepository.deleteCommentById(deleteComment.id, date);
  }
}

module.exports = DeleteCommentUseCase;
