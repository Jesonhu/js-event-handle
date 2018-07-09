/**
 * 自定义事件的添加、删除和触发
 * 
 * @author Jeson
 * @link https://www.zhangxinxu.com/wordpress/2012/04/js-dom%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6/
 * 
 * @example
 * ```
 * // add Event
 * Event('shake', callback);
 * // trigger Event
 * Event.trigger('shake');
 * // remove Event
 * Event.remove('shake', callback);
 * ```
 */

const Event = {
  _listeners: {},
  /** 
   * Add Event
   * 
   * @param {string} type 事件的类型
   * @param {Function} fn 事件处理函数--回调函数
   * @return {Event} this 
   */
  addEvent(type, fn) {
    if (typeof this._listeners[type] === 'undefined') {
      this._listeners[type] = [];
    }
    if (typeof fn === 'function') {
      this._listeners[type].push(fn);
    }
    return this;
  },
  /** 
   * Trigger Event
   * 
   * @param {string} type 事件的名称
   * @return {Event} this
   */
  triggerEvent(type) {
    const arrayEvent = this._listeners[type];
    if (arrayEvent instanceof Array) {
      for (let i = 0, length = arrayEvent.length; i < length; i++) {
        if (typeof arrayEvent[i] === 'function') {
          arrayEvent[i]({type: type});
        }
      }
    }
    return this;
  },
  /**
   * Remove Event
   * 
   * @param {string} type
   * @param {Function} fn 
   */
  removeEvent(type, fn) {
    const arrayEvent = this._listeners[type];
    if (typeof type === 'string' && arrayEvent instanceof Array) {
      if (typeof fn === 'function') {
        // 清除当前`type`类型下对应的`fn`方法
        for (let i = 0, length = arrayEvent.length; i < length; i++) {
          if (arrayEvent[i] === fn) {
            this._listeners[type].splice(i, 1);
            break;
          }
        }
      } else {
        // ???
        delete this._listeners[type];
      }
    }
    return this;
  }
}