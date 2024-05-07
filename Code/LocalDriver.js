/**
 * This is for running the application locally using node. It should only import MinePath and run one thing from it.
 */

import MinePath from "./MinePath.js";



MinePath.readObtainablesObject();


MinePath.startNewObtainable("stick", "inventory", "craft a stick", "crafting");
MinePath.addObtainableRequirement("wooden plank", "inventory", 2, "crafting");
MinePath.submitObtainable();



MinePath.saveObtainablesObject();

console.log(MinePath.getObtainablesObject());
