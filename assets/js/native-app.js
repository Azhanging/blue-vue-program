//原生webview配合使用，任务队列运行

function NativeApp() {
  //所有的执行完毕的队列
  this.tasks = [];
}

/*添加任务*/
NativeApp.prototype.addTask = function (fn) {
  if (typeof fn !== 'function') return;
  this.tasks.push(fn);
};

/*允许所有的加入的任务*/
NativeApp.prototype.take = //历史命名问题
  NativeApp.prototype.task = function () {
    while (this.tasks.length !== 0) {
      try {
        this.tasks.shift().call(this);
      } catch (e) {
        console.warn(e);
      }
    }
  };

const nativeApp = new NativeApp();

export default nativeApp;