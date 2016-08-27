module.export = config;

var config = {
    youdao: getYoudao

}

var getYoudao = {
    hostname: 'www.iciba.com',
    port: 80,
    path: '/index.php?callback=data&a=getWordMean&c=search&list=&word=',
    method: 'GET'
}