;(function(global, factory, jQuery){

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// webpack-dev-server的浏览器环境下module和module.exports非空
		module.exports = global.document ?
		// factory( global, true ) :
		factory( global, jQuery ) :
		function( w ) {
			if ( !w.document ) {
				throw new Error( "coocaakeymap requires a window with a document" );
			}
			return factory( w );
		};
	} else {
		factory(global, jQuery);
	}
})(typeof window !== "undefined" ? window : this, function(window, $, noGlobal){

	"use strict";

	var instance;

	var getInstance = function () {
		if (instance === undefined) {
			instance = new coocaakeymap();
		}
		return instance;
	}

	var coocaakeymap = function () {
        this.linkbuttons = null;
        this.curLink = null;
        this.keydownListener = null;
		return this;
	};

	coocaakeymap.prototype.init = function (buts, curlink, hover) {

        var _this = this;
		this.linkbuttons = (buts instanceof $) ? buts : $(buts); 

		for (var i = this.linkbuttons.length - 1; i >= 0; i--) {
			var o = this.linkbuttons[i];
			if (o.getAttribute("data-no-focus") == "true") {
				this.linkbuttons.splice(i, 1);
			}
		}
		if (this.linkbuttons.length == 0) {
			this.linkbuttons = $("body");
		}
		
		var c = (curlink instanceof $) ? curlink : $(curlink); 

		if (c.length !== 0) {
			for (var i = 0; i < this.linkbuttons.length; i++) {
				if (this.linkbuttons.get(i) == c.get(0)) {
					this.curLink = c;
					break;
				}
			}
		}
		if (this.curLink == null) {
			for (var i = 0; i < this.linkbuttons.length; i++) {
				if ($(this.linkbuttons[i]).is(":visible")) {
					this.curLink = $(this.linkbuttons[i]);
					break;
				}
			}
		}
		this.hoverClass = hover == null ? "hover" : hover;

		setHeightLight(this);

		$(window).unbind("keydown").bind('keydown', function (ev) { keydownHandler(_this, ev); });
		return this;
	}

	coocaakeymap.prototype.reset = function (buts) {
		console.log('reset');
		this.linkbuttons.removeClass(this.hoverClass);
		this.linkbuttons = $(buts);
		console.log(this.linkbuttons);
		this.curLink = null;
		setHeightLight(this);
		return this;
	}

	coocaakeymap.prototype.add = function (target) {
		console.log('add, target =', target);
		this.linkbuttons = this.linkbuttons.add(target);
		console.log(this.linkbuttons);
		return this;
	};

	coocaakeymap.prototype.remove = function (target) {
		console.log('remove, target =', target);
		console.log(this.hoverClass);
		this.linkbuttons.removeClass(this.hoverClass); //解决当前落焦对象还有样式的问题
		this.linkbuttons = this.linkbuttons.not(target);
		console.log(this.linkbuttons);
		return this;
	};

	coocaakeymap.prototype.setFocus = function (target) {
		
		if (target == null && target.length === 0) return this;

		if (!(target instanceof $)) target = $(target);

		if (!target.is(":visible")) {
			target = null;
		}
		this.curLink = target;
		setHeightLight(this);
		return this;
	}

	coocaakeymap.prototype.setHoverClass = function (hover) {
		if (hover == null || typeof hover !== 'string') return this;
		this.hoverClass = hover;
		return this;
    }
    
    coocaakeymap.prototype.setOnKeydownListener = function (fn) {
        if (!fn || typeof fn !== 'function') {
			throw new Error( "param must be a function" );
        }
        this.keydownListener = fn;
    }

	coocaakeymap.prototype.moveUp = function () {
		var _this = this;	
		if (_this.curLink.attr("upTarget")) {
			var link = $(_this.curLink.attr("upTarget"));
			if (link.size() > 0) {
				_this.curLink = link;
				setHeightLight(_this);
				return this;
			}
		}

		var curLink = _this.curLink;
		var xthis, leftCoincide, rightCoincide, diffDistance = 99999;
		var	mx = curLink.offset().left;
		var	my = curLink.offset().top;
		var tarLink = curLink;
		var diffNoCoincide = 99999;
		var findF = false;
		_this.linkbuttons.each(function () {
			xthis = $(this);
			if (xthis.is(":hidden") || xthis.css("visibility") == 'hidden') {
				return this;
			}
			var nx = xthis.offset().left;
			var ny = xthis.offset().top;
			//先找重叠的，直接算Y坐标
			leftCoincide = nx <= mx && nx + xthis.width() > mx;
			rightCoincide = nx >= mx && mx + tarLink.width() > nx;
			if (ny < my && (leftCoincide || rightCoincide)) {
				var xdist = my - ny;
				if (xdist < diffDistance) {
					diffDistance = xdist;
					curLink = xthis;
				}
				findF = true;
			} else if (findF == false) {
				///这里找距离最短的，不在乎是否有重叠
				if (ny < my) {
					//向上移动的时候，如果在目标右边，计算左下角，否则计算右下角
					if (nx >= mx)
						xdist = lineDistance(nx, ny + xthis.height(), mx, my);
					else
						xdist = lineDistance(nx + xthis.width(), ny + xthis.height(), mx, my);
					if (xdist < diffNoCoincide) {
						diffNoCoincide = xdist;
						curLink = xthis;
					}
				}
			}
		});

		_this.curLink = curLink;
		setHeightLight(_this);

		return this;
	}

	coocaakeymap.prototype.moveDown = function () {
		var _this = this;
		if (_this.curLink.attr("downTarget")) {
			var link = $(_this.curLink.attr("downTarget"));
			if (link.size() > 0) {
				_this.curLink = link;
				setHeightLight(_this);
				return this;
			}
		}

		var curLink = _this.curLink;
		var xthis, leftCoincide, rightCoincide, diffDistance = 99999;
		var mx = curLink.offset().left;
		var my = curLink.offset().top;
		var tarLink = curLink;
		var diffNoCoincide = 99999;
		var findF = false;

		_this.linkbuttons.each(function () {
			xthis = $(this);
			if (xthis.is(":hidden") || xthis.css("visibility") == 'hidden') {
				return true;
			}
			var nx = xthis.offset().left;
			var ny = xthis.offset().top;
			leftCoincide = nx <= mx && nx + xthis.width() > mx;
			rightCoincide = nx >= mx && mx + tarLink.width() > nx;
			if (ny > my && (leftCoincide || rightCoincide)) {
				var xdist = ny - my;
				if (xdist < diffDistance) {
					diffDistance = xdist;
					curLink = xthis;
				}
				findF = true;
			} else if (findF == false) {
				if (ny > my) {
					//xdist = lineDistance(nx, ny, mx, my);
					//向下移动的时候，如果在目标右边，计算左下角，否则计算右下角            
					if (nx >= mx)
						xdist = lineDistance(nx, ny, mx, my + tarLink.height());
					else
						xdist = lineDistance(nx + xthis.width(), ny, mx, my + tarLink.height());

					if (xdist < diffNoCoincide) {
						diffNoCoincide = xdist;
						curLink = xthis;
					}
				}
			}
		});

		_this.curLink = curLink;
		setHeightLight(_this);

		return this;
	}

	coocaakeymap.prototype.moveLeft = function () {
		var _this = this;
		if (_this.curLink.attr("leftTarget")) {
			var link = $(_this.curLink.attr("leftTarget"));
			if (link.size() > 0) {
				_this.curLink = link;
				setHeightLight(_this);
				return this;
			}
		}
		var curLink = _this.curLink, xthis, upCoincide, downCoincide, diffDistance = 99999;
		var mx = curLink.offset().left, my = curLink.offset().top;
		var diffNoCoincide = 99999;
		var prev = _this.curLink.prev();
		while (prev.length > 0) {
			//查找相邻的节点
			if (_this.linkbuttons.index(prev) != -1) {
				curLink = prev;
				break;
			} else {
				prev = prev.prev();
			}
		}

		if (_this.curLink == curLink) {
			_this.linkbuttons.each(function () {
				xthis = $(this);
				if (xthis.is(":hidden") || xthis.css("visibility") == 'hidden') {
					return this;
				}
				var nx = xthis.offset().left, ny = xthis.offset().top;
				// 如果2个box有重叠，则计算x最近的即可
				upCoincide = ny <= my && ny + xthis.height() > my;
				downCoincide = ny >= my && ny < my + curLink.height();
				if (nx < mx && (upCoincide || downCoincide)) {
					var xdist = mx - nx;
					if (xdist < diffDistance) {
						diffDistance = xdist;
						curLink = xthis;
					}
				}
				if (nx < mx) {
					// 向左边移动的时候，如果在目标上边，计算右下角，否则计算右上角
					if (ny >= my) {
						xdist = lineDistance(nx + xthis.width(), ny, mx, my);
					}
					else {
						xdist = lineDistance(nx + xthis.width(), ny + xthis.height(), mx, my);
					}
					if (xdist < diffNoCoincide) {
						diffNoCoincide = xdist;
						curLink = xthis;
					}
				}
			});
		}
		_this.curLink = curLink;
		setHeightLight(_this);

		return this;
	}

	coocaakeymap.prototype.moveRight = function () {
		var _this = this;
		if (_this.curLink.attr("rightTarget")) {
			var link = $(_this.curLink.attr("rightTarget"));
			if (link.size() > 0) {
				_this.curLink = link;
				setHeightLight(_this);
				return this;
			}
		}

		var curLink = _this.curLink;
		var xthis, upCoincide, downCoincide, diffDistance = 99999;
		var mx = curLink.offset().left;
		var my = curLink.offset().top;
		var tarLink = curLink;
		var diffNoCoincide = 99999;

		var next = _this.curLink.next();
		while (next.length > 0) {
			if (_this.linkbuttons.index(next) != -1) {
				curLink = next;
				break;
			} else {
				next = next.next();
			}
		}
		if (_this.curLink == curLink) {
			_this.linkbuttons.each(function () {
				xthis = $(this);
				if (xthis.is(":hidden") || xthis.css("visibility") == 'hidden') {
					return this;
				}
				var nx = xthis.offset().left;
				var ny = xthis.offset().top;
				upCoincide = ny <= my && ny + xthis.height() > my;
				downCoincide = ny >= my && ny < my + curLink.height();
				if (nx > mx && (upCoincide || downCoincide)) {
					var xdist = nx - mx;
					if (xdist < diffDistance) {
						diffDistance = xdist;
						curLink = xthis;
					}
				}
				if (nx > mx) {
					//向右边移动的时候，如果在目标上边，计算目标左下角，否则计算左上角
					if (ny >= my)
						xdist = lineDistance(nx, ny, mx + tarLink.width(), my);
					else
						xdist = lineDistance(nx, ny + xthis.height(), mx + tarLink.width(), my);

					if (xdist < diffNoCoincide) {
						diffNoCoincide = xdist;
						curLink = xthis;
					}
				}
			});
		}

		_this.curLink = curLink;
		setHeightLight(_this);

		return this;
	}

	var lineDistance = function (x1, y1, x2, y2) {
		var xs = 0, ys = 0;
		xs = Math.abs(x1 - x2);
		xs = xs * xs;
		ys = Math.abs(y1 - y2);
		ys = ys * ys;
		return Math.sqrt(xs + ys);
	};

	var setHeightLight = function (_this) {

		if (_this.curLink == null) {
			//将第一个可见元素设置为焦点元素
			for (var i = 0; i < _this.linkbuttons.length; i++) {
				if ($(_this.linkbuttons[i]).is(":visible")) {
					_this.curLink = $(_this.linkbuttons[i]);
					break;
				}
			}
		}
		_this.linkbuttons.attr("readonly", true);
		var hover = _this.hoverClass;
		_this.linkbuttons.removeClass(hover);
		_this.curLink.addClass(hover);
		//将焦点赋给文档【是否可以去掉？】
		// $(document).focus();
		// console.log('fyb,trigger itemselected');
		// _this.curLink.trigger("itemSelected");
	}

	var keydownHandler = function (_this, ev) {
		var lastLink = _this.curLink;

		if (ev.isPropagationStopped() == false) {
			switch (ev.keyCode) {
				case 37:
					_this.moveLeft();
					ev.stopPropagation();
					break;
				case 38: 
					_this.moveUp();
					ev.stopPropagation();
					break;
				case 39:
					_this.moveRight();
					ev.stopPropagation();
					break;
				case 40: 
					_this.moveDown();
					ev.stopPropagation();
					break;
				case 13: 
					_this.curLink.trigger("itemClick");
					break;
			}
		}

		if (lastLink != _this.curLink) {
			lastLink.trigger("blur");
			_this.curLink.trigger("focus");
        }
        
        _this.keydownListener && _this.keydownListener(ev);
	};

	if (!noGlobal) {
		window.ccmap = new getInstance();
	}

	return coocaakeymap;

}, jQuery);
