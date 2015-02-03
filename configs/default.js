module.exports = {
    urlPrefix: '',

    project: {},

    roadmap: {
        path: [
            {
                //一级同名组件，可以引用短路径，比如sea-modules/jquery/juqery.js
                //直接引用为var $ = require('jquery');
                reg: /^\/sea-modules\/([^\/]+)\/\1\.(js|coffee|less|css)$/i,
                //是组件化的，会被jswrapper包装
                isMod: false,
                //less和css文件会做csssprite处理
                useSprite: false,
                useOptimizer: false,
                //id为文件夹名
                id: '$1'
            },
            {
                //sea-modules目录下的其他文件
                reg: /^\/sea-modules\/(.*)\.(js|coffee|less|css)$/i,
                isMod: false,
                useSprite: false,
                useOptimizer: false,
                //id是去掉sea-modules和.js后缀中间的部分
                id: '$1'
            },
            {
                //.mixin.less后缀的文件
                reg: /\.mixin\.less$/,
                //仅当做函数调用，不发布
                release: false
            },
            {
                //其他js、css、coffee、less文件
                reg: /\.(js|coffee|css|less)$/,
                //less和css文件会做csssprite处理
                useSprite: true,
                //不要放到js资源表里
                useMap: false
            },
            {
                //readme文件，不要发布
                reg: /\/readme.md$/i,
                release: false
            },
            {
                //前端模板
                reg: '**.tmpl',
                //当做类html文件处理，可以识别<img src="xxx"/>等资源定位标识
                isHtmlLike: true,
                //只是内嵌，不用发布
                release: false
            },
            {
                //map.json没什么用，就不要发布了
                reg: 'map.json',
                release: false
            }
        ],
        ext: {
            //less输出为css文件
            less: 'css',
            //coffee输出为js文件
            coffee: 'js',
            // tpl 编译为js模版函数
            tpl: 'js'
        }
    },

    modules: {//fis插件配置
        parser: {
            //.tmpl后缀的文件使用fis-parser-utc插件编译
            tmpl: 'utc',
            //.coffee后缀的文件使用fis-parser-coffee-script插件编译
            coffee: 'coffee-script',
            //.less后缀的文件使用fis-parser-less插件编译
            less: 'less'
        },

        postprocessor: {
            js: ['jswrapper', 'handlebars']
        },

        lint: {
            js: 'jshint'
        },

        postpackager: ['mainpack', 'seajs'],

        optimizer: {
            js: ['ng-annotate', 'uglify-js'],
            css: 'clean-css',
            png: 'png-compressor'
        }
    },

    settings: {
        parser: {
            'coffee-script': {
                //不用coffee-script包装作用域
                bare: true
            }
        },
        lint: {
            jshint: {
                //排除对lib和jquery、backbone、underscore的检查
                ignored: ['assets/**', /jquery|backbone|underscore|\$|bootstrap/i],
                //使用中文报错
                i18n: 'zh-CN'
            }
        },
        postprocessor: {
            jswrapper: {
                //用fis的js包装器，更方便书写
                type: 'amd'
            }
        },
        optimizer: {
            'uglify-js': {
                mangle: {
                    //不要压缩require关键字，否则seajs会识别不了require
                    except: ['require']
                }
            }
        }
    }
};