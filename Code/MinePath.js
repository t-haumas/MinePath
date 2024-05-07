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
let initialized = false;
let buildingObtainable = {};
let buildingRequirements = [];
let buildingObtainableEntryString;

// Functions
function sayHellos() {
    console.log("MinePath.js will now run things from its two imports!");
    console.log(GetProcedure.getHello());
    console.log(EditObtainables.getHello());
}

function saveObtainablesObject() {
    FileIO.saveJSONToResourcesFile(obtainables, "obtainables.json");
}

function readObtainablesObject() {
    obtainables = JSON.parse(FileIO.readResourcesFileContent("obtainables.json"));
    initialized = true;
}

function getObtainablesObject() {
    return obtainables;
}

function startNewObtainable(name, type, action, from) {
    buildingObtainable["name"] = name;
    buildingObtainable["type"] = type;
    buildingObtainable["action"] = action;
    buildingObtainable["requirements"] = [];
    buildingObtainableEntryString = getObtainableEntryString(name, type, from);
}

function addObtainableRequirement(name, type, amount, from) {
    //"name": "* required_obtainable_name <from method>",
    // "type": "* inventory_OR_milestone",
    // "amount": "* 1 for milestone, 1-infinity for inventory"
    if (!isValidAmount(amount)) {
        throw "Invalid requirement amount: " + amount;
    }

    let newRequirement = {};
    newRequirement["entry"] = getObtainableEntryString(name, type, from);
    newRequirement["amount"] = amount;
    buildingRequirements.push(newRequirement);
}

/**
 * This will also update an obtainable that already exists at this key.
 */
function submitObtainable() {
    if (Object.keys(buildingObtainable).length === 0) {
        console.error("cannot submit an object that hasn't been built!");
    } else {
        buildingObtainable["requirements"] = buildingRequirements;
        obtainables[buildingObtainableEntryString] = buildingObtainable;
        buildingObtainable = {};
        buildingRequirements = [];
    }
}

function getObtainableEntryString(name, type, from) {
    // inventory_OR_milestone: obtainable_name <from method>
    let entryString = "";
    if (TYPE_STRINGS.includes(type)) {
        entryString += type + ": " + name;
        if (from !== undefined) {
            entryString += " from " + from;
        }
    } else {
        throw "Bruh, you said '" + type + "' as a type, but it has to be one of these: " + TYPE_STRINGS + ".";
    }
    return entryString;
}

function isValidAmount(x) {
    return (typeof x === 'number' && Number.isInteger(x) && x >= 1);
}

export default {
    sayHellos,
    saveObtainablesObject,
    readObtainablesObject,
    getObtainablesObject,
    startNewObtainable,
    addObtainableRequirement,
    submitObtainable
};
