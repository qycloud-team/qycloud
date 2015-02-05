if (!seajs.isPrivate) {
    setTimeout(function () {
        if (!seajs.devMode && !seajs.isPrivate && /(app|vip)\.oatos\.com/.test(location.host)) {
            var _bdhmProtocol = (("https:" == location.protocol) ? " https://" : " http://");
            loadJs("baidhi", _bdhmProtocol + "hm.baidu.com/h.js?f0615763e29b767451ad02255d673f78");
        }
    }, 1000);
}

function loadJs(scriptId, file) {
    var scriptTag = document.getElementById(scriptId);
    var head = document.getElementsByTagName('head').item(0);
    if (scriptTag) head.removeChild(scriptTag);
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.id = scriptId;
    head.appendChild(script);
}