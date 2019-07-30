/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);

; (function (window) {

    var _pcMode = true;
    if(/Android (\d+\.\d+)/.test(navigator.userAgent)) _pcMode = false;
    console.log('_pcMode :' + _pcMode);
    function Debugger() {
        this.deviceInfo = { "panel": "50", 
        "version": "6.20.180226", 
        "model": "Q4A", 
        "chipid": "MST-6A838", 
        "mac": "001a9a000000", 
        "chip": "9S52", 
        "androidsdk": 23, 
        "devid": "83ec547b4ca46a394719bdae81d912e4", 
        "activeid": "23320005", 
        "emmcid": "90014a484147346132a559776981c400", 
        "brand": "Skyworth", 
        "barcode": "50Q4AXXXXX-XXXXXXX-XXXXXXX", 
        "sid": "899b8796-6b7f-42d9-b050-7a097d9e357c" };
        this.userInfo = null;
    }
    var debugObj = {
        getPCMode: function () {
            return _pcMode;
        },
        setDeviceInfo: function (options) {
            Object.assign(this.deviceInfo, options);
            return this;
        },
        getDeviceInfo: function () {
            return this.deviceInfo;
        },
        setUserInfo: function (options) {
            return this;
        },
        setAccessToken: function (options) {
            return this;
        }
    }
    Debugger.prototype = debugObj;

    var debug = new Debugger();

    window.ccDebug = debug;

    var PLATFORM_VERSION_BUILD_LABEL = '5.2.0-dev';
    var require,
        define;

    (function () {
        var modules = {},
            // 当前正在生成的模块ID堆栈.
            requireStack = [],
            // 模块ID图 -> 当前正在构建的模块的RequireStack索引.
            inProgressModules = {},
            SEPARATOR = ".";

        function build(module) {
            var factory = module.factory,
                localRequire = function (id) {
                    var resultantId = id;
                    //这是一个相对路径, 所以去掉最后一部分并添加ID (减 "./")
                    if (id.charAt(0) === ".") {
                        resultantId = module.id.slice(0, module.id.lastIndexOf(SEPARATOR)) + SEPARATOR + id.slice(2);
                    }
                    return require(resultantId);
                };
            module.exports = {};
            delete module.factory;
            factory(localRequire, module.exports, module);
            return module.exports;
        }

        require = function (id) {
            if (!modules[id]) {
                console.log("module " + id + " not found");
                throw "module " + id + " not found";
            } else if (id in inProgressModules) {
                var cycle = requireStack.slice(inProgressModules[id]).join('->') + '->' + id;
                console.log("Cycle in require graph:  " + cycle);
                throw "Cycle in require graph: " + cycle;
            }
            if (modules[id].factory) {
                try {
                    inProgressModules[id] = requireStack.length;
                    requireStack.push(id);
                    return build(modules[id]);
                } finally {
                    delete inProgressModules[id];
                    requireStack.pop();
                }
            }
            return modules[id].exports;
        };

        define = function (id, factory) {
            if (modules[id]) {
                console.log("module " + id + " already defined");
                throw "module " + id + " already defined";
            }
            modules[id] = {
                id: id,
                factory: factory
            };
        };

        define.remove = function (id) {
            delete modules[id];
        };
        define.moduleMap = modules;
    })();
    //导出以在节点中使用
    if (typeof module === "object" && typeof require === "function") {
        module.exports.require = require;
        module.exports.define = define;
    }
    define("cordova", function (require, exports, module) {
        // 托管环境中的Windows 10解决方案案例
        // http://www.w3.org/html/wg/drafts/html/master/browsers.html#named-access-on-the-window-object
        if (window.cordova && !(window.cordova instanceof HTMLElement)) {
            throw new Error("cordova already defined");
        }
        var channel = require('cordova/channel');
        var platform = require('cordova/platform');

        /**截获对AddEventListener的调用 + 删除事件侦听器（removeEventListener） 和 处理 deviceready,resume,and pause 事件.*/
        var m_document_addEventListener = document.addEventListener;
        var m_document_removeEventListener = document.removeEventListener;
        var m_window_addEventListener = window.addEventListener;
        var m_window_removeEventListener = window.removeEventListener;
        /**包含要截取文档的自定义事件处理程序 + window event listeners.*/
        var documentEventHandlers = {},
            windowEventHandlers = {};

        document.addEventListener = function (evt, handler, capture) {
            var e = evt.toLowerCase();
            if (typeof documentEventHandlers[e] != 'undefined') {
                documentEventHandlers[e].subscribe(handler);
            } else {
                m_document_addEventListener.call(document, evt, handler, capture);
            }
        };

        window.addEventListener = function (evt, handler, capture) {
            var e = evt.toLowerCase();
            if (typeof windowEventHandlers[e] != 'undefined') {
                windowEventHandlers[e].subscribe(handler);
            } else {
                m_window_addEventListener.call(window, evt, handler, capture);
            }
        };

        document.removeEventListener = function (evt, handler, capture) {
            var e = evt.toLowerCase();
            // If unsubscribing from an event that is handled by a plugin
            if (typeof documentEventHandlers[e] != "undefined") {
                documentEventHandlers[e].unsubscribe(handler);
            } else {
                m_document_removeEventListener.call(document, evt, handler, capture);
            }
        };

        window.removeEventListener = function (evt, handler, capture) {
            var e = evt.toLowerCase();
            // If unsubscribing from an event that is handled by a plugin
            if (typeof windowEventHandlers[e] != "undefined") {
                windowEventHandlers[e].unsubscribe(handler);
            } else {
                m_window_removeEventListener.call(window, evt, handler, capture);
            }
        };

        function createEvent(type, data) {
            var event = document.createEvent('Events');
            event.initEvent(type, false, false);
            if (data) {
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        event[i] = data[i];
                    }
                }
            }
            return event;
        }

        var cordova = {
            define: define,
            require: require,
            version: PLATFORM_VERSION_BUILD_LABEL,
            platformVersion: PLATFORM_VERSION_BUILD_LABEL,
            platformId: platform.id,
            /**添加/删除自己的AddEventListener劫持文档或者window的方法*/
            addWindowEventHandler: function (event) {
                return (windowEventHandlers[event] = channel.create(event));
            },
            addStickyDocumentEventHandler: function (event) {
                return (documentEventHandlers[event] = channel.createSticky(event));
            },
            addDocumentEventHandler: function (event) {
                return (documentEventHandlers[event] = channel.create(event));
            },
            removeWindowEventHandler: function (event) {
                delete windowEventHandlers[event];
            },
            removeDocumentEventHandler: function (event) {
                delete documentEventHandlers[event];
            },
            /**检索由Cordova替换的原始事件处理程序   返回一个对象*/
            getOriginalHandlers: function () {
                return {
                    'document': {
                        'addEventListener': m_document_addEventListener,
                        'removeEventListener': m_document_removeEventListener
                    },
                    'window': {
                        'addEventListener': m_window_addEventListener,
                        'removeEventListener': m_window_removeEventListener
                    }
                };
            },
            /**
             * 从本机代码激发事件的方法
             * 对于导致需要在本机代码中捕获的异常的事件，需要bnodetach
             */
            fireDocumentEvent: function (type, data, bNoDetach) {
                var evt = createEvent(type, data);
                if (typeof documentEventHandlers[type] != 'undefined') {
                    if (bNoDetach) {
                        documentEventHandlers[type].fire(evt);
                    } else {
                        setTimeout(function () {
                            // 在加载cordova.js之前注册的侦听器上启动deviceready。
                            if (type == 'deviceready') {
                                document.dispatchEvent(evt);
                            }
                            documentEventHandlers[type].fire(evt);
                        }, 0);
                    }
                } else {
                    document.dispatchEvent(evt);
                }
            },
            fireWindowEvent: function (type, data) {
                var evt = createEvent(type, data);
                if (typeof windowEventHandlers[type] != 'undefined') {
                    setTimeout(function () {
                        windowEventHandlers[type].fire(evt);
                    }, 0);
                } else {
                    window.dispatchEvent(evt);
                }
            },

            /**插件回调机制。*/
            // 随机化启动回调ID以避免刷新或导航后发生冲突。
            // 这样，任何新回调都不太可能获得与旧回调相同的回调ID。
            callbackId: Math.floor(Math.random() * 2000000000),
            callbacks: {},
            callbackStatus: {
                NO_RESULT: 0,
                OK: 1,
                CLASS_NOT_FOUND_EXCEPTION: 2,
                ILLEGAL_ACCESS_EXCEPTION: 3,
                INSTANTIATION_EXCEPTION: 4,
                MALFORMED_URL_EXCEPTION: 5,
                IO_EXCEPTION: 6,
                INVALID_ACTION: 7,
                JSON_EXCEPTION: 8,
                ERROR: 9
            },
            /**当从操作返回成功结果时由本地代码调用。*/
            callbackSuccess: function (callbackId, args) {
                cordova.callbackFromNative(callbackId, true, args.status, [args.message], args.keepCallback);
            },
            /**当返回操作的错误结果时由本地代码调用。*/
            callbackError: function (callbackId, args) {
                // 不建议使用callbacksuccess和callbackerror，而赞成callbackFromNative。
                // 从状态中获得成功。
                cordova.callbackFromNative(callbackId, false, args.status, [args.message], args.keepCallback);
            },

            /**当从操作返回结果时由本地代码调用。*/
            callbackFromNative: function (callbackId, isSuccess, status, args, keepCallback) {
                try {
                    var callback = cordova.callbacks[callbackId];
                    if (callback) {
                        if (isSuccess && status == cordova.callbackStatus.OK) {
                            callback.success && callback.success.apply(null, args);
                        } else if (!isSuccess) {
                            callback.fail && callback.fail.apply(null, args);
                        }
                        // 如果不期望有更多结果，则清除回调
                        if (!keepCallback) {
                            delete cordova.callbacks[callbackId];
                        }
                    }
                } catch (err) {
                    var msg = "Error in " + (isSuccess ? "Success" : "Error") + " callbackId: " + callbackId + " : " + err;
                    console && console.log && console.log(msg);
                    cordova.fireWindowEvent("cordovacallbackerror", {
                        'message': msg
                    });
                    throw err;
                }
            },
            addConstructor: function (func) {
                console.log('[DEBUG] 注册onCordovaReady事件监听');
                channel.onCordovaReady.subscribe(function () {
                    try {
                        func();
                    } catch (e) {
                        console.log("未能运行构造函数: " + e);
                    }
                });
            }
        };

        module.exports = cordova;

    });
    define("cordova/android/nativeapiprovider", function (require, exports, module) {
        /**导出ExposedJSAPI.java对象（如果可用），否则导出PromptBasedNativeAPI。*/
        var nativeApi = this._cordovaNative || require('cordova/android/promptbasednativeapi');
        var currentApi = nativeApi;
        module.exports = {
            get: function () {
                return currentApi;
            },
            setPreferPrompt: function (value) {
                currentApi = value ? require('cordova/android/promptbasednativeapi') : nativeApi;
            },
            // Used only by tests.
            set: function (value) {
                currentApi = value;
            }
        };
    });
    define("cordova/android/promptbasednativeapi", function (require, exports, module) {
        module.exports = {
            exec: function (bridgeSecret, service, action, callbackId, argsJson) {
                return null;
                // return prompt(argsJson, 'gap:' + JSON.stringify([bridgeSecret, service, action, callbackId]));
            },
            setNativeToJsBridgeMode: function (bridgeSecret, value) {
                return null;
                // prompt(value, 'gap_bridge_mode:' + bridgeSecret);
            },
            retrieveJsMessages: function (bridgeSecret, fromOnlineEvent) {
                return null;
                // return prompt(+fromOnlineEvent, 'gap_poll:' + bridgeSecret);
            }
        };
    });
    define("cordova/argscheck", function (require, exports, module) {
        var utils = require('cordova/utils');
        var moduleExports = module.exports;
        var typeMap = {
            'A': 'Array',
            'D': 'Date',
            'N': 'Number',
            'S': 'String',
            'F': 'Function',
            'O': 'Object'
        };

        function extractParamName(callee, argIndex) {
            return (/.*?\((.*?)\)/).exec(callee)[1].split(', ')[argIndex];
        }

        function checkArgs(spec, functionName, args, opt_callee) {
            if (!moduleExports.enableChecks) {
                return;
            }
            var errMsg = null;
            var typeName;
            for (var i = 0; i < spec.length; ++i) {
                var c = spec.charAt(i),
                    cUpper = c.toUpperCase(),
                    arg = args[i];
                // asterix的意思是允许任何事情发生。
                if (c == '*') {
                    continue;
                }
                typeName = utils.typeName(arg);
                if ((arg === null || arg === undefined) && c == cUpper) {
                    continue;
                }
                if (typeName != typeMap[cUpper]) {
                    errMsg = 'Expected ' + typeMap[cUpper];
                    break;
                }
            }
            if (errMsg) {
                errMsg += ', but got ' + typeName + '.';
                errMsg = 'Wrong type for parameter "' + extractParamName(opt_callee || args.callee, i) + '" of ' + functionName + ': ' + errMsg;
                // 运行单元测试时不要记录。
                if (typeof jasmine == 'undefined') {
                    console.error(errMsg);
                }
                throw TypeError(errMsg);
            }
        }

        function getValue(value, defaultValue) {
            return value === undefined ? defaultValue : value;
        }
        moduleExports.checkArgs = checkArgs;
        moduleExports.getValue = getValue;
        moduleExports.enableChecks = true;
    });
    define("cordova/base64", function (require, exports, module) {
        var base64 = exports;
        base64.fromArrayBuffer = function (arrayBuffer) {
            var array = new Uint8Array(arrayBuffer);
            return uint8ToBase64(array);
        };
        base64.toArrayBuffer = function (str) {
            var decodedStr = typeof atob != 'undefined' ? atob(str) : new Buffer(str, 'base64').toString('binary');
            var arrayBuffer = new ArrayBuffer(decodedStr.length);
            var array = new Uint8Array(arrayBuffer);
            for (var i = 0, len = decodedStr.length; i < len; i++) {
                array[i] = decodedStr.charCodeAt(i);
            }
            return arrayBuffer;
        };
        //------------------------------------------------------------------------------
        /* 此代码基于http://jspef.com/b64测试中的性能测试。
         * 这个12位一次算法是所有测试平台上性能最好的版本。
         */
        var b64_6bit = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var b64_12bit;
        var b64_12bitTable = function () {
            b64_12bit = [];
            for (var i = 0; i < 64; i++) {
                for (var j = 0; j < 64; j++) {
                    b64_12bit[i * 64 + j] = b64_6bit[i] + b64_6bit[j];
                }
            }
            b64_12bitTable = function () {
                return b64_12bit;
            };
            return b64_12bit;
        };

        function uint8ToBase64(rawData) {
            var numBytes = rawData.byteLength;
            var output = "";
            var segment;
            var table = b64_12bitTable();
            for (var i = 0; i < numBytes - 2; i += 3) {
                segment = (rawData[i] << 16) + (rawData[i + 1] << 8) + rawData[i + 2];
                output += table[segment >> 12];
                output += table[segment & 0xfff];
            }
            if (numBytes - i == 2) {
                segment = (rawData[i] << 16) + (rawData[i + 1] << 8);
                output += table[segment >> 12];
                output += b64_6bit[(segment & 0xfff) >> 6];
                output += '=';
            } else if (numBytes - i == 1) {
                segment = (rawData[i] << 16);
                output += table[segment >> 12];
                output += '==';
            }
            return output;
        }

    });
    define("cordova/builder", function (require, exports, module) {
        var utils = require('cordova/utils');

        function each(objects, func, context) {
            for (var prop in objects) {
                if (objects.hasOwnProperty(prop)) {
                    func.apply(context, [objects[prop], prop]);
                }
            }
        }

        function clobber(obj, key, value) {
            exports.replaceHookForTesting(obj, key);
            var needsProperty = false;
            try {
                obj[key] = value;
            } catch (e) {
                needsProperty = true;
            }
            // getter只能由getter重写。
            if (needsProperty || obj[key] !== value) {
                utils.defineGetter(obj, key, function () {
                    return value;
                });
            }
        }

        function assignOrWrapInDeprecateGetter(obj, key, value, message) {
            if (message) {
                utils.defineGetter(obj, key, function () {
                    console.log(message);
                    delete obj[key];
                    clobber(obj, key, value);
                    return value;
                });
            } else {
                clobber(obj, key, value);
            }
        }

        function include(parent, objects, clobber, merge) {
            each(objects, function (obj, key) {
                try {
                    var result = obj.path ? require(obj.path) : {};
                    if (clobber) {
                        // 如果它不存在的话，就把它击倒
                        if (typeof parent[key] === 'undefined') {
                            assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
                        } else if (typeof obj.path !== 'undefined') {
                            // 如果合并，则将属性合并到父级上，否则将关闭。
                            if (merge) {
                                recursiveMerge(parent[key], result);
                            } else {
                                assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
                            }
                        }
                        result = parent[key];
                    } else {
                        // 如果当前未定义，则覆盖。
                        if (typeof parent[key] == 'undefined') {
                            assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
                        } else {
                            // 将结果设置为已经存在的内容，这样我们就可以在其中构建子元素（如果它们存在的话）。
                            result = parent[key];
                        }
                    }
                    if (obj.children) {
                        include(result, obj.children, clobber, merge);
                    }
                } catch (e) {
                    //utils.alert('Exception building Cordova JS globals: ' + e + ' for key "' + key + '"');
                }
            });
        }
        /**
         * 递归地将属性从一个对象合并到另一个对象。  SRC对象的属性将覆盖现有的目标属性。
         * @param 要将属性合并到的目标对象。
         * @param 从中合并属性的SRC对象。
         */
        function recursiveMerge(target, src) {
            for (var prop in src) {
                if (src.hasOwnProperty(prop)) {
                    if (target.prototype && target.prototype.constructor === target) {
                        // 如果目标对象是构造函数，则重写原型。
                        clobber(target.prototype, prop, src[prop]);
                    } else {
                        if (typeof src[prop] === 'object' && typeof target[prop] === 'object') {
                            recursiveMerge(target[prop], src[prop]);
                        } else {
                            clobber(target, prop, src[prop]);
                        }
                    }
                }
            }
        }
        exports.buildIntoButDoNotClobber = function (objects, target) {
            include(target, objects, false, false);
        };
        exports.buildIntoAndClobber = function (objects, target) {
            include(target, objects, true, false);
        };
        exports.buildIntoAndMerge = function (objects, target) {
            include(target, objects, true, true);
        };
        exports.recursiveMerge = recursiveMerge;
        exports.assignOrWrapInDeprecateGetter = assignOrWrapInDeprecateGetter;
        exports.replaceHookForTesting = function () { };

    });
    define("cordova/channel", function (require, exports, module) {
        var utils = require('cordova/utils'),
            nextGuid = 1;
        /**
         * 自定义pub子“channel”，可以订阅函数
         * 此对象用于为Cordova初始化以及其后的自定义事件定义和控制事件的触发。
         * 页面加载和Cordova启动期间的事件顺序如下：
         * onDOMContentLoaded*  加载和分析网页时收到的内部事件。
         * onNativeReady*       表示Cordova本机端已就绪的内部事件。
         * onCordovaReady*      当所有的Cordova Javascript objects都已创立时，内部事件就被烧毁。
         * onDeviceReady*       激发的用户事件指示Cordova已就绪
         * onResume             激发的用户事件指示启动/恢复生命周期事件
         * onPause              激发的用户事件指示暂停生命周期事件
         *
         * 标有*的事件很粘。一旦他们被激活，他们将保持被激活状态。
         * 触发事件后订阅的所有侦听器都将立即执行。
         *
         * 用户代码应注册的唯一Cordova事件是：
         * deviceready   Cordova 本地代码被初始化、Cordova APIs 可以被JavaScript调用
         * pause         应用程序已移动到后台
         * resume        应用程序已返回前台
         *
         * 侦听器可以注册为：
         * document.addEventListener("deviceready", myDeviceReadyListener, false);
         * document.addEventListener("resume", myResumeListener, false);
         * document.addEventListener("pause", myPauseListener, false);
         *
         * dom生命周期事件应用于保存和恢复状态
         * window.onload
         * window.onunload 事件在用户退出页面时发生。
         */

        /**频道名称字符串化*/
        var Channel = function (type, sticky) {
            this.type = type;
            // GUID图 -> function.
            this.handlers = {};
            // 0 = 非粘性, 1 = 粘性非激活状态, 2 = 粘性  激活状态.
            this.state = sticky ? 1 : 0;
            // 在粘性模式下用于记住传递给fire（）的参数。
            this.fireArgs = null;
            // 用于OnHasSubcribersChange以了解是否有任何侦听器。
            this.numHandlers = 0;
            // 在订阅第一个侦听器或取消订阅最后一个侦听器时调用的函数。
            this.onHasSubscribersChange = null;
        },
            channel = {
                /**仅在激活指定的所有通道后调用提供的函数。所有通道必须是粘性通道。*/
                join: function (h, c) {
                    var len = c.length,
                        i = len,
                        f = function () {
                            if (!(--i)) h();
                        };
                    for (var j = 0; j < len; j++) {
                        if (c[j].state === 0) {
                            throw Error('Can only use join with sticky channels.');
                        }
                        c[j].subscribe(f);
                    }
                    if (!len) h();
                },
                create: function (type) {
                    return channel[type] = new Channel(type, false);
                },
                createSticky: function (type) {
                    return channel[type] = new Channel(type, true);
                },

                /**在“deviceready”被触发之前必须触发的cordova通道。*/
                deviceReadyChannelsArray: [],
                deviceReadyChannelsMap: {},
                /**
                 * 指示在准备使用某个功能之前需要对其进行初始化。
                 * 这将保留Cordova的“deviceReady”事件，直到该功能被初始化并调用cordova.initcomplete（feature）。
                 * @param feature {String}     独特的特征的名称
                 */
                waitForInitialization: function (feature) {
                    if (feature) {
                        var c = channel[feature] || this.createSticky(feature);
                        this.deviceReadyChannelsMap[feature] = c;
                        this.deviceReadyChannelsArray.push(c);
                    }
                },
                /**
                 * 指示初始化代码已完成，该功能已准备好使用。
                 * @param feature {String}     独特的特征的名称
                 */
                initializationComplete: function (feature) {
                    var c = this.deviceReadyChannelsMap[feature];
                    if (c) {
                        c.fire();
                    }
                }
            };

        function forceFunction(f) {
            if (typeof f != 'function') throw "Function required as first argument!";
        }

        /**
         * 将给定函数订阅到通道。每当调用channel.fire时，函数也会调用它。
         * （可选）指定函数的执行上下文和可用于停止订阅通道的GUID。
         * 返回guid。
         */
        Channel.prototype.subscribe = function (f, c) {
            // 需要一个函数来调用
            forceFunction(f);
            if (this.state == 2) {
                f.apply(c || this, this.fireArgs);
                return;
            }
            var func = f,
                guid = f.observer_guid;
            if (typeof c == "object") {
                func = utils.close(c, f);
            }
            if (!guid) {
                // 任何频道第一次看到此订户
                guid = '' + nextGuid++;
            }
            func.observer_guid = guid;
            f.observer_guid = guid;

            // 不要多次添加同一处理程序。
            if (!this.handlers[guid]) {
                this.handlers[guid] = func;
                this.numHandlers++;
                if (this.numHandlers == 1) {
                    this.onHasSubscribersChange && this.onHasSubscribersChange();
                }
            }
        };
        /**从通道中取消订阅具有给定guid的函数。*/
        Channel.prototype.unsubscribe = function (f) {
            // 需要一个函数来调用
            forceFunction(f);
            var guid = f.observer_guid,
                handler = this.handlers[guid];
            if (handler) {
                delete this.handlers[guid];
                this.numHandlers--;
                if (this.numHandlers === 0) {
                    this.onHasSubscribersChange && this.onHasSubscribersChange();
                }
            }
        };
        /**调用订阅此通道的所有函数。*/
        Channel.prototype.fire = function (e) {
            var fail = false,
                fireArgs = Array.prototype.slice.call(arguments);
            // 应用粘性。
            if (this.state == 1) {
                this.state = 2;
                this.fireArgs = fireArgs;
            }
            if (this.numHandlers) {
                // 首先复制值，这样可以安全地从回调中修改它。
                var toCall = [];
                for (var item in this.handlers) {
                    toCall.push(this.handlers[item]);
                }
                for (var i = 0; i < toCall.length; ++i) {
                    toCall[i].apply(this, fireArgs);
                }
                if (this.state == 2 && this.numHandlers) {
                    this.numHandlers = 0;
                    this.handlers = {};
                    this.onHasSubscribersChange && this.onHasSubscribersChange();
                }
            }
        };
        // 在这里定义它们，让它们准备得非常快！
        // 加载和分析网页时接收的DOM事件。
        console.log("[DEBUG] onDOMContentLoaded");
        channel.createSticky('onDOMContentLoaded');
        // 事件指示Cordova本机端已就绪。
        console.log("[DEBUG] onNativeReady");
        channel.createSticky('onNativeReady');
        //事件表明所有的 Cordova JavaScript 对象已经被创建。而且是时候执行plugin构造函数了。
        console.log("[DEBUG] onCordovaReady");
        channel.createSticky('onCordovaReady');
        // 事件指示已加载并准备好所有自动加载的JS插件。
        // 固定器 remove this
        console.log("[DEBUG] onPluginsReady");
        channel.createSticky('onPluginsReady');
        // 表示Cordova已就绪的事件
        console.log("[DEBUG] onDeviceReady");
        channel.createSticky('onDeviceReady');
        // 事件，指示恢复生命周期事件
        console.log("[DEBUG] onResume");
        channel.create('onResume');
        // 表示暂停生命周期事件的事件
        console.log("[DEBUG] onPause");
        channel.create('onPause');
        // “deviceready”被触发之前必须触发的通道。
        console.log("[DEBUG] waitForInitialization('onCordovaReady')");
        channel.waitForInitialization('onCordovaReady');
        console.log("[DEBUG] waitForInitialization('onDOMContentLoaded')");
        channel.waitForInitialization('onDOMContentLoaded');

        module.exports = channel;
    });
    define("cordova/exec", function (require, exports, module) {
        /**
         * 执行cordova命令。  这个操作是同步的还是异步的取决于本机端。
         * 本机端可以返回：
         *      同步的: PluginResult对象作为JSON字符串
         *      异步的: 空字符串 ""
         * 如果是异步的，则本机端将根据操作的结果选择cordova.callbackuccess或cordova.callbackError。
         * @param {Function} success    The success callback
         * @param {Function} fail       The fail callback
         * @param {String} service      要使用的服务的名称
         * @param {String} action       要运行的操作 in cordova
         * @param {String[]} [args]     要传递给方法的参数为零个或多个
         */
        var cordova = require('cordova'),
            nativeApiProvider = require('cordova/android/nativeapiprovider'),
            utils = require('cordova/utils'),
            base64 = require('cordova/base64'),
            channel = require('cordova/channel'),
            jsToNativeModes = {
                PROMPT: 0,
                JS_OBJECT: 1
            },
            nativeToJsModes = {
                // 使用JS->Native Bridge对消息进行轮询。
                POLLING: 0,
                // 为了使加载URL可行，它需要有一个解决bug的方法，在发送消息时，软键盘会被忽略。
                LOAD_URL: 1,
                // 要使联机_事件可行，它需要截获所有事件侦听器（通过addEventListener和window.ononline），并设置navigator属性本身。
                ONLINE_EVENT: 2
            },
            jsToNativeBridgeMode, // Set lazily.
            nativeToJsBridgeMode = nativeToJsModes.ONLINE_EVENT,
            pollEnabled = false,
            bridgeSecret = -1;

        var messagesFromNative = [];
        var isProcessing = false;
        var resolvedPromise = typeof Promise == 'undefined' ? null : Promise.resolve();
        var nextTick = resolvedPromise ? function (fn) {
            resolvedPromise.then(fn);
        } : function (fn) {
            setTimeout(fn);
        };

        function androidExec(success, fail, service, action, args) {
            if (bridgeSecret < 0) {
                // 如果我们捕捉到这种攻击，就需要将exec（）排队，并在获得机密后将其触发。
                // 现在，我认为调用exec（）是不可能的，因为插件是经过解析的，但直到OnActiveReady之后才运行。
                throw new Error('exec() called without bridgeSecret');
            }
            // 如果尚未设置默认桥接模式，请设置它们。
            // 默认情况下，我们使用故障保护，因为addjavascriptinterface经常中断
            if (jsToNativeBridgeMode === undefined) {
                androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT);
            }
            // 将arrayBuffers中的所有arrayBuffers处理为字符串。
            for (var i = 0; i < args.length; i++) {
                if (utils.typeName(args[i]) == 'ArrayBuffer') {
                    args[i] = base64.fromArrayBuffer(args[i]);
                }
            }
            var callbackId = service + cordova.callbackId++,
                argsJson = JSON.stringify(args);

            if (success || fail) {
                cordova.callbacks[callbackId] = {
                    success: success,
                    fail: fail
                };
            }

            var msgs = nativeApiProvider.get().exec(bridgeSecret, service, action, callbackId, argsJson);
            console.log('[DEBUG] exec msgs:' + msgs);
            // 如果Java接收到AgsJSON为NULL，请使用提示桥模式再次尝试。
            // 这种情况很少发生，例如某些Unicode字符通过星系s2上的桥时。见CB-2666。
            if (jsToNativeBridgeMode == jsToNativeModes.JS_OBJECT && msgs === "@Null arguments.") {
                androidExec.setJsToNativeBridgeMode(jsToNativeModes.PROMPT);
                androidExec(success, fail, service, action, args);
                androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT);
            } else if (msgs) {
                messagesFromNative.push(msgs);
                // 始终处理异步以避免异常导致堆栈混乱。
                nextTick(processMessages);
            }
        }

        androidExec.init = function () {
            bridgeSecret = _pcMode ? 20190620 : +prompt('', 'gap_init:' + nativeToJsBridgeMode);
            // bridgeSecret = +prompt('', 'gap_init:' + nativeToJsBridgeMode);
            console.log('[DEBUG] 触发onNativeReady事件 bridgeSecret = ' + bridgeSecret);
            channel.onNativeReady.fire();
        };

        function pollOnceFromOnlineEvent() {
            pollOnce(true);
        }

        function pollOnce(opt_fromOnlineEvent) {
            if (bridgeSecret < 0) {
                // 当NativeToJSmessageQueue重置页面上的联机状态转换时，可能会发生这种情况。
                // 我们知道没有东西可以取回，所以不需要测验。
                return;
            }
            var msgs = nativeApiProvider.get().retrieveJsMessages(bridgeSecret, !!opt_fromOnlineEvent);
            console.log('[DEBUG] retrieveJsMessages msgs:' + msgs);
            if (msgs) {
                messagesFromNative.push(msgs);
                // 处理同步，因为我们知道我们已经是栈顶了。
                processMessages();
            }
        }

        function pollingTimerFunc() {
            if (pollEnabled) {
                pollOnce();
                setTimeout(pollingTimerFunc, 50);
            }
        }

        function hookOnlineApis() {
            function proxyEvent(e) {
                cordova.fireWindowEvent(e.type);
            }
            // 网络模块负责触发在线和离线事件。
            // 它目前只在文档上触发它们，所以我们将它们桥接到这里的窗口（在第一次监听exec（）相关的在线/离线事件时）。
            window.addEventListener('online', pollOnceFromOnlineEvent, false);
            window.addEventListener('offline', pollOnceFromOnlineEvent, false);
            cordova.addWindowEventHandler('online');
            cordova.addWindowEventHandler('offline');
            document.addEventListener('online', proxyEvent, false);
            document.addEventListener('offline', proxyEvent, false);
        }

        hookOnlineApis();

        androidExec.jsToNativeModes = jsToNativeModes;
        androidExec.nativeToJsModes = nativeToJsModes;

        androidExec.setJsToNativeBridgeMode = function (mode) {
            if (mode == jsToNativeModes.JS_OBJECT && !window._cordovaNative) {
                mode = jsToNativeModes.PROMPT;
            }
            nativeApiProvider.setPreferPrompt(mode == jsToNativeModes.PROMPT);
            jsToNativeBridgeMode = mode;
        };

        androidExec.setNativeToJsBridgeMode = function (mode) {
            if (mode == nativeToJsBridgeMode) {
                return;
            }
            if (nativeToJsBridgeMode == nativeToJsModes.POLLING) {
                pollEnabled = false;
            }

            nativeToJsBridgeMode = mode;
            // 告诉本机端切换模式。否则，它将由androidexec.init（）设置
            if (bridgeSecret >= 0) {
                nativeApiProvider.get().setNativeToJsBridgeMode(bridgeSecret, mode);
            }
            if (mode == nativeToJsModes.POLLING) {
                pollEnabled = true;
                setTimeout(pollingTimerFunc, 1);
            }
        };

        function buildPayload(payload, message) {
            var payloadKind = message.charAt(0);
            if (payloadKind == 's') {
                payload.push(message.slice(1));
            } else if (payloadKind == 't') {
                payload.push(true);
            } else if (payloadKind == 'f') {
                payload.push(false);
            } else if (payloadKind == 'N') {
                payload.push(null);
            } else if (payloadKind == 'n') {
                payload.push(+message.slice(1));
            } else if (payloadKind == 'A') {
                var data = message.slice(1);
                payload.push(base64.toArrayBuffer(data));
            } else if (payloadKind == 'S') {
                payload.push(window.atob(message.slice(1)));
            } else if (payloadKind == 'M') {
                var multipartMessages = message.slice(1);
                while (multipartMessages !== "") {
                    var spaceIdx = multipartMessages.indexOf(' ');
                    var msgLen = +multipartMessages.slice(0, spaceIdx);
                    var multipartMessage = multipartMessages.substr(spaceIdx + 1, msgLen);
                    multipartMessages = multipartMessages.slice(spaceIdx + msgLen + 1);
                    buildPayload(payload, multipartMessage);
                }
            } else {
                payload.push(JSON.parse(message));
            }
        }
        // 处理由NativeToJSmessageQueue.java编码的单个消息。
        function processMessage(message) {
            var firstChar = message.charAt(0);
            if (firstChar == 'J') {
                // 这在Java方面被贬低。它不能在启用了CSP的情况下工作。
                eval(message.slice(1));
            } else if (firstChar == 'S' || firstChar == 'F') {
                var success = firstChar == 'S';
                var keepCallback = message.charAt(1) == '1';
                var spaceIdx = message.indexOf(' ', 2);
                var status = +message.slice(2, spaceIdx);
                var nextSpaceIdx = message.indexOf(' ', spaceIdx + 1);
                var callbackId = message.slice(spaceIdx + 1, nextSpaceIdx);
                var payloadMessage = message.slice(nextSpaceIdx + 1);
                var payload = [];
                buildPayload(payload, payloadMessage);
                cordova.callbackFromNative(callbackId, success, status, payload, keepCallback);
            } else {
                console.log("processMessage failed: invalid message: " + JSON.stringify(message));
            }
        }

        function processMessages() {
            // 检查是否存在可重入情况。
            if (isProcessing) {
                return;
            }
            if (messagesFromNative.length === 0) {
                return;
            }
            isProcessing = true;
            try {
                var msg = popMessageFromQueue();
                console.log('[DEBUG] popMessageFromQueue msg: ' + msg);
                // Java端可以发送一条*消息来指示它仍然有消息等待被检索。
                if (msg == '*' && messagesFromNative.length === 0) {
                    nextTick(pollOnce);
                    return;
                }
                processMessage(msg);
            } finally {
                isProcessing = false;
                if (messagesFromNative.length > 0) {
                    nextTick(processMessages);
                }
            }
        }

        function popMessageFromQueue() {
            var messageBatch = messagesFromNative.shift();
            if (messageBatch == '*') {
                return '*';
            }
            var spaceIdx = messageBatch.indexOf(' ');
            var msgLen = +messageBatch.slice(0, spaceIdx);
            var message = messageBatch.substr(spaceIdx + 1, msgLen);
            messageBatch = messageBatch.slice(spaceIdx + msgLen + 1);
            if (messageBatch) {
                messagesFromNative.unshift(messageBatch);
            }
            return message;
        }
        module.exports = androidExec;
    });
    define("cordova/init", function (require, exports, module) {
        var channel = require('cordova/channel');
        var cordova = require('cordova');
        var modulemapper = require('cordova/modulemapper');
        var platform = require('cordova/platform');
        var pluginloader = require('cordova/pluginloader');
        var utils = require('cordova/utils');
        broadcaster = require('com.broadcaster');

        var platformInitChannelsArray = [channel.onNativeReady, channel.onPluginsReady];

        function logUnfiredChannels(arr) {
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i].state != 2) {
                    console.log('Channel not fired: ' + arr[i].type);
                }
            }
        }
        window.setTimeout(function () {
            if (channel.onDeviceReady.state != 2) {
                console.log('deviceready has not fired after 50 seconds.');
                logUnfiredChannels(platformInitChannelsArray);
                logUnfiredChannels(channel.deviceReadyChannelsArray);
            }
        }, 50000);

        // 在需要任何模块之前替换navigator（），以确保它尽快发生。
        // 我们替换它，这样就可以重写不能被删除的属性。
        function replaceNavigator(origNavigator) {
            var CordovaNavigator = function () { };
            CordovaNavigator.prototype = origNavigator;
            var newNavigator = new CordovaNavigator();
            // 这种解决方法实际上只适用于比function.bind更新的新API。
            // 没有它，API（如getgamepads（）中断）。
            if (CordovaNavigator.bind) {
                for (var key in origNavigator) {
                    if (typeof origNavigator[key] == 'function') {
                        newNavigator[key] = origNavigator[key].bind(origNavigator);
                    } else {
                        (function (k) {
                            utils.defineGetterSetter(newNavigator, key, function () {
                                return origNavigator[k];
                            });
                        })(key);
                    }
                }
            }
            return newNavigator;
        }
        if (window.navigator) {
            window.navigator = replaceNavigator(window.navigator);
        }
        if (!window.console) {
            window.console = {
                log: function () { }
            };
        }
        if (!window.console.warn) {
            window.console.warn = function (msg) {
                this.log("warn: " + msg);
            };
        }
        // 将暂停、恢复和设备附加频道注册为文档上的事件。
        channel.onPause = cordova.addDocumentEventHandler('pause');
        channel.onResume = cordova.addDocumentEventHandler('resume');
        channel.onActivated = cordova.addDocumentEventHandler('activated');
        channel.onDeviceReady = cordova.addStickyDocumentEventHandler('deviceready');

        // 监听domcontentloaded并通知我们的频道订户。
        if (document.readyState == 'complete' || document.readyState == 'interactive') {
            channel.onDOMContentLoaded.fire();
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                console.log('[DEBUG] 触发onDOMContentLoaded事件');
                channel.onDOMContentLoaded.fire();
            }, false);
        }
        // _ native ready是本机端可以设置为表示本机代码就绪的全局变量。
        // 它是一个全局性的，因为它可以在任何Cordova JS就绪之前被调用。
        console.log('[DEBUG] channel.onNativeReady.fire _nativeReady = ' + window._nativeReady);
        if (window._nativeReady) {
            channel.onNativeReady.fire();
        }
        modulemapper.clobbers('cordova', 'cordova');
        modulemapper.clobbers('cordova/exec', 'cordova.exec');

        modulemapper.clobbers('com.broadcaster', 'broadcaster');
        // modulemapper.clobbers('com.coocaaosapi', 'coocaaosapi');
        // 调用平台特定的初始化。
        platform.bootstrap && platform.bootstrap();
        // 将setTimeout包装起来，以支持将plugin js附加到cordova.js的用例。
        // 延迟允许在插件加载程序查找附加模块之前定义它们。
        setTimeout(function () {
            pluginloader.load(function () {
                console.log('[DEBUG] 触发onPluginsReady事件');
                channel.onPluginsReady.fire();
            });
        }, 0);
        /**一旦本地端准备就绪，就创建所有Cordova对象。*/
        channel.join(function () {
            console.log('[DEBUG] onNativeReady和onPluginsReady已触发，执行回调函数，触发onCordovaReady事件，所有注册的回调依次执行');
            modulemapper.mapModules(window);
            platform.initialize && platform.initialize();
            // 激发事件以通知已创建所有对象
            channel.onCordovaReady.fire();
            // 一旦页面完全加载，所有构造函数都已运行，并且已从本机端接收到cordova信息，则激发OnDeviceReady事件。
            channel.join(function () {
                console.log('[DEBUG] onCordovaReady和DOMContentLoaded已触发，执行回调函数，触发deviceready事件');
                require('cordova').fireDocumentEvent('deviceready');
            }, channel.deviceReadyChannelsArray);
        }, platformInitChannelsArray);
    });
    define("cordova/modulemapper", function (require, exports, module) {
        var builder = require('cordova/builder'),
            moduleMap = define.moduleMap,
            symbolList,
            deprecationMap;
        exports.reset = function () {
            symbolList = [];
            deprecationMap = {};
        };

        function addEntry(strategy, moduleName, symbolPath, opt_deprecationMessage) {
            if (!(moduleName in moduleMap)) {
                throw new Error('Module ' + moduleName + ' does not exist.');
            }
            symbolList.push(strategy, moduleName, symbolPath);
            if (opt_deprecationMessage) {
                deprecationMap[symbolPath] = opt_deprecationMessage;
            }
        }
        exports.clobbers = function (moduleName, symbolPath, opt_deprecationMessage) {
            addEntry('c', moduleName, symbolPath, opt_deprecationMessage);
        };
        exports.merges = function (moduleName, symbolPath, opt_deprecationMessage) {
            addEntry('m', moduleName, symbolPath, opt_deprecationMessage);
        };
        exports.defaults = function (moduleName, symbolPath, opt_deprecationMessage) {
            addEntry('d', moduleName, symbolPath, opt_deprecationMessage);
        };
        exports.runs = function (moduleName) {
            addEntry('r', moduleName, null);
        };

        function prepareNamespace(symbolPath, context) {
            if (!symbolPath) {
                return context;
            }
            var parts = symbolPath.split('.');
            var cur = context;
            for (var i = 0, part; part = parts[i]; ++i) {
                cur = cur[part] = cur[part] || {};
            }
            return cur;
        }
        exports.mapModules = function (context) {
            var origSymbols = {};
            context.CDV_origSymbols = origSymbols;
            for (var i = 0, len = symbolList.length; i < len; i += 3) {
                var strategy = symbolList[i];
                var moduleName = symbolList[i + 1];
                var module = require(moduleName);
                if (strategy == 'r') {
                    continue;
                }
                var symbolPath = symbolList[i + 2];
                var lastDot = symbolPath.lastIndexOf('.');
                var namespace = symbolPath.substr(0, lastDot);
                var lastName = symbolPath.substr(lastDot + 1);

                var deprecationMsg = symbolPath in deprecationMap ? 'Access made to deprecated symbol: ' + symbolPath + '. ' + deprecationMsg : null;
                var parentObj = prepareNamespace(namespace, context);
                var target = parentObj[lastName];

                if (strategy == 'm' && target) {
                    builder.recursiveMerge(target, module);
                } else if ((strategy == 'd' && !target) || (strategy != 'd')) {
                    if (!(symbolPath in origSymbols)) {
                        origSymbols[symbolPath] = target;
                    }
                    builder.assignOrWrapInDeprecateGetter(parentObj, lastName, module, deprecationMsg);
                }
            }
        };
        exports.getOriginalSymbol = function (context, symbolPath) {
            var origSymbols = context.CDV_origSymbols;
            if (origSymbols && (symbolPath in origSymbols)) {
                return origSymbols[symbolPath];
            }
            var parts = symbolPath.split('.');
            var obj = context;
            for (var i = 0; i < parts.length; ++i) {
                obj = obj && obj[parts[i]];
            }
            return obj;
        };
        exports.reset();
    });
    define("cordova/platform", function (require, exports, module) {
        // 收到的具有插件调用结果的上一个恢复事件。
        var lastResumeEvent = null;
        module.exports = {
            id: 'android',
            bootstrap: function () {
                var channel = require('cordova/channel'),
                    cordova = require('cordova'),
                    exec = require('cordova/exec'),
                    modulemapper = require('cordova/modulemapper');
                // 获取使用桥接器所需的共享秘钥。
                exec.init();
                // 将其提取为适当的插件。
                modulemapper.clobbers('cordova/plugin/android/app', 'navigator.app');
                var APP_PLUGIN_NAME = Number(cordova.platformVersion.split('.')[0]) >= 4 ? 'CoreAndroid' : 'App';
                // 为文档的backbutton插入一个侦听器。
                var backButtonChannel = cordova.addDocumentEventHandler('backbutton');
                backButtonChannel.onHasSubscribersChange = function () {
                    // 如果我们刚刚附加了第一个处理程序或分离了最后一个处理程序，请让本机知道我们需要重写back按钮。
                    exec(null, null, APP_PLUGIN_NAME, "overrideBackbutton", [this.numHandlers == 1]);
                };
                var homeButtonChannel = cordova.addDocumentEventHandler('homebutton');
                homeButtonChannel.onHasSubscribersChange = function () {
                    exec(null, null, APP_PLUGIN_NAME, "overrideHomebutton", [this.numHandlers == 1]);
                };

                // 搜索按钮和文件菜单handlers硬件
                var menuButtonChannel = cordova.addDocumentEventHandler('menubutton');
                menuButtonChannel.onHasSubscribersChange = function () {
                    exec(null, null, APP_PLUGIN_NAME, "overrideButton", ['menubutton', this.numHandlers == 1]);
                };
                cordova.addDocumentEventHandler('searchbutton');

                function bindButtonChannel(buttonName) {
                    // 用于volumeup/volumedown按钮的常规按钮绑定
                    var volumeButtonChannel = cordova.addDocumentEventHandler(buttonName + 'button');
                    volumeButtonChannel.onHasSubscribersChange = function () {
                        exec(null, null, APP_PLUGIN_NAME, "overrideButton", [buttonName, this.numHandlers == 1]);
                    };
                }
                // 为文档上的音量按钮插入侦听器。
                bindButtonChannel('volumeup');
                bindButtonChannel('volumedown');
                // 恢复事件不是“粘性的”，但事件可能包含插件调用的结果。
                // 我们需要确保插件结果即使在事件被触发后也能被传递（CB-10498）
                var cordovaAddEventListener = document.addEventListener;
                document.addEventListener = function (evt, handler, capture) {
                    cordovaAddEventListener(evt, handler, capture);
                    if (evt === 'resume' && lastResumeEvent) {
                        handler(lastResumeEvent);
                    }
                };
                // 让本机代码知道我们都是在JS端完成的。然后，本机代码将取消隐藏WebView。
                console.log('[DEBUG] 注册onCordovaReady事件监听');
                channel.onCordovaReady.subscribe(function () {
                    console.log('[DEBUG] 触发onCordovaReady事件，执行回调函数，建立messageChannel和show通道');
                    exec(onMessageFromNative, null, APP_PLUGIN_NAME, 'messageChannel', []);
                    exec(null, null, APP_PLUGIN_NAME, "show", []);
                });
            }
        };

        function onMessageFromNative(msg) {
            var cordova = require('cordova');
            var action = msg.action;
            switch (action) {
                case 'backbutton':
                case 'homebutton':
                case 'backbuttondown':
                case 'menubutton':
                case 'searchbutton':
                case 'pause':
                case 'volumedownbutton':
                case 'volumeupbutton':
                    cordova.fireDocumentEvent(action);
                    break;
                case 'resume':
                    if (arguments.length > 1 && msg.pendingResult) {
                        if (arguments.length === 2) {
                            msg.pendingResult.result = arguments[1];
                        } else {
                            // 插件返回了多部分消息
                            var res = [];
                            for (var i = 1; i < arguments.length; i++) {
                                res.push(arguments[i]);
                            }
                            msg.pendingResult.result = res;
                        }
                        // 保存插件结果，以便将其传递到JS，即使它们错过了事件的初始触发。
                        lastResumeEvent = msg;
                    }
                    cordova.fireDocumentEvent(action, msg);
                    break;
                default:
                    throw new Error('Unknown event action ' + action);
            }
        }
    });
    define("cordova/plugin/android/app", function (require, exports, module) {
        var exec = require('cordova/exec');
        var APP_PLUGIN_NAME = Number(require('cordova').platformVersion.split('.')[0]) >= 4 ? 'CoreAndroid' : 'App';
        module.exports = {
            /**清除资源缓存。*/
            clearCache: function () {
                exec(null, null, APP_PLUGIN_NAME, "clearCache", []);
            },
            /**将URL加载到WebView或新的浏览器实例中。
             * @param url           The URL to load
             * @param props         可传递到活动的属性：
             *      wait: int                       => 加载URL前等待毫秒
             *      loadingDialog: "Title,Message"  => 显示本机加载对话框
             *      loadUrlTimeoutValue: int        => 触发超时错误前等待的时间（毫秒）
             *      clearHistory: boolean           => 清除WebView历史记录（default=false）
             *      openExternal: boolean           => 打开一个新的浏览器 (default=false)
             * Example:
             *      navigator.app.loadUrl("http://server/myapp/index.html", {wait:2000, loadingDialog:"Wait,Loading App", loadUrlTimeoutValue: 60000});
             */
            loadUrl: function (url, props) {
                exec(null, null, APP_PLUGIN_NAME, "loadUrl", [url, props]);
            },
            /**取消等待加载的loadURL。*/
            cancelLoadUrl: function () {
                exec(null, null, APP_PLUGIN_NAME, "cancelLoadUrl", []);
            },
            /**清除此Web视图中的Web历史记录。它将退出应用程序，而不是返回按钮加载上一个网页。*/
            clearHistory: function () {
                exec(null, null, APP_PLUGIN_NAME, "clearHistory", []);
            },
            /**转到显示的上一页。这与在Android设备上按下backbutton相同。*/
            backHistory: function () {
                exec(null, null, APP_PLUGIN_NAME, "backHistory", []);
            },
            /**覆盖Android后退按钮的默认行为。
             * 如果被覆盖，当按下后退按钮时，“backkeydown”javascript事件将被激发。
             * 注意: 用户不必调用此方法。相反，当用户注册“backbutton”事件时，这将自动完成。
             * @param override   T=override, F=cancel override
             */
            overrideBackbutton: function (override) {
                exec(null, null, APP_PLUGIN_NAME, "overrideBackbutton", [override]);
            },
            /**
             * 覆盖Android音量按钮的默认行为。
             * 如果被覆盖，当按下volume按钮时，将触发“volume[up down]button”javascript事件。
             * 注意: 用户不必调用此方法。相反，当用户注册“卷[上下]按钮”事件时，这是自动完成的。
             * @param button          volumeup, volumedown
             * @param override        T=override, F=cancel override
             */
            overrideButton: function (button, override) {
                exec(null, null, APP_PLUGIN_NAME, "overrideButton", [button, override]);
            },
            /**退出并终止当前活动。*/
            exitApp: function () {
                return exec(null, null, APP_PLUGIN_NAME, "exitApp", []);
            }
        };
    });
    define("cordova/pluginloader", function (require, exports, module) {
        var modulemapper = require('cordova/modulemapper');
        var urlutil = require('cordova/urlutil');
        // 创建<script>tag,把js文件动态添加到head中
        exports.injectScript = function (url, onload, onerror) {
            console.log("========== injectScript");
            var script = document.createElement("script");
            // 即使脚本加载失败并出现错误，也会触发OnLoad。
            script.onload = onload;
            // 为格式错误的URL触发OnError。
            script.onerror = onerror;
            script.src = url;
            console.log(script.src);
            document.head.appendChild(script);
        };

        function onScriptLoadingComplete(moduleList, finishPluginLoading) {
            // 循环遍历所有插件，然后遍历它们的clobber和merge。
            for (var i = 0, module; module = moduleList[i]; i++) {
                // 把该模块需要clobber的clobber到指定的clobbers里 
                if (module.clobbers && module.clobbers.length) {
                    for (var j = 0; j < module.clobbers.length; j++) {
                        modulemapper.clobbers(module.id, module.clobbers[j]);
                    }
                }
                // 把该模块需要合并的部分合并到指定的模块里 
                if (module.merges && module.merges.length) {
                    for (var k = 0; k < module.merges.length; k++) {
                        modulemapper.merges(module.id, module.merges[k]);
                    }
                }
                // 最后, module.runs = true，我们只需要简单的 require那个模块.
                if (module.runs) {
                    modulemapper.runs(module.id);
                }
            }
            // 插件js脚本加载完成后，执行回调!!! 
            finishPluginLoading();
        }
        // 加载所有cordova_plugins.js中定义的js-module 
        // 否则，onerror响应处理程序将只调用finishPluginLoading（）。
        function handlePluginsObject(path, moduleList, finishPluginLoading) {
            var scriptCounter = moduleList.length;
            // 没有插件,直接执行回调后返回 
            if (!scriptCounter) {
                finishPluginLoading();
                return;
            }
            // 依次把插件的js脚本添加到head中后加载 
            for (var i = 0; i < moduleList.length; i++) {
                console.log(moduleList[i].id);
                injectIfNecessary(moduleList[i].id, path + moduleList[i].file, scriptLoadedCallback);
            }
            // 加载每个插件js的脚本的回调 
            function scriptLoadedCallback() {
                // 加载完成一个就把计数器减1
                if (!--scriptCounter) {
                    // 直到所有插件的js脚本都被加载完成后clobber
                    console.log(JSON.stringify(moduleList));
                    onScriptLoadingComplete(moduleList, finishPluginLoading);
                }
            }
        }

        function injectIfNecessary(id, url, onload, onerror) {
            console.log("==========" + id);
            onerror = onerror || onload;
            if (id in define.moduleMap) {
                onload();
            } else {
                exports.injectScript(url, function () {
                    if (id in define.moduleMap) {
                        onload();
                    } else {
                        onerror();
                    }
                }, onerror);
            }
        }

        // 尝试加载所有插件的JS模块。
        // 这是一个异步进程，但OnDeviceReady在OnPluginsReady上被阻止。
        // 当没有要加载的插件或插件都已完成时，OnPluginsReady将被激发。
        exports.load = function (callback) {
            // 取cordova.js文件所在的路径 
            var pathPrefix = '';
            var moduleList = require("cordova/plugin_list");
            // 加载所有cordova_plugins.js中定义的js-module 
            handlePluginsObject(pathPrefix, moduleList, callback);
        };
    });
    define("cordova/urlutil", function (require, exports, module) {
        /**
         * 对于绝对URL，返回传入的内容。
         * 对于相对URL，将其转换为绝对URL。
         */
        exports.makeAbsolute = function makeAbsolute(url) {
            var anchorEl = document.createElement('a');
            anchorEl.href = url;
            return anchorEl.href;
        };
    });
    define("cordova/utils", function (require, exports, module) {
        var utils = exports;
        /**为obj[key]定义属性getter/setter。*/
        utils.defineGetterSetter = function (obj, key, getFunc, opt_setFunc) {
            if (Object.defineProperty) {
                var desc = {
                    get: getFunc,
                    configurable: true
                };
                if (opt_setFunc) {
                    desc.set = opt_setFunc;
                }
                Object.defineProperty(obj, key, desc);
            } else {
                obj.__defineGetter__(key, getFunc);
                if (opt_setFunc) {
                    obj.__defineSetter__(key, opt_setFunc);
                }
            }
        };
        /**定义obj[key]的属性getter。*/
        utils.defineGetter = utils.defineGetterSetter;
        utils.arrayIndexOf = function (a, item) {
            if (a.indexOf) {
                return a.indexOf(item);
            }
            var len = a.length;
            for (var i = 0; i < len; ++i) {
                if (a[i] == item) {
                    return i;
                }
            }
            return -1;
        };
        /**返回是否在数组中找到该项。*/
        utils.arrayRemove = function (a, item) {
            var index = utils.arrayIndexOf(a, item);
            if (index != -1) {
                a.splice(index, 1);
            }
            return index != -1;
        };
        utils.typeName = function (val) {
            return Object.prototype.toString.call(val).slice(8, -1);
        };
        /**返回参数是否为数组的标示*/
        utils.isArray = Array.isArray || function (a) {
            return utils.typeName(a) == 'Array';
        };
        /**返回参数是否为日期的标示*/
        utils.isDate = function (d) {
            return (d instanceof Date);
        };
        /**对对象进行深度克隆。*/
        utils.clone = function (obj) {
            if (!obj || typeof obj == 'function' || utils.isDate(obj) || typeof obj != 'object') {
                return obj;
            }
            var retVal, i;
            if (utils.isArray(obj)) {
                retVal = [];
                for (i = 0; i < obj.length; ++i) {
                    retVal.push(utils.clone(obj[i]));
                }
                return retVal;
            }
            retVal = {};
            for (i in obj) {
                if (!(i in retVal) || retVal[i] != obj[i]) {
                    retVal[i] = utils.clone(obj[i]);
                }
            }
            return retVal;
        };
        /**返回函数的包装版本*/
        utils.close = function (context, func, params) {
            return function () {
                var args = params || arguments;
                return func.apply(context, args);
            };
        };
        function UUIDcreatePart(length) {
            var uuidpart = "";
            for (var i = 0; i < length; i++) {
                var uuidchar = parseInt((Math.random() * 256), 10).toString(16);
                if (uuidchar.length == 1) {
                    uuidchar = "0" + uuidchar;
                }
                uuidpart += uuidchar;
            }
            return uuidpart;
        }
        /**Create a UUID*/
        utils.createUUID = function () {
            return UUIDcreatePart(4) + '-' + UUIDcreatePart(2) + '-' + UUIDcreatePart(2) + '-' + UUIDcreatePart(2) + '-' + UUIDcreatePart(6);
        };
        /**使用经典继承模式从父对象扩展子对象。*/
        utils.extend = (function () {
            // 用于建立原型链的代理
            var F = function () { };
            // 从父级扩展子级
            return function (Child, Parent) {
                F.prototype = Parent.prototype;
                Child.prototype = new F();
                Child.__super__ = Parent.prototype;
                Child.prototype.constructor = Child;
            };
        }());
        /**以任何可用方式提醒消息：alert或console.log。*/
        /*强制以console.log的形式打印提醒消息 */
        utils.alert = function (msg) {
            //if (window.alert) {
            //window.alert(msg);
            //} else if (console && console.log) {
            //console.log(msg);
            //}
            console.log(msg);
        };
    });
    define('cordova/plugin_list', function (require, exports, module) {
        //  id:对外唯一标示id file:js路径 pluginid：plugin的唯一id（类似pod的时候的name）更新的时候需要对应。 clobbers：命名类似于（类名）
        module.exports = [];
    });
    define("com.broadcaster", function (require, exports, module) {
        var exec = require('cordova/exec');
        var channel = require('cordova/channel');

        module.exports = {

            _channels: {},
            createEvent: function (type, data) {
                var event = document.createEvent('Event');
                event.initEvent(type, false, false);
                if (data) {
                    for (var i in data) {
                        if (data.hasOwnProperty(i)) {
                            event[i] = data[i];
                        }
                    }
                }
                return event;
            },
            fireNativeEvent: function (eventname, data, success, error) {
                exec(success, error, "broadcaster", "fireNativeEvent", [eventname, data]);
            },
            fireEvent: function (type, data) {
                var event = this.createEvent(type, data);
                if (event && (event.type in this._channels)) {
                    this._channels[event.type].fire(event);
                }
            },
            addEventListener: function (eventname, f) {
                if (!(eventname in this._channels)) {
                    var me = this;
                    exec(function () {
                        me._channels[eventname] = channel.create(eventname);
                        me._channels[eventname].subscribe(f);
                    }, function (err) {
                        console.log("ERROR addEventListener: " + err)
                    }, "broadcaster", "addEventListener", [eventname]);
                } else {
                    var me = this;
                    exec(function () {
                        //  me._channels[eventname].subscribe(f);
                    }, function (err) {
                        console.log("ERROR addEventListener: " + err)
                    }, "broadcaster", "addEventListener", [eventname]);

                }
            },
            removeEventListener: function (eventname, f) {
                if (eventname in this._channels) {
                    var me = this;
                    exec(function () { }, function (err) {
                        console.log("ERROR removeEventListener: " + err)
                    }, "broadcaster", "removeEventListener", [eventname]);
                }
            }
        };
    });
    define("com.coocaaosapi", function (require, exports, module) {
        var argscheck = require('cordova/argscheck'),
            channel = require('cordova/channel'),
            exec = require('cordova/exec'),
            cordova = require('cordova'),
            startapp = {
                check: function (message, completeCallback, errorCallback) {
                    exec(completeCallback, errorCallback, "startApp", "check", [message]);
                },
                start: function (message, completeCallback, errorCallback) {
                    exec(completeCallback, errorCallback, "startApp", "start", (typeof message === 'string') ? [message] : message);
                },
                play: function (message, completeCallback, errorCallback) {
                    exec(completeCallback, errorCallback, "startApp", "play", (typeof message === 'string') ? [message] : message);
                }
            },
            brocaster = require('com.broadcaster');

        channel.createSticky('onCoocaaOsInitReady');

        if (!_pcMode) {
            console.log('[DEBUG] 注册CoocaaOSInitReady事件');
            channel.waitForInitialization('onCoocaaOsInitReady');
        }

        function CoocaaOSApi() {
            var thiz = this;
            console.log('[DEBUG] 准备注册onCordovaReady事件监听..._pcMode = ' + _pcMode);
            if (!_pcMode) {
                console.log('[DEBUG] 注册onCordovaReady事件监听');
                channel.onCordovaReady.subscribe(function () {
                    console.log('[DEBUG] 触发onCordovaReady事件，执行回到函数，获取CoocaaOSInitReady状态');
                    thiz.waitForCoocaaOSInitReady(function (message) {
                        console.log('[DEBUG] 触发onCoocaaOsInitReady事件');
                        channel.onCoocaaOsInitReady.fire();
                    }, function (message) {
                        console.log('error : ' + message);
                    });
                });
            }
        }

        CoocaaOSApi.prototype.waitForCoocaaOSInitReady = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.waitForCoocaaOSInitReady', arguments);
            exec(success, error, 'CoocaaOSApi', 'waitForOSReady', []);
        }
        // 启动本地媒体
        CoocaaOSApi.prototype.startLocalMedia = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startLocalMedia', arguments);
            startapp.check("com.tianci.localmedia", function (message) { /* success */
                startapp.start([
                    ["com.tianci.localmedia", "com.tianci.localmedia.MainActivity"]
                ], success, error);
            },
                error);
        }
        // 启动电视设置
        CoocaaOSApi.prototype.startTVSetting = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startTVSetting', arguments);
            startapp.check("com.tianci.setting", function (message) { /* success */
                console.log("启动成功");
                startapp.start([
                    ["com.tianci.setting", "com.tianci.setting.TianciSetting"]
                ], success, error);
            },
                error);
        }
        // 启动信号源
        CoocaaOSApi.prototype.startSourceList = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startSourceList', arguments);
            exec(success, error, 'CoocaaOSApi', 'launchSourceList', []);
        }
        // 启动二维码
        CoocaaOSApi.prototype.startQRCode = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startTVSetting', arguments);
            startapp.check("com.tianci.qrcode", function (message) {
                startapp.start([
                    ["com.tianci.qrcode", "com.tianci.qrcode.SkyQrcode"]
                ], success, error);
            }, error);
        }
        // 启动影视历史
        CoocaaOSApi.prototype.startMovieHistory = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startMovieHistory', arguments);
            startapp.start([
                ["action", "coocaa.intent.movie.history"]
            ], success, error);
        }
        // 启动我的游戏
        CoocaaOSApi.prototype.startMyGames = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startMyGames', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.GAME_CENTER_MYGAME"]
            ], success, error);
        }
        // 启动我的应用, mode: child / 其他，代表启动的是哪个模式下的程序
        CoocaaOSApi.prototype.startMyApps = function (mode, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startMyApps', arguments);
            if (mode == 'child') {
                startapp.start([
                    ["action", "coocaa.intent.action.MYAPP_CHILD_MODEL"]
                ], success, error);
            } else {
                startapp.start([
                    ["action", "coocaa.intent.action.APP_STORE_MYAPPS"]
                ], success, error);
            }
        }
        // 启动用户设置
        CoocaaOSApi.prototype.startUserSetting = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startUserSetting', arguments);
            startapp.start([
                ["action", "android.settings.ADD_ACCOUNT_SETTINGS"]
            ], success, error);
        }
        // 启动用户设置，登录成功就消失
        CoocaaOSApi.prototype.startUserSettingAndFinish = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startUserSettingAndFinish', arguments);
            startapp.start([
                ["action", "android.settings.ADD_ACCOUNT_SETTINGS"],
                [{ 'needFinish': true }]
            ], success, error);
            //开机引导时多2个参数startapp.start([["action", "android.settings.ADD_ACCOUNT_SETTINGS"],[{'needFinish':true},{'layoutType':"LOGIN_MOBILE"},{'fromGuide':true}]], success,error);
        }
        // 包名类名方式启动
        CoocaaOSApi.prototype.startUserSettingAndFinish2 = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startUserSettingAndFinish', arguments);
            startapp.check("com.tianci.user", function (message) { /* success */
                startapp.start([
                    ["com.tianci.user", "com.tianci.webview.AccountWebActivity"],
                    [{ 'needFinish': true }]
                ], success, error);
            }, error);
        }
        // 包名+action方式启动
        CoocaaOSApi.prototype.startUserSettingAndFinish3 = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startUserSettingAndFinish', arguments);
            startapp.check("com.tianci.user", function (message) { /* success */
                startapp.start([
                    ["action", "android.settings.ADD_ACCOUNT_SETTINGS", "com.tianci.user"],
                    [{ 'needFinish': true }]
                ], success, error);
            }, error);
        }
        // 包名方式启动
        CoocaaOSApi.prototype.startByPackName = function (pkgname, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startUserSettingAndFinish', arguments);
            startapp.start(pkgname, success, error);
        }
        // 账户4.2版本开始支持微信、qq或二选一登录：启动用户设置，登录成功就消失
        CoocaaOSApi.prototype.startWeixinOrQQ = function (type, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startWeixinOrQQ', arguments);
            startapp.start([
                ["action", "android.settings.ADD_ACCOUNT_SETTINGS"],
                [{ 'needFinish': true }, { 'type': type }]
            ], success, error);
        }
        // 包名类名方式启动【账户版本4.3以上，酷开版本5.5以下】
        CoocaaOSApi.prototype.startWeixinOrQQ2 = function (type, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startWeixinOrQQ', arguments);
            startapp.check("com.tianci.user", function (message) { /* success */
                startapp.start([
                    ["com.tianci.user", "com.tianci.webview.AccountWebActivity"],
                    [{ 'needFinish': true }, { 'type': type }]
                ], success, error);
            }, error);
        }
        // 启动网络设置
        CoocaaOSApi.prototype.startNetSetting = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startNetSetting', arguments);
            startapp.start([
                ["action", "android.settings.NETWORK_OPERATOR_SETTINGS"]
            ], success, error);
        }
        // 启动蓝牙设置
        CoocaaOSApi.prototype.startBlueToothSetting = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startBlueToothSetting', arguments);
            startapp.start([
                ["action", "android.settings.BLUETOOTH_SETTINGS"]
            ], success, error);
        }
        // 启动消息盒子
        CoocaaOSApi.prototype.startMessageBox = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startMessageBox', arguments);
            startapp.start([
                ["action", "com.coocaa.action.MESSAGEBOX"]
            ], success, error);
        }
        // 启动升级界面
        CoocaaOSApi.prototype.startSystemUpgrade = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startSystemUpgrade', arguments);
            startapp.start([
                ["action", "android.settings.SYSTEM_UPGRADE"]
            ], success, error);
        }
        // 获取用户access_token
        CoocaaOSApi.prototype.getUserAccessToken = function (success, error) {
            if (debug.getPCMode()) {
                success(debug.getAccessToken());
                return true;
            }
            argscheck.checkArgs('ff', 'CoocaaOSApi.getUserAccessToken', arguments);
            exec(success, error, 'CoocaaOSApi', 'getUserAccessToken', []);
        }
        // 启动影视列表页
        CoocaaOSApi.prototype.startMovieList = function (listid, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startMovieList', arguments);
            startapp.start([
                ["action", "coocaa.intent.movie.list"],
                [{
                    'id': listid
                }]
            ], success, error);
        }
        // 启动影视详情页
        CoocaaOSApi.prototype.startMovieDetail = function (detailid, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startMovieDetail', arguments);
            startapp.start([
                ["action", "coocaa.intent.movie.detailinfo"],
                [{
                    'id': detailid
                }]
            ], success, error);
        }
        // 轮播专题[一级]
        CoocaaOSApi.prototype.startVideospecial = function (detailid, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startVideospecial', arguments);
            startapp.start([
                ["action", "coocaa.intent.movie.videospecial"],
                [{
                    'topicCode': detailid
                }]
            ], success, error);
        }
        // 轮播专题【两级】
        CoocaaOSApi.prototype.startVideospecial2 = function (detailid, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startVideospecial2', arguments);
            startapp.start([
                ["action", "coocaa.intent.movie.videospecial"],
                [{
                    'pTopicCode': detailid
                }]
            ], success, error);
        }
        // 启动影视专题页
        CoocaaOSApi.prototype.startMovieTopic = function (topicid, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startMovieTopic', arguments);
            startapp.start([
                ["action", "coocaa.intent.movie.special"],
                [{
                    'id': topicid
                }]
            ], success, error);
        }
        // 启动影视会员中心
        CoocaaOSApi.prototype.startMovieMemberCenter = function (sourceid, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startMovieMemberCenter', arguments);
            startapp.start([
                ["action", "coocaa.intent.vip.center"],
                [{ 'source_id': sourceid }]
            ], success, error);
        }
        // 启动主页专题
        CoocaaOSApi.prototype.startMovieHomeSpecialTopic = function (id, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startMovieHomeSpecialTopic', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.HOME_SPECIAL_TOPIC"],
                [{ 'id': id }]
            ], success, error);
        }
        // 启动影视会员中心2级页面
        CoocaaOSApi.prototype.startMovieMemberCenter2 = function (source_id, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startMovieMemberCenter2', arguments);
            startapp.start([
                ["action", "coocaa.intent.vip.center.second"],
                [{
                    'source_id': source_id
                }]
            ], success, error);
        }
        // 启动影视中心
        CoocaaOSApi.prototype.startMovieHome = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startMovieHome', arguments);
            startapp.start([
                ["action", "coocaa.intent.movie.home"]
            ], success, error);
        }
        // 启动播放器, needparse: 需要传递'true'|'false'，默认传递false
        CoocaaOSApi.prototype.playOnlineMovie = function (url, name, needparse, success, error) {
            argscheck.checkArgs('sssff', 'CoocaaOSApi.playOnlineMovier', arguments);
            exec(success, error, 'CoocaaOSApi', 'startOnLinePlayer', [{
                'url': url
            }, {
                'name': name
            }, {
                'needparse': needparse
            }, {
                'urlType': "url"
            }]);
        }
        // 启动应用商城
        CoocaaOSApi.prototype.startAppStore = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startAppStore', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.APP_STORE_HOME"]
            ], success, error);
        }
        // 启动应用商城榜单页
        CoocaaOSApi.prototype.startAppStoreBD = function (rankid, success, error) {
            argscheck.checkArgs('nff', 'CoocaaOSApi.startAppStoreBD', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.APP_STORE_RANKING"],
                [{
                    'rankId': rankid
                }]
            ], success, error);
        }
        // 启动应用商城分类页
        CoocaaOSApi.prototype.startAppStoreSort = function (sortid, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startAppStoreSort', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.APP_STORE_SORT"],
                [{
                    'sortid': sortid
                }]
            ], success, error);
        }
        // 启动应用商城列表页
        CoocaaOSApi.prototype.startAppStoreList = function (listid, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startAppStoreList', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.APP_STORE_LIST"],
                [{
                    'listId': listid
                }]
            ], success, error);
        }
        // 启动应用商城详情页, 可以传递pkg或者id
        CoocaaOSApi.prototype.startAppStoreDetail = function (idorpgk, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startAppStoreDetail', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.APP_STORE_DETAIL"],
                [{
                    'id': idorpgk
                }]
            ], success, error);
        }
        // 启动应用商城专题页
        CoocaaOSApi.prototype.startAppStoreZone = function (zoneid, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startAppStoreZone', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.ZONEPAGE"],
                [{
                    'id': zoneid
                }]
            ], success, error);
        }
        CoocaaOSApi.prototype.startOrCreateDownloadTask = function (downloadurl, md5, title, packageName, appID, iconUrl, success, error) {
            argscheck.checkArgs('ssssssff', 'CoocaaOSApi.startOrCreateDownloadTask', arguments);
            startapp.check(packageName, function (checksuccess) {
                startapp.start(packageName, success, error);
            }, function (checkerror) {
                console.log(checkerror);
                exec(success, error, 'CoocaaOSApi', 'createDownloadTask', [{
                    'url': downloadurl
                }, {
                    'md5': md5
                }, {
                    'title': title
                }, {
                    'pkg': packageName
                }, {
                    'appid': appID
                }, {
                    'icon': iconUrl
                }]);
            });
        }
        CoocaaOSApi.prototype.createDownloadTask = function (downloadurl, md5, title, packageName, appID, iconUrl, success, error) {
            argscheck.checkArgs('ssssssff', 'CoocaaOSApi.createDownloadTask', arguments);
            startapp.check(packageName, function (checksuccess) {
                exec(success, error, 'CoocaaOSApi', 'createDownloadTask', [{ 'url': downloadurl }, { 'md5': md5 }, { 'title': title }, { 'pkg': packageName }, { 'appid': appID }, { 'icon': iconUrl }]);
            }, function (checkerror) {
                console.log(checkerror);
                exec(success, error, 'CoocaaOSApi', 'createDownloadTask', [{ 'url': downloadurl }, { 'md5': md5 }, { 'title': title }, { 'pkg': packageName }, { 'appid': appID }, { 'icon': iconUrl }]);
            });
        }
        CoocaaOSApi.prototype.resumeDownloadTask = function (taskid, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.resumeDownloadTask', arguments);
            exec(success, error, 'CoocaaOSApi', 'resumeDownloadTask', [{
                'taskid': taskid
            }]);
        }
        CoocaaOSApi.prototype.pauseDownloadTask = function (taskid, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.pauseDownloadTask', arguments);
            exec(success, error, 'CoocaaOSApi', 'pauseDownloadTask', [{
                'taskid': taskid
            }]);
        }
        CoocaaOSApi.prototype.deleteDownloadTask = function (taskid, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.deleteDownloadTask', arguments);
            exec(success, error, 'CoocaaOSApi', 'deleteDownloadTask', [{
                'taskid': taskid
            }]);
        }
        CoocaaOSApi.prototype.hasCoocaaUserLogin = function (success, error) {
            if (debug.getPCMode()) {
                success(debug.getCoocaaUserLoginStatus());
                return true;
            }
            argscheck.checkArgs('ff', 'CoocaaOSApi.hasCoocaaUserLogin', arguments);
            exec(success, error, 'CoocaaOSApi', 'hasCoocaaUserLogin', []);
        }
        CoocaaOSApi.prototype.startThirdQQAccount = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startThirdQQAccount', arguments);
            exec(success, error, 'CoocaaOSApi', 'startQQAccount', []);
        }
        CoocaaOSApi.prototype.getUserInfo = function (success, error) {
            if (debug.getPCMode()) {
                success(debug.getUserInfo());
                return true;
            }
            argscheck.checkArgs('ff', 'CoocaaOSApi.getUserInfo', arguments);
            exec(success, error, 'CoocaaOSApi', 'getUserInfo', []);
        }
        CoocaaOSApi.prototype.getDeviceInfo = function (success, error) {
            if (debug.getPCMode()) {
                success(debug.getDeviceInfo());
                return true;
            }
            argscheck.checkArgs('ff', 'CoocaaOSApi.getDeviceInfo', arguments);
            exec(success, error, 'CoocaaOSApi', 'getDeviceInfo', []);
        }
        CoocaaOSApi.prototype.isNetConnected = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.isNetConnected', arguments);
            exec(success, error, 'CoocaaOSApi', 'isNetConnected', []);
        }
        CoocaaOSApi.prototype.getNetType = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.getNetType', arguments);
            exec(success, error, 'CoocaaOSApi', 'getNetType', []);
        }
        CoocaaOSApi.prototype.getIpInfo = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.getIpAddress', arguments);
            exec(success, error, 'CoocaaOSApi', 'getIpInfo', []);
        }
        CoocaaOSApi.prototype.getDeviceLocation = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.getDeviceLocation', arguments);
            exec(success, error, 'CoocaaOSApi', 'getDeviceLocation', []);
        }
        CoocaaOSApi.prototype.addNetChangedListener = function (listener) {
            argscheck.checkArgs('f', 'CoocaaOSApi.addNetChangedListener', arguments);
            brocaster.addEventListener("NET_CHANGGED", listener);
        }
        CoocaaOSApi.prototype.removeNetChangedListener = function (listener) {
            argscheck.checkArgs('f', 'CoocaaOSApi.removeNetChangedListener', arguments);
            brocaster.removeEventListener("NET_CHANGGED", listener);
        }
        CoocaaOSApi.prototype.addUSBChangedListener = function (listener) {
            argscheck.checkArgs('f', 'CoocaaOSApi.addUSBChangedListener', arguments);
            brocaster.addEventListener("USB_CHANGGED", listener);
        }
        CoocaaOSApi.prototype.removeUSBChangedListener = function (listener) {
            argscheck.checkArgs('f', 'CoocaaOSApi.removeUSBChangedListener', arguments);
            brocaster.removeEventListener("USB_CHANGGED", listener);
        }
        CoocaaOSApi.prototype.addAppTaskListener = function (listener) {
            argscheck.checkArgs('f', 'CoocaaOSApi.addAppTaskListener', arguments);
            brocaster.addEventListener("APP_TASK_CALLBACK", listener);
        }
        CoocaaOSApi.prototype.removeAppTaskListener = function (listener) {
            argscheck.checkArgs('f', 'CoocaaOSApi.removeAppTaskListener', arguments);
            brocaster.removeEventListener("APP_TASK_CALLBACK", listener);
        }
        CoocaaOSApi.prototype.addUserChanggedListener = function (listener) {
            argscheck.checkArgs('f', 'CoocaaOSApi.addUserChanggedListener', arguments);
            brocaster.addEventListener("USER_CHANGGED", listener);
        }
        CoocaaOSApi.prototype.removeUserChanggedListener = function (listener) {
            argscheck.checkArgs('f', 'CoocaaOSApi.removeUserChanggedListener', arguments);
            brocaster.removeEventListener("USER_CHANGGED", listener);
        }
        CoocaaOSApi.prototype.addPurchaseOrderListener = function (listener) {
            argscheck.checkArgs('f', 'CoocaaOSApi.addPurchaseOrderListener', arguments);
            brocaster.addEventListener("PURCHASE_CALLBACK", listener);
        }
        CoocaaOSApi.prototype.removePurchaseOrderListener = function (listener) {
            argscheck.checkArgs('f', 'CoocaaOSApi.removePurchaseOrderListener', arguments);
            brocaster.removeEventListener("PURCHASE_CALLBACK", listener);
        }
        CoocaaOSApi.prototype.purchaseOrder = function (appcode, tradeid, productname, productsubname, producttype, specialtype, amount, count, imgurl, spec, success, error) {
            argscheck.checkArgs('sssssonnssff', 'CoocaaOSApi.purchaseOrder', arguments);
            exec(success, error, 'CoocaaOSApi', 'purchaseOrder', [{
                'appcode': appcode
            }, {
                'tradeid': tradeid
            }, {
                'productname': productname
            }, {
                'productsubname': productsubname
            }, {
                'producttype': producttype
            }, {
                'specialtype': specialtype
            }, {
                'amount': amount
            }, {
                'count': count
            }, {
                'imgurl': imgurl
            }, {
                'spec': spec
            }]);
        }
        // 启动集成到webSDK内部的支付页面, 即2.2.3（含）"versionCode">=2020003以上使用
        CoocaaOSApi.prototype.purchaseOrder2 = function (appcode, Tradeid, ProductName, SpecialType, amount, ProductType, payAction, cmd, token, tel, success, error) {
            argscheck.checkArgs('ssssnsssssff', 'CoocaaOSApi.purchaseOrder', arguments);
            exec(success, error, 'CoocaaOSApi', 'purchaseOrder', [{ 'appcode': appcode }, { 'Tradeid': Tradeid }, { 'ProductName': ProductName }, { 'SpecialType': SpecialType }, { 'amount': amount }, { 'ProductType': ProductType }, { 'payAction': payAction }, { 'cmd': cmd }, { 'token': token }, { 'tel': tel }]);
        }
        // 启动影视支付（用于自动续费）
        CoocaaOSApi.prototype.startMoviePay = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startMoviePay', arguments);
            startapp.start([
                ["action", "coocaa.intent.movie.pay"],
                [{
                    "cmd": "login"
                }]
            ], success, error);
        }
        CoocaaOSApi.prototype.getMoviePlatformInfo = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.getMoviePlatformInfo', arguments);
            exec(success, error, 'CoocaaOSApi', 'getMoviePlatformInfo', []);
        }
        CoocaaOSApi.prototype.getCurTheme = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.getCurTheme', arguments);
            exec(success, error, 'CoocaaOSApi', 'getCurTheme', []);
        }
        CoocaaOSApi.prototype.getWebViewSDKInfo = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.getWebViewSDKInfo', arguments);
            exec(success, error, 'CoocaaOSApi', 'getWebViewSDKInfo', []);
        }
        CoocaaOSApi.prototype.getAppStoreInfo = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.getAppStoreInfo', arguments);
            exec(success, error, 'CoocaaOSApi', 'getAppStoreInfo', []);
        }
        CoocaaOSApi.prototype.setFocusPosition = function (focuspositioninfo, success, error) {
            console.log("lxw in coocaaOsApi" + focuspositioninfo);
            argscheck.checkArgs('sff', 'CoocaaOSApi.setFocusPosition', arguments);
            exec(success, error, 'CoocaaOSApi', 'setFocusPosition', [{
                'focusposition': focuspositioninfo
            }]);
        }
        CoocaaOSApi.prototype.notifyJSMessage = function (mywebinfo, success, error) {
            console.log("lxw in coocaaOsApi " + mywebinfo);
            argscheck.checkArgs('sff', 'CoocaaOSApi.notifyJSMessage', arguments);
            exec(success, error, 'CoocaaOSApi', 'notifyJSMessage', [{
                'webInfo': mywebinfo
            }]);
        }
        //页面启动eventId = page_onResume              map:{"title":""}
        //页面退出eventId = page_onPause               map:{"title":""}两者title必须保持一致，不可缺省
        CoocaaOSApi.prototype.notifyJSLogInfo = function (eventId, ddata, success, error) {
            // console.log("sent------------" + eventId + "-------------" + ddata);
            argscheck.checkArgs('ssff', 'CoocaaOSApi.notifyJSLogInfo', arguments);
            exec(success, error, 'CoocaaOSApi', 'notifyJSLogInfo', [{
                'eventId': eventId
            }, {
                'params': ddata
            }]);
        }
        // 启动酷开商城首页
        CoocaaOSApi.prototype.startAppShop = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startAppShop', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.MALL_HOME"]
            ], success, error);
        }
        // 启动酷开商城列表页
        CoocaaOSApi.prototype.startAppShopList = function (id, title, success, error) {
            argscheck.checkArgs('ssff', 'CoocaaOSApi.startAppShopList', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.MALL_LIST"],
                [{
                    "id": id
                }, {
                    "title": title
                }]
            ], success, error);
        }
        // 启动购物图文详情页
        CoocaaOSApi.prototype.startAppShopDetail = function (id, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startAppShopDetail', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.MALL_DETAIL"],
                [{
                    "id": id
                }]
            ], success, error);
        }
        // 启动酷开商城专题页
        CoocaaOSApi.prototype.startAppShopZone = function (id, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startAppShopZone', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.MALL_ZONE"],
                [{
                    "id": id
                }]
            ], success, error);
        }
        CoocaaOSApi.prototype.startAppShopZone2 = function (id, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startAppShopZone2', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.MALL_LIST_ZONE"],
                [{
                    "pageId": id
                }]
            ], success, error);
        }
        // 启动酷开商城专题列表页
        CoocaaOSApi.prototype.startAppShopZoneList = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.startAppShopZoneList', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.MALL_ZONE_LIST"]
            ], success, error);
        }
        // 启动酷开商城视频详情页
        CoocaaOSApi.prototype.startAppShopVideo = function (id, url, name, success, error) {
            argscheck.checkArgs('sssff', 'CoocaaOSApi.startAppShopVideo', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.MALL_VIDEO"],
                [{
                    "id": id
                }, {
                    "url": url
                }, {
                    "name": name
                }]
            ], success, error);
        }
        // 启动购物酷开商城活动列表页
        CoocaaOSApi.prototype.startAppShopBUYING = function (id, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startAppShopBUYING', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.MALL_BUYING"],
                [{
                    "id": id
                }]
            ], success, error);
        }
        // 启动影视内部webview
        CoocaaOSApi.prototype.startMovieWebview = function (url, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startMovieWebview', arguments);
            startapp.start([
                ["action", "coocaa.intent.movie.webview"],
                [{
                    "url": url
                }]
            ], success, error);
        }
        // 启动影视内部web页面
        CoocaaOSApi.prototype.startMovieWebviewInsert = function (url, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startMovieWebviewInsert', arguments);
            startapp.start([
                ["action", "coocaa.intent.movie.webview"],
                [{
                    "url": url
                }]
            ], success, error);
        }
        // 启动影视一级页面
        CoocaaOSApi.prototype.startMovieWebviewOnePage = function (url, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startMovieWebviewOnePage', arguments);
            startapp.start([
                ["action", "coocaa.intent.vip.center"],
                [{
                    "url": url
                }]
            ], success, error);
        }
        // 启动影视二级页面
        CoocaaOSApi.prototype.startMovieWebviewTwoPage = function (url, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startMovieWebviewTwoPage', arguments);
            startapp.start([
                ["action", "coocaa.intent.vip.center.second"],
                [{
                    "url": url
                }]
            ], success, error);
        }
        CoocaaOSApi.prototype.startMovieSomePage = function (detailid, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startMovieDetail', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.HOME_SPECIAL_TOPIC"],
                [{
                    "id": detailid
                }]
            ], success, error);
        }
        // 启动CIBN聚体育
        CoocaaOSApi.prototype.startCIBN = function (third_pid, from_internal, success, error) {
            argscheck.checkArgs('ssff', 'CoocaaOSApi.startCIBN', arguments);
            startapp.check("com.pptv.tvsports", function (checksuccess) {
                console.log("checksuccess = " + checksuccess);
                startapp.start([
                    ["action", "android.intent.action.VIEW", "com.pptv.tvsports", " ", "pptv_tvsports://tvsports_vip_duration?third_pid=5&from_internal=1"]
                ], success, error);
            }, function (checkerror) {
                console.log("checkerror = " + checkerror);
                startapp.start([
                    ["action", "android.intent.action.VIEW", "com.pptv.tvsports", " ", "pptv_tvsports://tvsports_vip_duration?third_pid=5&from_internal=1"]
                ], success, error);
            });
        }
        CoocaaOSApi.prototype.startAllCoupon = function (sign, openId, appId, businessLine, businessType, success, error) {
            argscheck.checkArgs('sssssff', 'CoocaaOSApi.startAllCoupon', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.ALLCOUPON"],
                [{ "sign": sign }, { "openId": openId }, { "appId": appId }, { "businessLine": businessLine }, { "business_type": businessType }]
            ], success, error);
        }
        CoocaaOSApi.prototype.startMyCoupon = function (sign, openId, appId, businessLine, businessType, success, error) {
            argscheck.checkArgs('sssssff', 'CoocaaOSApi.startAllCoupon', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.MYCOUPON"],
                [{ "sign": sign }, { "openId": openId }, { "appId": appId }, { "businessLine": businessLine }, { "business_type": businessType }]
            ], success, error);
        }
        CoocaaOSApi.prototype.getPropertiesValue = function (data, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.getPropertiesValue', arguments);
            exec(success, error, 'CoocaaOSApi', 'getPropertiesValue', [{
                'propertiesKey': data
            }]);
        }
        CoocaaOSApi.prototype.getSpaceInfo = function (success, error) {
            console.log("getTotalSpace   in   coocaajs")
            argscheck.checkArgs('ff', 'CoocaaOSApi.getSpaceInfo', arguments);
            exec(success, error, 'CoocaaOSApi', 'getSpaceInfo', []);
        }
        CoocaaOSApi.prototype.addCommonListener = function (listener) {
            argscheck.checkArgs('f', 'CoocaaOSApi.addCommonListener', arguments);
            brocaster.addEventListener("COMMON_CHANGED", listener);
        }
        CoocaaOSApi.prototype.removeCommonListener = function (listener) {
            argscheck.checkArgs('f', 'CoocaaOSApi.removeCommonListener', arguments);
            brocaster.removeEventListener("COMMON_CHANGED", listener);
        }
        // 启动通用action
        CoocaaOSApi.prototype.startCommonAction = function (action, params, success, error) {
            argscheck.checkArgs('ssff', 'CoocaaOSApi.startCommonAction', arguments);
            var newParams = JSON.parse(params);
            exec(success, error, 'CoocaaOSApi', action, newParams);
        }
        // 启动web播放器
        CoocaaOSApi.prototype.startCommonWebview = function (id, uri, tips, height, width, call_url, type, name, success, error) {
            console.log("启动播放器")
            argscheck.checkArgs('ssssssssff', 'CoocaaOSApi.startCommonWebview', arguments);
            startapp.start([
                ["action", "app_browser.intent.action.PLAYER", "com.coocaa.app_browser"],
                [{ "extra.id": id }, { "extra.uri": uri }, { "extra.tips": tips }, { "extra.height": height }, { "extra.width": width }, { "extra.http_call_url": call_url }, { "extra.type": type }, { "extra.name": name }]
            ], success, error);
        }
        CoocaaOSApi.prototype.startNewBrowser = function (url, success, error) {
            console.log("启动新版浏览器")
            argscheck.checkArgs('sff', 'CoocaaOSApi.startNewBrowser', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.browser", "com.coocaa.app_browser"],
                [{ "url": url }]
            ], success, error);
        }
        CoocaaOSApi.prototype.startNewBrowser2 = function (url, success, error) {
            console.log("启动新版浏览器")
            argscheck.checkArgs('sff', 'CoocaaOSApi.startNewBrowser', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.browser.no_trans", "com.coocaa.app_browser"],
                [{ "url": url }]
            ], success, error);
        }
        CoocaaOSApi.prototype.startNewBrowser3 = function (url, success, error) {
            console.log("启动新版浏览器")
            argscheck.checkArgs('sff', 'CoocaaOSApi.startNewBrowser', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.browser.no_route", "com.coocaa.app_browser"],
                [{ "url": url }]
            ], success, error);
        }
        CoocaaOSApi.prototype.startNewBrowser4 = function (url, success, error) {
            console.log("启动新版浏览器")
            argscheck.checkArgs('sff', 'CoocaaOSApi.startNewBrowser', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.browser.no_trans.no_route", "com.coocaa.app_browser"],
                [{ "url": url }]
            ], success, error);
        }
        CoocaaOSApi.prototype.startNewBrowser5 = function (url, success, error) {
            console.log("启动新版浏览器")
            argscheck.checkArgs('sff', 'CoocaaOSApi.startNewBrowser', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.browser.theme_bg", "com.coocaa.app_browser"],
                [{ "url": url }]
            ], success, error);
        }
        CoocaaOSApi.prototype.notifyJSLogResumeInfo = function (eventId, ddata, success, error) {
            console.log("resume===============")
            argscheck.checkArgs('ssff', 'CoocaaOSApi.notifyJSLogResumeInfo', arguments);
            exec(success, error, 'CoocaaOSApi', 'notifyJSLogInfoExtra', [{ 'eventId': eventId }, { 'params': ddata }, { 'type': 'resume' }]);
        }
        CoocaaOSApi.prototype.notifyJSLogPauseInfo = function (eventId, success, error) {
            console.log("pause===============")
            argscheck.checkArgs('sff', 'CoocaaOSApi.notifyJSLogPauseInfo', arguments);
            exec(success, error, 'CoocaaOSApi', 'notifyJSLogInfoExtra', [{ 'eventId': eventId }, { 'params': '{}' }, { 'type': 'pause' }]);
        }
        CoocaaOSApi.prototype.hasApk = function (pkg, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.hasApk', arguments);
            startapp.check(pkg, success, error);
        }
        // 退出用户登录状态
        CoocaaOSApi.prototype.setCoocaaUserLogout = function (success, error) {
            argscheck.checkArgs('ff', 'CoocaaOSApi.setCoocaaUserLogout', arguments);
            exec(success, error, 'CoocaaOSApi', 'setCoocaaUserLogout', []);
        }
        CoocaaOSApi.prototype.getMemInfo = function (success, error) {
            console.log("getMemInfo   in   coocaajs")
            argscheck.checkArgs('ff', 'CoocaaOSApi.getMemInfo', arguments);
            exec(success, error, 'CoocaaOSApi', 'getMemInfo', []);
        }
        // 参数传递一个对象，key为"pkgList",value为应用包名的数组。即{pkgList:["com.tianci.user","com.tianci.movieplatform"]}
        CoocaaOSApi.prototype.getAppInfo = function (packageName, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.getAppInfo', arguments);
            exec(success, error, 'CoocaaOSApi', 'getAppInfo', [{ 'pkgList': packageName }]);
        }
        // 参数传递一个对象，key为"pkgList",value为应用包名的数组。即{pkgList:["com.tianci.user","com.tianci.movieplatform"]}
        CoocaaOSApi.prototype.getPushInfo = function (packageName, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.getPushInfo', arguments);
            exec(success, error, 'CoocaaOSApi', 'getPushInfo', [{ 'pkgList': packageName }]);
        }
        // 获取基础信息
        CoocaaOSApi.prototype.getBaseInfo = function (success, error) {
            console.log("getBaseInfo   in   coocaajs")
            argscheck.checkArgs('ff', 'CoocaaOSApi.getBaseInfo', arguments);
            exec(success, error, 'CoocaaOSApi', 'getBaseInfo', []);
        }
        // 获取Business相关信息
        CoocaaOSApi.prototype.getBusinessData = function (cc_type, cc_data, success, error) {
            argscheck.checkArgs('ssff', 'CoocaaOSApi.getBusinessData', arguments);
            exec(success, error, 'CoocaaOSApi', 'getBusinessData', [{ 'cc_data': cc_data }, { 'cc_type': cc_type }]);
        }
        // cc_type区分同步、异步。默认为异步（async）,只有传sync时才会更改
        CoocaaOSApi.prototype.setBusinessData = function (cc_type, cc_data, success, error) {
            argscheck.checkArgs('ssff', 'CoocaaOSApi.setBusinessData', arguments);
            exec(success, error, 'CoocaaOSApi', 'setBusinessData', [{ 'cc_data': cc_data }, { 'cc_type': cc_type }]);
        }
        // 启动传参action, 包名、版本号、startActivity、action、action名、拓展参数[{key1:"value1"},{key2:"value2"}]
        CoocaaOSApi.prototype.startParamAction = function (pkname, version, activity, action, param, str, success, error) {
            console.log("启动传参action")
            argscheck.checkArgs('ssssssff', 'CoocaaOSApi.startParamAction', arguments);
            str = JSON.parse(str);
            startapp.start([
                ["action", param, pkname], str
            ], success, error);
        }
        // 拓展参数[{key1:"value1"},{key2:"value2"}]
        // 用activity方式启动：1,2传参为包名、类名；3、4、5为空；
        // 用其他方式启动，1传参"action",2\3\4\5可选---2action名、5uri地址
        CoocaaOSApi.prototype.startCommonNormalAction = function (param1, param2, param3, param4, param5, str, success, error) {
            console.log("启动传参action")
            argscheck.checkArgs('ssssssff', 'CoocaaOSApi.startCommonNormalAction', arguments);
            startapp.start([
                ["action", "android.intent.action.VIEW", "", "", "wit://cn.cheerz.icw/MainActivity"],
                [{ "subpage": "1" }, { "type": "3" }]
            ], success, error);
        }
        // web页面判断是否放开上下键需求
        CoocaaOSApi.prototype.setSpecialMachine = function (machineList, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.setSpecialMachine', arguments);
            exec(success, error, 'CoocaaOSApi', 'setSpecialMachine', [{ 'machineList': machineList }]);
        }
        //启动主页指定tab
        // 1、如果系统是6.x的，action是coocaa.intent.action.HOME
        // 2、如果系统是5.x的，需要判断一下persist.service.homepage.pkg这个prop，如果值是com.tianci.movieplatform，那么action是coocaa.intent.action.HOME.Translucent  否则 action就是coocaa.intent.movie.home
        // 3、跳转到指定tab上，intent附带参数，key是jumpToPage 值是tab的id，由运营提供
        CoocaaOSApi.prototype.startHomeTab = function (actionName, tabid, success, error) {
            argscheck.checkArgs('ssff', 'CoocaaOSApi.startHomeTab', arguments);
            startapp.start([
                ["action", actionName],
                [{ 'jumpToPage': tabid }]
            ], success, error);
        }
        // 启动主页专题
        CoocaaOSApi.prototype.startHomeCommonList = function (id, success, error) {
            argscheck.checkArgs('sff', 'CoocaaOSApi.startHomeCommonList', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.HOME_COMMON_LIST"],
                [{ 'id': id }]
            ], success, error);
        }
        // 启动红包游戏
        CoocaaOSApi.prototype.startRedGame = function (chance, userKeyId, success, error) {
            argscheck.checkArgs('ssff', 'CoocaaOSApi.startRedGame', arguments);
            startapp.start([
                ["action", "coocaa.intent.action.ie.games.2018D11", "com.coocaa.ie"],
                [{ chance: chance }, { userKeyId: userKeyId }]
            ], success, error);
        }
        // 获取广告数据【图文广告传appid+game_id,game_scene,game_panel,game_position】【视频广告传appid+activity_id,task_id,】
        CoocaaOSApi.prototype.getAdData = function (appid, game_id, game_scene, game_panel, game_position, activity_id, task_id, success, error) {
            argscheck.checkArgs('sssssssff', 'CoocaaOSApi.getAdData', arguments);
            exec(success, error, 'CoocaaOSApi', 'callAdBusiness', [{ 'action': 'getAdData' }, { 'appid': appid, 'params': { 'game_id': game_id, 'game_scene': game_scene, 'game_panel': game_panel, 'game_position': game_position, 'activity_id': activity_id, 'task_id': task_id } }]);
        }
        // 提交内部广告数据
        CoocaaOSApi.prototype.submitAdData = function (ad_base_info, game_id, game_scene, game_panel, game_position, activity_id, task_id, result, success, error) {
            argscheck.checkArgs('ssssssssff', 'CoocaaOSApi.submitAdData', arguments);
            exec(success, error, 'CoocaaOSApi', 'callAdBusiness', [{ 'action': 'submitCoocaaData' }, { 'baseinfo': ad_base_info, 'eventid': 'ad_show', 'params': { 'game_id': game_id, 'game_scene': game_scene, 'game_panel': game_panel, 'game_position': game_position, 'activity_id': activity_id, 'task_id': task_id, 'result': result } }]);
        }
        // 提交第三方广告数据
        CoocaaOSApi.prototype.submitThirdAdData = function (url, scheduleId, orderId, adSpaceId, success, error) {
            argscheck.checkArgs('ssssff', 'CoocaaOSApi.submitThirdAdData', arguments);
            var trackUrl = JSON.parse(url);
            exec(success, error, 'CoocaaOSApi', 'callAdBusiness', [{ 'action': 'submitThirdData' }, { 'scheduleId': scheduleId, 'orderId': orderId, 'adSpaceId': adSpaceId }, { 'trackUrl': trackUrl }]);
        }
        // 启动小程序应用
        CoocaaOSApi.prototype.startAppX2 = function (uri, preload, success, error) {
            argscheck.checkArgs('ssff', 'CoocaaOSApi.startAppX2', arguments);
            if (preload == "true") {
                startapp.start([["action", "appx.intent.launcher.Start"], [{ 'uri': uri, 'pre_load': true }]], success, error);
            }
            else {
                startapp.start([["action", "appx.intent.launcher.Start"], [{ 'uri': uri, 'pre_load': false }]], success, error);
            }
        }
        // 启动Intent跳转
        CoocaaOSApi.prototype.startIntent = function (downloadPkgName, finishAction, uri, success, error) {
            argscheck.checkArgs('sssff', 'CoocaaOSApi.startIntent', arguments);
            startapp.start([["action", "coocaa.intent.action.SMART_DETAIL"], [{ 'pkg': downloadPkgName, 'from': 'web' }], ['eIntent', 'action', finishAction, { 'uri': uri, 'pre_load': false }]], success, error);
        }

        module.exports = new CoocaaOSApi();
    });

    window.cordova = require('cordova');

    require('cordova/init');

    var coocaaosapi = require('com.coocaaosapi');

    window.ccApp = coocaaosapi;

    ccApp.deviceReady = function (cb) {
        console.log('[DEBUG] 注册deviceReady事件监听');
        if (typeof cb !== "function") return;
        document.addEventListener("deviceready", cb, false);
    }

    ccApp.bindEvent = function (event, cb) {
        document.addEventListener(event, cb, false);
    }

})(typeof window !== "undefined" ? window : this);

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
		console.log('keydownHandler keyCode = ' + ev.keyCode)

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
