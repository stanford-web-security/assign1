#!/usr/bin/env node

const { join } = require('path')
const { writeFileSync } = require('fs')

const ROOT_PATH = join(__dirname, '..')

const exercises = require(join(ROOT_PATH, 'exercises', 'exercises.json'))

let output = ''

exercises.forEach(exercise => {
  if (exercise.heading) return

  output += `# ${exercise.name}\n\n\`\`\`\nTODO: Replace this with your solution.\n\`\`\`\n\n`
})

writeFileSync(join(ROOT_PATH, 'src', 'INPUTS.md'), output)
