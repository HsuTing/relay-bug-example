module.exports ={
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver', {
        root: ['./src'],
      },
    ],
    '@babel/proposal-optional-chaining',
    'relay'
  ],
};
