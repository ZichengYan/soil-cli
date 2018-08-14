const exec = require('child_process').exec;
const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');

const conf = {
    repo: 'https://github.com/robert196/soil.git',
    dist: rootPath('./assets')
};

function pathJoin() {
    return path.join.apply(null, arguments);
}

function rootPath(str) {
    return pathJoin(__dirname, '../../', str);
}

function projectPath(str) {
    return pathJoin(process.cwd(), str);
}

function mkdirSync(path) {
    // 是否存在
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
}

module.exports = {
    gitClone: function (cb) {
        mkdirSync(rootPath('./assets'));
        exec(`git clone ${conf.repo} ${conf.dist}`, cb);
    },
    gitPull: function (cb) {
        exec(`git pull ${conf.repo} ${conf.dist}`, cb);
    },
    copy: function (path, error) {
        if (error) {
            console.log('child_process:', error);
        }
        const p = projectPath(path || './');
        fse.removeSync(path.join(conf.dist, '.git'))
        mkdirSync(p);
        fse.copy(conf.dist, p)
            .then(() => console.log('success!'))
            .catch(err => console.error(err))
    },
    rootPath: rootPath,
    projectPath: projectPath
}