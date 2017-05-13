// export default () => <div>Hello World !</div>;
export default () => {
  console.log(new Error('fail'));
  throw new Error('Error Thrown ! You can see the stack trace below:');
};
