import * as fs from 'fs';

const hello = fs.readFileSync("Resources/test.txt", "utf-8");

function sayHello() {
    console.log(hello);
}

function sayGoodbye() {
    console.log("Goodbye world");
}

export default { sayHello, sayGoodbye };
