const AddThread = require('../../Domains/threads/entities/AddThread');

class AddThreadUseCase {
  constructor({
    threadRepository,
  }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload);

    const {
      owner, title, body,
    } = useCasePayload;

    const date = new Date().toISOString();
    const addThread = new AddThread({
      title, body, owner, date,
    });
    return this._threadRepository.addThread(addThread);
  }

  _verifyPayload(payload) {
    if (!payload.title || !payload.body || !payload.owner) {
      throw new Error('ADD_THREAD_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof payload.title !== 'string' || typeof payload.body !== 'string' || typeof payload.owner !== 'string') {
      throw new Error('ADD_THREAD_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddThreadUseCase;
