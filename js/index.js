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
var startLoginFlag = false;
var changeLoginFlag = false;

var needSentUserLog = false; //判断是否点了登录
var needSentUserLog2 = false; //判断是否登录成功
var actionId = getUrlParam("id");

//var adressIp = "https://restful.skysrt.com";
//var enurl = "https://webapp.skysrt.com/activity618/Address/index.html?";
var adressIp = "http://beta.restful.lottery.coocaatv.com";
var enurl = "http://beta.webapp.skysrt.com/zy/address/index.html?"; //实体奖url

coocaaApp.bindEvents("menubutton", function() {
	console.log("this menuButton>>>>>>>>>new>>>>>>>>>")
});

coocaaApp.bindEvents("backbuttondown", function() {
	console.log("this backbuttondown>>>>>>>>>new>>>>>>>>>");
	if(document.getElementById('prize').style.display == "block") {
		document.getElementById('prize').style.display = "none";
		document.getElementById('index').style.display = "block";
		ccmap.init(".coocaabtn", "#egg0", "btnFocus");
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
		ccmap.init(".coocaabtn", "#egg0", "btnFocus");
	}else{
		navigator.app.exitApp();
	}
	//navigator.app.exitApp();
});

coocaaApp.bindEvents("homebutton", function() {
	console.log("this homebutton>>>>>>>>>new>>>>>>>>>");

	navigator.app.exitApp();
});

coocaaApp.bindEvents("resume", function() {
	console.log("on resume");

	console.log("======其他页面返回============");
	closeWindow();
	document.getElementById('get_window').style.display = "none";
	document.getElementById('popUp').style.display = "none";
	document.getElementById('receive_window').style.display = "none";
	document.getElementById("download_win").style.display = "none";
	document.getElementById("alert_window").style.display = "none";

	var _dateObj = {
		"page_name": "活动主页面登录弹窗",
		"login_result": "",
		"activity_name": activity_name,
		"activity_id": getUrlParam("id"),
		"open_id": _openId
	}
	console.log(needSentUserLog + "登录监听=====" + needSentUserLog2);
	if(needSentUserLog == true) {
		needSentUserLog = false;
		if(needSentUserLog2 == true) {
			needSentUserLog2 = false;
			_dateObj.login_result = "登录成功";
			if(document.getElementById("index").style.display == "block") {
				hasLogin(needQQ, 0); //0走初始化，1我的奖品
			} else if(document.getElementById("prize").style.display == "block") {
				hasLogin(needQQ, 1);
			}

		} else {
			needSentUserLog2 = false;
			_dateObj.login_result = "登录失败";
			if(document.getElementById("index").style.display == "block") {
				initActive();
			} else if(document.getElementById("prize").style.display == "block") {
				getMyAwards(2); //0 需要数据采集 
			}
		}
		webDataLog("result_event",_dateObj);
	} else {
		if(document.getElementById("index").style.display == "block") {
			initActive();
		} else if(document.getElementById("prize").style.display == "block") {
			//     getMyAwards(actionId);
		}
	}
});

coocaaApp.bindEvents("pause", function() {
	console.log("on pause");
});

coocaaApp.ready = function() {
	console.log("this is todo function----------");
};

