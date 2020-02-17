const config = {
  title: "test导航",                 //网站标题
  subtitle: "导航集合",              //网站描述
  logo_icon: "fa fa-tachometer",    //图标
  search_engine:[                   //搜索
    {
      name:"百 度",
      template:"https://www.baidu.com/s?wd=$s"
    },
    {
      name:"谷 歌",
      template:"https://www.google.com/search?q=$s"
    },
    {
      name:"必 应",
      template:"https://www.bing.com/search?q=$s"
    },
    {
      name:"搜 狗",
      template:"https://www.bing.com/search?q=$s"
    }
  ], 
  lists: [                            //Url list
    {
      name:"技术",
      icon:"code",
      list:[
        {
          url:"https://oschina.net/",
          name:"开源中国",
          desc:"程序员集散地"
        },
        {
          url:"https://v2ex.com",
          name:"V2EX",
          desc:"程序员集散地"
        },
        {
          url:"https://csdn.net/",
          name:"CSDN技术社区",
          desc:"程序员集散地"
        },
        {
          url:"https://github.com/",
          name:"Github",
          desc:"程序员集散地"
        },
      ]
    },
    {
      name:"学习",
      icon:"graduation cap",
      list:[
        {
          url:"https://w3school.com.cn/",
          name:"W3school在线教程",
          desc:"程序员集散地"
        },
        {
          url:"https://runoob.com/",
          name:"菜鸟教程",
          desc:"程序员集散地"
        },
        {
          url:"https://segmentfault.com/",
          name:"思否社区",
          desc:"程序员集散地"
        },
        {
          url:"https://jianshu.com/",
          name:"简书",
          desc:"程序员集散地"
        },
      ]
    }
  ]
}
const el = (tag, attrs, content) => `<${tag} ${attrs.join(" ")}>${content}</${tag}>`;

async function handleRequest(request) {
  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }
  return new Response(renderHTML(renderIndex()), init);
}
addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})

/** Render Functions
 *  渲染模块函数
 */
//footer
function renderFooter(){
  const footer=el('footer',['class="bg-white sticky-footer"'],el('div',['class="container my-auto"'],el('div',['class="text-center my-auto copyright"'],el('ul',['class="list-inline"'],el('li',['class="list-inline-item"'],'Powered by')+el('li',['class="list-inline-item"'],el('a',['class=""','href="https://github.com/sleepwood/cf-worker-dir"','target="_blank"'],el('i',['class="fab fa-github"'],'')+'cf work nav'))+el('li',['class="list-inline-item"'],'Copyright © Brand 2019')+el('li',['class="list-inline-item"'],el('i',['class="fa fa-balance-scale"'],'')+'MIT License'))+el('ul',['class="list-inline"'],el('li',['class="list-inline-item"'],'Base on')+el('li',['class="list-inline-item"'],el('a',['class=""','href="https://github.com/sleepwood/cf-worker-dir"','target="_blank"'],el('i',['class="fab fa-github"'],'')+'Cf-Worker-Dir'))+el('li',['class="list-inline-item"'],el('i',['class="fa fa-balance-scale"'],'')+'MIT License')))));
  return footer;
}

//znav
function renderZnav(){
    const item=(name)=>el('li',['class="nav-item"','role="presentation"'],el('a',['class="nav-link active"',`href=#${name}`],el('i',['class="fas fa-folder"'],'')+el('span',[''],name)));
    var title=el('a',['class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"','href="#"'],el('div',['class="sidebar-brand-text mx-3"'],el('i',['class="fas fa-laugh-wink"'],''))+el('div',['class="sidebar-brand-text mx-3"'],el('span',[''],config.title)));
    var znav=config.lists.map((link) =>{
      return item(link.name);
    }).join("");
    var btn=el('div',['class="text-center d-none d-md-inline"'],el('button',['class="btn rounded-circle border-0"','id="sidebarToggle"','type="button"'],''));
    return el('nav',['class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 fixed-top"'],el('div','class="container-fluid d-flex flex-column p-0"',title+el('hr',['class="sidebar-divider my-0"'],'')+el('ul',['class="nav navbar-nav text-light"','id="accordionSidebar"'],znav)+btn));
}

//tnav
function renderTnav(){
  const item = (template,name) => el('option',['class="active item"',`data-url="${template}"`],name);
  var option=item;
  var input=0;
  var sbtn=el('div',['class="input-group-append"'],el('button',['class="btn btn-primary py-0"','type="button"'],el('i',['class="fas fa-search"'])));
  return el('nav',['class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top fixed-top leftnav1','id="leftnav"'],el('div',['class="container-fluid"'],el('form',['class="form-inline d-none d-sm-inline-block mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"'],el('div',['class="input-group"'],el('select',['class="form-inline border-0"'],option)+input+sbtn))));

}

//main
function renderMain(){
  config.lists.forEach(item => {
    const card = (url,name,desc)=> el('a',['class="card"',`href=${url}`,'target="_blank"'],el('div',['class="content"'],el('img',['class="left floated mini ui image"',`src=${getFavicon(url)}`],"") + el('div',['class="header"'],name) + el('div',['class="meta"'],desc)));
    const divider = el('h4',['class="ui horizontal divider header"'],el('i',[`class="${item.icon} icon"`],"")+item.name);

    var content = el('div',['class="ui four stackable cards"'],item.list.map((link) =>{
      return card(link.url,link.name,link.desc);
    }).join("")) 
    main = main.concat(divider,content);
  });

  return el('div',['class="container-fluid zbody1"','id="zbody"']++);
}



