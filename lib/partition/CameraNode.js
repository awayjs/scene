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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vY2FtZXJhbm9kZS50cyJdLCJuYW1lcyI6WyJDYW1lcmFOb2RlIiwiQ2FtZXJhTm9kZS5jb25zdHJ1Y3RvciIsIkNhbWVyYU5vZGUuYWNjZXB0VHJhdmVyc2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFVBQVUsV0FBZSx5Q0FBeUMsQ0FBQyxDQUFDO0FBSTNFLEFBR0E7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFtQkE7SUFFbENBLFNBRktBLFVBQVVBLENBRUhBLE1BQWNBO1FBRXpCQyxrQkFBTUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDZkEsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLG9DQUFlQSxHQUF0QkEsVUFBdUJBLFNBQW9CQTtRQUUxQ0Usd0VBQXdFQTtJQUN6RUEsQ0FBQ0E7SUFDRkYsaUJBQUNBO0FBQURBLENBZEEsQUFjQ0EsRUFkd0IsVUFBVSxFQWNsQztBQUVELEFBQW9CLGlCQUFYLFVBQVUsQ0FBQyIsImZpbGUiOiJwYXJ0aXRpb24vQ2FtZXJhTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW50aXR5Tm9kZVx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL0VudGl0eU5vZGVcIik7XG5pbXBvcnQgSUNvbGxlY3Rvclx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvdHJhdmVyc2UvSUNvbGxlY3RvclwiKTtcbmltcG9ydCBJRW50aXR5XHRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL2VudGl0aWVzL0lFbnRpdHlcIik7XG5cbi8qKlxuICogQGNsYXNzIGF3YXkucGFydGl0aW9uLkNhbWVyYU5vZGVcbiAqL1xuY2xhc3MgQ2FtZXJhTm9kZSBleHRlbmRzIEVudGl0eU5vZGVcbntcblx0Y29uc3RydWN0b3IoY2FtZXJhOklFbnRpdHkpXG5cdHtcblx0XHRzdXBlcihjYW1lcmEpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgYWNjZXB0VHJhdmVyc2VyKHRyYXZlcnNlcjpJQ29sbGVjdG9yKVxuXHR7XG5cdFx0Ly8gdG9kbzogZGVhZCBlbmQgZm9yIG5vdywgaWYgaXQgaGFzIGEgZGVidWcgbWVzaCwgdGhlbiBzdXJlIGFjY2VwdCB0aGF0XG5cdH1cbn1cblxuZXhwb3J0ID0gQ2FtZXJhTm9kZTsiXX0=