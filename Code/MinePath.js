/**
 * This is the exported module (the entry point). It is not a driver class.
 */

import GetProcedure from "./GetProcedure.js";
import EditObtainables from "./EditObtainables.js";

function sayHellos() {
    console.log("MinePath.js will now run things from its two imports!");
    console.log(GetProcedure.getHello());
    console.log(EditObtainables.getHello());  
}

export default {
    sayHellos
};
