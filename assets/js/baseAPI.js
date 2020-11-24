// 注意：每次调用$.get()或$.post的时候，会先调用这个函数
$.ajaxPrefilter(function (options) {
   console.log(options.url);
 options.url = 'http://ajax.frontend.itheima.net' + options.url
//    
})