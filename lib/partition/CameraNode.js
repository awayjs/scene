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
    function CameraNode(pool, camera, partition) {
        _super.call(this, pool, camera, partition);
    }
    /**
     * @inheritDoc
     */
    CameraNode.prototype.acceptTraverser = function (traverser) {
        // todo: dead end for now, if it has a debug mesh, then sure accept that
    };
    CameraNode.id = "cameraNode";
    return CameraNode;
})(EntityNode);
module.exports = CameraNode;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vY2FtZXJhbm9kZS50cyJdLCJuYW1lcyI6WyJDYW1lcmFOb2RlIiwiQ2FtZXJhTm9kZS5jb25zdHJ1Y3RvciIsIkNhbWVyYU5vZGUuYWNjZXB0VHJhdmVyc2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFVBQVUsV0FBZSx5Q0FBeUMsQ0FBQyxDQUFDO0FBTTNFLEFBR0E7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFtQkE7SUFJbENBLFNBSktBLFVBQVVBLENBSUhBLElBQW1CQSxFQUFFQSxNQUFjQSxFQUFFQSxTQUFtQkE7UUFFbkVDLGtCQUFNQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLG9DQUFlQSxHQUF0QkEsVUFBdUJBLFNBQXVCQTtRQUU3Q0Usd0VBQXdFQTtJQUN6RUEsQ0FBQ0E7SUFiYUYsYUFBRUEsR0FBVUEsWUFBWUEsQ0FBQ0E7SUFjeENBLGlCQUFDQTtBQUFEQSxDQWhCQSxBQWdCQ0EsRUFoQndCLFVBQVUsRUFnQmxDO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6InBhcnRpdGlvbi9DYW1lcmFOb2RlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcbmltcG9ydCBQYXJ0aXRpb25cdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3BhcnRpdGlvbi9QYXJ0aXRpb25cIik7XG5pbXBvcnQgQ29sbGVjdG9yQmFzZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWRpc3BsYXkvbGliL3RyYXZlcnNlL0NvbGxlY3RvckJhc2VcIik7XG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xuaW1wb3J0IEVudGl0eU5vZGVQb29sXHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcG9vbC9FbnRpdHlOb2RlUG9vbFwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5wYXJ0aXRpb24uQ2FtZXJhTm9kZVxuICovXG5jbGFzcyBDYW1lcmFOb2RlIGV4dGVuZHMgRW50aXR5Tm9kZVxue1xuXHRwdWJsaWMgc3RhdGljIGlkOnN0cmluZyA9IFwiY2FtZXJhTm9kZVwiO1xuXG5cdGNvbnN0cnVjdG9yKHBvb2w6RW50aXR5Tm9kZVBvb2wsIGNhbWVyYTpJRW50aXR5LCBwYXJ0aXRpb246UGFydGl0aW9uKVxuXHR7XG5cdFx0c3VwZXIocG9vbCwgY2FtZXJhLCBwYXJ0aXRpb24pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgYWNjZXB0VHJhdmVyc2VyKHRyYXZlcnNlcjpDb2xsZWN0b3JCYXNlKVxuXHR7XG5cdFx0Ly8gdG9kbzogZGVhZCBlbmQgZm9yIG5vdywgaWYgaXQgaGFzIGEgZGVidWcgbWVzaCwgdGhlbiBzdXJlIGFjY2VwdCB0aGF0XG5cdH1cbn1cblxuZXhwb3J0ID0gQ2FtZXJhTm9kZTsiXX0=