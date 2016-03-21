// JavaScript Document
function setCookie(name,value,expires,path,domain,secure){
	var cookie=encodeURIComponent(name)+'='+encodeURIComponent(value);
	if(expires instanceof Date)
	cookie +='; expires=' + expires.toGMTString();
	if(path)
	cookie +='; path=' + path;
	if(domain)
	cookie +='; domain=' + domain;
	if(secure)
	cookie +='; secure=' + secure;
	document.cookie=cookie;
	}

function getcookie(name){
	var cookieName=encodeURIComponent(name)+"=",
	cookieStart=document.cookie.indexOf(cookieName),
	cookieValue=null;
	if(cookieStart>-1){
		var cookieEnd=document.cookie.indexOf(";",cookieStart);
		if(cookieEnd==-1){
			cookieEnd=document.cookie.length;
			}
			cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
		}
		return cookieValue;
	}

function removeCookie(name,path,domain){
	setCookie(name,'',new Date(0),path,domain);
	}

function closeclick(){
	document.getElementsByClassName("top")[0].style.display="none";
	setCookie('closeclick','closeclick');
	}
function closecheck(){
	var cookie=getcookie('closeclick');
	if(cookie=='closeclick'){
		document.getElementsByClassName('top')[0].style.display='none';
		}
	else{
		document.getElementsByClassName('top')[0].style.display='block';
		}
	}
function loginYN(){
	var cookie=getcookie('loginSuc');
	if(!!cookie){
		attention();
		}
	else{
		document.getElementsByClassName('m-mask')[0].style.display='block';
	    document.getElementsByClassName('m-wrap')[0].style.display='block';
		}
	}
function closelogin(){
	document.getElementsByClassName('m-mask')[0].style.display='none';
	document.getElementsByClassName('m-wrap')[0].style.display='none';
	}
	
function attention(){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
				if(xhr.responseText==1)
				{
					setCookie('followSuc','followSuc')
					document.getElementsByClassName('att')[0].style.display='none';
					document.getElementsByClassName('att-af')[0].style.display='block';
					
					}
				}
			}
		}
		xhr.open("get",'http://study.163.com/webDev/attention.htm',true);
		xhr.send(null);
	}
function attY(){
	var cookie=getcookie('followSuc');
	if(!!cookie){
		document.getElementsByClassName('att')[0].style.display="none";
		document.getElementsByClassName('att-af')[0].style.display="block";
		}
	else{
		document.getElementsByClassName('att')[0].style.display="block";
		document.getElementsByClassName('att-af')[0].style.display="none";
		}
	}
function attCancel(){
	removeCookie('followSuc');
	document.getElementsByClassName('att')[0].style.display='block';
	document.getElementsByClassName('att-af')[0].style.display='none';
	}
	
var loginForm=document.forms.loginForm;
function submit(){
	var nameinput=loginForm.userName,
	name=nameinput.value,
	psinput=loginForm.password,
	ps=psinput.value;
	var correctname='studyOnline',
	correctpw='study.163.com';
	if(name!=correctname){
		showMessage('请使用studyOnline账号登录。');
        return;
		}
	else if(ps!=correctpw){
		showMessage('请输入正确的密码（study.163.com）。');
        return;
		}
	var userName=md5(name),
	password=md5(ps);
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if (xhr.readyState==4){
			if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
				if(xhr.responseText==1){
					attention();
					closelogin();
					setCookie('loginSuc','loginSuc')
					}
				else{
					showMessage('登录失败！');
					}
				}
			}
		}
		var url="http://study.163.com/webDev/login.htm";
		url=addURLParam(url,'userName',userName);
		url=addURLParam(url,'password',password);
		xhr.open("get",url,true);
		xhr.send(null);
	}
function addURLParam(url,name,value){
	url+=(url.indexOf("?")==-1?"?":"&");
	url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
	return url;
	}
var msgg=document.getElementById('message');
function showMessage(msg){
	msgg.innerHTML=msg;
	}

function playvideo(){
	document.getElementsByClassName('m-mask')[0].style.display='block';
	document.getElementsByClassName('m-player')[0].style.display='block';
	
	}
function closeplayer(){
	document.getElementsByClassName('m-mask')[0].style.display='none';
	document.getElementsByClassName('m-player')[0].style.display='none';
	var video=document.getElementById('video');
	video.pause();
	
	}
