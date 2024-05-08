/**
 * This is for running the application locally using node. It should only import MinePath and run one thing from it.
 */

import MinePath from "./MinePath.js";



MinePath.init();

// MinePath.addNewObtainable("crafting table", "milestone", "craft a crafting table");
// MinePath.addNewObtainable("coal", "inventory", "mine coal");
// MinePath.addNewObtainable("world: water source block", "inventory", "find a water source block");
// MinePath.addNewObtainable("wooden pickaxe", "milestone", "craft a wooden pickaxe");

MinePath.startNewAction("craft a crafting table");
MinePath.addActionRequirement("wooden planks", "inventory", 4);
MinePath.addActionYields("crafting table", "milestone", 1);
MinePath.submitAction();

// MinePath.startNewAction("mine coal");
// MinePath.addActionRequirement("wooden pickaxe", "milestone", 1);
// MinePath.addActionYields("coal", "inventory", 1);
// MinePath.submitAction();

// MinePath.startNewAction("find a water source block");
// MinePath.addActionYields("world: water source block", "inventory", 1);
// MinePath.submitAction();

// MinePath.startNewAction("make an infinite water source");
// MinePath.addActionRequirement("world: water source block", "inventory", 2);
// MinePath.addActionRequirement("bucket", "milestone", 1);
// MinePath.addActionYields("world: infinite water source", "milestone", 1);
// MinePath.submitAction();

MinePath.save();


console.log(MinePath.getUnresolvedReferences("goal: a diamond and an obsidian"));
