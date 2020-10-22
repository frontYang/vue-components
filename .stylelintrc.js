module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [true, {
      'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin']
    }],
    "selector-pseudo-element-no-unknown": null,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'rule-empty-line-before': 'always',
  },
  ignoreFiles: [
    'node_modules/**/*',
    'build/**/*',
    'server/**/*',
    'tests/**/*',
    'dist/**/*',
    'src/mock/**/*'
  ],
}