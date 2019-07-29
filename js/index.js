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
};

coocaaApp.triggleButton=function() {
    _appversion = accountVersion;
    
    $("#myawardPage").css("display","block");
    getMyAwards("153");
};


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

function webDataLog(logname, dateObj) {
	var _dataString = JSON.stringify(dateObj);
	console.log(logname + "--" + _dataString);
	//coocaaosapi.notifyJSLogInfo(logname, _dataString, function(message) {console.log(message);}, function(error) {console.log(error);});
}