coocaaApp.triggleButton = function() {
	_appversion = accountVersion;
	listenUserChange();
	buttonInitBefore();
	getDeviceInfo();
};
//判断是否登录
function hasLogin(needQQ, area) {
	coocaaosapi.hasCoocaaUserLogin(function(message) {
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
			coocaaosapi.getUserInfo(function(message) {
				exterInfo = message.external_info;
				_openId = message.open_id;
				data_openId = message.open_id;
				_nickName = message.nick_name;
				if(message.avatar == undefined) {
					face = qqinfo[0].face;
				} else {
					face = message.avatar;
				}
				coocaaosapi.getUserAccessToken(function(message) {
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
						console.log(_nickName);
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
				$("#chanceCount").html(data.data.overNum);
				console.log("------------------初始化次数:" + data.data.overNum);
				ccmap.init(".coocaabtn", "#egg0", "btnFocus");
			} else if(data.code == 50002) {
				_dateObj.page_state = "未开始";
				gameStatus = 0;
				gameStatusTxt = "未开始";
			} else if(data.code == 50003) {
				_dateObj.page_state = "已结束";
				gameStatus = 2;
				gameStatusTxt = "已结束";
			} else if(data.code == 50049) {
				_dateObj.page_state = "异常";
				console.log("活动必须登陆才能玩");
			}else{
				_dateObj.page_state = "异常";
			}
			webDataLog("web_page_show_new",_dateObj);
		},
		error: function(error) {
			console.log("--------初始化访问失败------" + JSON.stringify(error));
		}
    });
} 



function handleBackButtonFunc(){
	navigator.app.exitApp();
}


function handleBackButtonFunc() {
	navigator.app.exitApp();
}

function buttonInitBefore() {
	//点击金蛋
	$(".startBtn").bind('itemClick', function(event) {
		var data = $(this).attr("data")
		var _dateObj = {
			"page_name":"砸金蛋活动主页面",
			"button_name":"礼物盒",
			"button_postion":data,
			"page_state":gameStatusTxt,
			"activity_name":"七夕活动",
			"activity_id":actionId,
			"open_id":_openId
		} 
		webDataLog("web_page_show_new",_dateObj);
		console.log("-------------------------------是否登录" + _loginstatus)
		if(_loginstatus == "false") {
			startLogin(needQQ, 0);
	        var _dateObj = {
	            "page_name":"活动主页面登录弹窗",
	            "activity_name":"七夕活动",
	            "activity_id":actionId,
	        } 
	        webDataLog("web_page_show_new",_dateObj);
		} else {
			if(gameStatus == 0) {
				popUp("notStar");
			} else if(gameStatus == 2) {
				popUp("over");
			} else {
				//活动已开始
				chanceCount(); //剩余次数
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
		coocaaosapi.startMovieMemberCenter2(id,function(message) {
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
		coocaaosapi.startMovieMemberCenter2(id,function(message) {
			console.log(message);
			_czc.push(['_trackEvent', '七夕活动', '跳转会员中心次数', '', '']);
		}, function(error) {
			console.log(error);
		});
	});


	$("#beuser,#user_login").bind('itemClick', function(event) {
		var _dateObj = {
			"page_name":"砸金蛋活动主页面",
			"button_name":"成为会员",
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
		initChance();
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
		webDataLog("web_page_show_new",_dateObj);
		closeWindow();
		document.getElementById("popUp").style.display = "none";
	});
	$("#ruleMore").bind('itemClick', function(event) {
		_czc.push(['_trackEvent', '双旦', '打开活动规则', '', '']);
		document.getElementById('rule_box').style.display = "block";
		document.getElementById('index').style.display = "none";
		ccmap.init(".coocaabtn", "#rule_box", "btnFocus");
	});
	$("#go_use").bind("itemClick", function() { //立即使用购物优惠券
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
		coocaaosapi.startParamAction(bywhat, byvalue, sources, function(message) {}, function(error) {
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
		coocaaosapi.startNewBrowser5(coinUrl, function() {}, function() {});
	});


	$("#my_prize").bind('itemClick', function(event) {
		if (_loginstatus == "false") {
			needSentUserLog = true;
			startLogin(needQQ, 0);
		} else{
			$("#index").css("display", "none");
			$("#prize").css("display", "block");
			getMyAwards(actionId);
		}
	});
	$("#i_konw").bind('itemClick', function(event) {
		$("#index").css("display", "block");
		$("#prize").css("display", "none");
		$("#prize_null").css("display", "none");
		ccmap.init(".coocaabtn", null, "btnFocus");
	});
	$("#toastQrcode").bind('itemClick', function(event) {
		closeWindow();
		$("#index").css("display", "none");
		$("#toastBox").css("display", "none");
		$("#prize").css("display", "block");
		getMyAwards(actionId);
	});
	
}

//剩余抽奖次数
function chanceCount() {
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
			},
			success: function(data) {
				console.log("抽奖结果" + JSON.stringify(data));
				if(data.code == 50100) {
					var awardName = data.data.awardName;
					var awardTypeId = data.data.awardTypeId;
					var lotteryAwardMemberId = data.data.lotteryAwardRememberId;
					var awardExchangeFlag = data.data.awardExchangeFlag;
					var awardId = data.data.awardId;
					var awardPictureUrl = data.data.awardUrl;
					$("#chanceCount").html(overNum - 1);
					lastWindow(awardId, awardTypeId, lotteryAwardMemberId, awardExchangeFlag, awardPictureUrl, awardName)
				}else if(data.code == 50023){
					popUp("over"); //抽奖次数用完
				}
			},
			error: function() {
				console.log("--------访问失败");
			}
		});
	} else {
		popUp("useUp"); //抽奖次数用完
	}
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
		$("#subInfo").attr("data","获得第三方优惠券");
		ccmap.init(".coocaabtn", "#subInfo", "btnFocus");
	} else if(awardTypeId == 2) { //实物奖品
		_dateObj.page_state = "获得实物奖";
		$("#type2").show();
		$("#type2").siblings().hide();
		$('#qrcode').html("");
		$("#shop").hide();
		$("#subInfo").attr("data","获得实物奖");
		// generateQRCode("https://webapp.skysrt.com/zy/game/address/index.html?lotteryAwardMemberId="+lotteryAwardMemberId+"&access_token="+access_token+"&awardName="+awardName);
		generateQRCode("http://beta.webapp.skysrt.com/zy/address/index.html?activeId=" + actionId + "&rememberId=" + lotteryAwardMemberId + "&userKeyId=" + userKeyId);
		ccmap.init(".coocaabtn", "#subInfo", "btnFocus");
	}
	webDataLog("web_page_show_new",_dateObj);
}

//领奖品
function getGold(awardId, awardTypeId, lotteryAwardMemberId, awardExchangeFlag, awardPictureUrl, awardName) {
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
			source:_qsource
		},
		success: function(data) {
			console.log("--------确认成功：" + JSON.stringify(data.data));
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
						ources = new Array();
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
					ccmap.init(".coocaabtn", "#shop", "btnFocus");
					
				} else {
					$("#type19").show();
					$("#type19").siblings().hide();
					$("#shop").hide();
					$("#go_experience").show();
					$("#subInfo").attr("data","获得金币");
					ccmap.init(".coocaabtn", "#go_experience", "btnFocus");
				}
			}
		},
		error: function(error) {
			console.log("-----------------------error"+JSON.stringify(error));
		}
	});
}

