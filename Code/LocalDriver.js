/**
 * This is for running the application locally using node. It should only import MinePath and run one thing from it.
 */

import MinePath from "./MinePath.js";

MinePath.readObtainablesObject();
MinePath.saveObtainablesObject();

console.log(MinePath.getObtainablesObject());
