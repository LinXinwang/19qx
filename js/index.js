//=============下面是 cordova框架要使用的变量 =============
var accountVersion = "";
var cAppVersion = "";
//=======================================================

//===================下面是普通全局变量 ===================
var _model = "";
var _chip = "";
var _mac = "";
var _emmcCID = "";
var _udid = "";
var _cVersion = "";
var _cSize = "";
var _cSdk = "";
var _cBrand = "";
var _cFMode = "Default";
var _appversion = "";
var _qsource = "yinhe";
var _userKeyId0 = "";
var _openId = null;
var _mobile = null;
var _nickName = null;
var _loginstatus = false;
var _user_flag = null;
var _accessToken = null;
var needQQ = false;
var _tencentWay = "";

var dataObj = {}; //我的奖励数据
var _curFocusId = null;
var ani_status = 1;
var dialogTime = null;
var startLoginFlag = false;
var changeLoginFlag = false;

var needSentUserLog = false; //判断是否点了登录
var needSentUserLog2 = false; //判断是否登录成功
var actionId = getUrlParam("id");
var gameStatus = "";
//var adressIp = "https://restful.skysrt.com";
//var enurl = "https://webapp.skysrt.com/activity618/Address/index.html?";
var adressIp = "http://beta.restful.lottery.coocaatv.com";
var enurl = "http://beta.webapp.skysrt.com/zy/address/index.html?"; //实体奖url

var app = {
	canonical_uri: function(src, base_path) {
		var root_page = /^[^?#]*\//.exec(location.href)[0],
			root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
			absolute_regex = /^\w+\:\/\//;
		if(/^\/\/\/?/.test(src)) {
			src = location.protocol + src;
		} else if(!absolute_regex.test(src) && src.charAt(0) != "/") {
			src = (base_path || "") + src;
		}
		return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);
	},
	rel_html_imgpath: function(iconurl) {
		return app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1'));
	},
	initialize: function() {
		console.log("initialize");
		this.bindEvents();	
	},
	bindEvents: function() {
		console.log("bindEvents");
		ccApp.deviceReady(app.onDeviceReady);
		ccApp.bindEvent("menubutton", function() {
			console.log("this menuButton>>>>>>>>>new>>>>>>>>>")
		});
		ccApp.bindEvent("backbutton", function() {
			console.log("this backbutton>>>>>>>>>new>>>>>>>>>")
		});
		ccApp.bindEvent("homebutton", function() {
			console.log("this homebutton>>>>>>>>>new>>>>>>>>>");
			navigator.app.exitApp();
		});
		ccApp.bindEvent("resume", function() {
			console.log("this resume>>>>>>>>>new>>>>>>>>>");
			onResumeFunc();
		});
		ccApp.bindEvent("pause", function() {
			console.log("this pause>>>>>>>>>new>>>>>>>>>");
		});
		ccApp.bindEvent("backbuttondown", function() {
			console.log("this backbuttondown>>>>>>>>>new>>>>>>>>>");
			backButtonDown();
		});
	},
	onDeviceReady: function() {
		console.log('deviceReady');
		_appversion = accountVersion;
		listenUserChange();
		buttonInitBefore();
		getDeviceInfo();
		checkVersion();//获取版本
	}
};

app.initialize();

function backButtonDown(){
	if(document.getElementById('prize').style.display == "block") {
		if (document.getElementById('bgMask').style.display == "block") {
			$("#bgMask").css("display", "none");
			$("#index").css("display", "none");
			$("#toastBox").css("display", "none");
			$("#prize").css("display", "block");
			getMyAwards(actionId,2);
		} else{
			document.getElementById('prize').style.display = "none";
			document.getElementById('index').style.display = "block";
			ccmap.init(".coocaabtn", "#egg0", "btnFocus");
		}
	} else if(document.getElementById('index').style.display == "block") {
		if(document.getElementById('popUp').style.display == "block" || document.getElementById('confirmInfo').style.display == "block") {
			closeWindow();
			document.getElementById('popUp').style.display = "none";
			document.getElementById('confirmInfo').style.display = "none";
			ccmap.init(".coocaabtn", "#egg0", "btnFocus");
		} else {
			navigator.app.exitApp();
		}
	} else if(document.getElementById('rule_box').style.display == "block") {
		document.getElementById('rule_box').style.display = "none";
		document.getElementById('index').style.display = "block";
		ccmap.init(".coocaabtn", "#ruleMore", "btnFocus");
	}else{
		navigator.app.exitApp();
	}
	//navigator.app.exitApp();
}
function onResumeFunc(){
	console.log("======其他页面返回============");
	if (document.getElementById('prize').style.display == "block") {
		if (document.getElementById('bgMask').style.display == "block") {
			console.log("do nothing");
		} else{
			$("#prize").css("display", "block");
			getMyAwards(actionId,2);
		}
	} else{
		closeWindow();
		document.getElementById('popUp').style.display = "none";
		document.getElementById('confirmInfo').style.display = "none";
	
		console.log(needSentUserLog + "登录监听=====" + needSentUserLog2);
		if(needSentUserLog == true) {
			needSentUserLog = false;
			if(needSentUserLog2 == true) {
				if(document.getElementById("index").style.display == "block") {
					hasLogin(needQQ, 0); //0走初始化，1我的奖品
				} else if(document.getElementById("prize").style.display == "block") {
					hasLogin(needQQ, 1);
				}
			} else {
				needSentUserLog2 = false;
				var _dateObj = {
					"page_name": "活动主页面登录弹窗",
					"login_result": "登录失败",
					"activity_name": "七夕活动",
					"activity_id": getUrlParam("id"),
					"open_id": _openId
				}
				webDataLog("result_event",_dateObj);
				if(document.getElementById("index").style.display == "block") {
					initChance();
				} else if(document.getElementById("prize").style.display == "block") {
					getMyAwards(actionId,2); //0 需要数据采集 
				}
			}
		} else {
			if(document.getElementById("index").style.display == "block") {
				initChance();
			} else if(document.getElementById("prize").style.display == "block") {
				//     getMyAwards(actionId,2);
			}
		}
	}
}
//判断是否登录
function hasLogin(needQQ, area) {
	ccApp.hasCoocaaUserLogin(function(message) {
		console.log(area + "======haslogin======== " + message.haslogin);
		_loginstatus = message.haslogin;
		if(_loginstatus == "false") {
			if(cAppVersion >= 3190030) {
				_tencentWay = "both";
			} else {
				_tencentWay = "qq";
			}
			_openId = "";
			data_openId = "空";
			_login_type = "";
			_vuserid = "";
			_user_flag = 0;
			_accessToken = "";
			face = "";
			$("#user_login").show();
			initChance();
		} else {
			ccApp.getUserInfo(function(message) {
				exterInfo = message.external_info;
				_openId = message.open_id;
				data_openId = message.open_id;
				_nickName = message.nick_name;
				if(message.avatar == undefined) {
					face = qqinfo[0].face;
				} else {
					face = message.avatar;
				}
				ccApp.getUserAccessToken(function(message) {
					_accessToken = message.accesstoken;
					console.log("_accessToken===============" + _accessToken);
					if(exterInfo == "[]") {
						exterInfo = '[{}]';
					} else {}
					_user_flag = 1;
					if(needQQ) {
						qqinfo = JSON.parse(exterInfo);
						if(qqinfo.length == 1) {
							if(cAppVersion >= 3190030) {
								if(JSON.stringify(qqinfo[0]) == "{}") {
									_tencentWay = "both";
								} else {
									_tencentWay = qqinfo[0].external_flag;
								}
							} else {
								_tencentWay = "qq";
							}
							if(qqinfo != "" && qqinfo != null && qqinfo[0].login) {
								thirdUserId = qqinfo[0].external_id;
								if(qqinfo[0].external_flag == "qq") {
									_login_type = 1; //QQ登录
								} else {
									_login_type = 2; //微信登陆
									_vuserid = qqinfo[0].vuserid;
									if(_vuserid == undefined) {
										_vuserid = JSON.parse(qqinfo[0].refreshToken).vuserid
									}
									if(cAppVersion < 3190030) {
										_openId = "";
										data_openId = "空";
										_loginstatus = "false";
									}
								}
							} else {
								_tencentWay = "both";
								_openId = "";
								data_openId = "空";
								_vuserid = "";
								_login_type = "";
								_loginstatus = "false";
							}
						} else {
							var needSelectNum = 0;
							for(var b = 0; b < qqinfo.length; b++) {
								needSelectNum = needSelectNum + 1;
								if(qqinfo[b].login && qqinfo[b].external_flag != "jscn") {
									thirdUserId = qqinfo[b].external_id;
									if(qqinfo[b].external_flag == "qq") {
										_login_type = 1;
									} else {
										_login_type = 2;
										_vuserid = qqinfo[b].vuserid;
										if(_vuserid == undefined) {
											_vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
										}
										if(cAppVersion < 3190030) {
											_openId = "";
											data_openId = "空";
											_loginstatus = "false";
											_vuserid = "";
											_login_type = "";
											_tencentWay = "qq";
										}
									}
									break;
								}
								if(needSelectNum == qqinfo.length) {
									_tencentWay = "both";
									_openId = "";
									data_openId = "空";
									_vuserid = "";
									_login_type = "";
									_loginstatus = "false";
								}
							}
						}
					} else {
						qqinfo = JSON.parse(exterInfo);
						for(var b = 0; b < qqinfo.length; b++) {
							if(qqinfo[b].login) {
								thirdUserId = qqinfo[b].external_id;
								if(qqinfo[b].external_flag == "qq") {
									_login_type = 1;
								} else if(qqinfo[b].external_flag == "weixin") {
									_login_type = 2;
									_vuserid = qqinfo[b].vuserid;
									if(_vuserid == undefined) {
										_vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
									}
								}
								break;
							} else {
								thirdUserId = "";
								_vuserid = "";
								_login_type = 0;
							}
						}
					}
					console.log("_login_type-----------" + _login_type);
					if(_openId != "") {
						console.log("已登录openId============" + _openId);
						$("#user_login").hide();
						$("#userName").show();
						$("#userName").html(_nickName);

						if(needSentUserLog2 == true){
							needSentUserLog2 = false;
							var _dateObj = {
								"page_name": "活动主页面登录弹窗",
								"login_result": "登录成功",
								"activity_name": "七夕活动",
								"activity_id": getUrlParam("id"),
								"open_id": _openId
							}
							webDataLog("result_event",_dateObj);
						}



					}
					initChance();
				}, function(error) {
					console.log(error);
					initChance();
				});
			}, function(error) {
				console.log(error);
				initChance();
			});
		}
	}, function(error) {
		console.log(error);
	});
}