//我的奖品
function getMyAwards(curActionid) {
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
			dealAfterGetAward(dataObj);
		}
	});
}

function dealAfterGetAward(obj) {
	$("#prize_null").css("display", "none");
	$("#prize_list").css("display", "none");
	console.log(JSON.stringify(obj));
	if(obj.data == undefined) {
		obj.data = [];
	}
	if(obj.data.length == 0) {
		console.log("无奖励");
		$("#prize_null").css("display", "block");
		ccmap.init(".coocaabtn", "#i_konw", "btnFocus");
	} else {
		console.log("有奖励");
		$("#prize_list").css("display", "block");
		document.getElementById("prize_list").innerHTML = "";
		if(obj.code == "50100") {
			if(obj.data.length != 0) {
				for(var i = 0; i < obj.data.length; i++) {
					console.log(obj.data[i].awardTypeId);
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
					if(objItem.awardType == 2) {
						if(objItem.state == 0) {
							var awardDivBox = '<div id="'+objItem.awardElementId+'" myObj='+JSON.stringify(objItem)+' myAwardInfo='+objItem2+' class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/entity1.png" alt=""/><div class="infoPart"><p class="awardName">' + obj.data[i].awardName + '</p><p class="remarks remarks1">注：我们会按照您录入的奖品邮寄地址给您寄送奖品；</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/getnow.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
						} else {
							var awardDivBox = '<div id="'+objItem.awardElementId+'" myObj='+JSON.stringify(objItem)+' myAwardInfo='+objItem2+' class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/entity4.png" alt=""/><div class="infoPart"><p class="awardName">' + obj.data[i].awardName + '</p><p class="remarks remarks2">收件人信息：广东省深圳市宝安区创维工业园创维工业园创维工业园创维工业园创维创新谷100楼 1378989227<br/>注：我们会按照您录入的奖品邮寄地址给您寄送奖品；</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/success.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
						}
					}
					if(objItem.awardType == 4) {
						var awardDivBox = '<div id="'+objItem.awardElementId+'" myObj='+JSON.stringify(objItem)+' myAwardInfo='+objItem2+' class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/third.png" alt=""/><div class="infoPart"><p class="awardName thirdAward">' + obj.data[i].awardName + '</p><p class="remarks remarks3">注：扫描二维码即可领取！</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/qrcode.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
					}
					if(objItem.awardType == 5) {
						//if(objItem.state == 0) {
							var awardDivBox = '<div id="'+objItem.awardElementId+'" myObj='+JSON.stringify(objItem)+' myAwardInfo='+objItem2+' class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/coupon.png" alt=""/><div class="infoPart"><p class="awardName couponAward">' + obj.data[i].awardName + '</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/getnow3.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
						//} else {
							//var awardDivBox = '<div id="'+objItem.awardElementId+'" myObj='+JSON.stringify(objItem)+' myAwardInfo='+objItem2+' class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/coupon.png" alt=""/><div class="infoPart"><p class="awardName couponAward">' + obj.data[i].awardName + '</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/success.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
						//}
					}
					if(objItem.awardType == 19) {
						//if(objItem.state == 0) {
							var awardDivBox = '<div id="'+objItem.awardElementId+'" myObj='+JSON.stringify(objItem)+' myAwardInfo='+objItem2+' class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/coin.png" alt=""/><div class="infoPart"><p class="awardName coinAward">' + obj.data[i].awardName + '</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/getnow2.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
						//} else {
							//var awardDivBox = '<div id="'+objItem.awardElementId+'" myObj='+JSON.stringify(objItem)+' myAwardInfo='+objItem2+' class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/coin.png" alt=""/><div class="infoPart"><p class="awardName coinAward">' + obj.data[i].awardName + '</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/success.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
						//}
					}
					$("#prize_list").append(awardDivBox);
				}
			}
		}
	}
	buttonInitAfter();
	console.log(_curFocusId);
	if(_curFocusId == "" || _curFocusId == null) {
		$(".awardBoxs:eq(0)").trigger("focus");
		ccmap.init(".coocaabtn2", ".awardBoxs:eq(0)", "btnFocus");
	} else {
		console.log(_curFocusId);
		$("#" + _curFocusId).trigger("focus");
		ccmap.init(".coocaabtn2", "#"+_curFocusId, "btnFocus");
	}
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
			"cOpenId": _openId,
			"source": oQsource
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
						coocaaosapi.startParamAction(bywhat, byvalue, sources, function(message) {}, function(error) {
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
			}
		},
		error: function() {
			console.log("获取失败");
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
        var _index1 = $("#prize .awardBoxs").index($(this)); //btn是第几个
        var myScrollTopValue = $(".awardBoxs")[0].offsetHeight * _index1;
        console.log(myScrollTopValue);
        $("#prize_list").stop(true, true).animate({ scrollTop: myScrollTopValue }, { duration: 0, easing: "swing" });
	});

	$(".awardBoxs").unbind("itemClick").bind("itemClick", function() {
		_curFocusId = $(this).attr("id");
		console.log(_curFocusId)
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
		//var _dateObj = {
		//"page_name": "弹窗页面",
		//"parent_page": "我的奖品页",
		//"award_type": "",
		//"award_id": _awardId,
		//"award_name": _awardName,
		//"page_type": "",
		//"activity_type": "2019教育暑期活动",
		//"activity_name": "2019教育暑期活动",
		//"OPEN_ID": _openId
		//};
		//var _dateObj2 = {
		//	"page_name": "我的奖品页",
		//	"button_name": "",
		//	"page_type": "我的奖品页",
		//	"activity_type": "2019教育暑期活动",
		//	"activity_name": "2019教育暑期活动",
		//	"OPEN_ID": _openId
		//};
		if(_awardType == 2) {
			console.log("点击了实物奖+展示奖品");
			document.getElementById("toastQrcode").innerHTML = "";
			if(_awardState == 0) {
				console.log("点击了实物奖+显示二维码");
				//_dateObj.award_type = "实物奖品";
				//_dateObj.page_type = "领取实体物品";
				//webDataLog("web_page_show_new", _dateObj);
				//_dateObj2.button_name = "待领取-实物奖品";
				//webDataLog("web_button_clicked_new", _dateObj2);
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
			}
		}
		if(_awardType == 5) {
			if(_awardState == 0) {
				console.log("未领取的优惠券+领取优惠券");
				//_dateObj2.button_name = "待领取-优惠券";
				//webDataLog("web_button_clicked_new", _dateObj2);
				sendPrizes(_awardId, _rememberId, _awardType, _userkeyId, _lotteryActiveId, _qsource);
			} else {
				console.log("已领取的优惠券+跳转指定页面");
				//_dateObj2.button_name = "立即使用-优惠券";
				//webDataLog("web_button_clicked_new", _dateObj2);
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
					coocaaosapi.startParamAction(bywhat, byvalue, sources, function(message) {}, function(error) {
						console.log(error);
					});
				} else {
					console.log("未配置");
				}
			}
		}
		if(_awardType == 4) {
			console.log("点击了第三方优惠券+不做响应");
			document.getElementById("toastQrcode").innerHTML = "";
			openBg();
			$("#toastBox").css("display","block");
			$("#toastInfo1").html("奖品名称:&nbsp;&nbsp;" + _awardName);
            $("#toastInfo2").html("发放时间:&nbsp;&nbsp;" + _awardTime);
			$("#toastInfo3").html('使用<span class="wxtext">微信</span>扫一扫,立即领取奖品~');
			var imgHtml = '<img class="thirdToasrImg" src="../images/award/thirdQrcode.png">';
			$("#toastQrcode").append(imgHtml);
			ccmap.init(".coocaabtn", "#toastQrcode", "btnFocus");
		}
		if(_awardType == 19) {
			if(_awardState == 0) {
				console.log("点击了未领取金币+领取金币+跳转兑换商城");
				sendPrizes(_awardId, _rememberId, _awardType, _userkeyId, _lotteryActiveId, _qsource);
			} else {
				console.log("点击了已领取金币+跳转兑换商城");
				var coinUrl = 'https://goldshop.coocaa.com/';
				coocaaosapi.startNewBrowser5(coinUrl, function() {}, function() {});
			}
		}
	});
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
	coocaaosapi.addUserChanggedListener(function(message) {
		needSentUserLog2 = true;
	});
	console.log("账户状态变化" + needSentUserLog2);
}

