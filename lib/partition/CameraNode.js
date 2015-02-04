var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntityNode = require("awayjs-display/lib/partition/EntityNode");
/**
 * @class away.partition.CameraNode
 */
var CameraNode = (function (_super) {
    __extends(CameraNode, _super);
    function CameraNode(camera) {
        _super.call(this, camera);
    }
    /**
     * @inheritDoc
     */
    CameraNode.prototype.acceptTraverser = function (traverser) {
        // todo: dead end for now, if it has a debug mesh, then sure accept that
    };
    return CameraNode;
})(EntityNode);
module.exports = CameraNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vQ2FtZXJhTm9kZS50cyJdLCJuYW1lcyI6WyJDYW1lcmFOb2RlIiwiQ2FtZXJhTm9kZS5jb25zdHJ1Y3RvciIsIkNhbWVyYU5vZGUuYWNjZXB0VHJhdmVyc2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFVBQVUsV0FBZSx5Q0FBeUMsQ0FBQyxDQUFDO0FBSTNFLEFBR0E7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFtQkE7SUFFbENBLFNBRktBLFVBQVVBLENBRUhBLE1BQWNBO1FBRXpCQyxrQkFBTUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDZkEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLG9DQUFlQSxHQUF0QkEsVUFBdUJBLFNBQW9CQTtRQUUxQ0Usd0VBQXdFQTtJQUN6RUEsQ0FBQ0E7SUFDRkYsaUJBQUNBO0FBQURBLENBZEEsQUFjQ0EsRUFkd0IsVUFBVSxFQWNsQztBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJwYXJ0aXRpb24vQ2FtZXJhTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XHJcbmltcG9ydCBJQ29sbGVjdG9yXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9JQ29sbGVjdG9yXCIpO1xyXG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBhd2F5LnBhcnRpdGlvbi5DYW1lcmFOb2RlXHJcbiAqL1xyXG5jbGFzcyBDYW1lcmFOb2RlIGV4dGVuZHMgRW50aXR5Tm9kZVxyXG57XHJcblx0Y29uc3RydWN0b3IoY2FtZXJhOklFbnRpdHkpXHJcblx0e1xyXG5cdFx0c3VwZXIoY2FtZXJhKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBpbmhlcml0RG9jXHJcblx0ICovXHJcblx0cHVibGljIGFjY2VwdFRyYXZlcnNlcih0cmF2ZXJzZXI6SUNvbGxlY3RvcilcclxuXHR7XHJcblx0XHQvLyB0b2RvOiBkZWFkIGVuZCBmb3Igbm93LCBpZiBpdCBoYXMgYSBkZWJ1ZyBtZXNoLCB0aGVuIHN1cmUgYWNjZXB0IHRoYXRcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCA9IENhbWVyYU5vZGU7Il19