function initChance(){
	ccmap.init(".coocaabtn", "#egg0", "btnFocus");
	console.log("初始化接口cUDID---"+_emmcCID+"--MAC--"+_mac+"--cModel---"+_model+"---cChip--"+_chip+"--cOpenId--"+_openId);
    $.ajax({
        async:true,
        url: adressIp+"/light/v2/web/init",
		type: "POST",
		data:{
			Id:getUrlParam("id"),
			cUDID:_emmcCID,
			MAC:_mac,
			cModel:_model,
			cChip:_chip,
			cOpenId:_openId,
		},
		success: function(data) {
			console.log("初始化" + JSON.stringify(data));
			var _dateObj = {
				"page_name":"砸金蛋活动主页面",
				"page_state":"",
				"activity_name":"七夕活动",
				"activity_id":actionId,
				"open_id":_openId
			}  
			
			if(data.code == 50100) {
				_dateObj.page_state = "进行中";
				document.getElementById("index").style.display = "block";
				userKeyId = data.data.userKeyId;
				gameStatus = 1;
				gameStatusTxt = "进行中";
				overNum = data.data.overNum;
				allNumber = data.data.allNumber;
				$("#chanceCount").html(data.data.overNum);
				console.log("------------------初始化次数:" + data.data.overNum);
			} else if(data.code == 50002) {
				_dateObj.page_state = "未开始";
				gameStatus = 0;
				gameStatusTxt = "未开始";
			} else if(data.code == 50003) {
				_dateObj.page_state = "已结束";
				gameStatus = 2;
				gameStatusTxt = "已结束";
			} else if(data.code == 50049) {
				gameStatusTxt = "未登录";
				_dateObj.page_state = "未登录";
				console.log("活动必须登陆才能玩");
			}else{
				gameStatusTxt = "异常";
				_dateObj.page_state = "异常";
			}
			webDataLog("web_page_show_new",_dateObj);
		},
		error: function(error) {
			console.log("--------初始化访问失败------" + JSON.stringify(error));
		}
    });
} 
function buttonInitBefore() {
	//点击金蛋
	var clickFlag = false;
	$(".startBtn").bind('itemClick', function(event) {
		var data = $(this).attr("data")
		var dateObj = {
			"page_name":"砸金蛋活动主页面",
			"button_name":"礼物盒",
			"button_postion":data,
			"page_state":gameStatusTxt,
			"activity_name":"七夕活动",
			"activity_id":actionId,
			"open_id":_openId
		} 
		webDataLog("web_button_clicked",dateObj);
		console.log("-------------------------------是否登录" + _loginstatus);
		if(clickFlag == false){
			clickFlag = true;
			if(_loginstatus == "false") {
				setTimeout(function(){clickFlag = false}, 5000);
				needSentUserLog = true;
				startLogin(needQQ, 0);
		        var _dateObj = {
		            "page_name":"活动主页面登录弹窗",
		            "activity_name":"七夕活动",
		            "activity_id":actionId,
		        } 
		        webDataLog("web_page_show_new",_dateObj);
			} else {
				setTimeout(function(){clickFlag = false}, 3000);
				if(gameStatus == 0) {
					popUp("notStar");
				} else if(gameStatus == 2) {
					popUp("over");
				} else {
					//活动已开始
					chanceCount(data); //剩余次数
				}
			}
		}
	});

	//跳转成为会员
	$("#bevip").bind('itemClick', function(event) {
        var _dateObj = {
            "page_name":"抽奖结果页",
            "button_name":"立即获得机会",
            "page_state":"无抽奖机会",
			"page_type":"activityWindow",
            "activity_name":"七夕活动",
            "activity_id":actionId,
            "open_id":_openId
        } 
        webDataLog("web_button_clicked",_dateObj);
		if(_qsource == "tencent"){
			var id = "5";
		}else{
			var id = "1";
		}
		ccApp.startMovieMemberCenter2(id,function(message) {
			console.log(message);
			_czc.push(['_trackEvent', '七夕活动', '跳转会员中心次数', '', '']);
		}, function(error) {
			console.log(error);
		});
	});
	//跳转成为会员
	$("#buy_vip").bind('itemClick', function(event) {
		if(_qsource == "tencent"){
			var id = "5";
		}else{
			var id = "1";
		}
		ccApp.startMovieMemberCenter2(id,function(message) {
			console.log(message);
			_czc.push(['_trackEvent', '七夕活动', '跳转会员中心次数', '', '']);
		}, function(error) {
			console.log(error);
		});
	});


	$("#beuser,#user_login").bind('itemClick', function(event) {
		var _dateObj = {
			"page_name":"砸金蛋活动主页面",
			"button_name":"登录会员",
			"button_postion":"",
			"page_state":gameStatusTxt,
			"activity_name":"七夕活动",
			"activity_id":actionId,
			"open_id":_openId
		} 
		webDataLog("web_button_clicked",_dateObj);
		needSentUserLog = true;
		startLogin(needQQ, 0);
	});

	//最后一部确认信息
	$("#subInfo").bind('itemClick', function(event) {
		var awardType = $(this).attr("data");
        var _dateObj = {
            "page_name":"抽奖结果页",
            "button_name":"再拆一次",
            "page_state":awardType,
			"page_type":"activityWindow",
            "activity_name":"七夕活动",
            "activity_id":actionId,
            "open_id":_openId
        } 
        webDataLog("web_button_clicked",_dateObj);

		closeWindow();
		$("#confirmInfo").hide();
		ccmap.init(".coocaabtn", "#egg0", "btnFocus");
	//	initChance();
	});

	$("#submit").bind('itemClick', function(event) {
		var data = $(this).attr("data");
		if(data == ""){
			data == "我明白了"
		}
		var _dateObj = {
			"page_name":"砸金蛋活动主页面",
			"button_name":data,
			"button_postion":"",
			"page_state":gameStatus,
			"activity_name":"七夕活动",
			"activity_id":actionId,
			"open_id":_openId
		} 
		webDataLog("web_button_clicked",_dateObj);
		closeWindow();
		document.getElementById("popUp").style.display = "none";
		ccmap.init(".coocaabtn", "#egg0", "btnFocus");
	});
	$("#ruleMore").bind('itemClick', function(event) {
		_czc.push(['_trackEvent', '双旦', '打开活动规则', '', '']);
		document.getElementById('rule_box').style.display = "block";
		document.getElementById('index').style.display = "none";
		ccmap.init(".coocaabtn", "#rule_box", "btnFocus");
	});
	$("#shop").bind("itemClick", function() { //立即使用购物优惠券
        var _dateObj = {
            "page_name":"抽奖结果页",
            "button_name":"立即使用",
            "page_state":"获得优惠券",
			"page_type":"activityWindow",
            "activity_name":"七夕活动",
            "activity_id":actionId,
            "open_id":_openId
        }
		bywhat = $.trim(bywhat);
		byvalue = $.trim(byvalue);
		console.log("bywhat：" + bywhat);
		console.log("byvalue:" + byvalue);
		console.log("sources:" + sources)
		ccApp.startParamAction(bywhat, byvalue, sources, function(message) {}, function(error) {
			console.log("判断失败" + error);
		});
		webDataLog("web_button_clicked",_dateObj);
	});

	$("#go_experience").bind('itemClick', function(event) {
        var _dateObj = {
            "page_name":"抽奖结果页",
            "button_name":"去兑换",
            "page_state":"获得金币",
			"page_type":"activityWindow",
            "activity_name":"七夕活动",
            "activity_id":actionId,
            "open_id":_openId
        }   
		webDataLog("web_button_clicked",_dateObj);
		var coinUrl = 'https://goldshop.coocaa.com/';
		ccApp.startNewBrowser5(coinUrl, function() {}, function() {});
	});
	$("#my_prize").bind('itemClick', function(event) {
		var _dateObj = {
            "page_name":"砸金蛋活动主页面",
            "button_name":"我的奖品",
            "page_state":gameStatusTxt,
            "activity_id":actionId,
			"activity_name":"七夕活动",
            "open_id":_openId
        }   
		webDataLog("web_button_clicked",_dateObj);
		_czc.push(['_trackEvent', '砸金蛋活动主页面', "按钮点击-我的奖品", gameStatusTxt, '1' ,'']);
		if (_loginstatus == "false") {
	        var _dateObj = {
	            "page_name":"活动主页面登录弹窗",
	            "activity_name":"七夕活动",
	            "activity_id":actionId,
	        } 
	        webDataLog("web_page_show_new",_dateObj);
			needSentUserLog = true;
			startLogin(needQQ, 0);
		} else{
			$("#index").css("display", "none");
			$("#prize").css("display", "block");
			getMyAwards(actionId,0);
		}
	});
	$("#i_konw").bind('itemClick', function(event) {
		var _dateObj = {
            "page_name":"我的奖品页",
            "open_id":_openId,
            "activity_id":actionId,
			"activity_name":"七夕活动",
			"page_state":"",
			"award_name":"没有奖励",
			"button_name":"马上就去"
        }
		if (gameStatus == 2) {
			_dateObj.page_state = "无礼品（已结束）";
		} else{
			_dateObj.page_state = "无礼品（未结束）";
		}
		webDataLog("web_button_clicked", _dateObj);
		_czc.push(['_trackEvent', '砸金蛋活动主页面', "按钮点击-马上就去", _dateObj.page_state, '1' ,'']);
		$("#index").css("display", "block");
		$("#prize").css("display", "none");
		$("#prize_null").css("display", "none");
		ccmap.init(".coocaabtn", "#egg0", "btnFocus");
	});
	$("#toastQrcode").bind('itemClick', function(event) {
		closeWindow();
		$("#index").css("display", "none");
		$("#toastBox").css("display", "none");
		$("#prize").css("display", "block");
		getMyAwards(actionId,2);
	});
}


