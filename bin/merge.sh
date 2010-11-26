cd ..
git submodule init
git submodule update
cat source/curiemap.js source/propertymap.js source/api.js source/core.js > js3b.js
cat js3b.js source/context.js lib/rdfa-api/source/parsers.js lib/rdfa-api/source/serializers.js lib/rdfa-api/source/filters.js > js3.js
cat js3.js source/html-scripts.js > js3.dom.js
cat js3.js source/node.exports.js > js3.node.js
java -jar ../yui.jar js3.js > js3.min.js
java -jar ../yui.jar js3.dom.js > js3.dom.min.js