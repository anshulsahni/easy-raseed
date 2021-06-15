module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum':  [
      2,
      'always',
      [
        '🍺feat',
        '🐞fix',
        '🛠️refactor',
        '🧹lint',
        '🩺test',
        '📚docs',
        '🗄️database',
        '⚙️config',
        '🏗️build',
        '👮ci',
        '🚀deploy',
      ],
    ],
  },
};