function checkVersion() {
    var apkArry = ["com.coocaa.activecenter","com.coocaa.app_browser","com.coocaa.mall","com.tianci.movieplatform"];
    var app = '{ "pkgList": ["com.coocaa.activecenter","com.coocaa.app_browser","com.coocaa.mall","com.tianci.movieplatform"] }';
    ccApp.getAppInfo(app, function(message) {
        var apkVersion = [];
        console.log("getAppInfo====" + message);
        for(var i=0;i<4;i++){
            apkVersion.push(JSON.parse(message)[apkArry[i]].versionCode);
        }
        activityCenterVersion = apkVersion[0];
        browserVersion = apkVersion[1];
        mallVersion = apkVersion[2];
        cAppVersion = apkVersion[3];
        console.log("加载检测版本===activityCenterVersion=="+activityCenterVersion+"===browserVersion=="+browserVersion+"==mallVersion=="+mallVersion+"==cAppVersion=="+cAppVersion);
     }, function(error) {
        console.log("getAppInfo----error" + JSON.stringify(error));
    });
}



//剩余抽奖次数
function chanceCount(num) {
	if(overNum > 0){		
		$.ajax({
			type: "POST",
			async: true,
			url: adressIp+"/light/v2/web/start",
			data:{
				id:actionId,
				cUDID:_emmcCID,
				MAC:_mac,
				cModel:_model,
				cChip:_chip,
				cOpenId:_openId,
				cHomepageVersion:cAppVersion
			},
			success: function(data) {
				console.log(overNum+"抽奖结果" + JSON.stringify(data));
				if(data.code == 50100) {
					overNum = overNum - 1
					$("#chanceCount").html(overNum);
					showTheGif(data,num);
				}else if(data.code == 50023){
					popUp("thanks"); //奖品已被抽完
				}else if(data.code == 50003){
					popUp("over"); //活动已结束
				}
			},
			error: function() {
				console.log("--------访问失败");
			}
		});
	} else {
		if(allNumber > 0){
			popUp("useUp"); //无机会
		}else{
			popUp("noone"); //无资格
		}
		
	}
}
function showTheGif(obj,num){
	console.log("礼盒拆开的动效");
	$("#showBox").css("background-image", "url(images/green.png)");
	$("#showBox").css("display","block");
	if (num == 1) {
		$("#showBox").css("left","440px");
		$(".startImg:eq(0)").css("display","none");
	}else if(num == 2){
		$("#showBox").css("left","765px");
		$(".startImg:eq(1)").css("display","none");
	}else if(num == 3){
		$("#showBox").css("left","1085px");
		$(".startImg:eq(2)").css("display","none");
	}
	
	if(ani_status == 1) {
		$("#showBox").attr("class","box box1");
		ani_status = 2;
	} else {
		$("#showBox").attr("class","box box2");
		ani_status = 1;
	}
	setTimeout(function(){
		$("#showBox").css("display","none");
		$(".startImg").css("display","block");
		showDrawResult(obj);
	}, 1750);
}

