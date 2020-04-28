import layer from './component/layer';

// https://blog.csdn.net/qq_40323256/article/details/89282801
function postPlugin(option, callback) {
  layer.init();
  // console.log(112221111)
  // console.log(callback)
}

export default postPlugin

// import './css/index.less';
// import demo from './demo';
// import post from './post.tmpl'

// const text = 'this is append dom';
// const dom = `<p>${text}</p>`;

// $('body').append(dom);
// async function initDemo () {
//   let data = await demo();
//   console.log(data);
// }

// initDemo();
// console.log('render end11!')
// const users = []
// console.log(post)
// // $('#post').tmpl(users).appendTo('#root');
// $.tmpl( post, { "Name" : "John Doe" }).appendTo( "#root" );

              
