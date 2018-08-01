const program = require('commander');
const fs = require('fs');
const utils = require('./utils/index');


program
    .version(require('../package.json').version)
    .parse(process.argv);

//子命令
program
    .command('init')
    .description('初始化项目')
    .alias('i')
    .action(function () {
        try {
            if (fs.readdirSync(utils.rootPath('assets')).length === 0) {
                // 下载资源
                utils.gitClone(utils.copy);
            } else {
                utils.copy();
            }
        } catch (e) {
            console.log('try init报错:', e);
            utils.gitClone(utils.copy);
        }
    })

//子命令
/*
program
    .command('update')
    .description('更新模板')
    .alias('u')
    .action(function () {
        if (fs.readdirSync(utils.resolve('assets')).length !== 0) {
            // 下载资源
            utils.gitPull(function (err){
                console.log(err);
                    if(!err){
                        console.log('更新成功');
                    }
            });
        }
    })
*/

program.parse(process.argv);