function showDrawResult(obj){
	console.log(obj);
	var awardName = obj.data.awardName;
	var awardTypeId = obj.data.awardTypeId;
	var lotteryAwardMemberId = obj.data.lotteryAwardRememberId;
	var awardExchangeFlag = obj.data.awardExchangeFlag;
	var awardId = obj.data.awardId;
	var awardPictureUrl = obj.data.awardUrl;
	lastWindow(awardId, awardTypeId, lotteryAwardMemberId, awardExchangeFlag, awardPictureUrl, awardName)
}
function lastWindow(awardId, awardTypeId, lotteryAwardMemberId, awardExchangeFlag, awardPictureUrl, awardName) {
	var _dateObj = {
		"page_name":"抽奖结果页",
		"page_state":"",
		"page_type":"activityWindow",
		"activity_name":"七夕活动",
		"activity_id":actionId,
		"open_id":_openId
	} 
	openBg();
	document.getElementById('confirmInfo').style.display = "block";
	$(".matter").html(awardName);
	$(".type-img").attr("src", awardPictureUrl);
	console.log("获奖类型:" + awardTypeId + "奖品名称:" + awardName);
	if(awardTypeId == 19 || awardTypeId == 5) { //金币 || 商城优惠券
		if(awardTypeId == 19){
			_dateObj.page_state = "获得金币";
		}else{
			_dateObj.page_state = "获得优惠券";
		}
		getGold(awardId, awardTypeId, lotteryAwardMemberId, awardExchangeFlag, awardPictureUrl, awardName);
	} else if(awardTypeId == 4) { //第三方优惠券
		_dateObj.page_state = "获得第三方优惠券";
		$("#type4").show();
		$("#type4").siblings().hide();
		$("#shop").hide();
		$("#go_experience").hide();
		$("#subInfo").attr("data","获得第三方优惠券");
		$("#subInfo").attr("leftTarget","#subInfo");
		ccmap.init(".coocaabtn", "#subInfo", "btnFocus");
	} else if(awardTypeId == 2) { //实物奖品
		_dateObj.page_state = "获得实物奖";
		$("#type2").show();
		$("#type2").siblings().hide();
		$('#qrcode').html("");
		$("#shop").hide();
		$("#go_experience").hide();
		$("#subInfo").attr("data","获得实物奖");
		$("#subInfo").attr("leftTarget","#subInfo");
		var enstr = enurl + "activeId=" + actionId + "&rememberId=" + lotteryAwardMemberId + "&userKeyId=" + userKeyId + "&open_id=" + _openId;
		generateQRCode("#qrcode",enstr,190);
		ccmap.init(".coocaabtn", "#subInfo", "btnFocus");
	}else if(awardTypeId == 14) { //谢谢参与奖
		_dateObj.page_state = "谢谢参与奖";
		document.getElementById('confirmInfo').style.display = "none";
		popUp("thanks");
	}
	webDataLog("web_page_show_new",_dateObj);
}

//领奖品
function getGold(awardId, awardTypeId, lotteryAwardMemberId, awardExchangeFlag, awardPictureUrl, awardName) {
	var token = calcMD5("activeId="+actionId+"&rememberId="+lotteryAwardMemberId+"&userKeyId="+userKeyId+"&cOpenId="+_openId+"&8baf4554ce0d7753");
	console.log(token);
	console.log("activeId="+actionId+"&rememberId="+lotteryAwardMemberId+"&userKeyId="+userKeyId+"&cOpenId="+_openId);
	$.ajax({
		async: true,
		url: adressIp + "/v4/lottery/verify/receive",
		type: "GET",
		dataType: 'jsonp',
		jsonp: 'callback',
		data: {
			activeId: getUrlParam("id"),
			awardId: awardId,
			rememberId: lotteryAwardMemberId,
			awardTypeId: awardTypeId,
			cUDID: _emmcCID,
			MAC: _mac,
			cModel: _model,
			cChip: _chip,
			cOpenId: _openId,
			userKeyId: userKeyId,
			source:_qsource,
			token:token
		},
		success: function(data) {
		console.log("--------确认成功：" + JSON.stringify(data));
			if(data.code == 50100) {
				$(".matter").html(awardName);
				$(".type-img").attr("src", awardPictureUrl);
				if(data.data.awardTypeId == 5) {
					var couponDetail = data.data.couponInfo.couponDetail;
					console.log(couponDetail);
					if(couponDetail == 1) { //已配置
						var data_a = data.data.couponInfo.onclickData;
						var packageName = JSON.parse(data_a).packageName;
						byvalue = JSON.parse(data_a).byvalue;
						bywhat = JSON.parse(data_a).bywhat;
						var obj = JSON.parse(data_a).param;
						sources = new Array();
						for(var key in obj) {
							var px = {};
							px[key] = obj[key];
							sources.push(px);
						}
						sources = JSON.stringify(sources);
						console.log("跳转参数："+packageName + "--" + byvalue + "--" + bywhat + "--" + sources);
					} else {
						console.log("未配置");
					}
					$("#type5").show();
					$("#type5").siblings().hide();
					$("#shop").show();
					$("#go_experience").hide();
					$("#subInfo").attr("data","获得优惠券");
					$("#subInfo").attr("leftTarget","#shop");
					ccmap.init(".coocaabtn", "#shop", "btnFocus");					
				} else {
					$("#type19").show();
					$("#type19").siblings().hide();
					$("#shop").hide();
					$("#go_experience").show();
					$("#subInfo").attr("data","获得金币");
					$("#subInfo").attr("leftTarget","#go_experience");
					ccmap.init(".coocaabtn", "#go_experience", "btnFocus");
				}
			}else{
				popUp("getfocus");
			}
		},
		error: function(error) {
			console.log("-----------------------error"+JSON.stringify(error));
			popUp("getfocus");
		}
	});
}

