class DomNodeCollection {
  constructor(els) {
    this.els = els;
    this.els.forEach((el) => {
      el.listeners = [];
    });
  }

  html (str) {
    if (str === undefined) {
      return this.els[0].innerHTML;
    } else {
      this.els.forEach((el) => {
        el.innerHTML = str;
      });
    }
  }

  empty () {
    this.html("");
  }

  append (arg) {
    if (arg instanceof DomNodeCollection) {
      this.els.forEach((el) => {
        arg.els.forEach((argEl) => {
          el.innerHTML+= argEl.outerHTML;
        });
      });
    } else if (arg instanceof HTMLElement) {
      this.els.forEach((el) => {
        el.innerHTML+= arg.outerHTML;
      });
    } else if (typeof arg === 'string') {
      this.els.forEach((el) => {
        el.innerHTML+= arg;
      });
    }
  }

  attr (attrName, attrVal) {
    if (attrVal === undefined) {
      return this.els[0].getAttribute(attrName);
    } else {
    this.els.forEach((el) => {
      el.setAttribute(attrName, attrVal);
    });
   }

  }

  addClass (className) {
    this.els.forEach((el) => {
      el.classList.add(className);
    });
  }

  removeClass (className) {
    this.els.forEach((el) => {
      el.classList.remove(className);
    });
  }

  children () {
    let childrenArray = [];
    this.els.forEach((el) => {
      let elsChildren = [].slice.call(el.children);
      childrenArray = childrenArray.concat(elsChildren);
    });
    return new DomNodeCollection(childrenArray);
  }

  parent () {
    return this.els.map((el) => el.parentElement);
  }

  find(selector) {
    let matchingDescendants = [];
    this.els.forEach((el) => {
      let elsMatchingDescendants = [].slice.call(el.querySelectorAll(selector));
      matchingDescendants = matchingDescendants.concat(elsMatchingDescendants);

    });
    return new DomNodeCollection(matchingDescendants);
  }

  remove(selector) {
    if (selector === undefined) {
      this.els.map(function(el) {
        let parent = el.parentNode;
        parent.removeChild(el);
      });
      this.els = [];
    } else {
      let selectedDescendants = this.find(selector);
      let newEls = arrayDifference(this.els, selectedDescendants.els);
    
      selectedDescendants.remove();
      this.els = newEls;
    }
  }

  on (eventType, callback) {
    this.els.forEach((el) => {
      el.addEventListener(eventType, callback);
      el.listeners.push(callback);
    });
  }

  off (eventType) {
    this.els.forEach((el) => {
      el.listeners.forEach((callback) => {
        el.removeEventListener(eventType, callback);
      });
    });
  }
}

function arrayDifference(arr1, arr2) {
  return arr1.filter(function(el) {
    return !arr2.includes(el);
  });
}
module.exports = DomNodeCollection;
