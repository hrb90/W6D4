const MessageStore = require("./message_store.js");

let Sent = {
  render: function() {
    let listy = document.createElement('ul');
    listy.classList.add('messages');
    MessageStore.getSentMessages().forEach((message) => {
      listy.appendChild(this.renderMessage(message));
    });
    return listy;
  },

  renderMessage: function (message) {
    let item = document.createElement('li');
    item.classList.add('message');
    item.innerHTML = `<span class="to">To: ${message.to}</span>
                      <span class="subject">${message.subject}</span>
                      <span class="body">${message.body}</span>`;
    return item;
  }
};

module.exports = Sent;