//我的奖品
function getMyAwards(curActionid,num) {
	console.log(_mac + "--" + _model + "--" + _chip + "--" + _udid +"--"+_openId + "--" + curActionid);
	var ajaxTimeoutOne = $.ajax({
		type: "get",
		async: true,
		timeout: 10000,
		dataType: 'json',
		url: adressIp + "/light/v2/web/u-award",
		data: {
			"clientType": "web",
			"id": curActionid,
			"cUDID": _udid,
			"MAC": _mac,
			"cModel": _model,
			"cChip": _chip,
			"cOpenId":_openId
		},
		success: function(data) {
			console.log(curActionid);
			console.log(JSON.stringify(data));
			dataObj = data;
		},
		error: function() {
			console.log("-----------------------error");
			dataObj = {};
		},
		complete: function(XMLHttpRequest, status) {
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {
				ajaxTimeoutOne.abort();
			}
			dealAfterGetAward(dataObj,num);
		}
	});
}

function dealAfterGetAward(obj,num) {
	$("#prize_null").css("display", "none");
	$("#prize_list").css("display", "none");
	console.log(JSON.stringify(obj));
	var _dateObj = {
        "page_name":"我的奖品页",
        "activity_id":actionId,
        "activity_name":"七夕活动",
		"page_state":"",
        "open_id":_openId
    }  
	if(obj.data == undefined) {
		obj.data = [];
	}
	if(obj.data.length == 0) {
		console.log("无奖励");
		if(gameStatus==2){
			_dateObj.page_state = "无礼品（已结束）";
		}else{
			_dateObj.page_state = "无礼品（未结束）";
		}
		$("#prize_null").css("display", "block");
		$("#i_konw").trigger("focus");
		ccmap.init(".coocaabtn2", "#i_konw", "btnFocus");
	} else {
		document.getElementById("prize_list").innerHTML = "";
		var awardLength = 0;
		for(var i = 0; i < obj.data.length; i++) {
			var _time = obj.data[i].awardTime;
			_time = _time.substr(0, 10);
			var awardElementId = "myAward" + i;
			var objItem = {
				"awardElementId": awardElementId,
				"awardTime": _time,
				"awardType": obj.data[i].awardTypeId,
				"awardUrl": obj.data[i].awardUrl,
				"state": obj.data[i].awardExchangeFlag,
				"userkeyId": obj.data[i].userKeyId,
				"awardId": obj.data[i].awardId,
				"rememberId": obj.data[i].lotteryAwardRememberId,
				"lotteryActiveId": obj.data[i].activeId
			}
			var objItem2 = obj.data[i].awardInfo;
			var awardDivBox = "";
			if(objItem.awardType == 2) {
				awardLength++;
				if(objItem.state == 0) {
					awardDivBox = '<div id="'+objItem.awardElementId+'" myObj='+JSON.stringify(objItem)+' myAwardInfo='+objItem2+' class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="'+objItem.awardUrl+'" alt=""/><div class="infoPart"><p class="awardName">' + obj.data[i].awardName + '</p><p class="remarks remarks1">注：我们会按照您录入的奖品邮寄地址给您寄送奖品；</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/getnow.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
				} else {
					if (obj.data[i].awardAddressEntity.userProvince == obj.data[i].awardAddressEntity.userCity) {
                        var entityInfo = obj.data[i].awardAddressEntity.userCity + obj.data[i].awardAddressEntity.userArea + obj.data[i].awardAddressEntity.userAddress;
                    } else {
                        var entityInfo = obj.data[i].awardAddressEntity.userProvince + obj.data[i].awardAddressEntity.userCity + obj.data[i].awardAddressEntity.userArea + obj.data[i].awardAddressEntity.userAddress;
                    }
					awardDivBox = '<div id="'+objItem.awardElementId+'" myObj='+JSON.stringify(objItem)+' myAwardInfo='+objItem2+' class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="'+objItem.awardUrl+'" alt=""/><div class="infoPart"><p class="awardName">' + obj.data[i].awardName + '</p><p class="remarks remarks2">收件人信息："'+entityInfo+'"&nbsp;"'+obj.data[i].awardAddressEntity.userPhone+'"<br/>注：我们会按照您录入的奖品邮寄地址给您寄送奖品；</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/success.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
				}
			}
			if(objItem.awardType == "4") {
				awardLength++;
				awardDivBox = '<div id="'+objItem.awardElementId+'" myObj='+JSON.stringify(objItem)+' myAwardInfo='+objItem2+' class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="'+objItem.awardUrl+'" alt=""/><div class="infoPart"><p class="awardName thirdAward">' + obj.data[i].awardName + '</p><p class="remarks remarks3">注：扫描二维码即可领取！</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/qrcode.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
			}
			if(objItem.awardType == 5) {
				awardLength++;
				awardDivBox = '<div id="'+objItem.awardElementId+'" myObj='+JSON.stringify(objItem)+' myAwardInfo='+objItem2+' class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="'+objItem.awardUrl+'" alt=""/><div class="infoPart"><p class="awardName couponAward">' + obj.data[i].awardName + '</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/getnow3.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
			}
			if(objItem.awardType == 19) {
				awardLength++;
				awardDivBox = '<div id="'+objItem.awardElementId+'" myObj='+JSON.stringify(objItem)+' myAwardInfo='+objItem2+' class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="'+objItem.awardUrl+'" alt=""/><div class="infoPart"><p class="awardName coinAward">' + obj.data[i].awardName + '</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/getnow2.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
			}
			if (awardDivBox!=null&&awardDivBox!="") {
				$("#prize_list").append(awardDivBox);
			}
		}
		
		if (awardLength == 0) {
			if(gameStatus==2){
				_dateObj.page_state = "无礼品（已结束）";
			}else{
				_dateObj.page_state = "无礼品（未结束）";
			}
			$("#prize_null").css("display", "block");
			$("#i_konw").trigger("focus");
			ccmap.init(".coocaabtn2", "#i_konw", "btnFocus");
		} else{
			console.log("有奖励");
			_dateObj.page_state = "有礼品";
			$("#prize_list").css("display", "block");
			console.log(_curFocusId);
			if(_curFocusId == "" || _curFocusId == null) {
				ccmap.init(".coocaabtn2", ".awardBoxs:eq(0)", "btnFocus");
				$(".awardBoxs:eq(0)").trigger("focus");
			} else {
				console.log(_curFocusId);
				$("#" + _curFocusId).trigger("focus");
				ccmap.init(".coocaabtn2", "#"+_curFocusId, "btnFocus");
			}
		}
	}
	if (num == 0) {
		webDataLog("web_page_show_new",_dateObj);
	}
	buttonInitAfter();
}


