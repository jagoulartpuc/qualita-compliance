const path = require('path');
module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: {
            ...config.alias,
            '@Components': path.resolve(__dirname, 'src/app/components'),
            '@Pages': path.resolve(__dirname, 'src/app/pages'),
            '@Utils': path.resolve(__dirname, 'src/app/utils'),
            '@Images': path.resolve(__dirname, 'src/assets/images'),
            '@Icons': path.resolve(__dirname, 'src/assets/icons'),
            '@StyleCommon': path.resolve(__dirname, 'src/app/style-common')
        },
    };
    return config;
};