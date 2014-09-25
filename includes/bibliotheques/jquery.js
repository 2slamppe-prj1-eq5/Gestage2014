/*
 * jQuery 1.2.3 - New Wave Javascript
 *
 * Copyright (c) 2008 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008-02-06 00:21:25 -0500 (Wed, 06 Feb 2008) $
 * $Rev: 4663 $
 */
(function() {
    if (window.jQuery)
        var _jQuery = window.jQuery;
    var jQuery = window.jQuery = function(selector, context) {
        return new jQuery.prototype.init(selector, context);
    };
    if (window.$)
        var _$ = window.$;
    window.$ = jQuery;
    var quickExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;
    var isSimple = /^.[^:#\[\.]*$/;
    jQuery.fn = jQuery.prototype = {init: function(selector, context) {
            selector = selector || document;
            if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;
            } else if (typeof selector == "string") {
                var match = quickExpr.exec(selector);
                if (match && (match[1] || !context)) {
                    if (match[1])
                        selector = jQuery.clean([match[1]], context);
                    else {
                        var elem = document.getElementById(match[3]);
                        if (elem)
                            if (elem.id != match[3])
                                return jQuery().find(selector);
                            else {
                                this[0] = elem;
                                this.length = 1;
                                return this;
                            }
                        else
                            selector = [];
                    }
                } else
                    return new jQuery(context).find(selector);
            } else if (jQuery.isFunction(selector))
                return new jQuery(document)[jQuery.fn.ready ? "ready" : "load"](selector);
            return this.setArray(selector.constructor == Array && selector || (selector.jquery || selector.length && selector != window && !selector.nodeType && selector[0] != undefined && selector[0].nodeType) && jQuery.makeArray(selector) || [selector]);
        }, jquery: "1.2.3", size: function() {
            return this.length;
        }, length: 0, get: function(num) {
            return num == undefined ? jQuery.makeArray(this) : this[num];
        }, pushStack: function(elems) {
            var ret = jQuery(elems);
            ret.prevObject = this;
            return ret;
        }, setArray: function(elems) {
            this.length = 0;
            Array.prototype.push.apply(this, elems);
            return this;
        }, each: function(callback, args) {
            return jQuery.each(this, callback, args);
        }, index: function(elem) {
            var ret = -1;
            this.each(function(i) {
                if (this == elem)
                    ret = i;
            });
            return ret;
        }, attr: function(name, value, type) {
            var options = name;
            if (name.constructor == String)
                if (value == undefined)
                    return this.length && jQuery[type || "attr"](this[0], name) || undefined;
                else {
                    options = {};
                    options[name] = value;
                }
            return this.each(function(i) {
                for (name in options)
                    jQuery.attr(type ? this.style : this, name, jQuery.prop(this, options[name], type, i, name));
            });
        }, css: function(key, value) {
            if ((key == 'width' || key == 'height') && parseFloat(value) < 0)
                value = undefined;
            return this.attr(key, value, "curCSS");
        }, text: function(text) {
            if (typeof text != "object" && text != null)
                return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(text));
            var ret = "";
            jQuery.each(text || this, function() {
                jQuery.each(this.childNodes, function() {
                    if (this.nodeType != 8)
                        ret += this.nodeType != 1 ? this.nodeValue : jQuery.fn.text([this]);
                });
            });
            return ret;
        }, wrapAll: function(html) {
            if (this[0])
                jQuery(html, this[0].ownerDocument).clone().insertBefore(this[0]).map(function() {
                    var elem = this;
                    while (elem.firstChild)
                        elem = elem.firstChild;
                    return elem;
                }).append(this);
            return this;
        }, wrapInner: function(html) {
            return this.each(function() {
                jQuery(this).contents().wrapAll(html);
            });
        }, wrap: function(html) {
            return this.each(function() {
                jQuery(this).wrapAll(html);
            });
        }, append: function() {
            return this.domManip(arguments, true, false, function(elem) {
                if (this.nodeType == 1)
                    this.appendChild(elem);
            });
        }, prepend: function() {
            return this.domManip(arguments, true, true, function(elem) {
                if (this.nodeType == 1)
                    this.insertBefore(elem, this.firstChild);
            });
        }, before: function() {
            return this.domManip(arguments, false, false, function(elem) {
                this.parentNode.insertBefore(elem, this);
            });
        }, after: function() {
            return this.domManip(arguments, false, true, function(elem) {
                this.parentNode.insertBefore(elem, this.nextSibling);
            });
        }, end: function() {
            return this.prevObject || jQuery([]);
        }, find: function(selector) {
            var elems = jQuery.map(this, function(elem) {
                return jQuery.find(selector, elem);
            });
            return this.pushStack(/[^+>] [^+>]/.test(selector) || selector.indexOf("..") > -1 ? jQuery.unique(elems) : elems);
        }, clone: function(events) {
            var ret = this.map(function() {
                if (jQuery.browser.msie && !jQuery.isXMLDoc(this)) {
                    var clone = this.cloneNode(true), container = document.createElement("div");
                    container.appendChild(clone);
                    return jQuery.clean([container.innerHTML])[0];
                } else
                    return this.cloneNode(true);
            });
            var clone = ret.find("*").andSelf().each(function() {
                if (this[expando] != undefined)
                    this[expando] = null;
            });
            if (events === true)
                this.find("*").andSelf().each(function(i) {
                    if (this.nodeType == 3)
                        return;
                    var events = jQuery.data(this, "events");
                    for (var type in events)
                        for (var handler in events[type])
                            jQuery.event.add(clone[i], type, events[type][handler], events[type][handler].data);
                });
            return ret;
        }, filter: function(selector) {
            return this.pushStack(jQuery.isFunction(selector) && jQuery.grep(this, function(elem, i) {
                return selector.call(elem, i);
            }) || jQuery.multiFilter(selector, this));
        }, not: function(selector) {
            if (selector.constructor == String)
                if (isSimple.test(selector))
                    return this.pushStack(jQuery.multiFilter(selector, this, true));
                else
                    selector = jQuery.multiFilter(selector, this);
            var isArrayLike = selector.length && selector[selector.length - 1] !== undefined && !selector.nodeType;
            return this.filter(function() {
                return isArrayLike ? jQuery.inArray(this, selector) < 0 : this != selector;
            });
        }, add: function(selector) {
            return!selector ? this : this.pushStack(jQuery.merge(this.get(), selector.constructor == String ? jQuery(selector).get() : selector.length != undefined && (!selector.nodeName || jQuery.nodeName(selector, "form")) ? selector : [selector]));
        }, is: function(selector) {
            return selector ? jQuery.multiFilter(selector, this).length > 0 : false;
        }, hasClass: function(selector) {
            return this.is("." + selector);
        }, val: function(value) {
            if (value == undefined) {
                if (this.length) {
                    var elem = this[0];
                    if (jQuery.nodeName(elem, "select")) {
                        var index = elem.selectedIndex, values = [], options = elem.options, one = elem.type == "select-one";
                        if (index < 0)
                            return null;
                        for (var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++) {
                            var option = options[i];
                            if (option.selected) {
                                value = jQuery.browser.msie && !option.attributes.value.specified ? option.text : option.value;
                                if (one)
                                    return value;
                                values.push(value);
                            }
                        }
                        return values;
                    } else
                        return(this[0].value || "").replace(/\r/g, "");
                }
                return undefined;
            }
            return this.each(function() {
                if (this.nodeType != 1)
                    return;
                if (value.constructor == Array && /radio|checkbox/.test(this.type))
                    this.checked = (jQuery.inArray(this.value, value) >= 0 || jQuery.inArray(this.name, value) >= 0);
                else if (jQuery.nodeName(this, "select")) {
                    var values = value.constructor == Array ? value : [value];
                    jQuery("option", this).each(function() {
                        this.selected = (jQuery.inArray(this.value, values) >= 0 || jQuery.inArray(this.text, values) >= 0);
                    });
                    if (!values.length)
                        this.selectedIndex = -1;
                } else
                    this.value = value;
            });
        }, html: function(value) {
            return value == undefined ? (this.length ? this[0].innerHTML : null) : this.empty().append(value);
        }, replaceWith: function(value) {
            return this.after(value).remove();
        }, eq: function(i) {
            return this.slice(i, i + 1);
        }, slice: function() {
            return this.pushStack(Array.prototype.slice.apply(this, arguments));
        }, map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        }, andSelf: function() {
            return this.add(this.prevObject);
        }, data: function(key, value) {
            var parts = key.split(".");
            parts[1] = parts[1] ? "." + parts[1] : "";
            if (value == null) {
                var data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);
                if (data == undefined && this.length)
                    data = jQuery.data(this[0], key);
                return data == null && parts[1] ? this.data(parts[0]) : data;
            } else
                return this.trigger("setData" + parts[1] + "!", [parts[0], value]).each(function() {
                    jQuery.data(this, key, value);
                });
        }, removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }, domManip: function(args, table, reverse, callback) {
            var clone = this.length > 1, elems;
            return this.each(function() {
                if (!elems) {
                    elems = jQuery.clean(args, this.ownerDocument);
                    if (reverse)
                        elems.reverse();
                }
                var obj = this;
                if (table && jQuery.nodeName(this, "table") && jQuery.nodeName(elems[0], "tr"))
                    obj = this.getElementsByTagName("tbody")[0] || this.appendChild(this.ownerDocument.createElement("tbody"));
                var scripts = jQuery([]);
                jQuery.each(elems, function() {
                    var elem = clone ? jQuery(this).clone(true)[0] : this;
                    if (jQuery.nodeName(elem, "script")) {
                        scripts = scripts.add(elem);
                    } else {
                        if (elem.nodeType == 1)
                            scripts = scripts.add(jQuery("script", elem).remove());
                        callback.call(obj, elem);
                    }
                });
                scripts.each(evalScript);
            });
        }};
    jQuery.prototype.init.prototype = jQuery.prototype;
    function evalScript(i, elem) {
        if (elem.src)
            jQuery.ajax({url: elem.src, async: false, dataType: "script"});
        else
            jQuery.globalEval(elem.text || elem.textContent || elem.innerHTML || "");
        if (elem.parentNode)
            elem.parentNode.removeChild(elem);
    }
    jQuery.extend = jQuery.fn.extend = function() {
        var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;
        if (target.constructor == Boolean) {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target != "object" && typeof target != "function")
            target = {};
        if (length == 1) {
            target = this;
            i = 0;
        }
        for (; i < length; i++)
            if ((options = arguments[i]) != null)
                for (var name in options) {
                    if (target === options[name])
                        continue;
                    if (deep && options[name] && typeof options[name] == "object" && target[name] && !options[name].nodeType)
                        target[name] = jQuery.extend(target[name], options[name]);
                    else if (options[name] != undefined)
                        target[name] = options[name];
                }
        return target;
    };
    var expando = "jQuery" + (new Date()).getTime(), uuid = 0, windowData = {};
    var exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i;
    jQuery.extend({noConflict: function(deep) {
            window.$ = _$;
            if (deep)
                window.jQuery = _jQuery;
            return jQuery;
        }, isFunction: function(fn) {
            return!!fn && typeof fn != "string" && !fn.nodeName && fn.constructor != Array && /function/i.test(fn + "");
        }, isXMLDoc: function(elem) {
            return elem.documentElement && !elem.body || elem.tagName && elem.ownerDocument && !elem.ownerDocument.body;
        }, globalEval: function(data) {
            data = jQuery.trim(data);
            if (data) {
                var head = document.getElementsByTagName("head")[0] || document.documentElement, script = document.createElement("script");
                script.type = "text/javascript";
                if (jQuery.browser.msie)
                    script.text = data;
                else
                    script.appendChild(document.createTextNode(data));
                head.appendChild(script);
                head.removeChild(script);
            }
        }, nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
        }, cache: {}, data: function(elem, name, data) {
            elem = elem == window ? windowData : elem;
            var id = elem[expando];
            if (!id)
                id = elem[expando] = ++uuid;
            if (name && !jQuery.cache[id])
                jQuery.cache[id] = {};
            if (data != undefined)
                jQuery.cache[id][name] = data;
            return name ? jQuery.cache[id][name] : id;
        }, removeData: function(elem, name) {
            elem = elem == window ? windowData : elem;
            var id = elem[expando];
            if (name) {
                if (jQuery.cache[id]) {
                    delete jQuery.cache[id][name];
                    name = "";
                    for (name in jQuery.cache[id])
                        break;
                    if (!name)
                        jQuery.removeData(elem);
                }
            } else {
                try {
                    delete elem[expando];
                } catch (e) {
                    if (elem.removeAttribute)
                        elem.removeAttribute(expando);
                }
                delete jQuery.cache[id];
            }
        }, each: function(object, callback, args) {
            if (args) {
                if (object.length == undefined) {
                    for (var name in object)
                        if (callback.apply(object[name], args) === false)
                            break;
                } else
                    for (var i = 0, length = object.length; i < length; i++)
                        if (callback.apply(object[i], args) === false)
                            break;
            } else {
                if (object.length == undefined) {
                    for (var name in object)
                        if (callback.call(object[name], name, object[name]) === false)
                            break;
                } else
                    for (var i = 0, length = object.length, value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {
                    }
            }
            return object;
        }, prop: function(elem, value, type, i, name) {
            if (jQuery.isFunction(value))
                value = value.call(elem, i);
            return value && value.constructor == Number && type == "curCSS" && !exclude.test(name) ? value + "px" : value;
        }, className: {add: function(elem, classNames) {
                jQuery.each((classNames || "").split(/\s+/), function(i, className) {
                    if (elem.nodeType == 1 && !jQuery.className.has(elem.className, className))
                        elem.className += (elem.className ? " " : "") + className;
                });
            }, remove: function(elem, classNames) {
                if (elem.nodeType == 1)
                    elem.className = classNames != undefined ? jQuery.grep(elem.className.split(/\s+/), function(className) {
                        return!jQuery.className.has(classNames, className);
                    }).join(" ") : "";
            }, has: function(elem, className) {
                return jQuery.inArray(className, (elem.className || elem).toString().split(/\s+/)) > -1;
            }}, swap: function(elem, options, callback) {
            var old = {};
            for (var name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            callback.call(elem);
            for (var name in options)
                elem.style[name] = old[name];
        }, css: function(elem, name, force) {
            if (name == "width" || name == "height") {
                var val, props = {position: "absolute", visibility: "hidden", display: "block"}, which = name == "width" ? ["Left", "Right"] : ["Top", "Bottom"];
                function getWH() {
                    val = name == "width" ? elem.offsetWidth : elem.offsetHeight;
                    var padding = 0, border = 0;
                    jQuery.each(which, function() {
                        padding += parseFloat(jQuery.curCSS(elem, "padding" + this, true)) || 0;
                        border += parseFloat(jQuery.curCSS(elem, "border" + this + "Width", true)) || 0;
                    });
                    val -= Math.round(padding + border);
                }
                if (jQuery(elem).is(":visible"))
                    getWH();
                else
                    jQuery.swap(elem, props, getWH);
                return Math.max(0, val);
            }
            return jQuery.curCSS(elem, name, force);
        }, curCSS: function(elem, name, force) {
            var ret;
            function color(elem) {
                if (!jQuery.browser.safari)
                    return false;
                var ret = document.defaultView.getComputedStyle(elem, null);
                return!ret || ret.getPropertyValue("color") == "";
            }
            if (name == "opacity" && jQuery.browser.msie) {
                ret = jQuery.attr(elem.style, "opacity");
                return ret == "" ? "1" : ret;
            }
            if (jQuery.browser.opera && name == "display") {
                var save = elem.style.outline;
                elem.style.outline = "0 solid black";
                elem.style.outline = save;
            }
            if (name.match(/float/i))
                name = styleFloat;
            if (!force && elem.style && elem.style[name])
                ret = elem.style[name];
            else if (document.defaultView && document.defaultView.getComputedStyle) {
                if (name.match(/float/i))
                    name = "float";
                name = name.replace(/([A-Z])/g, "-$1").toLowerCase();
                var getComputedStyle = document.defaultView.getComputedStyle(elem, null);
                if (getComputedStyle && !color(elem))
                    ret = getComputedStyle.getPropertyValue(name);
                else {
                    var swap = [], stack = [];
                    for (var a = elem; a && color(a); a = a.parentNode)
                        stack.unshift(a);
                    for (var i = 0; i < stack.length; i++)
                        if (color(stack[i])) {
                            swap[i] = stack[i].style.display;
                            stack[i].style.display = "block";
                        }
                    ret = name == "display" && swap[stack.length - 1] != null ? "none" : (getComputedStyle && getComputedStyle.getPropertyValue(name)) || "";
                    for (var i = 0; i < swap.length; i++)
                        if (swap[i] != null)
                            stack[i].style.display = swap[i];
                }
                if (name == "opacity" && ret == "")
                    ret = "1";
            } else if (elem.currentStyle) {
                var camelCase = name.replace(/\-(\w)/g, function(all, letter) {
                    return letter.toUpperCase();
                });
                ret = elem.currentStyle[name] || elem.currentStyle[camelCase];
                if (!/^\d+(px)?$/i.test(ret) && /^\d/.test(ret)) {
                    var style = elem.style.left, runtimeStyle = elem.runtimeStyle.left;
                    elem.runtimeStyle.left = elem.currentStyle.left;
                    elem.style.left = ret || 0;
                    ret = elem.style.pixelLeft + "px";
                    elem.style.left = style;
                    elem.runtimeStyle.left = runtimeStyle;
                }
            }
            return ret;
        }, clean: function(elems, context) {
            var ret = [];
            context = context || document;
            if (typeof context.createElement == 'undefined')
                context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
            jQuery.each(elems, function(i, elem) {
                if (!elem)
                    return;
                if (elem.constructor == Number)
                    elem = elem.toString();
                if (typeof elem == "string") {
                    elem = elem.replace(/(<(\w+)[^>]*?)\/>/g, function(all, front, tag) {
                        return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? all : front + "></" + tag + ">";
                    });
                    var tags = jQuery.trim(elem).toLowerCase(), div = context.createElement("div");
                    var wrap = !tags.indexOf("<opt") && [1, "<select multiple='multiple'>", "</select>"] || !tags.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || tags.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !tags.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!tags.indexOf("<td") || !tags.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !tags.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || jQuery.browser.msie && [1, "div<div>", "</div>"] || [0, "", ""];
                    div.innerHTML = wrap[1] + elem + wrap[2];
                    while (wrap[0]--)
                        div = div.lastChild;
                    if (jQuery.browser.msie) {
                        var tbody = !tags.indexOf("<table") && tags.indexOf("<tbody") < 0 ? div.firstChild && div.firstChild.childNodes : wrap[1] == "<table>" && tags.indexOf("<tbody") < 0 ? div.childNodes : [];
                        for (var j = tbody.length - 1; j >= 0; --j)
                            if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length)
                                tbody[j].parentNode.removeChild(tbody[j]);
                        if (/^\s/.test(elem))
                            div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]), div.firstChild);
                    }
                    elem = jQuery.makeArray(div.childNodes);
                }
                if (elem.length === 0 && (!jQuery.nodeName(elem, "form") && !jQuery.nodeName(elem, "select")))
                    return;
                if (elem[0] == undefined || jQuery.nodeName(elem, "form") || elem.options)
                    ret.push(elem);
                else
                    ret = jQuery.merge(ret, elem);
            });
            return ret;
        }, attr: function(elem, name, value) {
            if (!elem || elem.nodeType == 3 || elem.nodeType == 8)
                return undefined;
            var fix = jQuery.isXMLDoc(elem) ? {} : jQuery.props;
            if (name == "selected" && jQuery.browser.safari)
                elem.parentNode.selectedIndex;
            if (fix[name]) {
                if (value != undefined)
                    elem[fix[name]] = value;
                return elem[fix[name]];
            } else if (jQuery.browser.msie && name == "style")
                return jQuery.attr(elem.style, "cssText", value);
            else if (value == undefined && jQuery.browser.msie && jQuery.nodeName(elem, "form") && (name == "action" || name == "method"))
                return elem.getAttributeNode(name).nodeValue;
            else if (elem.tagName) {
                if (value != undefined) {
                    if (name == "type" && jQuery.nodeName(elem, "input") && elem.parentNode)
                        throw"type property can't be changed";
                    elem.setAttribute(name, "" + value);
                }
                if (jQuery.browser.msie && /href|src/.test(name) && !jQuery.isXMLDoc(elem))
                    return elem.getAttribute(name, 2);
                return elem.getAttribute(name);
            } else {
                if (name == "opacity" && jQuery.browser.msie) {
                    if (value != undefined) {
                        elem.zoom = 1;
                        elem.filter = (elem.filter || "").replace(/alpha\([^)]*\)/, "") + (parseFloat(value).toString() == "NaN" ? "" : "alpha(opacity=" + value * 100 + ")");
                    }
                    return elem.filter && elem.filter.indexOf("opacity=") >= 0 ? (parseFloat(elem.filter.match(/opacity=([^)]*)/)[1]) / 100).toString() : "";
                }
                name = name.replace(/-([a-z])/ig, function(all, letter) {
                    return letter.toUpperCase();
                });
                if (value != undefined)
                    elem[name] = value;
                return elem[name];
            }
        }, trim: function(text) {
            return(text || "").replace(/^\s+|\s+$/g, "");
        }, makeArray: function(array) {
            var ret = [];
            if (typeof array != "array")
                for (var i = 0, length = array.length; i < length; i++)
                    ret.push(array[i]);
            else
                ret = array.slice(0);
            return ret;
        }, inArray: function(elem, array) {
            for (var i = 0, length = array.length; i < length; i++)
                if (array[i] == elem)
                    return i;
            return-1;
        }, merge: function(first, second) {
            if (jQuery.browser.msie) {
                for (var i = 0; second[i]; i++)
                    if (second[i].nodeType != 8)
                        first.push(second[i]);
            } else
                for (var i = 0; second[i]; i++)
                    first.push(second[i]);
            return first;
        }, unique: function(array) {
            var ret = [], done = {};
            try {
                for (var i = 0, length = array.length; i < length; i++) {
                    var id = jQuery.data(array[i]);
                    if (!done[id]) {
                        done[id] = true;
                        ret.push(array[i]);
                    }
                }
            } catch (e) {
                ret = array;
            }
            return ret;
        }, grep: function(elems, callback, inv) {
            var ret = [];
            for (var i = 0, length = elems.length; i < length; i++)
                if (!inv && callback(elems[i], i) || inv && !callback(elems[i], i))
                    ret.push(elems[i]);
            return ret;
        }, map: function(elems, callback) {
            var ret = [];
            for (var i = 0, length = elems.length; i < length; i++) {
                var value = callback(elems[i], i);
                if (value !== null && value != undefined) {
                    if (value.constructor != Array)
                        value = [value];
                    ret = ret.concat(value);
                }
            }
            return ret;
        }});
    var userAgent = navigator.userAgent.toLowerCase();
    jQuery.browser = {version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], safari: /webkit/.test(userAgent), opera: /opera/.test(userAgent), msie: /msie/.test(userAgent) && !/opera/.test(userAgent), mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)};
    var styleFloat = jQuery.browser.msie ? "styleFloat" : "cssFloat";
    jQuery.extend({boxModel: !jQuery.browser.msie || document.compatMode == "CSS1Compat", props: {"for": "htmlFor", "class": "className", "float": styleFloat, cssFloat: styleFloat, styleFloat: styleFloat, innerHTML: "innerHTML", className: "className", value: "value", disabled: "disabled", checked: "checked", readonly: "readOnly", selected: "selected", maxlength: "maxLength", selectedIndex: "selectedIndex", defaultValue: "defaultValue", tagName: "tagName", nodeName: "nodeName"}});
    jQuery.each({parent: function(elem) {
            return elem.parentNode;
        }, parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        }, next: function(elem) {
            return jQuery.nth(elem, 2, "nextSibling");
        }, prev: function(elem) {
            return jQuery.nth(elem, 2, "previousSibling");
        }, nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        }, prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        }, siblings: function(elem) {
            return jQuery.sibling(elem.parentNode.firstChild, elem);
        }, children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        }, contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.makeArray(elem.childNodes);
        }}, function(name, fn) {
        jQuery.fn[name] = function(selector) {
            var ret = jQuery.map(this, fn);
            if (selector && typeof selector == "string")
                ret = jQuery.multiFilter(selector, ret);
            return this.pushStack(jQuery.unique(ret));
        };
    });
    jQuery.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function(name, original) {
        jQuery.fn[name] = function() {
            var args = arguments;
            return this.each(function() {
                for (var i = 0, length = args.length; i < length; i++)
                    jQuery(args[i])[original](this);
            });
        };
    });
    jQuery.each({removeAttr: function(name) {
            jQuery.attr(this, name, "");
            if (this.nodeType == 1)
                this.removeAttribute(name);
        }, addClass: function(classNames) {
            jQuery.className.add(this, classNames);
        }, removeClass: function(classNames) {
            jQuery.className.remove(this, classNames);
        }, toggleClass: function(classNames) {
            jQuery.className[jQuery.className.has(this, classNames) ? "remove" : "add"](this, classNames);
        }, remove: function(selector) {
            if (!selector || jQuery.filter(selector, [this]).r.length) {
                jQuery("*", this).add(this).each(function() {
                    jQuery.event.remove(this);
                    jQuery.removeData(this);
                });
                if (this.parentNode)
                    this.parentNode.removeChild(this);
            }
        }, empty: function() {
            jQuery(">*", this).remove();
            while (this.firstChild)
                this.removeChild(this.firstChild);
        }}, function(name, fn) {
        jQuery.fn[name] = function() {
            return this.each(fn, arguments);
        };
    });
    jQuery.each(["Height", "Width"], function(i, name) {
        var type = name.toLowerCase();
        jQuery.fn[type] = function(size) {
            return this[0] == window ? jQuery.browser.opera && document.body["client" + name] || jQuery.browser.safari && window["inner" + name] || document.compatMode == "CSS1Compat" && document.documentElement["client" + name] || document.body["client" + name] : this[0] == document ? Math.max(Math.max(document.body["scroll" + name], document.documentElement["scroll" + name]), Math.max(document.body["offset" + name], document.documentElement["offset" + name])) : size == undefined ? (this.length ? jQuery.css(this[0], type) : null) : this.css(type, size.constructor == String ? size : size + "px");
        };
    });
    var chars = jQuery.browser.safari && parseInt(jQuery.browser.version) < 417 ? "(?:[\\w*_-]|\\\\.)" : "(?:[\\w\u0128-\uFFFF*_-]|\\\\.)", quickChild = new RegExp("^>\\s*(" + chars + "+)"), quickID = new RegExp("^(" + chars + "+)(#)(" + chars + "+)"), quickClass = new RegExp("^([#.]?)(" + chars + "*)");
    jQuery.extend({expr: {"": function(a, i, m) {
                return m[2] == "*" || jQuery.nodeName(a, m[2]);
            }, "#": function(a, i, m) {
                return a.getAttribute("id") == m[2];
            }, ":": {lt: function(a, i, m) {
                    return i < m[3] - 0;
                }, gt: function(a, i, m) {
                    return i > m[3] - 0;
                }, nth: function(a, i, m) {
                    return m[3] - 0 == i;
                }, eq: function(a, i, m) {
                    return m[3] - 0 == i;
                }, first: function(a, i) {
                    return i == 0;
                }, last: function(a, i, m, r) {
                    return i == r.length - 1;
                }, even: function(a, i) {
                    return i % 2 == 0;
                }, odd: function(a, i) {
                    return i % 2;
                }, "first-child": function(a) {
                    return a.parentNode.getElementsByTagName("*")[0] == a;
                }, "last-child": function(a) {
                    return jQuery.nth(a.parentNode.lastChild, 1, "previousSibling") == a;
                }, "only-child": function(a) {
                    return!jQuery.nth(a.parentNode.lastChild, 2, "previousSibling");
                }, parent: function(a) {
                    return a.firstChild;
                }, empty: function(a) {
                    return!a.firstChild;
                }, contains: function(a, i, m) {
                    return(a.textContent || a.innerText || jQuery(a).text() || "").indexOf(m[3]) >= 0;
                }, visible: function(a) {
                    return"hidden" != a.type && jQuery.css(a, "display") != "none" && jQuery.css(a, "visibility") != "hidden";
                }, hidden: function(a) {
                    return"hidden" == a.type || jQuery.css(a, "display") == "none" || jQuery.css(a, "visibility") == "hidden";
                }, enabled: function(a) {
                    return!a.disabled;
                }, disabled: function(a) {
                    return a.disabled;
                }, checked: function(a) {
                    return a.checked;
                }, selected: function(a) {
                    return a.selected || jQuery.attr(a, "selected");
                }, text: function(a) {
                    return"text" == a.type;
                }, radio: function(a) {
                    return"radio" == a.type;
                }, checkbox: function(a) {
                    return"checkbox" == a.type;
                }, file: function(a) {
                    return"file" == a.type;
                }, password: function(a) {
                    return"password" == a.type;
                }, submit: function(a) {
                    return"submit" == a.type;
                }, image: function(a) {
                    return"image" == a.type;
                }, reset: function(a) {
                    return"reset" == a.type;
                }, button: function(a) {
                    return"button" == a.type || jQuery.nodeName(a, "button");
                }, input: function(a) {
                    return/input|select|textarea|button/i.test(a.nodeName);
                }, has: function(a, i, m) {
                    return jQuery.find(m[3], a).length;
                }, header: function(a) {
                    return/h\d/i.test(a.nodeName);
                }, animated: function(a) {
                    return jQuery.grep(jQuery.timers, function(fn) {
                        return a == fn.elem;
                    }).length;
                }}}, parse: [/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/, /^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/, new RegExp("^([:.#]*)(" + chars + "+)")], multiFilter: function(expr, elems, not) {
            var old, cur = [];
            while (expr && expr != old) {
                old = expr;
                var f = jQuery.filter(expr, elems, not);
                expr = f.t.replace(/^\s*,\s*/, "");
                cur = not ? elems = f.r : jQuery.merge(cur, f.r);
            }
            return cur;
        }, find: function(t, context) {
            if (typeof t != "string")
                return[t];
            if (context && context.nodeType != 1 && context.nodeType != 9)
                return[];
            context = context || document;
            var ret = [context], done = [], last, nodeName;
            while (t && last != t) {
                var r = [];
                last = t;
                t = jQuery.trim(t);
                var foundToken = false;
                var re = quickChild;
                var m = re.exec(t);
                if (m) {
                    nodeName = m[1].toUpperCase();
                    for (var i = 0; ret[i]; i++)
                        for (var c = ret[i].firstChild; c; c = c.nextSibling)
                            if (c.nodeType == 1 && (nodeName == "*" || c.nodeName.toUpperCase() == nodeName))
                                r.push(c);
                    ret = r;
                    t = t.replace(re, "");
                    if (t.indexOf(" ") == 0)
                        continue;
                    foundToken = true;
                } else {
                    re = /^([>+~])\s*(\w*)/i;
                    if ((m = re.exec(t)) != null) {
                        r = [];
                        var merge = {};
                        nodeName = m[2].toUpperCase();
                        m = m[1];
                        for (var j = 0, rl = ret.length; j < rl; j++) {
                            var n = m == "~" || m == "+" ? ret[j].nextSibling : ret[j].firstChild;
                            for (; n; n = n.nextSibling)
                                if (n.nodeType == 1) {
                                    var id = jQuery.data(n);
                                    if (m == "~" && merge[id])
                                        break;
                                    if (!nodeName || n.nodeName.toUpperCase() == nodeName) {
                                        if (m == "~")
                                            merge[id] = true;
                                        r.push(n);
                                    }
                                    if (m == "+")
                                        break;
                                }
                        }
                        ret = r;
                        t = jQuery.trim(t.replace(re, ""));
                        foundToken = true;
                    }
                }
                if (t && !foundToken) {
                    if (!t.indexOf(",")) {
                        if (context == ret[0])
                            ret.shift();
                        done = jQuery.merge(done, ret);
                        r = ret = [context];
                        t = " " + t.substr(1, t.length);
                    } else {
                        var re2 = quickID;
                        var m = re2.exec(t);
                        if (m) {
                            m = [0, m[2], m[3], m[1]];
                        } else {
                            re2 = quickClass;
                            m = re2.exec(t);
                        }
                        m[2] = m[2].replace(/\\/g, "");
                        var elem = ret[ret.length - 1];
                        if (m[1] == "#" && elem && elem.getElementById && !jQuery.isXMLDoc(elem)) {
                            var oid = elem.getElementById(m[2]);
                            if ((jQuery.browser.msie || jQuery.browser.opera) && oid && typeof oid.id == "string" && oid.id != m[2])
                                oid = jQuery('[@id="' + m[2] + '"]', elem)[0];
                            ret = r = oid && (!m[3] || jQuery.nodeName(oid, m[3])) ? [oid] : [];
                        } else {
                            for (var i = 0; ret[i]; i++) {
                                var tag = m[1] == "#" && m[3] ? m[3] : m[1] != "" || m[0] == "" ? "*" : m[2];
                                if (tag == "*" && ret[i].nodeName.toLowerCase() == "object")
                                    tag = "param";
                                r = jQuery.merge(r, ret[i].getElementsByTagName(tag));
                            }
                            if (m[1] == ".")
                                r = jQuery.classFilter(r, m[2]);
                            if (m[1] == "#") {
                                var tmp = [];
                                for (var i = 0; r[i]; i++)
                                    if (r[i].getAttribute("id") == m[2]) {
                                        tmp = [r[i]];
                                        break;
                                    }
                                r = tmp;
                            }
                            ret = r;
                        }
                        t = t.replace(re2, "");
                    }
                }
                if (t) {
                    var val = jQuery.filter(t, r);
                    ret = r = val.r;
                    t = jQuery.trim(val.t);
                }
            }
            if (t)
                ret = [];
            if (ret && context == ret[0])
                ret.shift();
            done = jQuery.merge(done, ret);
            return done;
        }, classFilter: function(r, m, not) {
            m = " " + m + " ";
            var tmp = [];
            for (var i = 0; r[i]; i++) {
                var pass = (" " + r[i].className + " ").indexOf(m) >= 0;
                if (!not && pass || not && !pass)
                    tmp.push(r[i]);
            }
            return tmp;
        }, filter: function(t, r, not) {
            var last;
            while (t && t != last) {
                last = t;
                var p = jQuery.parse, m;
                for (var i = 0; p[i]; i++) {
                    m = p[i].exec(t);
                    if (m) {
                        t = t.substring(m[0].length);
                        m[2] = m[2].replace(/\\/g, "");
                        break;
                    }
                }
                if (!m)
                    break;
                if (m[1] == ":" && m[2] == "not")
                    r = isSimple.test(m[3]) ? jQuery.filter(m[3], r, true).r : jQuery(r).not(m[3]);
                else if (m[1] == ".")
                    r = jQuery.classFilter(r, m[2], not);
                else if (m[1] == "[") {
                    var tmp = [], type = m[3];
                    for (var i = 0, rl = r.length; i < rl; i++) {
                        var a = r[i], z = a[jQuery.props[m[2]] || m[2]];
                        if (z == null || /href|src|selected/.test(m[2]))
                            z = jQuery.attr(a, m[2]) || '';
                        if ((type == "" && !!z || type == "=" && z == m[5] || type == "!=" && z != m[5] || type == "^=" && z && !z.indexOf(m[5]) || type == "$=" && z.substr(z.length - m[5].length) == m[5] || (type == "*=" || type == "~=") && z.indexOf(m[5]) >= 0) ^ not)
                            tmp.push(a);
                    }
                    r = tmp;
                } else if (m[1] == ":" && m[2] == "nth-child") {
                    var merge = {}, tmp = [], test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3] == "even" && "2n" || m[3] == "odd" && "2n+1" || !/\D/.test(m[3]) && "0n+" + m[3] || m[3]), first = (test[1] + (test[2] || 1)) - 0, last = test[3] - 0;
                    for (var i = 0, rl = r.length; i < rl; i++) {
                        var node = r[i], parentNode = node.parentNode, id = jQuery.data(parentNode);
                        if (!merge[id]) {
                            var c = 1;
                            for (var n = parentNode.firstChild; n; n = n.nextSibling)
                                if (n.nodeType == 1)
                                    n.nodeIndex = c++;
                            merge[id] = true;
                        }
                        var add = false;
                        if (first == 0) {
                            if (node.nodeIndex == last)
                                add = true;
                        } else if ((node.nodeIndex - last) % first == 0 && (node.nodeIndex - last) / first >= 0)
                            add = true;
                        if (add ^ not)
                            tmp.push(node);
                    }
                    r = tmp;
                } else {
                    var fn = jQuery.expr[m[1]];
                    if (typeof fn == "object")
                        fn = fn[m[2]];
                    if (typeof fn == "string")
                        fn = eval("false||function(a,i){return " + fn + ";}");
                    r = jQuery.grep(r, function(elem, i) {
                        return fn(elem, i, m, r);
                    }, not);
                }
            }
            return{r: r, t: t};
        }, dir: function(elem, dir) {
            var matched = [];
            var cur = elem[dir];
            while (cur && cur != document) {
                if (cur.nodeType == 1)
                    matched.push(cur);
                cur = cur[dir];
            }
            return matched;
        }, nth: function(cur, result, dir, elem) {
            result = result || 1;
            var num = 0;
            for (; cur; cur = cur[dir])
                if (cur.nodeType == 1 && ++num == result)
                    break;
            return cur;
        }, sibling: function(n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType == 1 && (!elem || n != elem))
                    r.push(n);
            }
            return r;
        }});
    jQuery.event = {add: function(elem, types, handler, data) {
            if (elem.nodeType == 3 || elem.nodeType == 8)
                return;
            if (jQuery.browser.msie && elem.setInterval != undefined)
                elem = window;
            if (!handler.guid)
                handler.guid = this.guid++;
            if (data != undefined) {
                var fn = handler;
                handler = function() {
                    return fn.apply(this, arguments);
                };
                handler.data = data;
                handler.guid = fn.guid;
            }
            var events = jQuery.data(elem, "events") || jQuery.data(elem, "events", {}), handle = jQuery.data(elem, "handle") || jQuery.data(elem, "handle", function() {
                var val;
                if (typeof jQuery == "undefined" || jQuery.event.triggered)
                    return val;
                val = jQuery.event.handle.apply(arguments.callee.elem, arguments);
                return val;
            });
            handle.elem = elem;
            jQuery.each(types.split(/\s+/), function(index, type) {
                var parts = type.split(".");
                type = parts[0];
                handler.type = parts[1];
                var handlers = events[type];
                if (!handlers) {
                    handlers = events[type] = {};
                    if (!jQuery.event.special[type] || jQuery.event.special[type].setup.call(elem) === false) {
                        if (elem.addEventListener)
                            elem.addEventListener(type, handle, false);
                        else if (elem.attachEvent)
                            elem.attachEvent("on" + type, handle);
                    }
                }
                handlers[handler.guid] = handler;
                jQuery.event.global[type] = true;
            });
            elem = null;
        }, guid: 1, global: {}, remove: function(elem, types, handler) {
            if (elem.nodeType == 3 || elem.nodeType == 8)
                return;
            var events = jQuery.data(elem, "events"), ret, index;
            if (events) {
                if (types == undefined || (typeof types == "string" && types.charAt(0) == "."))
                    for (var type in events)
                        this.remove(elem, type + (types || ""));
                else {
                    if (types.type) {
                        handler = types.handler;
                        types = types.type;
                    }
                    jQuery.each(types.split(/\s+/), function(index, type) {
                        var parts = type.split(".");
                        type = parts[0];
                        if (events[type]) {
                            if (handler)
                                delete events[type][handler.guid];
                            else
                                for (handler in events[type])
                                    if (!parts[1] || events[type][handler].type == parts[1])
                                        delete events[type][handler];
                            for (ret in events[type])
                                break;
                            if (!ret) {
                                if (!jQuery.event.special[type] || jQuery.event.special[type].teardown.call(elem) === false) {
                                    if (elem.removeEventListener)
                                        elem.removeEventListener(type, jQuery.data(elem, "handle"), false);
                                    else if (elem.detachEvent)
                                        elem.detachEvent("on" + type, jQuery.data(elem, "handle"));
                                }
                                ret = null;
                                delete events[type];
                            }
                        }
                    });
                }
                for (ret in events)
                    break;
                if (!ret) {
                    var handle = jQuery.data(elem, "handle");
                    if (handle)
                        handle.elem = null;
                    jQuery.removeData(elem, "events");
                    jQuery.removeData(elem, "handle");
                }
            }
        }, trigger: function(type, data, elem, donative, extra) {
            data = jQuery.makeArray(data || []);
            if (type.indexOf("!") >= 0) {
                type = type.slice(0, -1);
                var exclusive = true;
            }
            if (!elem) {
                if (this.global[type])
                    jQuery("*").add([window, document]).trigger(type, data);
            } else {
                if (elem.nodeType == 3 || elem.nodeType == 8)
                    return undefined;
                var val, ret, fn = jQuery.isFunction(elem[type] || null), event = !data[0] || !data[0].preventDefault;
                if (event)
                    data.unshift(this.fix({type: type, target: elem}));
                data[0].type = type;
                if (exclusive)
                    data[0].exclusive = true;
                if (jQuery.isFunction(jQuery.data(elem, "handle")))
                    val = jQuery.data(elem, "handle").apply(elem, data);
                if (!fn && elem["on" + type] && elem["on" + type].apply(elem, data) === false)
                    val = false;
                if (event)
                    data.shift();
                if (extra && jQuery.isFunction(extra)) {
                    ret = extra.apply(elem, val == null ? data : data.concat(val));
                    if (ret !== undefined)
                        val = ret;
                }
                if (fn && donative !== false && val !== false && !(jQuery.nodeName(elem, 'a') && type == "click")) {
                    this.triggered = true;
                    try {
                        elem[type]();
                    } catch (e) {
                    }
                }
                this.triggered = false;
            }
            return val;
        }, handle: function(event) {
            var val;
            event = jQuery.event.fix(event || window.event || {});
            var parts = event.type.split(".");
            event.type = parts[0];
            var handlers = jQuery.data(this, "events") && jQuery.data(this, "events")[event.type], args = Array.prototype.slice.call(arguments, 1);
            args.unshift(event);
            for (var j in handlers) {
                var handler = handlers[j];
                args[0].handler = handler;
                args[0].data = handler.data;
                if (!parts[1] && !event.exclusive || handler.type == parts[1]) {
                    var ret = handler.apply(this, args);
                    if (val !== false)
                        val = ret;
                    if (ret === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            }
            if (jQuery.browser.msie)
                event.target = event.preventDefault = event.stopPropagation = event.handler = event.data = null;
            return val;
        }, fix: function(event) {
            var originalEvent = event;
            event = jQuery.extend({}, originalEvent);
            event.preventDefault = function() {
                if (originalEvent.preventDefault)
                    originalEvent.preventDefault();
                originalEvent.returnValue = false;
            };
            event.stopPropagation = function() {
                if (originalEvent.stopPropagation)
                    originalEvent.stopPropagation();
                originalEvent.cancelBubble = true;
            };
            if (!event.target)
                event.target = event.srcElement || document;
            if (event.target.nodeType == 3)
                event.target = originalEvent.target.parentNode;
            if (!event.relatedTarget && event.fromElement)
                event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
            if (event.pageX == null && event.clientX != null) {
                var doc = document.documentElement, body = document.body;
                event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
                event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
            }
            if (!event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode))
                event.which = event.charCode || event.keyCode;
            if (!event.metaKey && event.ctrlKey)
                event.metaKey = event.ctrlKey;
            if (!event.which && event.button)
                event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)));
            return event;
        }, special: {ready: {setup: function() {
                    bindReady();
                    return;
                }, teardown: function() {
                    return;
                }}, mouseenter: {setup: function() {
                    if (jQuery.browser.msie)
                        return false;
                    jQuery(this).bind("mouseover", jQuery.event.special.mouseenter.handler);
                    return true;
                }, teardown: function() {
                    if (jQuery.browser.msie)
                        return false;
                    jQuery(this).unbind("mouseover", jQuery.event.special.mouseenter.handler);
                    return true;
                }, handler: function(event) {
                    if (withinElement(event, this))
                        return true;
                    arguments[0].type = "mouseenter";
                    return jQuery.event.handle.apply(this, arguments);
                }}, mouseleave: {setup: function() {
                    if (jQuery.browser.msie)
                        return false;
                    jQuery(this).bind("mouseout", jQuery.event.special.mouseleave.handler);
                    return true;
                }, teardown: function() {
                    if (jQuery.browser.msie)
                        return false;
                    jQuery(this).unbind("mouseout", jQuery.event.special.mouseleave.handler);
                    return true;
                }, handler: function(event) {
                    if (withinElement(event, this))
                        return true;
                    arguments[0].type = "mouseleave";
                    return jQuery.event.handle.apply(this, arguments);
                }}}};
    jQuery.fn.extend({bind: function(type, data, fn) {
            return type == "unload" ? this.one(type, data, fn) : this.each(function() {
                jQuery.event.add(this, type, fn || data, fn && data);
            });
        }, one: function(type, data, fn) {
            return this.each(function() {
                jQuery.event.add(this, type, function(event) {
                    jQuery(this).unbind(event);
                    return(fn || data).apply(this, arguments);
                }, fn && data);
            });
        }, unbind: function(type, fn) {
            return this.each(function() {
                jQuery.event.remove(this, type, fn);
            });
        }, trigger: function(type, data, fn) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this, true, fn);
            });
        }, triggerHandler: function(type, data, fn) {
            if (this[0])
                return jQuery.event.trigger(type, data, this[0], false, fn);
            return undefined;
        }, toggle: function() {
            var args = arguments;
            return this.click(function(event) {
                this.lastToggle = 0 == this.lastToggle ? 1 : 0;
                event.preventDefault();
                return args[this.lastToggle].apply(this, arguments) || false;
            });
        }, hover: function(fnOver, fnOut) {
            return this.bind('mouseenter', fnOver).bind('mouseleave', fnOut);
        }, ready: function(fn) {
            bindReady();
            if (jQuery.isReady)
                fn.call(document, jQuery);
            else
                jQuery.readyList.push(function() {
                    return fn.call(this, jQuery);
                });
            return this;
        }});
    jQuery.extend({isReady: false, readyList: [], ready: function() {
            if (!jQuery.isReady) {
                jQuery.isReady = true;
                if (jQuery.readyList) {
                    jQuery.each(jQuery.readyList, function() {
                        this.apply(document);
                    });
                    jQuery.readyList = null;
                }
                jQuery(document).triggerHandler("ready");
            }
        }});
    var readyBound = false;
    function bindReady() {
        if (readyBound)
            return;
        readyBound = true;
        if (document.addEventListener && !jQuery.browser.opera)
            document.addEventListener("DOMContentLoaded", jQuery.ready, false);
        if (jQuery.browser.msie && window == top)
            (function() {
                if (jQuery.isReady)
                    return;
                try {
                    document.documentElement.doScroll("left");
                } catch (error) {
                    setTimeout(arguments.callee, 0);
                    return;
                }
                jQuery.ready();
            })();
        if (jQuery.browser.opera)
            document.addEventListener("DOMContentLoaded", function() {
                if (jQuery.isReady)
                    return;
                for (var i = 0; i < document.styleSheets.length; i++)
                    if (document.styleSheets[i].disabled) {
                        setTimeout(arguments.callee, 0);
                        return;
                    }
                jQuery.ready();
            }, false);
        if (jQuery.browser.safari) {
            var numStyles;
            (function() {
                if (jQuery.isReady)
                    return;
                if (document.readyState != "loaded" && document.readyState != "complete") {
                    setTimeout(arguments.callee, 0);
                    return;
                }
                if (numStyles === undefined)
                    numStyles = jQuery("style, link[rel=stylesheet]").length;
                if (document.styleSheets.length != numStyles) {
                    setTimeout(arguments.callee, 0);
                    return;
                }
                jQuery.ready();
            })();
        }
        jQuery.event.add(window, "load", jQuery.ready);
    }
    jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick," + "mousedown,mouseup,mousemove,mouseover,mouseout,change,select," + "submit,keydown,keypress,keyup,error").split(","), function(i, name) {
        jQuery.fn[name] = function(fn) {
            return fn ? this.bind(name, fn) : this.trigger(name);
        };
    });
    var withinElement = function(event, elem) {
        var parent = event.relatedTarget;
        while (parent && parent != elem)
            try {
                parent = parent.parentNode;
            } catch (error) {
                parent = elem;
            }
        return parent == elem;
    };
    jQuery(window).bind("unload", function() {
        jQuery("*").add(document).unbind();
    });
    jQuery.fn.extend({load: function(url, params, callback) {
            if (jQuery.isFunction(url))
                return this.bind("load", url);
            var off = url.indexOf(" ");
            if (off >= 0) {
                var selector = url.slice(off, url.length);
                url = url.slice(0, off);
            }
            callback = callback || function() {
            };
            var type = "GET";
            if (params)
                if (jQuery.isFunction(params)) {
                    callback = params;
                    params = null;
                } else {
                    params = jQuery.param(params);
                    type = "POST";
                }
            var self = this;
            jQuery.ajax({url: url, type: type, dataType: "html", data: params, complete: function(res, status) {
                    if (status == "success" || status == "notmodified")
                        self.html(selector ? jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(selector) : res.responseText);
                    self.each(callback, [res.responseText, status, res]);
                }});
            return this;
        }, serialize: function() {
            return jQuery.param(this.serializeArray());
        }, serializeArray: function() {
            return this.map(function() {
                return jQuery.nodeName(this, "form") ? jQuery.makeArray(this.elements) : this;
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : val.constructor == Array ? jQuery.map(val, function(val, i) {
                    return{name: elem.name, value: val};
                }) : {name: elem.name, value: val};
            }).get();
        }});
    jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(i, o) {
        jQuery.fn[o] = function(f) {
            return this.bind(o, f);
        };
    });
    var jsc = (new Date).getTime();
    jQuery.extend({get: function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                callback = data;
                data = null;
            }
            return jQuery.ajax({type: "GET", url: url, data: data, success: callback, dataType: type});
        }, getScript: function(url, callback) {
            return jQuery.get(url, null, callback, "script");
        }, getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        }, post: function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                callback = data;
                data = {};
            }
            return jQuery.ajax({type: "POST", url: url, data: data, success: callback, dataType: type});
        }, ajaxSetup: function(settings) {
            jQuery.extend(jQuery.ajaxSettings, settings);
        }, ajaxSettings: {global: true, type: "GET", timeout: 0, contentType: "application/x-www-form-urlencoded", processData: true, async: true, data: null, username: null, password: null, accepts: {xml: "application/xml, text/xml", html: "text/html", script: "text/javascript, application/javascript", json: "application/json, text/javascript", text: "text/plain", _default: "*/*"}}, lastModified: {}, ajax: function(s) {
            var jsonp, jsre = /=\?(&|$)/g, status, data;
            s = jQuery.extend(true, s, jQuery.extend(true, {}, jQuery.ajaxSettings, s));
            if (s.data && s.processData && typeof s.data != "string")
                s.data = jQuery.param(s.data);
            if (s.dataType == "jsonp") {
                if (s.type.toLowerCase() == "get") {
                    if (!s.url.match(jsre))
                        s.url += (s.url.match(/\?/) ? "&" : "?") + (s.jsonp || "callback") + "=?";
                } else if (!s.data || !s.data.match(jsre))
                    s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
                s.dataType = "json";
            }
            if (s.dataType == "json" && (s.data && s.data.match(jsre) || s.url.match(jsre))) {
                jsonp = "jsonp" + jsc++;
                if (s.data)
                    s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
                s.url = s.url.replace(jsre, "=" + jsonp + "$1");
                s.dataType = "script";
                window[jsonp] = function(tmp) {
                    data = tmp;
                    success();
                    complete();
                    window[jsonp] = undefined;
                    try {
                        delete window[jsonp];
                    } catch (e) {
                    }
                    if (head)
                        head.removeChild(script);
                };
            }
            if (s.dataType == "script" && s.cache == null)
                s.cache = false;
            if (s.cache === false && s.type.toLowerCase() == "get") {
                var ts = (new Date()).getTime();
                var ret = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
                s.url = ret + ((ret == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_=" + ts : "");
            }
            if (s.data && s.type.toLowerCase() == "get") {
                s.url += (s.url.match(/\?/) ? "&" : "?") + s.data;
                s.data = null;
            }
            if (s.global && !jQuery.active++)
                jQuery.event.trigger("ajaxStart");
            if ((!s.url.indexOf("http") || !s.url.indexOf("//")) && s.dataType == "script" && s.type.toLowerCase() == "get") {
                var head = document.getElementsByTagName("head")[0];
                var script = document.createElement("script");
                script.src = s.url;
                if (s.scriptCharset)
                    script.charset = s.scriptCharset;
                if (!jsonp) {
                    var done = false;
                    script.onload = script.onreadystatechange = function() {
                        if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                            done = true;
                            success();
                            complete();
                            head.removeChild(script);
                        }
                    };
                }
                head.appendChild(script);
                return undefined;
            }
            var requestDone = false;
            var xml = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            xml.open(s.type, s.url, s.async, s.username, s.password);
            try {
                if (s.data)
                    xml.setRequestHeader("Content-Type", s.contentType);
                if (s.ifModified)
                    xml.setRequestHeader("If-Modified-Since", jQuery.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT");
                xml.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                xml.setRequestHeader("Accept", s.dataType && s.accepts[s.dataType] ? s.accepts[s.dataType] + ", */*" : s.accepts._default);
            } catch (e) {
            }
            if (s.beforeSend)
                s.beforeSend(xml);
            if (s.global)
                jQuery.event.trigger("ajaxSend", [xml, s]);
            var onreadystatechange = function(isTimeout) {
                if (!requestDone && xml && (xml.readyState == 4 || isTimeout == "timeout")) {
                    requestDone = true;
                    if (ival) {
                        clearInterval(ival);
                        ival = null;
                    }
                    status = isTimeout == "timeout" && "timeout" || !jQuery.httpSuccess(xml) && "error" || s.ifModified && jQuery.httpNotModified(xml, s.url) && "notmodified" || "success";
                    if (status == "success") {
                        try {
                            data = jQuery.httpData(xml, s.dataType);
                        } catch (e) {
                            status = "parsererror";
                        }
                    }
                    if (status == "success") {
                        var modRes;
                        try {
                            modRes = xml.getResponseHeader("Last-Modified");
                        } catch (e) {
                        }
                        if (s.ifModified && modRes)
                            jQuery.lastModified[s.url] = modRes;
                        if (!jsonp)
                            success();
                    } else
                        jQuery.handleError(s, xml, status);
                    complete();
                    if (s.async)
                        xml = null;
                }
            };
            if (s.async) {
                var ival = setInterval(onreadystatechange, 13);
                if (s.timeout > 0)
                    setTimeout(function() {
                        if (xml) {
                            xml.abort();
                            if (!requestDone)
                                onreadystatechange("timeout");
                        }
                    }, s.timeout);
            }
            try {
                xml.send(s.data);
            } catch (e) {
                jQuery.handleError(s, xml, null, e);
            }
            if (!s.async)
                onreadystatechange();
            function success() {
                if (s.success)
                    s.success(data, status);
                if (s.global)
                    jQuery.event.trigger("ajaxSuccess", [xml, s]);
            }
            function complete() {
                if (s.complete)
                    s.complete(xml, status);
                if (s.global)
                    jQuery.event.trigger("ajaxComplete", [xml, s]);
                if (s.global && !--jQuery.active)
                    jQuery.event.trigger("ajaxStop");
            }
            return xml;
        }, handleError: function(s, xml, status, e) {
            if (s.error)
                s.error(xml, status, e);
            if (s.global)
                jQuery.event.trigger("ajaxError", [xml, s, e]);
        }, active: 0, httpSuccess: function(r) {
            try {
                return!r.status && location.protocol == "file:" || (r.status >= 200 && r.status < 300) || r.status == 304 || r.status == 1223 || jQuery.browser.safari && r.status == undefined;
            } catch (e) {
            }
            return false;
        }, httpNotModified: function(xml, url) {
            try {
                var xmlRes = xml.getResponseHeader("Last-Modified");
                return xml.status == 304 || xmlRes == jQuery.lastModified[url] || jQuery.browser.safari && xml.status == undefined;
            } catch (e) {
            }
            return false;
        }, httpData: function(r, type) {
            var ct = r.getResponseHeader("content-type");
            var xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0;
            var data = xml ? r.responseXML : r.responseText;
            if (xml && data.documentElement.tagName == "parsererror")
                throw"parsererror";
            if (type == "script")
                jQuery.globalEval(data);
            if (type == "json")
                data = eval("(" + data + ")");
            return data;
        }, param: function(a) {
            var s = [];
            if (a.constructor == Array || a.jquery)
                jQuery.each(a, function() {
                    s.push(encodeURIComponent(this.name) + "=" + encodeURIComponent(this.value));
                });
            else
                for (var j in a)
                    if (a[j] && a[j].constructor == Array)
                        jQuery.each(a[j], function() {
                            s.push(encodeURIComponent(j) + "=" + encodeURIComponent(this));
                        });
                    else
                        s.push(encodeURIComponent(j) + "=" + encodeURIComponent(a[j]));
            return s.join("&").replace(/%20/g, "+");
        }});
    jQuery.fn.extend({show: function(speed, callback) {
            return speed ? this.animate({height: "show", width: "show", opacity: "show"}, speed, callback) : this.filter(":hidden").each(function() {
                this.style.display = this.oldblock || "";
                if (jQuery.css(this, "display") == "none") {
                    var elem = jQuery("<" + this.tagName + " />").appendTo("body");
                    this.style.display = elem.css("display");
                    if (this.style.display == "none")
                        this.style.display = "block";
                    elem.remove();
                }
            }).end();
        }, hide: function(speed, callback) {
            return speed ? this.animate({height: "hide", width: "hide", opacity: "hide"}, speed, callback) : this.filter(":visible").each(function() {
                this.oldblock = this.oldblock || jQuery.css(this, "display");
                this.style.display = "none";
            }).end();
        }, _toggle: jQuery.fn.toggle, toggle: function(fn, fn2) {
            return jQuery.isFunction(fn) && jQuery.isFunction(fn2) ? this._toggle(fn, fn2) : fn ? this.animate({height: "toggle", width: "toggle", opacity: "toggle"}, fn, fn2) : this.each(function() {
                jQuery(this)[jQuery(this).is(":hidden") ? "show" : "hide"]();
            });
        }, slideDown: function(speed, callback) {
            return this.animate({height: "show"}, speed, callback);
        }, slideUp: function(speed, callback) {
            return this.animate({height: "hide"}, speed, callback);
        }, slideToggle: function(speed, callback) {
            return this.animate({height: "toggle"}, speed, callback);
        }, fadeIn: function(speed, callback) {
            return this.animate({opacity: "show"}, speed, callback);
        }, fadeOut: function(speed, callback) {
            return this.animate({opacity: "hide"}, speed, callback);
        }, fadeTo: function(speed, to, callback) {
            return this.animate({opacity: to}, speed, callback);
        }, animate: function(prop, speed, easing, callback) {
            var optall = jQuery.speed(speed, easing, callback);
            return this[optall.queue === false ? "each" : "queue"](function() {
                if (this.nodeType != 1)
                    return false;
                var opt = jQuery.extend({}, optall);
                var hidden = jQuery(this).is(":hidden"), self = this;
                for (var p in prop) {
                    if (prop[p] == "hide" && hidden || prop[p] == "show" && !hidden)
                        return jQuery.isFunction(opt.complete) && opt.complete.apply(this);
                    if (p == "height" || p == "width") {
                        opt.display = jQuery.css(this, "display");
                        opt.overflow = this.style.overflow;
                    }
                }
                if (opt.overflow != null)
                    this.style.overflow = "hidden";
                opt.curAnim = jQuery.extend({}, prop);
                jQuery.each(prop, function(name, val) {
                    var e = new jQuery.fx(self, opt, name);
                    if (/toggle|show|hide/.test(val))
                        e[val == "toggle" ? hidden ? "show" : "hide" : val](prop);
                    else {
                        var parts = val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/), start = e.cur(true) || 0;
                        if (parts) {
                            var end = parseFloat(parts[2]), unit = parts[3] || "px";
                            if (unit != "px") {
                                self.style[name] = (end || 1) + unit;
                                start = ((end || 1) / e.cur(true)) * start;
                                self.style[name] = start + unit;
                            }
                            if (parts[1])
                                end = ((parts[1] == "-=" ? -1 : 1) * end) + start;
                            e.custom(start, end, unit);
                        } else
                            e.custom(start, val, "");
                    }
                });
                return true;
            });
        }, queue: function(type, fn) {
            if (jQuery.isFunction(type) || (type && type.constructor == Array)) {
                fn = type;
                type = "fx";
            }
            if (!type || (typeof type == "string" && !fn))
                return queue(this[0], type);
            return this.each(function() {
                if (fn.constructor == Array)
                    queue(this, type, fn);
                else {
                    queue(this, type).push(fn);
                    if (queue(this, type).length == 1)
                        fn.apply(this);
                }
            });
        }, stop: function(clearQueue, gotoEnd) {
            var timers = jQuery.timers;
            if (clearQueue)
                this.queue([]);
            this.each(function() {
                for (var i = timers.length - 1; i >= 0; i--)
                    if (timers[i].elem == this) {
                        if (gotoEnd)
                            timers[i](true);
                        timers.splice(i, 1);
                    }
            });
            if (!gotoEnd)
                this.dequeue();
            return this;
        }});
    var queue = function(elem, type, array) {
        if (!elem)
            return undefined;
        type = type || "fx";
        var q = jQuery.data(elem, type + "queue");
        if (!q || array)
            q = jQuery.data(elem, type + "queue", array ? jQuery.makeArray(array) : []);
        return q;
    };
    jQuery.fn.dequeue = function(type) {
        type = type || "fx";
        return this.each(function() {
            var q = queue(this, type);
            q.shift();
            if (q.length)
                q[0].apply(this);
        });
    };
    jQuery.extend({speed: function(speed, easing, fn) {
            var opt = speed && speed.constructor == Object ? speed : {complete: fn || !fn && easing || jQuery.isFunction(speed) && speed, duration: speed, easing: fn && easing || easing && easing.constructor != Function && easing};
            opt.duration = (opt.duration && opt.duration.constructor == Number ? opt.duration : {slow: 600, fast: 200}[opt.duration]) || 400;
            opt.old = opt.complete;
            opt.complete = function() {
                if (opt.queue !== false)
                    jQuery(this).dequeue();
                if (jQuery.isFunction(opt.old))
                    opt.old.apply(this);
            };
            return opt;
        }, easing: {linear: function(p, n, firstNum, diff) {
                return firstNum + diff * p;
            }, swing: function(p, n, firstNum, diff) {
                return((-Math.cos(p * Math.PI) / 2) + 0.5) * diff + firstNum;
            }}, timers: [], timerId: null, fx: function(elem, options, prop) {
            this.options = options;
            this.elem = elem;
            this.prop = prop;
            if (!options.orig)
                options.orig = {};
        }});
    jQuery.fx.prototype = {update: function() {
            if (this.options.step)
                this.options.step.apply(this.elem, [this.now, this]);
            (jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this);
            if (this.prop == "height" || this.prop == "width")
                this.elem.style.display = "block";
        }, cur: function(force) {
            if (this.elem[this.prop] != null && this.elem.style[this.prop] == null)
                return this.elem[this.prop];
            var r = parseFloat(jQuery.css(this.elem, this.prop, force));
            return r && r > -10000 ? r : parseFloat(jQuery.curCSS(this.elem, this.prop)) || 0;
        }, custom: function(from, to, unit) {
            this.startTime = (new Date()).getTime();
            this.start = from;
            this.end = to;
            this.unit = unit || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            this.update();
            var self = this;
            function t(gotoEnd) {
                return self.step(gotoEnd);
            }
            t.elem = this.elem;
            jQuery.timers.push(t);
            if (jQuery.timerId == null) {
                jQuery.timerId = setInterval(function() {
                    var timers = jQuery.timers;
                    for (var i = 0; i < timers.length; i++)
                        if (!timers[i]())
                            timers.splice(i--, 1);
                    if (!timers.length) {
                        clearInterval(jQuery.timerId);
                        jQuery.timerId = null;
                    }
                }, 13);
            }
        }, show: function() {
            this.options.orig[this.prop] = jQuery.attr(this.elem.style, this.prop);
            this.options.show = true;
            this.custom(0, this.cur());
            if (this.prop == "width" || this.prop == "height")
                this.elem.style[this.prop] = "1px";
            jQuery(this.elem).show();
        }, hide: function() {
            this.options.orig[this.prop] = jQuery.attr(this.elem.style, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0);
        }, step: function(gotoEnd) {
            var t = (new Date()).getTime();
            if (gotoEnd || t > this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                var done = true;
                for (var i in this.options.curAnim)
                    if (this.options.curAnim[i] !== true)
                        done = false;
                if (done) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        this.elem.style.display = this.options.display;
                        if (jQuery.css(this.elem, "display") == "none")
                            this.elem.style.display = "block";
                    }
                    if (this.options.hide)
                        this.elem.style.display = "none";
                    if (this.options.hide || this.options.show)
                        for (var p in this.options.curAnim)
                            jQuery.attr(this.elem.style, p, this.options.orig[p]);
                }
                if (done && jQuery.isFunction(this.options.complete))
                    this.options.complete.apply(this.elem);
                return false;
            } else {
                var n = t - this.startTime;
                this.state = n / this.options.duration;
                this.pos = jQuery.easing[this.options.easing || (jQuery.easing.swing ? "swing" : "linear")](this.state, n, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update();
            }
            return true;
        }};
    jQuery.fx.step = {scrollLeft: function(fx) {
            fx.elem.scrollLeft = fx.now;
        }, scrollTop: function(fx) {
            fx.elem.scrollTop = fx.now;
        }, opacity: function(fx) {
            jQuery.attr(fx.elem.style, "opacity", fx.now);
        }, _default: function(fx) {
            fx.elem.style[fx.prop] = fx.now + fx.unit;
        }};
    jQuery.fn.offset = function() {
        var left = 0, top = 0, elem = this[0], results;
        if (elem)
            with (jQuery.browser) {
                var parent = elem.parentNode, offsetChild = elem, offsetParent = elem.offsetParent, doc = elem.ownerDocument, safari2 = safari && parseInt(version) < 522 && !/adobeair/i.test(userAgent), fixed = jQuery.css(elem, "position") == "fixed";
                if (elem.getBoundingClientRect) {
                    var box = elem.getBoundingClientRect();
                    add(box.left + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft), box.top + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop));
                    add(-doc.documentElement.clientLeft, -doc.documentElement.clientTop);
                } else {
                    add(elem.offsetLeft, elem.offsetTop);
                    while (offsetParent) {
                        add(offsetParent.offsetLeft, offsetParent.offsetTop);
                        if (mozilla && !/^t(able|d|h)$/i.test(offsetParent.tagName) || safari && !safari2)
                            border(offsetParent);
                        if (!fixed && jQuery.css(offsetParent, "position") == "fixed")
                            fixed = true;
                        offsetChild = /^body$/i.test(offsetParent.tagName) ? offsetChild : offsetParent;
                        offsetParent = offsetParent.offsetParent;
                    }
                    while (parent && parent.tagName && !/^body|html$/i.test(parent.tagName)) {
                        if (!/^inline|table.*$/i.test(jQuery.css(parent, "display")))
                            add(-parent.scrollLeft, -parent.scrollTop);
                        if (mozilla && jQuery.css(parent, "overflow") != "visible")
                            border(parent);
                        parent = parent.parentNode;
                    }
                    if ((safari2 && (fixed || jQuery.css(offsetChild, "position") == "absolute")) || (mozilla && jQuery.css(offsetChild, "position") != "absolute"))
                        add(-doc.body.offsetLeft, -doc.body.offsetTop);
                    if (fixed)
                        add(Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft), Math.max(doc.documentElement.scrollTop, doc.body.scrollTop));
                }
                results = {top: top, left: left};
            }
        function border(elem) {
            add(jQuery.curCSS(elem, "borderLeftWidth", true), jQuery.curCSS(elem, "borderTopWidth", true));
        }
        function add(l, t) {
            left += parseInt(l) || 0;
            top += parseInt(t) || 0;
        }
        return results;
    };
})();