//打开弹窗阴影
function openBg() {
	document.getElementById('bgMask').style.display = "block";
}
function closeWindow(){
	document.getElementById('bgMask').style.display = "none";
}

//保留小数
function toDecimal(x) {
	var val = Number(x);
	if(!isNaN(parseFloat(val))) {
		val = val.toFixed(2); //把 Number 四舍五入为指定小数位数的数字。
	}
	val = Number(val);
	return val;
}
//优惠券的领取并跳转
function sendPrizes(oAwardId, oRememberId, oType, oUserKeyId, oActiveId, oQsource) {
	console.log(oAwardId + "--" + oRememberId + "--" + oUserKeyId + "--" + oType + "--" + oActiveId);
	if(oQsource != "tencent") {
		oQsource = "iqiyi";
	}
	var token = calcMD5("activeId="+actionId+"&rememberId="+oRememberId+"&userKeyId="+oUserKeyId+"&cOpenId="+_openId+"&8baf4554ce0d7753");
	console.log(token);
	var ajaxTimeoutFive = $.ajax({
		type: "GET",
		async: true,
		timeout: 5000,
		dataType: 'jsonp',
		jsonp: "callback",
		url: adressIp + "/v4/lottery/verify/receive",
		data: {
			"cUDID": oUserKeyId,
			"activeId": oActiveId,
			"awardId": oAwardId,
			"rememberId": oRememberId,
			"awardTypeId": oType,
			"userKeyId": oUserKeyId,
			"MAC": _mac,
			"cModel": _model,
			"cChip": _chip,
			"cOpenId": _openId,
			"source": oQsource,
			"token":token
		},
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == "50100") {
				if(oType == "5") {
					var couponDetail = data.data.couponInfo.couponDetail;
					console.log(couponDetail);
					if(couponDetail == 1) { //已配置
						var data_a = data.data.couponInfo.onclickData;
						var packageName = JSON.parse(data_a).packageName;
						var byvalue = JSON.parse(data_a).byvalue;
						var bywhat = JSON.parse(data_a).bywhat;
						var obj = JSON.parse(data_a).param;
						var sources = new Array();
						for(var key in obj) {
							var px = {};
							px[key] = obj[key];
							sources.push(px);
						}
						sources = JSON.stringify(sources);
						console.log(packageName + "--" + byvalue + "--" + bywhat + "--" + sources);
						console.log("跳转使用页面");
						ccApp.startParamAction(bywhat, byvalue, sources, function(message) {}, function(error) {
							console.log(error);
						});
					} else {
						console.log("未配置");
					}
				} else if(oType == "19") {
					console.log("金币领取成功+跳转兑换商城");

				}
			} else {
				console.log("优惠券/金币领取失败,需要给出领取失败的提示.");
				dialogInfo(oType);
			}
		},
		error: function() {
			console.log("获取失败");
			dialogInfo(oType);
		},
		complete: function(XMLHttpRequest, status) {　　　　
			console.log("-------------complete------------------" + status);
			if(status == 'timeout') {　　　　　
				ajaxTimeoutFive.abort();　　　　
			}
		}
	});
}

