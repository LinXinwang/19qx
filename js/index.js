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


var dataObj = {};//我的奖励数据
var _curFocusId = null;
var startLoginFlag = false;
var changeLoginFlag = false;
<<<<<<< HEAD
=======
var hasAllowanceAward = false; //记录是否有津贴
var hasCouponAward = false; //记录是否有神券
var dialogTime = null;

var answerRightFlag = null;		// 视频答题回答正确标志
var _openId = "";
var data_openId = "空";
var gameStatus ="";
var overNum = "";
var userKeyId = ""
>>>>>>> 33be3ea17476fc60eea980b122813f703a3c47b8

//var adressIp = "https://restful.skysrt.com";
//var enurl = "https://webapp.skysrt.com/activity618/Address/index.html?";
var adressIp = "http://beta.restful.lottery.coocaatv.com";
var enurl = "http://beta.webapp.skysrt.com/zy/address/index.html?";//实体奖url

coocaaApp.bindEvents("menubutton", function() {
    console.log("this menuButton>>>>>>>>>new>>>>>>>>>")
});

coocaaApp.bindEvents("backbuttondown", function() {
    console.log("this backbuttondown>>>>>>>>>new>>>>>>>>>");
    handleBackButtonFunc();
});

coocaaApp.bindEvents("homebutton", function() {
    console.log("this homebutton>>>>>>>>>new>>>>>>>>>");
    
    navigator.app.exitApp();
});

coocaaApp.bindEvents("resume", function() {
	console.log("on resume");
	console.log(startLoginFlag);
	console.log(changeLoginFlag);
	if(startLoginFlag && changeLoginFlag){
        console.log("登录成功");
        startLoginFlag = false;
        changeLoginFlag = false;
        //TODO:主页面启登录的结果的日志项提交；
    }else if (startLoginFlag) {
        console.log("登录失败");
        startLoginFlag = false;
        changeLoginFlag = false;
        //TODO:主页面启登录的结果的日志项提交；
    }else{
    	//pageResume();
    }
});

coocaaApp.bindEvents("pause", function() {
	console.log("on pause");
});

coocaaApp.ready=function() {
	console.log("this is todo function----------");
	coocaaosapi.getDeviceInfo(function(message) {
		userMac = message.mac;
		if(message.activeid == "" || message.activeid == undefined || message.activeid== null){
		  if(message.mac == "" || message.mac == undefined || message.mac== null){
			emmcid = "undefined";
		  }else{
			emmcid = message.mac;
		  }
		}else{
		  emmcid = message.activeid;
		}
		userModel = message.model;
		userChip = message.chip;
		_version = message.version;
		activityId = message.activeid;
		console.log("----------------获取激活ID:" + emmcid+";activeid:"+message.activeid+";mac:"+message.mac+";userModel:"+userModel);
  },function(error) { console.log(error);})	
};

