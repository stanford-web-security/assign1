const test = require('tape')
const { existsSync, readFileSync } = require('fs')
const { join, relative } = require('path')

const ROOT_PATH = join(__dirname, '..')
const SRC_PATH = join(ROOT_PATH, 'src')

test('Check that src/ looks reasonable', t => {
  const paths = [
    'SOLUTIONS.md',
    'SURVEY.md'
  ]

  paths
    .map(path => join(SRC_PATH, path))
    .forEach(path => {
      assertExists(t, path)
      assertNoTodo(t, path)
    })

  t.end()
})

function assertExists (t, path) {
  const relPath = relative(ROOT_PATH, path)
  t.ok(existsSync(path), `ensure ${relPath} exists`)
}

function assertNoTodo (t, path) {
  const relPath = relative(ROOT_PATH, path)
  t.ok(
    !readFileSync(path, 'utf8').includes('TODO'),
    `ensure ${relPath} does not contain the string "TODO"`
  )
}
