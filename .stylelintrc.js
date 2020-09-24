module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-scss',
    'stylelint-config-recess-order',
  ],
  rules: {
    'selector-max-id': 0,
    'at-rule-no-unknown': [true, {
      ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin'],
    }],
  },
};