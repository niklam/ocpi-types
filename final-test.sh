#!/bin/bash

# Build package
npm run build

# Pack and test locally one more time
npm pack

# Test in a separate directory
mkdir -p ~/final-test && cd ~/final-test
npm init -y
npm install /Users/niklaslampen/PhpStormProjects/ocpi-types-v2_2_1//ocpi-types-1.0.0.tgz

# Final test
node -e "console.log('Final test:'); console.log(require('ocpi-types'))"

# Clean up
cd .. && rm -rf ~/final-test

