var fs = require('fs'),
    http = require('http'),
    https = require('https');

var urlform = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)/gi;

    function httpdl(dlurlparam){
      for(var int = 0,len = dlurlparam.length;int < len;int++){
        http.get(dlurlparam,(res) => {
          res.pipe(file);
          fs.writefile(path+int.toString()+'.'+item,file,(e) => {if(e){reject(e);}});
        }); //for문으로 dlurl배열 돌려가면서 다운한다. ㅇㅋ?
      }
    }

    function httpsdl(dlurlparam){
      for(var int = 0,len = dlurlparam.length;int < len;int++){
        https.get(dlurlparam,(res) => {
          res.pipe(file);
          fs.writefile(path+int.toString()+'.'+item,file,(e) => {if(e){reject(e);}});
        }); //for문으로 dlurl배열 돌려가면서 다운한다. ㅇㅋ?
      }
    }

    function gethtml(urlparam){
      var xmlhttp = XMLHttpRequest();

      xmlhttp.open('GET',urlparam,false);
      xmlhttp.send(null);

      var html = xmlhttp.responseText;
    }


module.exports = (url,DLpath,item) => {
  // url은 해당 파일의 링크를 입력하는 파라미터입니다.
  //item은 다운받을 파일의 확장자를 지정하는 링크입니다.
  //DLpath는 다운로드 될 파일의 디텍토리를 설정하는 파라미터입니다.

  return new Promise(function(reslove,reject){

    var file = fs.createWiteStream('file.'+item),
        dlurl = [],
        path = (DLpath.endsWith('/')) ? path : path + '/';

    if(urlform.test(url) === false) return reject('there was error in url');

    gethtml(url);

    var mkdlurl = html.toString();

    var svurl = () => {
      this.regexp = new RegExp('http(s)?://[\w- ./?%&=]*'+item,'gi');

      var slurl = mkdlurl.match(this.regexp);
    };

    for(var int = 0,len = slurl.length;int < len;int++){
      if(slurl[int].endsWith(item) === true){
        dlurl.push(slurl[int]);
      }
    }

    if(url.toLowerCase.startsWith('http')){
      httpdl(dlurl);
      resolve('success!');
    }
    else if (url.toLowerCase.startsWith('https')) {
      httpsdl(dlurl);
      resolve('success!');
    }
    else {
      return reject('there was error in url : not http or https');
    }

  });
};
