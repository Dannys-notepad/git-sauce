const formatStatus = require('./formatStatus.js')

function runTests() {
  let passed = 0
  let failed = 0

  function assertEqual(actual, expected, testName) {
    if (actual === expected) {
      console.log(`✓ ${testName}`)
      passed++
    } else {
      console.error(`✗ ${testName}`)
      console.error(`  Expected: ${JSON.stringify(expected)}`)
      console.error(`  Actual:   ${JSON.stringify(actual)}`)
      failed++
    }
  }

  const sampleGitStatus = `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   bin/git-sauce.js

no changes added to commit (use "git add" and/or "git commit -a")`

  // Test 1: Identical output string
  assertEqual(formatStatus(sampleGitStatus), sampleGitStatus, 'returns identical status output string')

  // Test 2: Handles empty string
  assertEqual(formatStatus(''), '', 'handles empty string')

  // Test 3: Handles null/undefined gracefully
  assertEqual(formatStatus(null), '', 'handles null gracefully')
  assertEqual(formatStatus(undefined), '', 'handles undefined gracefully')

  console.log(`\nTests finished: ${passed} passed, ${failed} failed.`)
  if (failed > 0) {
    process.exit(1)
  }
}

runTests()
