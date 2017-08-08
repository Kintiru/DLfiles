var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    Url = require ('url');

var urlform = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*(\/)?)/gi,
    urls2download = null,
    self = this,
    html = null,
    fileurls = null;

    function httpgethtml(site){
      self.tmpurl = Url.parse(site); //이거 전에 if 로 url이 true인지 아닌지 걸러서 보냄.
      var req = http.request({
        host : self.tmpurl.host,
        port : port,
        auth : auth,
        path : self.tmpurl.path
      }, (res) => {
        res.setEncoding('utf8');
        res.on('data',(chunk)=>{this.html = chunk;});
        html = this.html;
      });
      req.end();
    }

    function httpsgethtml(site){
      self.tmpurl = Url.parse(site); //이거 전에 if 로 url이 true인지 아닌지 걸러서 보냄.
      var req = https.request({
        host : self.tmpurl.host,
        port : port,
        auth : auth,
        path : self.tmpurl.path
      }, (res) => {
        res.setEncoding('utf8');
        res.on('data',(chunk) => {this.html = chunk;});
        html = this.html;
      });
      req.end();
    }


module.exports = (site,port,DLpath,item,filename,auth) => {
  // site은 해당 파일의 링크를 입력하는 파라미터입니다.
  //item은 다운받을 파일의 확장자를 지정하는 링크입니다.
  //DLpath는 다운로드 될 파일의 디텍토리를 설정하는 파라미터입니다.
  //auth 는 해당 웹사이트에 로그인 할 계정을 받는 파라미터 입니다. 사용방법 : 'user:password'
  //keyword 는 해당 웹 사이트에서 다운받을 파일 명에 키워드가 들어가 있을 경우 다운하는 파라미터 입니다.

  return new Promise(function(reslove,reject){

    if(urlform.test(site) === false) reject('there was an error in url');

    var filestream = null,
        file = null,
        path = DLpath,
        fileurl = null,
        url = site.startsWith('http') ? true : false ,
        writeable = null;

        urls2download = html.match(urlform);

    if(url === true) {
      httpgethtml(site);
      httpget();
    } else {
      httpsgethtml(site);
      httpsget();
    }

    function httpget(urls){
      for(var i = 0;;){
        http.get(urls2download[i],callback);
      }
    }
    function httpsget(){
      for(var i = 0,len = urls2download.length;i < len;i++){
        https.get(urls2download[i],callback);
      }
    }
    function callback(res){
      writeable = fs.createWriteStream(filename+'.'+item);
      res.pipe(writeable);
      fs.writeFile(filename+'-'+i+'.'+item,writeable,'utf8',e => {
        if (e) throw e;
        console.log(e);
      });
    }
  });
};
