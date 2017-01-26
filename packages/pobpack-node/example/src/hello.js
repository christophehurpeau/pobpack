const interval = setInterval(() => {
  console.log('hello !!');
}, 2000);

if (module.hot) {
  module.hot.dispose(() => clearInterval(interval));
}
