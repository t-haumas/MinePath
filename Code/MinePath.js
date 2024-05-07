/**
 * This is the exported module (the entry point). It is not a driver class.
 */

// Imports
import GetProcedure from "./GetProcedure.js";
import EditObtainables from "./EditObtainables.js";
import FileIO from "./FileIO.js";

// Constants

// Global variables
let obtainables = {};

// Functions
function sayHellos() {
    console.log("MinePath.js will now run things from its two imports!");
    console.log(GetProcedure.getHello());
    console.log(EditObtainables.getHello());
}

function saveObtainablesObject() {
    FileIO.saveJSONToResourcesFile(obtainables, "obtainables.json");
}

export default {
    sayHellos,
    saveObtainablesObject
};