function buttonInitAfter() {
	$("#prize .awardBoxs").unbind("focus").bind("focus", function() {
		console.log("----myAwards focus----");
		_curFocusId = $(this).attr("id");
		console.log(_curFocusId);
        var _index1 = $("#prize .awardBoxs").index($(this)); //btn是第几个
        var myScrollTopValue = $(".awardBoxs")[0].offsetHeight * _index1;
        console.log(myScrollTopValue);
        $("#prize_list").stop(true, true).animate({ scrollTop: myScrollTopValue }, { duration: 0, easing: "swing" });
	});

	$(".awardBoxs").unbind("itemClick").bind("itemClick", function() {
		_curFocusId = $(this).attr("id");
		console.log(_curFocusId);
		var thisStr = $(this).attr("myObj");
		var thisInfo = $(this).attr("myAwardInfo");
		console.log(thisStr);
		console.log(thisInfo);
		var thisObj1 = JSON.parse(thisStr);
		var thisObj2 = JSON.parse(thisInfo);
		
		var _awardId = thisObj1.awardId;
        var _awardName = $(this).find(".awardName")[0].innerText;
        var _awardTime = thisObj1.awardTime;
        var _awardType = thisObj1.awardType;
        var _awardUrl = thisObj1.awardUrl;
        var _awardState = thisObj1.state;
        var _lotteryActiveId = thisObj1.lotteryActiveId;
        var _rememberId = thisObj1.rememberId;
        var _userkeyId = thisObj1.userkeyId;
		
		console.log(_awardId+"=="+_awardName+"=="+_awardTime+"=="+_awardType+"=="+_awardUrl+"=="+_awardState+"=="+_lotteryActiveId+"=="+_rememberId+"=="+_userkeyId);
		
		var _dateObj = {
            "page_name":"我的奖品页",
            "open_id":_openId,
            "activity_id":actionId,
			"activity_name":"七夕活动",
			"page_state":"有礼品",
			"award_name":_awardName,
			"button_name":""
        } 
		if(_awardType == 2) {
			console.log("点击了实物奖+展示奖品");
			$("#bgMask").css("display","block");
			document.getElementById("toastQrcode").innerHTML = "";
			if(_awardState == 0) {
				console.log("点击了实物奖+显示二维码");
				_dateObj.button_name = "立即领取";
				webDataLog("web_button_clicked", _dateObj);
				_czc.push(['_trackEvent', '我的奖励页面', "按钮点击-立即领取", _awardName, '1' ,'']);
				openBg();
				$("#toastBox").css("display","block");
				$("#toastInfo1").html("奖品名称:&nbsp;&nbsp;" + _awardName);
                $("#toastInfo2").html("发放时间:&nbsp;&nbsp;" + _awardTime);
				$("#toastInfo3").html('使用<span class="wxtext">微信</span>扫码完善收货信息,确保奖品能送达您手中~');
				
				ccmap.init(".coocaabtn", "#toastQrcode", "btnFocus");
                var enstr = enurl + "activeId=" + actionId + "&rememberId=" + _rememberId + "&userKeyId=" + _userkeyId + "&open_id=" + _openId;
                generateQRCode("#toastQrcode",enstr,190);
			} else {
				console.log("点击了实物奖+不做操作");
				_dateObj.button_name = "已领取";
				webDataLog("web_button_clicked", _dateObj);
				_czc.push(['_trackEvent', '我的奖励页面', "按钮点击-已领取", _awardName, '1' ,'']);
			}
		}
		if(_awardType == 5) {
			if(_awardState == 0) {
				console.log("未领取的优惠券+领取优惠券");
				_dateObj.button_name = "立即领取";
				webDataLog("web_button_clicked", _dateObj);
				_czc.push(['_trackEvent', '我的奖励页面', "按钮点击-立即领取", _awardName, '1' ,'']);
				sendPrizes(_awardId, _rememberId, _awardType, _userkeyId, _lotteryActiveId, _qsource);
			} else {
				console.log("已领取的优惠券+跳转指定页面");
				_dateObj.button_name = "已领取";
				webDataLog("web_button_clicked", _dateObj);
				_czc.push(['_trackEvent', '我的奖励页面', "按钮点击-已领取", _awardName, '1' ,'']);
				var _awardInfo = $(this).attr("myAwardInfo");
				console.log(_awardInfo);
				console.log(typeof _awardInfo);
				var couponDetail = JSON.parse(_awardInfo).couponDetail;
				console.log(couponDetail);
				if(couponDetail == 1) { //已配置
					var data_a = JSON.parse(_awardInfo).onclickData;
					var packageName = JSON.parse(data_a).packageName;
					var byvalue = JSON.parse(data_a).byvalue;
					var bywhat = JSON.parse(data_a).bywhat;
					var obj = JSON.parse(data_a).param;
					var sources = new Array();
					for(var key in obj) {
						var px = {};
						px[key] = obj[key];
						sources.push(px);
					}
					sources = JSON.stringify(sources);
					console.log(packageName + "--" + byvalue + "--" + bywhat + "--" + sources);
					console.log("跳转使用页面");
					ccApp.startParamAction(bywhat, byvalue, sources, function(message) {}, function(error) {
						console.log(error);
					});
				} else {
					console.log("未配置");
				}
			}
		}
		if(_awardType == 4) {
			console.log("点击了第三方优惠券");
			_dateObj.button_name = "已领取";
			webDataLog("web_button_clicked", _dateObj);
			_czc.push(['_trackEvent', '我的奖励页面', "按钮点击-已领取", _awardName, '1' ,'']);
			document.getElementById("toastQrcode").innerHTML = "";
			openBg();
			$("#toastBox").css("display","block");
			$("#toastInfo1").html("奖品名称:&nbsp;&nbsp;" + _awardName);
            $("#toastInfo2").html("发放时间:&nbsp;&nbsp;" + _awardTime);
			$("#toastInfo3").html('使用<span class="wxtext">微信</span>扫一扫,立即领取奖品~');
			var imgHtml = '<img class="thirdToasrImg" src="'+_awardUrl+'" alt="">';
			$("#toastQrcode").append(imgHtml);
			ccmap.init(".coocaabtn", "#toastQrcode", "btnFocus");
		}
		if(_awardType == 19) {
			if(_awardState == 0) {
				console.log("点击了未领取金币+领取金币+跳转兑换商城");
				_dateObj.button_name = "未领取";
				webDataLog("web_button_clicked", _dateObj);
				_czc.push(['_trackEvent', '我的奖励页面', "按钮点击-未领取", _awardName, '1' ,'']);
				sendPrizes(_awardId, _rememberId, _awardType, _userkeyId, _lotteryActiveId, _qsource);
			} else {
				console.log("点击了已领取金币+跳转兑换商城");
				_dateObj.button_name = "已领取";
				webDataLog("web_button_clicked", _dateObj);
				_czc.push(['_trackEvent', '我的奖励页面', "按钮点击-已领取", _awardName, '1' ,'']);
				var coinUrl = 'https://goldshop.coocaa.com/';
				ccApp.startNewBrowser5(coinUrl, function() {}, function() {});
			}
		}
	});
}
function dialogInfo(oAwardType){
	if(oAwardType == "5"||oAwardType == "19"){
		console.log("---------");
		$("#errorInfo").css("display","block");
		clearTimeout(dialogTime);
		dialogTime = setTimeout(function(){$("#errorInfo").css("display","none");},4000);
	}
}
//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2], 'utf-8');
	return null; //返回参数值
}

//监听账户变化
function listenUserChange() {
	ccApp.addUserChanggedListener(function(message) {
		needSentUserLog2 = true;
	});
	console.log("账户状态变化" + needSentUserLog2);
}

function getDeviceInfo() {
	getNameList("awardul");
	startmarquee(400, 30, 0, 1,"awardListTwo"); //滚动获奖名单 
	ccApp.getDeviceInfo(function(message) {
		_mac = message.mac;
		if(message.activeid == "" || message.activeid == undefined || message.activeid== null){
		  if(message.mac == "" || message.mac == undefined || message.mac== null){
			_emmcCID = "undefined";
		  }else{
			_emmcCID = message.mac;
		  }
		}else{
			_emmcCID = message.activeid;
		}
		_model = message.model;
		_chip = message.chip;
		_version = message.version;
		_udid = message.activeid;
		$.ajax({
			type: "post",
			async: true,
			url: "https://restful.skysrt.com/light/active/tv/source",
			data: { cNickName: _nickName, MAC: _mac, cChip: _chip, cModel: _model, cEmmcCID: _emmcCID, cUDID: _udid, cSize: message.panel, cChannel: "coocaa", aSdk: message.androidsdk, cTcVersion: message.version.replace(/\.*/g, ""), cBrand: message.brand },
			dataType: "json",
			// timeout: 20000,
			success: function(data) {                        
				console.log("电视源返回状态：" + JSON.stringify(data));
				if (data.code == 0) {                            
					if (data.data.source == "tencent") {
						needQQ = true;
						_qsource = "tencent";
					}else if(data.data.source == "yinhe"){
						_qsource = "iqiyi";
					}
				}
				hasLogin(needQQ,0);//0走初始化，1我的奖品
			},
			error: function(error) {
				needQQ = true;
				hasLogin(needQQ,0);//0走初始化，1我的奖品
				console.log("-----------访问失败---------" + JSON.stringify(error));
			}
		});

		
  },function(error) { console.log(error);})
}

