#!/usr/bin/env node
const { execSync } = require('child_process');

const resultsDir = 'allure-results';
const reportDir = 'allure-report';
const shouldOpen = process.argv.includes('--open');

function checkJavaRuntime() {
  try {
    execSync('java -version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

if (!checkJavaRuntime()) {
  console.error('Java runtime not found. Allure CLI requires Java to generate reports.');
  console.error('Install Java (JRE or JDK) from https://www.java.com or via your package manager.');
  process.exit(1);
}

try {
  console.log(`Generating Allure report from ${resultsDir} to ${reportDir}...`);
  execSync(`npx allure generate ${resultsDir} --clean -o ${reportDir}`, { stdio: 'inherit' });

  if (shouldOpen) {
    console.log(`Opening Allure report from ${reportDir}...`);
    execSync(`npx allure open ${reportDir}`, { stdio: 'inherit' });
  }

  console.log('Allure report generation complete.');
} catch (error) {
  console.error('Failed to generate Allure report.');
  process.exit(error.status || 1);
}
