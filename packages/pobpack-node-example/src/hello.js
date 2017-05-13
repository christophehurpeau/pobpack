const interval = setInterval(() => {
  console.log('hello !');
}, 1000);

if (module.hot) {
  module.hot.dispose(() => clearInterval(interval));
}