function getDeviceInfo() {
	getNameList("awardul");
	startmarquee(400, 30, 0, 1,"awardListTwo"); //滚动获奖名单 

	coocaaosapi.getDeviceInfo(function(message) {
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
				coocaaosapi.startWeixinOrQQ2("LOGIN_QQ", function(message) {
					console.log(message);
				}, function(error) {
					console.log(error);
				});
			} else if(_tencentWay == "weixin") {
				coocaaosapi.startWeixinOrQQ2("LOGIN_WEIXIN", function(message) {
					console.log(message);
				}, function(error) {
					console.log(error);
				});
			} else if(_tencentWay == "both") {
				coocaaosapi.startWeixinOrQQ2("TENCENT", function(message) {
					console.log(message);
				}, function(error) {
					console.log(error);
				});
			}
		} else {
			coocaaosapi.startThirdQQAccount(function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		}
	} else {
		if(_version.replace(/\./g, "") < 550000000 && accountVersion > 4030000) {
			coocaaosapi.startUserSettingAndFinish2(function(message) {
				console.log(message);
			}, function(error) {
				console.log(error);
			});
		} else {
			coocaaosapi.startUserSettingAndFinish(function(message) {
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
				  if (!data.data.fakeNews[i].awardName) {
					  _UserNickName[i] = "匿名用户";
				  } else {
					  _UserNickName[i] = data.data[i].nickName;
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
	var str = '';
	openBg();
	document.getElementById('popUp').style.display = "block";
	$("#submitImg").attr({src: "images/btn1.png"});
	$("#submit").attr("data","");
	if(type == "notStar"){//未开始
	  var aTime = $("#startTime").html();
	  console.log("开始时间为："+aTime);
	  var ohtml = '七夕活动将于<span style="color:#ffff33" id="activeTime">'+aTime+'</span>开始';
	  $("#text1").append(ohtml);
	  $("#text2").html("定好闹钟不要错过哟~");
	  $("#text3").html("");
	  $("#beuser").hide();
	  $("#bevip").hide();
	  $("#submit").show().attr("data","不用了");
	  $("#submitImg").attr({src: "images/noneed.png"});
	  $("#submit").attr({ rightTarget: "#submit"});
	  ccmap.init(".coocaabtn", "#submit", "btnFocus");
	}else if(type == "useUp"){//抽奖次数用完
	  $("#text1").html("拆礼物机会用完啦~可TA的礼物还没送，");
	  $("#text2").html("");
	  $("#text3").html("想再次获得机会吗？");
	  $("#bevip").show();
	  $("#submit").show();
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
	  $("#text2").html("下一个七夕再相会");
	  $("#text3").html("");
	  $("#bevip").hide();
	  $("#beuser").hide();
	  $("#submit").show();
	  $("#submit").attr({ rightTarget: "#submit"});
	  ccmap.init(".coocaabtn", "#submit", "btnFocus");
	}else if(type == "getfocus"){
	  $("#text1").html("啊哦，未能成功领取！");
	  $("#text2").html("");
	  $("#text3").html("如有疑问，请关注微信公众号[酷开会员]-在线客服进行查询");
	  $("#bevip").hide();
	  $("#beuser").hide();
	  $("#submit").show();
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
	console.log(logname + "--" + _dataString);
	//coocaaosapi.notifyJSLogInfo(logname, _dataString, function(message) {console.log(message);}, function(error) {console.log(error);});
}
