## 自定义事件学习和测试案例

#### 元素原型对象结构
`HTMLElement` 表示 `HTML` 元素。以一个 `<p>` 标签元素举例，其向上寻找原型对象用过会是这样：`HTMLParagraphElement.prototype` → `HTMLElement.prototype` → `Element.prototype` → `Node.prototype` → `Object.prototype` → `null`。这下您应该知道HTMLElement所处的位置了吧，上述代码HTMLElement直接换成Element也是可以的，但是会让其他元素（例如文本元素）也扩展addEvent方法，有些浪费了。

> 出处: [漫谈js自定义事件、DOM/伪DOM自定义事件--张鑫旭](https://www.zhangxinxu.com/wordpress/2012/04/js-dom%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6/)


#### 参考资料
+ [漫谈js自定义事件、DOM/伪DOM自定义事件](https://www.zhangxinxu.com/wordpress/2012/04/js-dom%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6/)
+ [HTML原型关系1 MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLParagraphElement)
+ [EventTarget MDN 介绍](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)