coocaaApp.triggleButton=function() {
<<<<<<< HEAD
    _appversion = accountVersion;
    
    $("#myawardPage").css("display","block");
    getMyAwards("153");
=======
	setTimeout(updateMainPageBeforeInit, 1);
    _appversion = accountVersion;	
    listenUserChange();
    buttonInitBefore();
    getDeviceInfo();
>>>>>>> 33be3ea17476fc60eea980b122813f703a3c47b8
};
//判断是否登录
function hasLogin(needQQ,area) {
	//area = 0初始化，1奖品列表
	coocaaosapi.hasCoocaaUserLogin(function(message) {
		console.log(area+"======haslogin======== " + message.haslogin);
		_loginstatus = message.haslogin;
		if(_loginstatus == "false") {
			if(cAppVersion >= 3190030) {
				_tencentWay = "both";
			}else {
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
				$("#user_login").hide();
				$("#userName").show();
				$("#userName").html(_nickName);
				if(message.avatar == undefined){
					face = qqinfo[0].face;
				}else{
					face = message.avatar;
				}
				coocaaosapi.getUserAccessToken(function(message) {
					_accessToken = message.accesstoken;
					console.log("_accessToken==============="+_accessToken);
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
									_login_type = 1;//QQ登录
								} else {
									_login_type = 2;//微信登陆
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
					
					console.log("_login_type-----------"+_login_type);
					if(_openId != ""){
					  console.log("已登录openId============"+_openId);
					  $(".startLogin").hide();
					  document.getElementById("startLogin").style.display = "none";
					  document.getElementById("_startLogin").style.display = "none";
					  $(".hasLogin").show();
					  $(".hasLogin img").attr("src",face);
					  $(".hasLogin span").html(_nickName);
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
    $.ajax({
        async:false,
        url: adressIp+"/light/v2/web/init",
		type: "POST",
		data:{
			"cUDID":emmcid,
			"MAC":userMac,
			"cModel":userModel,
			"cChip":userChip,
			"cOpenId":_openId,
		},
        success: function(data) {
			console.log("初始化"+JSON.stringify(data));
			if(data.code == 50100){
				userKeyId = data.data.userKeyId;
				gameStatus = 1;
				overNum = data.data.overNum;
				$("#chanceCount").html(data.data.overNum);
				console.log("------------------初始化次数:"+data.data.overNum);
				map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
			}else if(data.code == 50002){
				console.log("活动未开始");
				gameStatus = 0;
			}else if(data.code == 50003){
				console.log("活动已结束");
				gameStatus = 2;
			}else if(data.code == 50049){
				console.log("活动必须登陆才能玩");
			}

        }
    });
} 

function lastWindow(awardId,awardTypeId,lotteryAwardMemberId,awardExchangeFlag,awardPictureUrl,awardName,cardInfo){
    document.getElementById('confirmPhone').style.display="none";
//    map = new coocaakeymap($(".coocaabtn"),document.getElementById("subInfo"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    $(".matter").html("");
    console.log("获奖类型:"+awardId+"奖品名称:"+awardName);
    closeWindow();
    openBg();
  //  $("#confirmInfo").show();
    document.getElementById('confirmInfo').style.display="block";
    if(awardId == 209 || awardId == 220 || awardId == 221 || awardId == 224 || awardId == 225 || awardId == 226 || awardId == 227 || awardId == 228){//实物奖品
      $("#type209").show();
      $("#type209").siblings().hide();
      $('#qrcode').html("");
      $("#shop").hide();
      generateQRCode("https://webapp.skysrt.com/zy/game/address/index.html?lotteryAwardMemberId="+lotteryAwardMemberId+"&access_token="+access_token+"&awardName="+awardName);
    //  qrcode.makeCode("http://beta.webapp.skysrt.com/zy/egg1/eggAdress/index.html?lotteryAwardMemberId="+lotteryAwardMemberId+"&awardExchangeFlag="+awardExchangeFlag+"&access_token="+access_token+"&awardName="+awardName);
      map = new coocaakeymap($(".coocaabtn"),document.getElementById("subInfo"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    }else if(awardId == 203){//商城优惠券
      $("#type203").show();
      $("#type203").siblings().hide();
      $("#shop").show();
      map = new coocaakeymap($(".coocaabtn"),document.getElementById("subInfo"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    }else if(awardId == 205){//ofo
      $("#type205").show();
      $("#type205").siblings().hide();
      $("#shop").hide();
      map = new coocaakeymap($(".coocaabtn"),document.getElementById("subInfo"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    }

    var chanceCount = $("#chanceCount").html();
    // if(chanceCount != 0){
    //   $("#changeImg").attr({src: "images/btn4_c8e901b.png"});
    // }else{
    //   $("#changeImg").attr({src: "images/btn1_283af48.png"});
    // }
    $(".matter").html(awardName);

}


function buttonInitBefore(){
  //点击金蛋
  $(".startBtn").bind('itemClick', function(event) {
     console.log("-------------------------------是否登录" + loginstatus)
     if(_loginstatus == "false"){
        popUp("noLogin");
     }else{
          if(gameStatus == 0){
            popUp("notStar");            
          }else if(gameStatus == 2){
			popUp("over");
		  }else{
            //活动已开始
            chanceCount();//剩余次数
          }
    }
	});
	
	//跳转成为会员
	$("#bevip,#vip_btn,#buy_vip").bind('itemClick', function(event) {
		console.log("bevipshow");
		document.getElementById("deviceready").setAttribute("NoStart","true");
		coocaaosapi.startMovieMemberCenter2("5",function(message) {
			console.log(message);
			listen = "1";
			console.log("成为会员：listen"+listen);
			_czc.push(['_trackEvent', '七夕活动', '跳转会员中心次数', '', '']);
		}, function(error) {
			console.log(error);
		});
	});

    //最后一部确认信息
    $("#subInfo").bind('itemClick', function(event) {
		closeWindow();
		$("#confirmInfo").hide();
		initChance();
		map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
	});


	$("#ruleMore").bind('itemClick', function(event) {
		_czc.push(['_trackEvent', '双旦', '打开活动规则', '', '']);
		document.getElementById('rule_box').style.display="block";
		map = new coocaakeymap($(".coocaabtn"), document.getElementById('rule_box'), "btnFocus", function() {}, function(val) {}, function(obj) {});
	  });


    $("#go_use,#go_experience").bind("itemClick",function(){//立即使用购物优惠券
        leavetime = new Date().getTime();
        var dateObj = {
            "page_name":"中奖弹窗",
            "button_name":"立即使用",
            "parent_page":"中奖弹窗",
            "prize_type":prize_type,
            "prize_id":awardId,
            "prize_name":awardName,
            "activity_name":activity_name,
            "activity_type":activity_type,
            "activity_id":actionId,
            "open_id":data_openId
        } 
        var _dateObj = {
            "page_name":"活动主页面",
            "page_type":"活动主页面",
            "activity_duration":leavetime-entertime,
            "activity_name":activity_name,
            "activity_type":activity_type,
            "activity_id":actionId,
            "open_id":data_openId
        }      
        // pageShowLog("web_button_clicked_new", dateObj);   
        // pageShowLog("result_event_new", _dateObj);
        if(awardTypeId == 5){
            bywhat = $.trim(bywhat);
            byvalue = $.trim(byvalue);
            console.log("bywhat："+bywhat);
            console.log("byvalue:"+byvalue);
            console.log("sources:"+sources)
            coocaaosapi.startParamAction(bywhat,byvalue,sources,function(message) {
            }, function(error) {
                console.log("判断失败"+error);
            });
        } else if(haveGoExtend == 0){//没有配置
			var coinUrl = 'https://goldshop.coocaa.com/';
			coocaaosapi.startNewBrowser5(coinUrl, function() {}, function() {});v
        }
    });

}

//剩余抽奖次数
function chanceCount(num) {
	var chanceCount = $("#chanceCount").html();//抽奖次数
			if(overNum > 0){
				$.ajax({
					type: "get",
					async: true,
					url: adressIp+"/light/v2/web/start",
					data:{
						"cUDID":emmcid,
						"MAC":userMac,
						"cModel":userModel,
						"cChip":userChip,
						"cOpenId":_openId,	
					},
					success: function(data) {
					console.log("抽奖结果"+JSON.stringify(data.data));
					//	popUp("notWinning");//没抽中
						if(data.code == 50100){
							var awardName = data.data.awardName;
							var awardTypeId = data.data.awardTypeId;
							var lotteryAwardMemberId = data.data.lotteryAwardMemberId;
							var awardExchangeFlag = data.data.awardExchangeFlag;
							var awardId = data.data.awardId;
							var awardPictureUrl = data.data.awardPictureUrl;
							$("#chanceCount").html(overNum-1);
							lastWindow(awardId,awardTypeId,lotteryAwardMemberId,awardExchangeFlag,awardPictureUrl,awardName)
						}
					},
					error: function(){
						console.log("--------访问失败");
					}
				});
			}else{
				popUp("useUp");//抽奖次数用完
			}
  }
  

  function lastWindow(awardId,awardTypeId,lotteryAwardMemberId,awardExchangeFlag,awardPictureUrl,awardName){
    document.getElementById('confirmPhone').style.display="none";
	$(".matter").html(awardName);
	$(".type-img").attr("src", awardPictureUrl);
    console.log("获奖类型:"+confirmPhone+"奖品名称:"+awardName);
    closeWindow();
    openBg();
    document.getElementById('confirmInfo').style.display="block";
	if(awardTypeId ==19 || awardTypeId == 5){//金币 || 商城优惠券
		getGold(awardId,awardTypeId,lotteryAwardMemberId,awardExchangeFlag,awardPictureUrl,awardName);	
    }else if(awardTypeId == 4){//第三方优惠券
      $("#type4").show();
      $("#type4").siblings().hide();
      $("#shop").hide();
      map = new coocaakeymap($(".coocaabtn"),document.getElementById("subInfo"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    }else if(awardTypeId == 2){//实物奖品
      $("#type2").show();
      $("#type2").siblings().hide();
      $('#qrcode').html("");
      $("#shop").hide();
     // generateQRCode("https://webapp.skysrt.com/zy/game/address/index.html?lotteryAwardMemberId="+lotteryAwardMemberId+"&access_token="+access_token+"&awardName="+awardName);
      qrcode.makeCode("http://beta.webapp.skysrt.com/zy/egg1/eggAdress/index.html?lotteryAwardMemberId="+lotteryAwardMemberId+"&awardExchangeFlag="+awardExchangeFlag+"&access_token="+access_token+"&awardName="+awardName);
      map = new coocaakeymap($(".coocaabtn"),document.getElementById("subInfo"), "btnFocus", function() {}, function(val) {}, function(obj) {});
	}

}

//领奖品
function getGold(awardId,awardTypeId,lotteryAwardMemberId,awardExchangeFlag,awardPictureUrl,awardName){

	console.log("奖品类型："+awardTypeId+"奖品参数ID:"+awardId+"奖品图片："+awardPictureUrl);
	$.ajax({
		  async:false,
		  url: adressIp+"/v4/lottery/verify/receive/",
		  type: "GET",
		  data:{
			"activeId":getUrlParam("id"),
			"awardId":awardId,
			"rememberId":lotteryAwardMemberId,
			"awardTypeId":awardTypeId,
			"cUDID":emmcid,
			"MAC":userMac,
			"cModel":userModel,
			"cChip":userChip,
			"cOpenId":_openId,	
			"userKeyId":userKeyId
		},
		  success: function(data) {
				  console.log("--------确认成功："+JSON.stringify(data.data));
				  if(data.code == 50100){ 
					if(data.data.awardTypeId == 5){
						$("#type5").show();
						$("#type5").siblings().hide();
						$("#shop").show();
						$("#go_experience").hide();
						map = new coocaakeymap($(".coocaabtn"),document.getElementById("shop"), "btnFocus", function() {}, function(val) {}, function(obj) {});
					}else{
						$("#type19").show();
						$("#type19").siblings().hide();
						$("#shop").hide();
						$("#go_experience").show();
						map = new coocaakeymap($(".coocaabtn"),document.getElementById("go_experience"), "btnFocus", function() {}, function(val) {}, function(obj) {});
					}

					haveGoExtend = data.data.haveGoExtend;
					if(haveGoExtend == 1){//已配置
					  var data_a = data.data.goExtend;
					  byvalue = JSON.parse(data_a).byvalue;
					  bywhat = JSON.parse(data_a).bywhat;
					  obj = JSON.parse(data_a).params;
					  sources = new Array();
					  for(var key in obj)
					  {
						var px = {};
						px[key] = obj[key];
						sources.push(px);
					  }
					  sources = JSON.stringify(sources);
					  console.log("跳转参数："+haveGoExtend+"========"+byvalue+"====="+bywhat+"====="+sources);

					}else if(haveGoExtend == 0){//没有配置
					  console.log("没配置跳转参数");
					}

				  }else{
					popUp("getfocus");
				  }

		  },
		   error: function(){
			   console.log("--------访问失败");
			   popUp("getfocus");
		   }
	  });
	  map = new coocaakeymap($(".coocaabtn"),null, "btnFocus", function() {}, function(val) {}, function(obj) {});

}

//提示弹窗
function popUp(type){
	var str = '';
	openBg();
	document.getElementById('popUp').style.display = "block";
	if(type == "noLogin"){//未登录
	  $("#text1").html("做个有名有姓的人~");
	  $("#text2").html("请登录后再参加活动");
	  $("#text3").html("");
	  $("#beuser").show();
	  $("#bevip").hide();
	  $("#submit").hide();
	  map = new coocaakeymap($(".coocaabtn"),document.getElementById('beuser'), "btnFocus", function() {}, function(val) {}, function(obj) {});
	}else if(type == "notStar"){//未开始
	  var aTime = $("#startTime").html();
	  console.log("开始时间为："+aTime);
	  var ohtml = '活动将于<span style="color:#ffff33" id="activeTime">'+aTime+'</span>开始';
	  $("#text1").append(ohtml);
	  $("#text2").html("请定好闹钟不要错过哟~");
	  $("#text3").html("");
	  $("#beuser").hide();
	  $("#bevip").hide();
	  $("#submit").show();
	  $("#submit").attr({ rightTarget: "#submit"});
	  map = new coocaakeymap($(".coocaabtn"),document.getElementById('submit'), "btnFocus", function() {}, function(val) {}, function(obj) {});
	}else if(type == "useUp"){//抽奖次数用完
	  $("#text1").html("暂无抽奖机会");
	  $("#text2").html("立即购买连续包月、季卡、年卡会员");
	  $("#text3").html("可获[免单]等大奖,100%中奖哟~");
	  $("#bevip").show();
	  $("#submit").show();
	  $("#beuser").hide();
	  $("#submitImg").attr({src: "images/btn1_283af48.png"});
	  map = new coocaakeymap($(".coocaabtn"),document.getElementById('bevip'), "btnFocus", function() {}, function(val) {}, function(obj) {});
	}else if(type == "over"){//奖品已领完或已结束
	  $("#text1").html("好遗憾，活动已于1月3日24:00结束");
	  $("#text2").html("（已参与用户可在[我的奖品]中查看中奖信息）");
	  $("#text3").html("");
	  $("#bevip").hide();
	  $("#beuser").hide();
	  $("#submit").show();
	  $("#submit").attr({ rightTarget: "#submit"});
	  map = new coocaakeymap($(".coocaabtn"),document.getElementById('submit'), "btnFocus", function() {}, function(val) {}, function(obj) {});
	}else if(type == "notWinning"){
	  $("#text1").html("好遗憾，您与大奖擦肩而过！");
	  $("#text2").html("");
	  $("#text3").html("");
	  $("#bevip").hide();
	  $("#beuser").hide();
	  $("#submit").show();
	  $("#submit").attr({ rightTarget: "#submit"});
	  var chanceCount = $("#chanceCount").html();
	  if(chanceCount != 0){
		$("#submitImg").attr({src: "images/btn4_c8e901b.png"});
	  }else{
		$("#submitImg").attr({src: "images/btn1_283af48.png"});
	  }
	  map = new coocaakeymap($(".coocaabtn"),document.getElementById('submit'), "btnFocus", function() {}, function(val) {}, function(obj) {});
	}else if(type == "getover"){
	  $("#text1").html("您已经领取过奖品！");
	  $("#text2").html("");
	  $("#text3").html("如有疑问，请关注微信公众号[酷开会员]-在线客服进行查询");
	  $("#bevip").hide();
	  $("#beuser").hide();
	  $("#submit").show();
	  $("#submit").attr({ rightTarget: "#submit"});
	  map = new coocaakeymap($(".coocaabtn"),document.getElementById('submit'), "btnFocus", function() {}, function(val) {}, function(obj) {});
	}else if(type == "getfocus"){
	  $("#text1").html("啊哦，未能成功领取！");
	  $("#text2").html("");
	  $("#text3").html("如有疑问，请关注微信公众号[酷开会员]-在线客服进行查询");
	  $("#bevip").hide();
	  $("#beuser").hide();
	  $("#submit").show();
	  $("#submit").attr({ rightTarget: "#submit"});
	  map = new coocaakeymap($(".coocaabtn"),document.getElementById('submit'), "btnFocus", function() {}, function(val) {}, function(obj) {});
	}   
  }
  


function handleBackButtonFunc(){
	navigator.app.exitApp();
}
//我的奖品
function getMyAwards(curActionid) {
	console.log(_mac+"--"+_model+"--"+_chip+"--"+_udid+"--"+curActionid);
	_mac = 'bcec23d3557c';
	_model = 'M6';
	_chip = '8H79';
	_udid = '74106666';
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
			"cChip": _chip
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
function dealAfterGetAward(obj){
	$("#prize_null").css("display", "none");
	$("#prize_list").css("display", "none");
	//console.log(JSON.stringify(obj));
	if(obj.data == undefined) {
		obj.data = [];
	}
	if(obj.data.length==0){
		console.log("无奖励");
		$("#prize_null").css("display", "block");
	}else{
		console.log("有奖励");
		$("#prize_list").css("display", "block");
		//document.getElementById("prize_list").innerHTML = "";
		if(obj.code == "50100") {
			if(obj.data.length != 0) {
				for(var i = 0; i < obj.data.length; i++) {
					console.log(obj.data[i].awardTypeId);
					var _time = obj.data[i].awardTime;
					_time = _time.substr(0, 10);
					var awardElementId = "myAward"+i;
					var objItem2 = {
						"awardElementId": awardElementId,
						"awardName": obj.data[i].awardName,
						"awardTime": _time,
						"awardType": obj.data[i].awardTypeId,
						"awardUrl": obj.data[i].awardUrl,
						"state": obj.data[i].awardExchangeFlag,
						"userkeyId": obj.data[i].userKeyId,
						"awardId": obj.data[i].awardId,
						"rememberId": obj.data[i].lotteryAwardRememberId,
						"lotteryActiveId": obj.data[i].activeId,
						"awardInfo": obj.data[i].awardInfo
					}
					if(objItem2.awardType == 2){
						if(objItem2.state == 0){
							var awardDivBox = '<div class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/entity1.png" alt=""/><div class="infoPart"><p class="awardName">'+objItem2.awardName+'</p><p class="remarks remarks1">注：我们会按照您录入的奖品邮寄地址给您寄送奖品；</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/getnow.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
						}else{
							var awardDivBox = '<div class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/entity4.png" alt=""/><div class="infoPart"><p class="awardName">'+objItem2.awardName+'</p><p class="remarks remarks2">收件人信息：广东省深圳市宝安区创维工业园创维工业园创维工业园创维工业园创维创新谷100楼 1378989227<br/>注：我们会按照您录入的奖品邮寄地址给您寄送奖品；</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/success.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
						}
					}
					if(objItem2.awardType == 4){
						var awardDivBox = '<div class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/third.png" alt=""/><div class="infoPart"><p class="awardName thirdAward">'+objItem2.awardName+'</p><p class="remarks remarks3">注：扫描二维码即可领取！</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/qrcode.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
					}
					if(objItem2.awardType == 5){
						if(objItem2.state == 0){
							var awardDivBox = '<div class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/coupon.png" alt=""/><div class="infoPart"><p class="awardName couponAward">'+objItem2.awardName+'</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/getnow.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
						}else{
							var awardDivBox = '<div class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/coupon.png" alt=""/><div class="infoPart"><p class="awardName couponAward">'+objItem2.awardName+'</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/success.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
						}
					}
					if(objItem2.awardType == 19){
						if(objItem2.state == 0){
							var awardDivBox = '<div class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/coin.png" alt=""/><div class="infoPart"><p class="awardName coinAward">'+objItem2.awardName+'</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/getnow.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
						}else{
							var awardDivBox = '<div class="awardBoxs coocaabtn2"><div class="awardDivs"><img class="imgPart" src="images/award/coin.png" alt=""/><div class="infoPart"><p class="awardName coinAward">'+objItem2.awardName+'</p></div><div class="btnPart"><img class="btnImgBlur" src="images/award/success.png" alt=""/><img class="btnImgFocus" src="images/award/focus.png" alt=""/></div></div><div class="line"></div></div>';
						}
					}
					$("#prize_list").append(awardDivBox);
				}
			}
		}
	}
	buttonInitAfter();
	console.log(_curFocusId);
	if (_curFocusId==""||_curFocusId==null) {
		$(".awardBoxs:eq(0)").trigger("focus");
	} else{
    	console.log(_curFocusId);
		$("#"+_curFocusId).trigger("focus");
	}
	//map = new coocaakeymap($(".coocaa_btn2"),document.getElementById(_curFocusId),"btn-focus",function(){},function(val){},function(obj){});
	ccmap.init(".coocaa_btn2", "#"+_curFocusId, "btn-focus");
}


//保留小数
function toDecimal(x) {
    var val = Number(x);
    if(!isNaN(parseFloat(val))) {
        val = val.toFixed(2);//把 Number 四舍五入为指定小数位数的数字。
    }
    val = Number(val);
    return  val;
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
				if (oType == "5") {
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
				} else if(oType == "19"){
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
	$("#prize .awardBoxs").unbind("itemFocus").bind("itemFocus", function() {
		console.log("----myAwards focus----");
        var _index1 = $("#prize .awardBoxs").index($(this)); //btn是第几个
        var myScrollTopValue = myScrollTopValue = $(".awardTabs")[0].offsetHeight * _index1;
        console.log(myScrollTopValue);
        $("#prize_list").stop(true, true).animate({ scrollTop: myScrollTopValue }, { duration: 0, easing: "swing" });
	});
	
	$(".awardBoxs").unbind("itemClick").bind("itemClick", function() {
		_curFocusId = $(this).attr("id");
		console.log(_curFocusId)
        var _awardId = $(this).attr("awardId");
        var _awardName = $(this).attr("awardName");
        var _awardTime = $(this).attr("awardTime");
        var _awardType = $(this).attr("awardType");
        var _awardUrl = $(this).attr("awardUrl");
        var _awardState = $(this).attr("awardState");
        var _lotteryActiveId = $(this).attr("lotteryActiveId");
        var _rememberId = $(this).attr("rememberId");
        var _userkeyId = $(this).attr("userkeyId");
        
//      var _dateObj = {
//			"page_name": "弹窗页面",
//			"parent_page": "我的奖品页",
//			"award_type": "",
//			"award_id": _awardId,
//			"award_name": _awardName,
//			"page_type": "",
//			"activity_type": "2019教育暑期活动",
//			"activity_name": "2019教育暑期活动",
//			"OPEN_ID": _openId
//		};
//		var _dateObj2 = {
//			"page_name": "我的奖品页",
//			"button_name": "",
//			"page_type": "我的奖品页",
//			"activity_type": "2019教育暑期活动",
//			"activity_name": "2019教育暑期活动",
//			"OPEN_ID": _openId
//		};
      	if (_awardType == 2) {
        	console.log("点击了实物奖+展示奖品");
            $("#dialogPage").css("display", "block");
            if (_awardState == 0) {
                console.log("点击了实物奖+显示二维码");
//              _dateObj.award_type = "实物奖品";
//              _dateObj.page_type = "领取实体物品";
//              webDataLog("web_page_show_new", _dateObj);
//              _dateObj2.button_name = "待领取-实物奖品";
//              webDataLog("web_button_clicked_new", _dateObj2);
                $("#entityInfo1").html("奖品名称:&nbsp;&nbsp;" + _awardName);
                $("#entityInfo2").html("发放时间:&nbsp;&nbsp;" + _awardTime);
                $(".secondDialog").css("display", "none");
                $("#entityNotGet").css("display", "block");
                $("#entityQrcode").css("display", "block");
                map = new coocaakeymap($(".coocaa_btn3"), "#entityQrcode", "btn-focus", function() {}, function(val) {}, function(obj) {});
                var enstr = enurl + "activeId=" + _lotteryActiveId + "&rememberId=" + _rememberId + "&userKeyId=" + _userkeyId + "&open_id=" + _openId;
                drawQrcode("entityQrcode", enstr, 190);
            } else {
                console.log("点击了实物奖+不做操作");
            }
        }
        if (_awardType == 5){
    		if(_awardState == 0){
            	console.log("未领取的优惠券+领取优惠券");
            	_dateObj2.button_name = "待领取-优惠券";
                webDataLog("web_button_clicked_new", _dateObj2);
            	sendPrizes(_awardId, _rememberId, _awardType, _userkeyId,_lotteryActiveId, _qsource);
            }else{
            	console.log("已领取的优惠券+跳转指定页面");
            	_dateObj2.button_name = "立即使用-优惠券";
                webDataLog("web_button_clicked_new", _dateObj2);
            	var _awardInfo = $(this).attr("awardInfo");
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
        if (_awardType == 4){
        	console.log("点击了第三方优惠券+不做响应");
        	
        }
        if (_awardType == 19){
        	if(_awardState == 0){
        		console.log("点击了未领取金币+领取金币+跳转兑换商城");
        		sendPrizes(_awardId, _rememberId, _awardType, _userkeyId,_lotteryActiveId, _qsource);
        	}else{
        		console.log("点击了已领取金币+跳转兑换商城");
        	}
        }
	});
}
//绘制二维码
function drawQrcode(id, url, wh) {
    document.getElementById(id).innerHTML = "";
    var qrcode = new QRCode(document.getElementById(id), {
        width: wh,
        height: wh
    });
    qrcode.makeCode(url);
}
//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2], 'utf-8');
	return null; //返回参数值
}


function getDeviceInfo(){

}

function webDataLog(logname, dateObj) {
	var _dataString = JSON.stringify(dateObj);
	console.log(logname + "--" + _dataString);
	//coocaaosapi.notifyJSLogInfo(logname, _dataString, function(message) {console.log(message);}, function(error) {console.log(error);});
}



