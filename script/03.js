/**
 * 兼容添加事件方法
 * @desc 兼容不支持`addEventListener`的版本如IE6 7
 * @link https://www.zhangxinxu.com/wordpress/2012/04/js-dom%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6/
 */
if (window.HTMLElement) {
  /**
   * 使用原型扩展DOM自定义事件
   * 
   * @param {string} type 事件的类型
   * @param {Function} fn 事件的处理函数
   * @param {[boolean]} capture 是否可以捕获 
   */
  // 这里最好不用用监听函数，因为这里`this`指向`window` 
  // HTMLElement.prototype.addEvent = (type, fn, capture) => {
  HTMLElement.prototype.addEvent = function(type, fn, capture) {
    const el = this;
    // 支持的浏览器
    if (window.addEventListener) {
      el.addEventListener(type, e => {
        fn.call(el, e);
        console.log(1);
      }, capture);
    } else if (window.attachEvent){
      el.attachEvent(`on${type}`, e => {
        fn.call(el, e);
      });
    }
  }
} else {
  // 如果是不支持HTMLElement扩展的浏览器
  // 通过遍历所有元素扩展DOM事件
  const elAll = document.all;
  const AllLength = elAll.length;
  for (let i = 0; i < AllLength; i++) {
    const el = this;
    // attachEvent()现在已被移除 MDN 标准
    // 不推荐再使用
    // el.attachEvent(`on${type}`, e => {
    //   fn.call(el, e);
    // });
    // 推荐做法
    if (window.addEventListener) {
      el.addEventListener(type, () => {
        fn.call(el, e);
      }, capture);
    } else if (window.attachEvent){
      el.attachEvent(`on${type}`, e => {
        fn.call(el, e);
      });
    }
  }
}


// 页面效果测试
// `alert` 不是一个内置事件，此时这里不能被监听到
// `click` 是内置事件，可以被监听到
const oBtn1 = document.getElementById('btn1');
oBtn1.addEventListener('alert', () => {
  alert('弹出');
});
// oBtn1.addEventListener('click', () => {
//   alert('弹出');
// });

// `addEvent` 测试代码
const oBtn2 = document.getElementById('btn2');
oBtn2.addEvent('click', function() {
  // `oBtn2`是按钮，按钮有`type`属性
  alert(`这是：${this.type}`);
});