//启登录
function startLogin(needQQ, area) {
	//   leavetime = new Date().getTime();
	//   pageShowLog("okr_web_clicked_result", '{"activity_duration":"'+(leavetime-entertime)+'","activity_name":'+activity_name+'}');
	if(needQQ) {
		if(accountVersion > 4030000) {
			if(_tencentWay == "qq") {
				ccApp.startWeixinOrQQ2("LOGIN_QQ", function(message) {
					console.log(message);
				}, function(error) {
					console.log(error);
				});
			} else if(_tencentWay == "weixin") {
				ccApp.startWeixinOrQQ2("LOGIN_WEIXIN", function(message) {
					console.log(message);
				}, function(error) {
					console.log(error);
				});
			} else if(_tencentWay == "both") {
				ccApp.startWeixinOrQQ2("TENCENT", function(message) {
					console.log(message);
				}, function(error) {
					console.log(error);
				});
			}
		} else {
			ccApp.startThirdQQAccount(function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		}
	} else {
		if(_version.replace(/\./g, "") < 550000000 && accountVersion > 4030000) {
			ccApp.startUserSettingAndFinish2(function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		} else {
			ccApp.startUserSettingAndFinish(function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		}
	}
}

//获奖名单
function getNameList(id) {
	document.getElementById(id).innerHTML = "";
	$.ajax({
		type: "GET",
		async: true,
		url: adressIp + "/light/v2/web/tv-new",
		data: {
			id:actionId
		},
		success: function(data) {
		   console.log("获奖名单"+JSON.stringify(data));
			var _UserNickName = new Array();
			var _phone = new Array();
			var _awardName = new Array();
			if(data.data){
			  for (var i = 0; i < data.data.fakeNews.length; i++) {
				  if (!data.data.fakeNews[i].nickName) {
					  _UserNickName[i] = "匿名用户";
				  } else {
					  _UserNickName[i] = data.data.fakeNews[i].nickName;
				  }
				  _awardName[i] = data.data.fakeNews[i].awardName;
			  }
			  for (var i = 0; i < data.data.fakeNews.length; i++) {
	
				  var list = '<li>' + '<span class="testspan1">' + _UserNickName[i] + '</span><span class="testspan3" style="text-align:left">' + _awardName[i] + '</span></li>';
				  $("#"+id).append(list);
				}
			}
  
		},
		error: function() {
			console.log("error");
		}
	});
  }


//获奖名单滚动效果
function startmarquee(lh, speed, delay, index,id) {
    console.log("开始滚动！！！！！！！！！！！！！");
    var t;
    var p = false;
    var o = document.getElementById(id);
    o.innerHTML += o.innerHTML;
    o.onmouseover = function() { p = true }
    o.onmouseout = function() { p = false }
    o.scrollTop = 0;
    function start() {
        t = setInterval(scrolling, speed);
        if (!p) { o.scrollTop += 1; }
    }
    function scrolling() {
        if (o.scrollTop % lh != 0) {
            o.scrollTop += 1;
            if (o.scrollTop >= o.scrollHeight / 2) o.scrollTop = 0;
        } else {
            clearInterval(t);
            setTimeout(start, delay);
        }
    }
    setTimeout(start, delay);
}


//提示弹窗
function popUp(type){
	console.log(type);
	var str = '';
	openBg();
	document.getElementById('popUp').style.display = "block";
	document.getElementById('confirmInfo').style.display = "none";
	$("#submitImg").attr({src: "images/btn1.png"});
	$("#submit").attr("data","");
	if(type == "notStar"){//未开始
	  var ohtml = '七夕活动将于8月2日00:00开始';
	  $("#text1").html(ohtml);
	  $("#text3").html("定好闹钟不要错过哟~");
	  $("#beuser").hide();
	  $("#bevip").show();
	  $("#submit").show().attr("data","我明白了");
	  $("#submitImg").attr({src: "images/noneed.png"});
	  $("#submit").attr({ rightTarget: "#bevip"});
	  ccmap.init(".coocaabtn", "#submit", "btnFocus");
	}else if(type == "useUp"){//抽奖次数用完
	  $("#text1").html("拆礼物机会用完啦~可TA的礼物还没送，");
	  $("#text3").html("想再次获得机会吗？");
	  $("#bevip").show();
	  $("#submit").show().attr("data","我明白了");
	  $("#beuser").hide();
	  ccmap.init(".coocaabtn", "#bevip", "btnFocus");
		var _dateObj = {
			"page_name":"抽奖结果页",
			"page_state":"无抽奖机会",
			"page_type":"activityWindow",
			"activity_name":"七夕活动",
			"activity_id":actionId,
			"open_id":_openId
		} 
		webDataLog("web_page_show_new",_dateObj);
	}else if(type == "noone"){//抽奖次数用完
		$("#text1").html("抱歉啦，您还没有获得拆礼物的机会哟~");
		$("#text3").html("");
		$("#bevip").show();
		$("#submit").show().attr("data","我明白了");
		$("#beuser").hide();		
		ccmap.init(".coocaabtn", "#bevip", "btnFocus");
		  var _dateObj = {
			  "page_name":"抽奖结果页",
			  "page_state":"无抽奖机会",
			  "page_type":"activityWindow",
			  "activity_name":"七夕活动",
			  "activity_id":actionId,
			  "open_id":_openId
		  } 
		  webDataLog("web_page_show_new",_dateObj);
	  }else if(type == "over"){//奖品已领完或已结束
	  $("#text1").html("七夕活动已于8月8日结束~");
	  $("#text3").html("下一个七夕再相会");
	  $("#bevip").hide();
	  $("#beuser").hide();
	  $("#submit").show().attr("data","我明白了");
	  $("#submit").attr({ rightTarget: "#submit"});
	  ccmap.init(".coocaabtn", "#submit", "btnFocus");
	}else if(type == "getfocus"){
		console.log("---------");
	  $("#text1").html("啊哦，未能成功领取！");
	  $("#text3").html("如有疑问，请关注微信公众号[酷开会员]-在线客服进行查询");
	  $("#bevip").hide();
	  $("#beuser").hide();
	  $("#submit").show().attr("data","我明白了");
	  $("#submit").attr({ rightTarget: "#submit"});
	  ccmap.init(".coocaabtn", "#submit", "btnFocus");
	}else if(type == "thanks"){
	  $("#text1").html("只差一步");
	  $("#text3").html("就能为TA送一份七夕礼物了");
	  $("#bevip").hide();
	  $("#beuser").hide();
	  $("#submit").show().attr("data","我明白了");
	  $("#submitImg").attr({src: "images/btn4.png"});
	  $("#submit").attr({ rightTarget: "#submit"});
	  ccmap.init(".coocaabtn", "#submit", "btnFocus");
	}   
  }


  function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
//二维码生成
function generateQRCode(id,url,wh) {
    console.log("create img--------------" + url);
    $(id).qrcode({
        render: "canvas", // 渲染方式有table方式（IE兼容）和canvas方式
        width: wh, //宽度 
        height: wh, //高度 
        text: utf16to8(url), //内容 
        typeNumber: -1, //计算模式
        correctLevel: 2, //二维码纠错级别
        background: "#ffffff", //背景颜色
        foreground: "#000000" //二维码颜色
    });
    console.log("end img--------------");
}

function webDataLog(logname, dateObj) {
	var _dataString = JSON.stringify(dateObj);
	console.log("=-=-=-="+logname + "--" + _dataString);
	ccApp.notifyJSLogInfo(logname, _dataString, function(message) {console.log(message);}, function(error) {console.log(error);});
}
