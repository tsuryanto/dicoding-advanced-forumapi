class GetThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(threadId) {
    const thread = await this._threadRepository.getThreadById(threadId);
    const comments = await this._commentRepository.getCommentByThreadId(threadId);

    if (!thread) {
      throw new Error('GET_THREAD_USE_CASE.NOT_FOUND');
    }

    return {
      id: thread.id,
      title: thread.title,
      body: thread.body,
      date: thread.date,
      username: thread.username,
      comments: comments.map((comment) => ({
        id: comment.id,
        username: comment.username,
        date: comment.date,
        content: ((comment.deletedDate === null) ? comment.content : '**komentar telah dihapus**'),
      })),
    };
  }
}

module.exports = GetThreadUseCase;
