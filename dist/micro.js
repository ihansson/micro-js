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
    MicroList.prototype.check = function () {
        console.log('hello');
        return this;
    };
    return MicroList;
}(Array));
function Find(selector) {
    var els = document.querySelectorAll(selector);
    return new MicroList(Array.prototype.slice.call(els));
}
