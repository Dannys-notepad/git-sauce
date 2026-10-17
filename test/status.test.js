const assert = require('assert')
const { parseGitStatus } = require('../lib/statusParser.js')

describe('parseGitStatus', () => {
  it('should parse untracked files', () => {
    const output = '?? new-file.js'
    const result = parseGitStatus(output)
    assert.deepStrictEqual(result, { untracked: ['new-file.js'] })
  })

  it('should parse modified files', () => {
    const output = ' M modified.js'
    const result = parseGitStatus(output)
    assert.deepStrictEqual(result, { modified: ['modified.js'] })
  })

  it('should parse staged files', () => {
    const output = 'A  staged.js'
    const result = parseGitStatus(output)
    assert.deepStrictEqual(result, { staged: ['staged.js'] })
  })

  it('should parse deleted files', () => {
    const output = 'D  deleted.js'
    const result = parseGitStatus(output)
    assert.deepStrictEqual(result, { deleted: ['deleted.js'] })
  })

  it('should parse renamed files', () => {
    const output = 'R  old.txt -> new.txt'
    const result = parseGitStatus(output)
    assert.deepStrictEqual(result, { renamed: [{ from: 'old.txt', to: 'new.txt' }] })
  })

  it('should parse multiple renamed files', () => {
    const output = 'R  old1.txt -> new1.txt\nR  old2.txt -> new2.txt'
    const result = parseGitStatus(output)
    assert.deepStrictEqual(result, {
      renamed: [
        { from: 'old1.txt', to: 'new1.txt' },
        { from: 'old2.txt', to: 'new2.txt' }
      ]
    })
  })

  it('should parse mixed status output', () => {
    const output = ' M modified.js\n?? untracked.js\nR  old.txt -> new.txt\nA  staged.js'
    const result = parseGitStatus(output)
    assert.deepStrictEqual(result, {
      modified: ['modified.js'],
      untracked: ['untracked.js'],
      renamed: [{ from: 'old.txt', to: 'new.txt' }],
      staged: ['staged.js']
    })
  })

  it('should handle empty output', () => {
    const output = ''
    const result = parseGitStatus(output)
    assert.deepStrictEqual(result, {})
  })

  it('should handle output with only whitespace', () => {
    const output = '   \n  \n'
    const result = parseGitStatus(output)
    assert.deepStrictEqual(result, {})
  })
})

