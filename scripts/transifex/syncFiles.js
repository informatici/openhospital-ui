const glob = require('glob');
const _ = require('lodash');
const fs = require('fs');
const sourcePath = "./src/resources/old/";
const destPath = "./src/resources/i18n";

glob(destPath + "/*.json", {}, function (
  error,
  destFiles
) {

  // Open all files inside the i18n folder
  destFiles.forEach(function (destFile) {

    // Read i18n file (destFile) 
    fs.readFile(destFile, 'utf8', function (err, destData) {
      const jsonDestData = JSON.parse(destData);      
      const destFileName = destFile.split("/").slice(-1).pop();

      // Open the old file (sourceFile)
      fs.readFile(sourcePath + "/" + destFileName, 'utf8', function (err, sourceFile) {
        const jsonSourceFile = JSON.parse(sourceFile);
        var newJsonFile = generateNewJson(jsonDestData, jsonSourceFile);

        fs.writeFile(destPath + "/" + destFileName, JSON.stringify(newJsonFile, null, 2), function writeJSON(err) {
          if (err) return console.log(err);
          console.log('writing to ' + destPath + "/" + destFileName);
        });
      });
    });
  });
});

function generateNewJson(object, target) {
  const clonedObj = { ...object };
  const entries = Object.entries(clonedObj);

  entries.forEach(([key, value]) => {
    if (typeof value === "object") {
      clonedObj[key] = generateNewJson(value, target);
    } else {
      var targetValue = findTargetVal(target, key);
      if(targetValue){
        clonedObj[key] = targetValue; 
      }
    }
  });
  return clonedObj;
};

function findTargetVal(object, key) {
  var value = null;
  Object.keys(object).some(function(k) {
    if (object[k] && typeof object[k] === 'object') {
      value = findTargetVal(object[k], key);
      return value !== null;
    } else if (object[k] && typeof object[k] !== 'object') {
      if(k === key) {
        value = object[k];
        return true;
      }
    }
  });
  return value;
}