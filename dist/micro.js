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
    MicroList.prototype._map = function (fn) {
        var results = new MicroList();
        for (var index = 0; index < this.length; index++) {
            results.push(fn(this[index], index));
        }
        return results;
    };
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
    return MicroList;
}(Array));
function Find(selector) {
    var els = document.querySelectorAll(selector);
    return new MicroList(Array.prototype.slice.call(els));
}
