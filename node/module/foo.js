exports.a = function(){
  console.log('a')
}

module.exports = {a: 2}
exports.a = 1

// Node.js加载了hello.js后，它可以把代码包装一下，变成这样执行：
(function () {
  // 读取的hello.js代码:
  var s = 'Hello';
  var name = 'world';

  console.log(s + ' ' + name + '!');
  // hello.js代码结束
})();