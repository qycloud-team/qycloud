fis.config.set("roadmap.path", [
    {
        reg: /^\/sea-modules\/.*\-debug\.\w*$/i,
        release: false
    },
    {
        reg: /^\/sea-modules\/(.*)\.(js|coffee|less|css|properties|bcmap|cur)$/i,
        isMod: false,
        useSprite: false,
        useOptimizer: false,
        id: '$1',
        url: '/os/sea-modules/$1.$2',
        release: '/os/sea-modules/$1.$2'
    },
    {
        reg: /^\/sea-modules\/(.*)\.(json|swf)$/i,
        isMod: false,
        useSprite: false,
        release: '/os/sea-modules/$1.$2'
    },
    {
        reg: /^\/app\/(.*)\.(js|coffee|less|css)$/i,
        //是组件化的，会被jswrapper包装
        isMod: true,
        useSprite: false,
        isAngular: true,
        //id是去掉sea-modules和.js后缀中间的部分
        id: 'app/$1',
        url: '/os/sea-modules/app/$1.$2',
        release: '/os/app/$1.$2'
    },
    {
        //sea-modules目录下的其他文件
        reg: /^\/app\/(.*)\.tpl$/i,
        isMod: false,
        useSprite: false,
        isHbsFile: true,
        isHtmlLike: true,
        release: false
    },
    {
        reg: /\/pages\/(\w*)\.html/i,
        isMod: false,
        useMap: false,
        release: '/os/$1.html'
    },
    {
        reg: '/assets/css/less/*.less',
        release: false
    },
    {
        reg: '/assets/img/**',
        useOptimizer: false,
        useSprite: false,
        release: '/os/$&'
    },
    {
        reg: '/assets/js/**',
        useOptimizer: false,
        release: '/os/$&'
    },
    {
        reg: '/assets/**',
        isMod: false,
        useMap: false,
        isOptimize: false,
        release: '/os/$&'
    },
    {
        reg: '/mobile/**',
        isMode: false,
        useMap: false,
        release: '/os/$&'
    },
    {
        reg: '**.md',
        release: false
    },
    {
        reg: '_bak/**',
        release: false
    },
    {
        reg: "**",
        release: "/os/$&"
    }
]);

fis.config.set("query", new Date().valueOf());
fis.config.set("pack", {
    'sea-modules/app/admin/main.js': 'app/admin/**.js',
    'sea-modules/app/buy/main.js': 'app/buy/**.js',
    'sea-modules/app/commons/main.js': 'app/commons/**.js',
    'sea-modules/app/home/main.js': 'app/home/**.js',
    'sea-modules/app/login/main.js': 'app/login/**.js',
    'sea-modules/app/pdfviewer/main.js': 'app/pdfviewer/**.js',
    'sea-modules/app/pri-login/main.js': 'app/pri-login/**.js',
    'sea-modules/app/promote/main.js': 'app/promote/**.js',
    'sea-modules/app/reg/main.js': 'app/reg/**.js',
    'sea-modules/app/share/main.js': 'app/share/**.js',
    'sea-modules/app/support/main.js': 'app/support/**.js',
    'sea-modules/app/viewer/main.js': 'app/viewer/**.js',
    'sea-modules/app/website/main.js': 'app/website/**.js'
});

fis.config.set('livereload.hostname', '127.0.0.1');
fis.config.set('project.charset', 'utf8');
fis.config.set("version", "3.2.0");
fis.config.set("query", new Date().valueOf());
fis.config.set("seajs", {
    base: "./sea-modules/",
    isPrivate: false,
    features: {
        'personshare': false
    }
});
