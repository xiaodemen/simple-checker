module.exports = {
    verbose: true,
    roots: ['tests'],

    moduleFileExtensions: [
      'js',
      'json'
    ],

    transform: {
    //   '^.+\\.vue$': 'vue-jest',
    //   '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
      '^.+\\.js$': 'babel-jest'
    },

    // transformIgnorePatterns: [
    //     "node_modules/(?!(lodash|ve-ria|veui|vue-awsome|vue-void|resize-detector)/)"
    // ],

    // transformIgnorePatterns: [
    //     "node_modules",
    //     "dist"
    // ],

    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },

    // snapshotSerializers: [
    //   'jest-serializer-vue'
    // ],

    testMatch: [
      '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],

    testURL: 'http://localhost/'
};
