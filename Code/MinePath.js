import HelloWorld from "./HelloWorld.js";

function sayHellos() {
    HelloWorld.sayHello();
    HelloWorld.sayGoodbye();    
}

function getHello() {
    return "Hello from MinePath.js!";
}

export default {
    getHello,
    sayHellos
};
