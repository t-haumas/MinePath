import * as fs from 'fs';

const NUM_JSON_INDENT_SPACES = 4;

function readResourcesFileContent(filename) {
    return fs.readFileSync("Resources/"+filename, "utf-8");
}

function saveJSONToResourcesFile(object, filename) {
    fs.writeFileSync("Resources/"+filename, JSON.stringify(object, null, NUM_JSON_INDENT_SPACES), 'utf8')
}

export default {
    readResourcesFileContent,
    saveJSONToResourcesFile
};
