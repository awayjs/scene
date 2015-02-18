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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vQ2FtZXJhTm9kZS50cyJdLCJuYW1lcyI6WyJDYW1lcmFOb2RlIiwiQ2FtZXJhTm9kZS5jb25zdHJ1Y3RvciIsIkNhbWVyYU5vZGUuYWNjZXB0VHJhdmVyc2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLFVBQVUsV0FBZSx5Q0FBeUMsQ0FBQyxDQUFDO0FBTTNFLEFBR0E7O0dBREc7SUFDRyxVQUFVO0lBQVNBLFVBQW5CQSxVQUFVQSxVQUFtQkE7SUFJbENBLFNBSktBLFVBQVVBLENBSUhBLElBQW1CQSxFQUFFQSxNQUFjQSxFQUFFQSxTQUFtQkE7UUFFbkVDLGtCQUFNQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUNoQ0EsQ0FBQ0E7SUFFREQ7O09BRUdBO0lBQ0lBLG9DQUFlQSxHQUF0QkEsVUFBdUJBLFNBQXVCQTtRQUU3Q0Usd0VBQXdFQTtJQUN6RUEsQ0FBQ0E7SUFiYUYsYUFBRUEsR0FBVUEsWUFBWUEsQ0FBQ0E7SUFjeENBLGlCQUFDQTtBQUFEQSxDQWhCQSxBQWdCQ0EsRUFoQndCLFVBQVUsRUFnQmxDO0FBRUQsQUFBb0IsaUJBQVgsVUFBVSxDQUFDIiwiZmlsZSI6InBhcnRpdGlvbi9DYW1lcmFOb2RlLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbnRpdHlOb2RlXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wYXJ0aXRpb24vRW50aXR5Tm9kZVwiKTtcclxuaW1wb3J0IFBhcnRpdGlvblx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtZGlzcGxheS9saWIvcGFydGl0aW9uL1BhcnRpdGlvblwiKTtcclxuaW1wb3J0IENvbGxlY3RvckJhc2VcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi90cmF2ZXJzZS9Db2xsZWN0b3JCYXNlXCIpO1xyXG5pbXBvcnQgSUVudGl0eVx0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9lbnRpdGllcy9JRW50aXR5XCIpO1xyXG5pbXBvcnQgRW50aXR5Tm9kZVBvb2xcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1kaXNwbGF5L2xpYi9wb29sL0VudGl0eU5vZGVQb29sXCIpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBhd2F5LnBhcnRpdGlvbi5DYW1lcmFOb2RlXHJcbiAqL1xyXG5jbGFzcyBDYW1lcmFOb2RlIGV4dGVuZHMgRW50aXR5Tm9kZVxyXG57XHJcblx0cHVibGljIHN0YXRpYyBpZDpzdHJpbmcgPSBcImNhbWVyYU5vZGVcIjtcclxuXHJcblx0Y29uc3RydWN0b3IocG9vbDpFbnRpdHlOb2RlUG9vbCwgY2FtZXJhOklFbnRpdHksIHBhcnRpdGlvbjpQYXJ0aXRpb24pXHJcblx0e1xyXG5cdFx0c3VwZXIocG9vbCwgY2FtZXJhLCBwYXJ0aXRpb24pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQGluaGVyaXREb2NcclxuXHQgKi9cclxuXHRwdWJsaWMgYWNjZXB0VHJhdmVyc2VyKHRyYXZlcnNlcjpDb2xsZWN0b3JCYXNlKVxyXG5cdHtcclxuXHRcdC8vIHRvZG86IGRlYWQgZW5kIGZvciBub3csIGlmIGl0IGhhcyBhIGRlYnVnIG1lc2gsIHRoZW4gc3VyZSBhY2NlcHQgdGhhdFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0ID0gQ2FtZXJhTm9kZTsiXX0=