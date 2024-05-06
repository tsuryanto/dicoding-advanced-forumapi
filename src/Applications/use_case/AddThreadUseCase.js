const AddThread = require('../../Domains/threads/entities/AddThread');

class AddThreadUseCase {
  constructor({
    threadRepository,
  }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const {
      owner, title, body,
    } = useCasePayload;

    const date = new Date().toISOString();
    const addThread = new AddThread({
      title, body, owner, date,
    });
    return this._threadRepository.addThread(addThread);
  }
}

module.exports = AddThreadUseCase;
