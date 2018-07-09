const EventHandle = function() {
  /** 
   * like this --- 像这样的结构
   * _listener = {
   *   "click": [func1, func2],
   *   "custom": [func3],
   *   "defined": [func4, func5, func6]
   * }
   */
  this._listener = {};
}
EventHandle.prototype = {
  constructor: this,
  /**
   * Add Event -- 添加一个事件
   * 
   * @param {string} type
   * @param {Function} fn
   * @return {Event} this
   * @example
   * ```
   * const event = new Event();
   * event.addEvent('click', fn1);
   * event.addEvent('shake', fn2);
   * ```
   */
  addEvent: function(type, fn) {
    if (typeof type === 'string' && typeof fn === 'function') {
      if (typeof this._listener[type] === 'undefined') {
        this._listener[type] = [fn];
      } else {
        this._listener[type].push(fn);
      }
    }
    return this;
  },
  /**
   * Add Events -- 添加多个事件
   * 
   * @param {Object} obj 添加多个事件的对象
   * @return {Event} this
   * @see Event.addEvent()
   * @example
   * ```
   * const event = new Event();
   * event.addEvents({
   *  'once': fn1,
   *  'infinity': fn2,
   *  'click': fn3 
   * });
   * ``` 
   */
  // 这样`this`变了
  // addEvents: obj => {
  addEvents: function(obj) {
    obj = typeof obj === 'object' ? obj : {};
    for (let key in obj) {
      if (key && typeof obj[key] === 'function') {
        this.addEvent(key, obj[key]);
      }
    }
    return this;
  },
  /**
   * Trigger Event -- 触发指定的对象
   * 
   * @param {string} type 事件的类型
   * @return {Event} this
   * @example
   * ```
   * ```
   */
  triggerEvent: function(type) {
    if (type && this._listener[type]) {
      const event = {
        type: type,
        target: this
      }
      for (let i = 0, length = this._listener[type].length; i < length; i++) {
        this._listener[type][i].call(this, event);
      }
    }
    return this;
  },
  /**
   * Trigger Events -- 触发全部的事件
   * 
   * @param {Array} arr 多个事件构成的数组
   * @return {Event} this
   * @example
   * ```
   * ```
   */
  triggerEvents: function(arr) {
    if (arr instanceof Array) {
      for (let i = 0; i < arr.length; i++) {
        this.triggerEvent(arr[i]);
      }
    }
    return this;
  },
  /**
   * Remove Event --- 删除事件
   * @param {string} type 事件的类型
   * @param {Function|Array} key 可省略 | 对应的回调函数 | 数组
   * @return this
   * @example
   * ```
   * const event = new Event();
   * event.addEvent('shake', fn1);
   * 
   * event.removeEvent('shake', fn1) 
   * // or
   * event.removeEvent('shake')
   * ```
   */
  removeEvent: function(type, key) {
    const listeners = this._listener[type];
    if (listeners instanceof Array) {
      // `key`是函数即对应的`callback`时
      if (typeof callback === 'function') {
        for (let i = 0; i < listeners.length; i++) {
          if (listeners[i] === key) {
            // 移除这个
            listeners.splice(i, 1);
            break;
          }
        }
      } else if (key instanceof Array) { // `key`为数组时
        for (let j = 0; j < key.length; j++) {
          this.removeEvent(type, key[j]);
        }
      } else { // 上面都不符合或者没有传`key`时
        delete this._listener[type];
      }
    }
    return this;
  },
  /**
   * Remove Events -- 移除多个事件
   * 
   * @param {Array|Object} arr 事件构成的数组
   * @return {Event} this
   * @example
   * ```
   * ```
   */
  removeEvents: function(params) {
    if (arr instanceof Array) {
      for (let i = 0; i < params.length; i++) {
        this.removeEvent(params[i]);
      }
    } else if (typeof params === 'object') {
        for (let type in params) {
          this.removeEvent(type, params[type]);
        }
    }
    return this;
  }

}

// 页面功能测试 =====
const event = new EventHandle();
event.addEvents({
  'once': function() {
  // `箭头`函数的写法，里面`this`为`window`  
  // 'once': () => {
    alert('该弹框只会弹出一次');
    this.removeEvent('once');
  },
  'infinity': () => {
    alert('每次点击页面，该弹框都会出现!');
  }
});

document.addEventListener('click', e => {
  e = e || window.event;
  const target = e.target || e.srcElement;
  const regExp = /input|button/i;
  if (!target || !regExp.test(target.tagName)) {
    event.triggerEvents(['once', 'infinity']);
  }
});