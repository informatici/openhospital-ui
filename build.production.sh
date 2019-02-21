echo 'Start building:'

echo '- removing node_modules'
rm -rf ./node_modules

echo '- removing dist'
rm -rf ./dist

echo '- installing npm dependencies'
export NODE_ENV=development && npm install

echo '- (skip) running tests'
# npm test -- --ci --bail

echo '- building js'
export NODE_ENV=production && npm run build

echo '- packaging build.zip'
npm run build:zip

echo 'Built!'
