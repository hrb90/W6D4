const DomNodeCollection = require("./dom_node_collection.js");

let readyQueue = [];

document.addEventListener('DOMContentLoaded', function() {
  readyQueue.forEach((f) => { f.call(document); });
  readyQueue = [];
});

window.$l = function(arg){
  if (typeof arg === "string") {
    let list = document.querySelectorAll(arg);
    let listArray = [].slice.call(list);
    return new DomNodeCollection(listArray);
  } else if (arg instanceof HTMLElement) {
    return new DomNodeCollection([arg]);
  } else if (arg instanceof Function){
    if (document.readyState === "complete") {
      arg.call(document);
    } else {
      readyQueue.push(arg);
    }
  }
};

$l.extend = function(...objects) {
  if (objects.length < 2) {
    throw 'Too few objects';
  }
  let newObject = objects[0];
  objects.slice(1).forEach(function(obj){
    Object.keys(obj).forEach(function(key) {
        newObject[key] = obj[key];
    });
  });
};

$l.ajax_defaults = {
  url: "",
  method: "GET",
  data: {},
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  success: console.log,
  error: console.log
};

$l.ajax = function(options) {
  let finalOptions = {};
  $l.extend(finalOptions, $l.ajax_defaults, options);
  const xhr = new XMLHttpRequest();
  xhr.open(finalOptions.method, finalOptions.url);
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      finalOptions.success(JSON.parse(xhr.response));
    } else {
      finalOptions.error(JSON.parse(xhr.response));
    }
  };
  xhr.setRequestHeader('Content-type', finalOptions.contentType);
  xhr.send(finalOptions.data);
};
