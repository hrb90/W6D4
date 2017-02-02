const MessageStore = require('./message_store.js');

function makeUndefEmptyString(str) {
  if (str === undefined) {
    return "";
  } else {
    return str;
  }
}

const Compose = {
  render: function() {
    let container = document.createElement('div');
    container.className = 'new-message';
    container.innerHTML = this.renderForm();
    container.addEventListener('change', function(e) {
      let target = e.target;
      MessageStore.updateDraftField(target.name, target.value);
    });
    container.addEventListener('submit', function(e) {
      e.preventDefault();
      MessageStore.sendDraft();
      window.location.hash = "#inbox";
    });
    return container;
  },

  renderForm: function(){
    let draft = MessageStore.getMessageDraft();
    return `<p class="new-message-header">New Message</p>
    <form class="compose-form">
      <input placeholder="Recipient" name="to" type="text" value="${makeUndefEmptyString(draft.to)}" />
      <input placeholder="Subject" name="subject" type="text" value="${makeUndefEmptyString(draft.subject)}" />
      <textarea name="body" rows=20>${makeUndefEmptyString(draft.body)}</textarea>
      <button type="submit" class="btn btn-primary submit-message">Send</button>
    </form>`;
  }
};

module.exports = Compose;
