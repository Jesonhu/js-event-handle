/**
 * 简单仿`jQuery`.
 * 
 * 下面即将展示的代码目的在于学习与认识，要想实际应用可能还需要在细节上做些调整。
 * 例如，下面测试的包装器仅仅只是包裹DOM元素，并非选择器之类；$符号未增加冲突处理，
 * 且几个重要方法都暴露在全局环境中，没有闭包保护等。
 */
const $ = function(el) {
  return new _$(el);
}
const _$ = function(el) {
  this.el = el;
}
_$.prototype = {
  constructor: this,
  /**
   * 添加自定义事件
   * 
   * @param {string} type 事件里的类型
   * @param {Function} fn 事件处理函数
   * @param {[boolean]} capture 是否可以捕获
   * @return {_$} this 
   */
  addEvent: function (type, fn, capture) {
    const el = this.el;
    if (window.addEventListener) {
      el.addEventListener(type, fn, capture);
    } else if (window.attachEvent) {
      el.attachEvent(`on${type}`, fn);
    }
    return this;
  }
}

/**
 * 自定义事件的触发 start ===============
 */
const oBtn1 = document.getElementById('btn1');
const oBtn2 = document.getElementById('btn2');
$(oBtn1).addEvent('alert', () => {
  alert('弹弹弹，弹走鱼尾纹~~alert');
});
$(oBtn2).addEvent('alert', () => {
  alert('弹弹弹，弹走鱼尾纹222~~alert');
});

// 触发事件
// @link https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent
// 创建
const event = document.createEvent('Event');
// 初始化
event.initEvent('alert', true, true);
// 触发，即弹出文字
setTimeout(() => {
  oBtn1.dispatchEvent(event);
}, 3000);

//  自定义事件的触发 end ===============