//header
function renderHeader(){
  const item = (template,name) => el('a',['class="active item"',`data-url="${template}"`],name);

  var nav = el('div',['class="ui large secondary inverted menu"'],el('div',['class="item"'],el('p',['id="hitokoto"'],'条条大路通罗马')))
  var title = el('h1',['class="ui inverted header"'],el('i',[`class="${config.logo_icon} icon"`],"") + el('div',['class="content"'],config.title + el('div',['class="sub header"'],config.subtitle)));
  var menu = el('div',['id="sengine"','class="ui bottom attached tabular inverted secondary menu"'],el('div',['class="header item"'],'&nbsp;') + config.search_engine.map((link) =>{
    return item(link.template,link.name);
  }).join(""))
  var input = el('div',['class="ui left corner labeled right icon fluid large input"'],el('div',['class="ui left corner label"'],el('img',['id="search-fav"','class="left floated avatar ui image"','src="https://www.baidu.com/favicon.ico"'],"")) + el('input',['id="searchinput"','type="search"','placeholder="搜索你想要知道的……"','autocomplete="off"'],"") + el('i',['class="inverted circular search link icon"'],""));
  return el('header',[],el('div',['class="ui inverted vertical masthead center aligned segment"'],el('div',['id="nav"','class="ui container"'],nav) + el('div',['id="title"','class="ui text container"'],title + input + menu + `${config.selling_ads ? '<a id="menubtn" class="red ui icon inverted button"><i class="heart icon"></i> 喜欢此域名 </a>' : ''}`)))
}
//body
function renderMain1() {
  var main = '';
  config.lists.forEach(item => {
    const card = (url,name,desc)=> el('a',['class="card"',`href=${url}`,'target="_blank"'],el('div',['class="content"'],el('img',['class="left floated mini ui image"',`src=${getFavicon(url)}`],"") + el('div',['class="header"'],name) + el('div',['class="meta"'],desc)));
    const divider = el('h4',['class="ui horizontal divider header"'],el('i',[`class="${item.icon} icon"`],"")+item.name);

    var content = el('div',['class="ui four stackable cards"'],item.list.map((link) =>{
      return card(link.url,link.name,link.desc);
    }).join("")) 
    main = main.concat(divider,content);
  });
  
  return el('main',[],el('div',['class="ui container"'],main));
}

function renderSeller() {
  const item = (type,content) => el('div',['class="item"'],el('i',[`class="${type} icon"`],"") + el('div',['class="content"'],content));
  var title = el('h1',['class="ui yellow dividing header"'],el('i',['class="gem outline icon"'],"") + el('div',['class="content"'],config.sell_info.domain + ' 正在出售'));
  var action = el('div',['class="actions"'],el('div',['class="ui basic cancel inverted button"'],el('i',['class="reply icon"'],"") + '返回'));

  var contact = config.sell_info.contact.map((list) => {
    return item(list.type,list.content);
  }).join("");
  var column = el('div',['class="column"'],el('h3',['class="ui center aligned icon inverted header"'],el('i',['class="circular envelope open outline grey inverted icon"'],"") + '联系我') + el('div',['class="ui relaxed celled large list"'],contact));
  var price = el('div',['class="column"'],el('div',['class="ui large yellow statistic"'],el('div',['class="value"'],el('i',[`class="${config.sell_info.mon_unit} icon"`],"") + config.sell_info.price)));
  var content = el('div',['class="content"'],el('div',['class="ui basic segment"'],el('div',['class="ui two column stackable center aligned grid"'],el('div',['class="ui inverted vertical divider"'],'感兴趣？') + el('div',['class="middle aligned row"'],price + column))));

  return el('div',['id="seller"','class="ui basic modal"'],title + content + action);
}

/*通过分析链接 实时获取favicon
* @url 需要分析的Url地址
*/
function getFavicon(url){
  if(url.match(/https{0,1}:\/\//)){
    return "https://favicon.link/v3/?url=" + url.split('//')[1];
  }else{
    return "https://favicon.link/v3/?url=" + url;
  }
}

function renderHTML(znav,tnav,index,footer) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>${config.title} - ${config.subtitle}</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
    <link rel="stylesheet" href="assets/css/styles.min.css">
  </head>
  <body id="page-top">
    <div id="wrapper">
    ${znav}
    <div class="d-flex flex-column" id="content-wrapper">
    <div id="content">
    ${tnav}
    ${index}
    </div>
    ${footer}
    </div>
    <a class="border rounded d-inline scroll-to-top" href="#page-top">
    <i class="fas fa-angle-up"></i>
    </a>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.js"></script>
    <script src="http://url.cn/5rWWEED"></script>
    <script>
      $('#sengine a').on('click', (e) => {
        $('#sengine a.active').toggleClass('active');
        $(e.target).toggleClass('active');
        $('#search-fav').attr('src',$(e.target).data('url').match(`+/https{0,1}:\/\/\S+\//+`)[0] + '/favicon.ico') ;
      });
      $('.search').on('click', function (e) {
          var url = $('#sengine a.active').data('url');
          url = url.replace(`+/\$s/+`,$('#searchinput').val());
          window.open(url);
      })
      $('#menubtn').on('click', (e) => {
          $('#seller').modal('show');
      })</script>
    
  </body>
  </html>`
}
