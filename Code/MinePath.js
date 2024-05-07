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

function addObtainable(name, type, requirements, action, from) {
    let entryString = getObtainableEntryString(name, type, from);
    obtainables[entryString] = {};
    obtainables[entryString]["name"] = name;
    obtainables[entryString]["type"] = type;
    obtainables[entryString]["action"] = action;
    obtainables[entryString]["requirements"] = requirements;
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

export default {
    sayHellos,
    saveObtainablesObject,
    readObtainablesObject,
    getObtainablesObject,
    addObtainable
};
