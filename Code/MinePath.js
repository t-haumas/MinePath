/**
 * This is the exported module (the entry point). It is not a driver class.
 */

// Imports
import GetProcedure from "./GetProcedure.js";
import EditObtainables from "./EditObtainables.js";
import FileIO from "./FileIO.js";

// Constants
const TYPE_STRINGS = ["inventory", "milestone"];

// Global variables
let obtainables = {};
let actions = {};
let initialized = false;
let buildingAction = {};
let buildingRequirements = [];
let buildingYields = [];
let buildingActionEntryString;

// Functions
function sayHellos() {
    console.log("MinePath.js will now run things from its two imports!");
    console.log(GetProcedure.getHello());
    console.log(EditObtainables.getHello());
}

function init() {
    obtainables = JSON.parse(FileIO.readResourcesFileContent("obtainables.json"));
    actions = JSON.parse(FileIO.readResourcesFileContent("actions.json"));
    initialized = true;
}

function getObtainablesObject() {
    return obtainables;
}

function getActionsObject() {
    return actions;
}

function startNewAction(name) {
    buildingActionEntryString = name;
}

function addNewObtainable(name, type, action) {
    let obtainableEntryString = getObtainableEntryString(name, type);
    obtainables[obtainableEntryString] = {};
    obtainables[obtainableEntryString]["name"] = name;
    obtainables[obtainableEntryString]["type"] = type;
    obtainables[obtainableEntryString]["action"] = action;
}

function addActionRequirement(name, type, amount) {
    if (!isValidAmount(amount)) {
        throw "Invalid requirement amount: " + amount;
    }

    let newRequirement = {};
    newRequirement["name"] = name;
    newRequirement["type"] = type;
    newRequirement["amount"] = amount;
    buildingRequirements.push(newRequirement);
}

function addActionYields(name, type, amount) {
    if (!isValidAmount(amount)) {
        throw "Invalid requirement amount: " + amount;
    }

    let newYield = {};
    newYield["name"] = name;
    newYield["type"] = type;
    newYield["amount"] = amount;
    buildingYields.push(newYield);
}

/**
 * This will also update an obtainable that already exists at this key.
 */
function submitAction() {
    if (Object.keys(buildingRequirements).length === 0 && Object.keys(buildingYields).length === 0) {
        console.error("cannot submit an object that hasn't been built!");
    } else {
        buildingAction["requirements"] = buildingRequirements;
        buildingAction["yields"] = buildingYields;
        actions[buildingActionEntryString] = buildingAction;
        buildingAction = {};
        buildingRequirements = [];
        buildingYields = [];
        buildingActionEntryString = undefined;
    }
}

function getObtainableEntryString(name, type, from) {
    // inventory_OR_milestone: obtainable_name <from method>
    let entryString = "";
    if (TYPE_STRINGS.includes(type)) {
        entryString += type + ": " + name;
        if (from !== undefined) {
            entryString += " from " + from; // From is not currently being used.
        }
    } else {
        throw "Bruh, you said '" + type + "' as a type, but it has to be one of these: " + TYPE_STRINGS + ".";
    }
    return entryString;
}

function isValidAmount(x) {
    return (typeof x === 'number' && Number.isInteger(x) && x >= 1);
}

let alreadyExplored = [];

function getUnresolvedReferences(goal) {
    let unresolvedObtainables = new Set();
    let unresolvedActions = new Set();
    if (!alreadyExplored.includes(goal)) {
        alreadyExplored.push(goal);
        if (goal in obtainables) {
            let currentObtainable = obtainables[goal];
            let currentAction = currentObtainable["action"];
            if (currentAction in actions) {
                let findings = getUnresolvedReferences(currentAction);
                unresolvedActions = new Set([...unresolvedActions, ...findings["unresolved actions:"]]);
                unresolvedObtainables = new Set([...unresolvedObtainables, ...findings["unresolved obtainables:"]]);
            } else {
                unresolvedActions.add(currentAction);
            }
        } else if (goal in actions) {
            let currentAction = actions[goal];
            let currentRequirements = currentAction["requirements"];
            for (let i = 0; i < currentRequirements.length; i++) {
                let currentRequirement = getObtainableEntryString(currentRequirements[i]["name"], currentRequirements[i]["type"]);
                if (currentRequirement in obtainables) {
                    let findings = getUnresolvedReferences(currentRequirement);
                    unresolvedActions = new Set([...unresolvedActions, ...findings["unresolved actions:"]]);
                    unresolvedObtainables = new Set([...unresolvedObtainables, ...findings["unresolved obtainables:"]]);
                } else {
                    unresolvedObtainables.add({ name: currentRequirements[i]["name"], type: currentRequirements[i]["type"] });
                }
            }

            // Can also copy above block for yields.

        } else {
            throw goal + " is not an entry in the obtainables or actions list.";
        }
    }
    return {"unresolved actions:" : unresolvedActions, "unresolved obtainables:" : unresolvedObtainables};
}

function save() {
    FileIO.saveJSONToResourcesFile(obtainables, "obtainables.json");
    FileIO.saveJSONToResourcesFile(actions, "actions.json");
}

export default {
    sayHellos,
    getObtainablesObject,
    addNewObtainable,
    startNewAction,
    addActionRequirement,
    addActionYields,
    submitAction,
    getUnresolvedReferences,
    init,
    getActionsObject,
    save
};
