import * as fs from 'fs';

const NUM_JSON_INDENT_SPACES = 2;

function saveJSONToResourcesFile(object, filename) {
    fs.writeFileSync("Resources/"+filename, JSON.stringify(object, null, NUM_JSON_INDENT_SPACES), 'utf8')
}

export default {
    saveJSONToResourcesFile
};
