console.log('Starging app');

setTimeout(() => { //takes 2 arguments, a function to fire and a delay of time
  console.log('Inside of callback');
}, 2000); // 2000 milliseconds = 2 seconds

setTimeout(() => { //setTimeout allows for other parts of the program to excute while it waits for function inside to execute after set time.
  console.log('Second setTimeout');
}, 0);

console.log('Finishing app');
