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
        let argv3 = process.argv[3];
        if (argv3) {
            try {
                fs.mkdirSync(utils.projectPath(argv3))
            } catch (e) {
                throw new Error('文件夹已存在');
            }
        } else {
            console.log('utils.projectPath(\'./\')).length',utils.projectPath('./').length);
            if (fs.readdirSync(utils.projectPath('./')).length !== 0) {
                throw new Error('当前目录不为空');
            }
        }

        try {
            if (fs.readdirSync(utils.rootPath('assets')).length === 0) {
                // 下载资源
                utils.gitClone(utils.copy.bind(null, argv3));
            } else {
                utils.copy(argv3);
            }
        } catch (e) {
            utils.gitClone(utils.copy.bind(null, argv3));
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