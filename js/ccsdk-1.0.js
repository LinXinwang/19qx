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
                var backButtonDownChannel = cordova.addDocumentEventHandler('backbuttondown');
                backButtonDownChannel.onHasSubscribersChange = function () {
                    // 如果我们刚刚附加了第一个处理程序或分离了最后一个处理程序，请让本机知道我们需要重写back按钮。
                    exec(null, null, APP_PLUGIN_NAME, "overrideBackbuttondown", [this.numHandlers == 1]);
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
            overrideBackbuttondown: function (override) {
                exec(null, null, APP_PLUGIN_NAME, "overrideBackbuttondown", [override]);
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
        // CoocaaOSApi.prototype.startParamAction = function (pkname, version, activity, action, param, str, success, error) {
        //     console.log("启动传参action")
        //     argscheck.checkArgs('ssssssff', 'CoocaaOSApi.startParamAction', arguments);
        //     str = JSON.parse(str);
        //     startapp.start([
        //         ["action", param, pkname], str
        //     ], success, error);
        // }

        CoocaaOSApi.prototype.startParamAction = function(bywhat, byvalue, sources, success, error) {
            console.log(typeof sources);
            argscheck.checkArgs('sssff', 'CoocaaOSApi.startParamAction', arguments);
            sources = JSON.parse(sources);
            console.log(typeof sources);
            startapp.start([[bywhat, byvalue], sources], success, error);
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

})(typeof window !== "undefined" ? window : this); //important!