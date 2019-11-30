var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MicroList = /** @class */ (function (_super) {
    __extends(MicroList, _super);
    function MicroList(items) {
        var _this = _super.apply(this, items) || this;
        Object.setPrototypeOf(_this, Object.create(MicroList.prototype));
        return _this;
    }
    // Class
    MicroList.prototype.add_class = function (class_name) {
        return this._map(function (el) {
            el.classList.add(class_name);
            return el;
        });
    };
    MicroList.prototype.remove_class = function (class_name) {
        return this._map(function (el) {
            el.classList.remove(class_name);
            return el;
        });
    };
    MicroList.prototype.toggle_class = function (class_name) {
        return this._map(function (el) {
            el.classList.toggle(class_name);
            return el;
        });
    };
    MicroList.prototype.has_class = function (class_name) {
        for (var index = 0; index < this.length; index++) {
            if (this[index].classList.contains(class_name))
                return true;
        }
        return false;
    };
    // Attributes
    MicroList.prototype.get_attribute = function (attribute) {
        for (var index = 0; index < this.length; index++) {
            var attr = this[index].getAttribute(attribute);
            if (attr)
                return attr;
        }
        return false;
    };
    MicroList.prototype.set_attribute = function (attribute, value) {
        return this._map(function (el) {
            el.setAttribute(attribute, value);
            return el;
        });
    };
    // Styles
    MicroList.prototype.get_style = function (attribute) {
        for (var index = 0; index < this.length; index++) {
            var attr = this[index].style[attribute];
            if (attr)
                return attr;
        }
        return false;
    };
    MicroList.prototype.set_style = function (attribute, value) {
        return this._map(function (el) {
            el.style[attribute] = value;
            return el;
        });
    };
    // Content
    MicroList.prototype.set_html = function (html) {
        return this._map(function (el) {
            el.innerHTML = html;
            return el;
        });
    };
    MicroList.prototype.set_text = function (text) {
        return this._map(function (el) {
            el.innerHTML = '';
            el.appendChild(document.createTextNode(text));
            return el;
        });
    };
    MicroList.prototype.append = function (html) {
        return this._map(function (el) {
            el.innerHTML = html + el.innerHTML;
            return el;
        });
    };
    MicroList.prototype.prepend = function (html) {
        return this._map(function (el) {
            el.innerHTML = el.innerHTML + html;
            return el;
        });
    };
    // Form Value
    MicroList.prototype.value = function () {
        var values = [];
        for (var index = 0; index < this.length; index++) {
            values.push(this[index].value);
        }
        return values.length > 1 ? values : values[0];
    };
    // Events
    MicroList.prototype.bind = function (event, fn) {
        return this._map(function (el) {
            el.addEventListener(event, fn);
            return el;
        });
    };
    MicroList.prototype.unbind = function (event, fn) {
        return this._map(function (el) {
            el.removeEventListener(event, fn);
            return el;
        });
    };
    MicroList.prototype.delegate = function (target, event, fn) {
        return this._map(function (el) {
            el.addEventListener(event, function (e) {
                if (e.target.matches(target)) {
                    fn(e);
                }
            });
            return el;
        });
    };
    // Animation
    MicroList.prototype.animate = function (properties, duration, cb) {
        var _micro = this;
        var time = Date.now();
        var _func = function () {
            var elapsed_time = Date.now() - time;
            var animation_state = _micro.ease((1 / duration) * elapsed_time);
            if (animation_state > 1)
                animation_state = 1;
            for (var index = 0; index < Object.keys(properties).length; index++) {
                var key = Object.keys(properties)[index];
                var range = properties[key][1] - properties[key][0];
                var value = (range * animation_state) + properties[key][0];
                var suffix = 'px';
                if (['opacity'].indexOf(key) !== -1) {
                    suffix = '';
                }
                _micro.set_style(key, value + suffix);
            }
            if (elapsed_time <= duration) {
                window.requestAnimationFrame(_func);
            }
            else {
                cb(_micro);
            }
        };
        window.requestAnimationFrame(_func);
        return this;
    };
    MicroList.prototype.ease = function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; };
    // Utility
    MicroList.prototype._map = function (fn) {
        var results = new MicroList();
        for (var index = 0; index < this.length; index++) {
            results.push(fn(this[index], index));
        }
        return results;
    };
    return MicroList;
}(Array));
// Search
function Micro(selector) {
    var els = document.querySelectorAll(selector);
    return new MicroList(Array.prototype.slice.call(els));
}
