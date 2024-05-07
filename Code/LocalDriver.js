/**
 * This is for running the application locally using node. It should only import MinePath and run one thing from it.
 */

import MinePath from "./MinePath.js";

let diamondRequirements = [
    {
        "name": "iron pickaxe from crafting",
        "type": "milestone",
        "amount": 1
    }
];

let autoFurnaceRequirements = [
    {
        "name": "furnace from crafting",
        "type": "inventory",
        "amount": 1
    },
    {
        "name": "hopper from crafting",
        "type": "inventory",
        "amount": 3
    }
];

MinePath.readObtainablesObject();
MinePath.addObtainable("diamond", "inventory", diamondRequirements, "mine a diamond", "mining");
MinePath.addObtainable("auto-furnace", "milestone", autoFurnaceRequirements, "build an auto-furnace");
MinePath.saveObtainablesObject();

console.log(MinePath.getObtainablesObject());
