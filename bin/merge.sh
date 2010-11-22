cd ..
git submodule init
git submodule update
cat source/curiemap.js source/propertymap.js source/core.js > js3.js
cat js3.js source/node.exports.js > js3.node.js
java -jar ../yui.jar js3.js > js3.min.js
