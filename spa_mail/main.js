const Router = require('./router.js');
const Inbox = require("./inbox.js");
const Sent = require("./sent.js");
const Compose = require("./compose.js");

const routes = {
  inbox: Inbox,
  sent: Sent,
  compose: Compose
};

$l(function() {
  let contentNode = document.querySelector('.content');
  let router = new Router(contentNode, routes);
  router.start();
  window.location.hash = "#inbox";
  $l(".sidebar-nav").find("li").on("click", function(e) {
    let newLocation = e.currentTarget.innerText.toLowerCase();
    window.location.hash = newLocation;
  });
});