function gethotList(){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
				var hotlist=JSON.parse(xhr.responseText),listnum=0;
				for(var i=0;i<10;i++){
					var top0=document.getElementsByClassName('top1')[i],
					deimg=top0.getElementsByTagName('img')[0],
					dedet=top0.getElementsByTagName('a')[0],
					tophot=top0.getElementsByTagName('span')[0];
					deimg.src=hotlist[i].smallPhotoUrl;
					dedet.innerHTML=hotlist[i].name;
					dedet.title=hotlist[i].name;
					tophot.innerHTML=
hotlist[i].learnerCount;
					}
					listnum=1;
					var hotchange=setInterval(function(){
						if(listnum==1){
							for(var i=0;i<10;i++){
					var top0=document.getElementsByClassName('top1')[i],
					deimg=top0.getElementsByTagName('img')[0],
					dedet=top0.getElementsByTagName('a')[0],
					tophot=top0.getElementsByTagName('span')[0],
					xhri=i+10;
					deimg.src=hotlist[xhri].smallPhotoUrl;
					dedet.innerHTML=hotlist[xhri].name;
					dedet.title=hotlist[xhri].name;
					tophot.innerHTML=
hotlist[xhri].learnerCount;
								}
							listnum--;
							}
						  else if(listnum==0){
					var top0=document.getElementsByClassName('top0')[i],
					deimg=top0.getElementByTagName('img')[0],
					dedet=top0.getElementByTagName('a')[0],
					tophot=top0.getElementByTagName('span')[0],
					xhri=i;
					deimg.src=hotlist[xhri].smallPhotoUrl;
					dedet.innerHTML=hotlist[xhri].name;
					dedet.title=hotlist[xhri].name;
					tophot.innerHTML=
hotlist[xhri].learnerCount;
							  }
							  listnum++;
						},5000);
				}
			}
		}
	xhr.open("get",'http://study.163.com/webDev/hotcouresByCategory.htm',true);
    xhr.send(null);
	}

var tablist='10';
function programList(){
	var tab=document.getElementsByClassName('co-tab')[0],
	program=tab.getElementsByTagName('a')[0],
	design=tab.getElementsByTagName('a')[1];
	if(design.className=="tabsele f-fl"){
		program.className="tabsele f-fl";
		design.className="tabsele1 f-fl";
		tablist='10';
		loadcourse('10','20','1');
		var pagei=page.getElementsByTagName('a');
		pagei[1].className="f-fl pselec";
		for(var i=2;i<pagei.length-1;i++){
			pagei[i].className="page0 f-fl"
			}
		}

	}
function designList(){
	var tab=document.getElementsByClassName('co-tab')[0],
	program=tab.getElementsByTagName('a')[0],
	design=tab.getElementsByTagName('a')[1];
	if(program.className=="tabsele f-fl"){
		program.className="tabsele1 f-fl";
		design.className="tabsele f-fl";
		tablist='20';
		loadcourse('20','20','1');
		var pagei=page.getElementsByTagName('a');
		pagei[1].className="f-fl pselec";
		for(var i=2;i<pagei.length-1;i++){
			pagei[i].className="page0 f-fl"
			}
		}

	}

function loadcourse(tablist,psize,pageNo){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(tablist,psize,pageNo){
		if(xhr.readyState==4){
			if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
				var courselist=JSON.parse(xhr.responseText);
				for(var i=0;i<20;i++){
					var course=document.getElementsByClassName('course')[i],
					title=course.querySelectorAll('.title')[0],
					name=title.getElementsByTagName('a')[0],
					cttit=course.querySelectorAll('.ct-tit')[0],
					ctname=cttit.getElementsByTagName('a')[0],
					learner=course.querySelectorAll('.learner'),
					provider=course.querySelectorAll('.provider'),
					catagory=course.querySelector('.catagory'),
					description=course.querySelector('.description'),
					imgPic=course.querySelectorAll('.imgPic'),
					price=course.querySelector('.price');
					name.innerHTML=courselist.list[i].name;
					name.title=courselist.list[i].name;
					ctname.innerHTML=courselist.list[i].name;
					ctname.title=courselist.list[i].name;
					for(var j=0;j<provider.length;j++){
						provider[j].innerHTML=courselist.list[i].provider;
						provider[j].href=courselist.list[i].providerLink;
						}
					learner[0].innerHTML=courselist.list[i].learnerCount+'人在学';
					learner[1].innerHTML=courselist.list[i].learnerCount;
					if(courselist.list[i].catagoryName==null){
						catagory.innerHTML="暂无";
						}
					else{
						catagory.innerHTML=courselist.list[i].catagoryName;
						}
					description.innerHTML=courselist.list[i].description;
					for(var j=0;j<imgPic.length;j++){
						imgPic[j].src=courselist.list[i].middlePhotoUrl;
						}
					if(courselist.list[i].price=='0'){
						price.innerHTML="免费";
						price.style.color="#39a030";
						}
					else{
						price.innerHTML="¥"+courselist.list[i].price;
						}
					
					}
				}
			}
		}
		var url="http://study.163.com/webDev/couresByCategory.htm";
		url=addURLParam(url,"pageNo",pageNo);
		url=addURLParam(url,"psize",psize);
		url=addURLParam(url,"type",tablist);
		xhr.open("get",url,true);
		xhr.send(null);
	}

var page=document.getElementById("page");
page.addEventListener('click',(function(){
	var getElement=function(eve,filter){
		var element=eve.target;
		while(element){
			if(filter(element))
			return element;
			element=element.parentNode;
			}
		}
		return function(event){
			var page0=getElement(event,function(ele){
				return((ele.className.indexOf('page0')!==-1)||(ele.className.indexOf('pagepre')!==-1)||(ele.className.indexOf('pagenxt')!==-1));
				});
				event.preventDefault();
				var index=page0.dataset.index;
				var indexon=index;
				var pageon=document.getElementsByClassName('f-fl pselec')[0];
				if(index=='prv'){
					if(pageon.dataset.index=='1')
					{return ;}
					indexon=pageon.dataset.index-1;
					}
				else if(index='nxt'){
					if(pageon.dataset.index=='8')
					{return ;}
					indexon=-(-pageon.dataset.index-1);
					}
				else{
					indexon=pageon.dataset.index
					}
				var pagex=page.getElementsByTagName('a');
				for(var i=0;i<pagex.length;i++){
					if(pagex[i].dataset.index==indexon){
						pagex[i].className="f-fl pselec";
						}
					else if((pagex[i].dataset.index!='prv')&&(pagex[i].dataset.index!='nxt')){
						pagex[i].className="page0 f-fl"
						}
					}
					loadcourse(tablist,'20',indexon);
			}
	})());


var picindex=0,
picsld=document.getElementsByClassName('pic-sld')[0],
pics=picsld.getElementsByTagName('li'),
dotwrap=document.getElementsByClassName('dotwrap')[0],
dots=dotwrap.getElementsByTagName('span');

var autoChange=setInterval(function(){
	if(picindex<pics.length-1){
		picindex++;
		}
	else{
		picindex=0;
		}
		changePic(picindex);
	},5000);
	
function changePic(index){
	for(var i=0;i<pics.length;i++){
		if(i==index){
			pics[i].id='picon';
			}
		else{
			pics[i].id='';
			}
		}
	for(var i=0;i<dots.length;i++){
		if(i==index){
			dots[i].id='on';
			}
		else{
			dots[i].id='';
			}
		}
	fadeIn(pics[index]);
	}

function fadeIn(ele){
	ele.style.opacity=0;
	for(var i=1;i<=10;i++){
		(function(){
			var num=i*0.1;
			setTimeout(function(){
				ele.style.opacity=num;
				},i*50)
			})(i);
		}
	}

picsld.addEventListener('mouseover',(function(){
	return function(){
		clearInterval(autoChange);
		}
	})());

picsld.addEventListener('mouseout',(function(){
	var getElement=function(eve,fliter){
		var element=eve.target;
		while(element){
			if(fliter(element))
			return element;
			element=element.parentNode;
			}
		}
	return function(event){
		var pict=getElement(event,function(ele){
			return(ele.className.indexOf('banner')!==-1)
			});
		picindex=pict.dataset.index;
		autoChange=setInterval(function(){
			if(picindex<pics.length-1){
				picindex++;
				}
			else{
				picindex=0;
				}
				changePic(picindex);
			},5000)
		}
	})());
	
function slide(){
	for(var i=0;i<dots.length;i++){
		(function(i){
			dots[i].onclick=function(){
				picindex=dots[i].dataset.index;
				clearInterval(autoChange);
				changePic(picindex);
				autoChange=setInterval(function(){
					if(picindex<pics.length-1){
						picindex++;
						}
					else{
						picindex=0;
						}
					changePic(picindex);
					},5000);
				}
			})(i);
		}
	}

function getElementsByClassName(element,names){
	if(element.getElementsByClassName){
		return element.getElementsByClassName(names);
		}
	else{
		var elements=element.getElementsByTagName('*');
		var result=[];
		var element,classNameStr,flag;
		names=names.split(' ');
		for(var i=0;element=elements[i];i++){
			classNameStr=' '+element.className+' ';
			flag=true;
			for(var j=0,name;name=names[j];j++){
				if(classNameStr.indexOf(' '+name+' ')==-1){
					flag=false;
					break;
					}
				}
			if(flag){
				result.push(element);
				}
			}
			return result;
		}
	}

window.onload=function(){
	closecheck();
	attY();
	gethotList();
	loadcourse('10','20','1');
	slide();
	}