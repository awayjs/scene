"use strict";
var AttributesBuffer_1 = require("@awayjs/core/lib/attributes/AttributesBuffer");
var Float3Attributes_1 = require("@awayjs/core/lib/attributes/Float3Attributes");
var Float4Attributes_1 = require("@awayjs/core/lib/attributes/Float4Attributes");
var Byte4Attributes_1 = require("@awayjs/core/lib/attributes/Byte4Attributes");
var Vector3D_1 = require("@awayjs/core/lib/geom/Vector3D");
var Box_1 = require("@awayjs/core/lib/geom/Box");
var Sphere_1 = require("@awayjs/core/lib/geom/Sphere");
var HitTestCache_1 = require("../graphics/HitTestCache");
var ElementsUtils = (function () {
    function ElementsUtils() {
    }
    ElementsUtils.generateFaceNormals = function (indexAttributes, positionAttributes, faceNormalAttributes, count, offset) {
        if (offset === void 0) { offset = 0; }
        var indices = indexAttributes.get(count, offset);
        var positions = positionAttributes.get(positionAttributes.count);
        if (faceNormalAttributes == null)
            faceNormalAttributes = new Float4Attributes_1.Float4Attributes(count + offset);
        else if (faceNormalAttributes.count < count + offset)
            faceNormalAttributes.count = count + offset;
        var indexDim = indexAttributes.stride;
        var posDim = positionAttributes.dimensions;
        var posStride = positionAttributes.stride;
        var faceNormals = faceNormalAttributes.get(count, offset);
        var len = count * indexDim;
        var i = 0;
        var j = 0;
        var index;
        var x1, x2, x3;
        var y1, y2, y3;
        var z1, z2, z3;
        var dx1, dy1, dz1;
        var dx2, dy2, dz2;
        var cx, cy, cz;
        var d;
        if (posDim == 3) {
            for (i = 0; i < len; i += indexDim) {
                index = indices[i] * posStride;
                x1 = positions[index];
                y1 = positions[index + 1];
                z1 = positions[index + 2];
                index = indices[i + 1] * posStride;
                x2 = positions[index];
                y2 = positions[index + 1];
                z2 = positions[index + 2];
                index = indices[i + 2] * posStride;
                x3 = positions[index];
                y3 = positions[index + 1];
                z3 = positions[index + 2];
                dx1 = x3 - x1;
                dy1 = y3 - y1;
                dz1 = z3 - z1;
                dx2 = x2 - x1;
                dy2 = y2 - y1;
                dz2 = z2 - z1;
                cx = dz1 * dy2 - dy1 * dz2;
                cy = dx1 * dz2 - dz1 * dx2;
                cz = dy1 * dx2 - dx1 * dy2;
                d = Math.sqrt(cx * cx + cy * cy + cz * cz);
                // length of cross product = 2*triangle area
                faceNormals[j++] = cx;
                faceNormals[j++] = cy;
                faceNormals[j++] = cz;
                faceNormals[j++] = d;
            }
        }
        else if (posDim == 2) {
            for (i = 0; i < len; i += indexDim) {
                faceNormals[j++] = 0;
                faceNormals[j++] = 0;
                faceNormals[j++] = 1;
                faceNormals[j++] = 1;
            }
        }
        return faceNormalAttributes;
    };
    ElementsUtils.generateNormals = function (indexAttributes, faceNormalAttributes, normalAttributes, concatenatedBuffer) {
        var indices = indexAttributes.get(indexAttributes.count);
        var faceNormals = faceNormalAttributes.get(faceNormalAttributes.count);
        if (normalAttributes == null)
            normalAttributes = new Float3Attributes_1.Float3Attributes(concatenatedBuffer);
        var indexDim = indexAttributes.dimensions;
        var normalStride = normalAttributes.stride;
        var normals = normalAttributes.get(normalAttributes.count);
        var i;
        var len = normalAttributes.count * normalStride;
        //clear normal values
        for (i = 0; i < len; i += normalStride) {
            normals[i] = 0;
            normals[i + 1] = 0;
            normals[i + 2] = 0;
        }
        len = indexAttributes.count * indexDim;
        var index;
        var f1 = 0;
        var f2 = 1;
        var f3 = 2;
        //collect face normals
        for (i = 0; i < len; i += indexDim) {
            index = indices[i] * normalStride;
            normals[index] += faceNormals[f1];
            normals[index + 1] += faceNormals[f2];
            normals[index + 2] += faceNormals[f3];
            index = indices[i + 1] * normalStride;
            normals[index] += faceNormals[f1];
            normals[index + 1] += faceNormals[f2];
            normals[index + 2] += faceNormals[f3];
            index = indices[i + 2] * normalStride;
            normals[index] += faceNormals[f1];
            normals[index + 1] += faceNormals[f2];
            normals[index + 2] += faceNormals[f3];
            f1 += 4;
            f2 += 4;
            f3 += 4;
        }
        len = normalAttributes.count * normalStride;
        var vx;
        var vy;
        var vz;
        var d;
        //normalise normals collections
        for (i = 0; i < len; i += normalStride) {
            vx = normals[i];
            vy = normals[i + 1];
            vz = normals[i + 2];
            d = 1.0 / Math.sqrt(vx * vx + vy * vy + vz * vz);
            normals[i] = vx * d;
            normals[i + 1] = vy * d;
            normals[i + 2] = vz * d;
        }
        return normalAttributes;
    };
    ElementsUtils.generateFaceTangents = function (indexAttributes, positionAttributes, uvAttributes, faceTangentAttributes, count, offset, useFaceWeights) {
        if (offset === void 0) { offset = 0; }
        if (useFaceWeights === void 0) { useFaceWeights = false; }
        var indices = indexAttributes.get(count, offset);
        var positions = positionAttributes.get(positionAttributes.count);
        var uvs = uvAttributes.get(uvAttributes.count);
        if (faceTangentAttributes == null)
            faceTangentAttributes = new Float4Attributes_1.Float4Attributes(count + offset);
        else if (faceTangentAttributes.count < count + offset)
            faceTangentAttributes.count = count + offset;
        var indexDim = indexAttributes.dimensions;
        var posDim = positionAttributes.dimensions;
        var posStride = positionAttributes.stride;
        var uvStride = uvAttributes.stride;
        var faceTangents = faceTangentAttributes.get(count, offset);
        var i = 0;
        var index1;
        var index2;
        var index3;
        var v0;
        var v1;
        var v2;
        var dv1;
        var dv2;
        var denom;
        var x0, y0, z0;
        var dx1, dy1, dz1;
        var dx2, dy2, dz2;
        var cx, cy, cz;
        //multiply by dimension to get index length
        var len = count * indexDim;
        for (i = 0; i < len; i += indexDim) {
            index1 = indices[i];
            index2 = indices[i + 1];
            index3 = indices[i + 2];
            v0 = uvs[index1 * uvStride + 1];
            dv1 = uvs[index2 * uvStride + 1] - v0;
            dv2 = uvs[index3 * uvStride + 1] - v0;
            v0 = index1 * posStride;
            v1 = index2 * posStride;
            v2 = index3 * posStride;
            x0 = positions[v0];
            dx1 = positions[v1] - x0;
            dx2 = positions[v2] - x0;
            cx = dv2 * dx1 - dv1 * dx2;
            y0 = positions[v0 + 1];
            dy1 = positions[v1 + 1] - y0;
            dy2 = positions[v2 + 1] - y0;
            cy = dv2 * dy1 - dv1 * dy2;
            if (posDim == 3) {
                z0 = positions[v0 + 2];
                dz1 = positions[v1 + 2] - z0;
                dz2 = positions[v2 + 2] - z0;
                cz = dv2 * dz1 - dv1 * dz2;
            }
            else {
                cz = 0;
            }
            denom = 1 / Math.sqrt(cx * cx + cy * cy + cz * cz);
            faceTangents[i] = denom * cx;
            faceTangents[i + 1] = denom * cy;
            faceTangents[i + 2] = denom * cz;
        }
        return faceTangentAttributes;
    };
    ElementsUtils.generateTangents = function (indexAttributes, faceTangentAttributes, faceNormalAttributes, tangentAttributes, concatenatedBuffer) {
        var indices = indexAttributes.get(indexAttributes.count);
        var faceTangents = faceTangentAttributes.get(faceTangentAttributes.count);
        var faceNormals = faceNormalAttributes.get(faceNormalAttributes.count);
        if (tangentAttributes == null)
            tangentAttributes = new Float3Attributes_1.Float3Attributes(concatenatedBuffer);
        var indexDim = indexAttributes.dimensions;
        var tangentStride = tangentAttributes.stride;
        var tangents = tangentAttributes.get(tangentAttributes.count);
        var i;
        var len = tangentAttributes.count * tangentStride;
        //clear tangent values
        for (i = 0; i < len; i += tangentStride) {
            tangents[i] = 0;
            tangents[i + 1] = 0;
            tangents[i + 2] = 0;
        }
        var weight;
        var index;
        var f1 = 0;
        var f2 = 1;
        var f3 = 2;
        var f4 = 3;
        len = indexAttributes.count * indexDim;
        //collect face tangents
        for (i = 0; i < len; i += indexDim) {
            weight = faceNormals[f4];
            index = indices[i] * tangentStride;
            tangents[index++] += faceTangents[f1] * weight;
            tangents[index++] += faceTangents[f2] * weight;
            tangents[index] += faceTangents[f3] * weight;
            index = indices[i + 1] * tangentStride;
            tangents[index++] += faceTangents[f1] * weight;
            tangents[index++] += faceTangents[f2] * weight;
            tangents[index] += faceTangents[f3] * weight;
            index = indices[i + 2] * tangentStride;
            tangents[index++] += faceTangents[f1] * weight;
            tangents[index++] += faceTangents[f2] * weight;
            tangents[index] += faceTangents[f3] * weight;
            f1 += 3;
            f2 += 3;
            f3 += 3;
            f4 += 4;
        }
        var vx;
        var vy;
        var vz;
        var d;
        //normalise tangents collections
        for (i = 0; i < len; i += tangentStride) {
            vx = tangents[i];
            vy = tangents[i + 1];
            vz = tangents[i + 2];
            d = 1.0 / Math.sqrt(vx * vx + vy * vy + vz * vz);
            tangents[i] = vx * d;
            tangents[i + 1] = vy * d;
            tangents[i + 2] = vz * d;
        }
        return tangentAttributes;
    };
    ElementsUtils.generateColors = function (indexAttributes, colorAttributes, concatenatedBuffer, count, offset) {
        if (offset === void 0) { offset = 0; }
        if (colorAttributes == null)
            colorAttributes = new Byte4Attributes_1.Byte4Attributes(concatenatedBuffer);
        if (colorAttributes.count < count + offset)
            colorAttributes.count = count + offset;
        var colors = colorAttributes.get(count, offset);
        var colorStride = colorAttributes.stride;
        var len = colorAttributes.count * colorStride;
        for (var i = 0; i < len; i += colorStride) {
            colors[i] = 0xFF;
            colors[i + 1] = 0xFF;
            colors[i + 2] = 0xFF;
            colors[i + 3] = 0xFF;
        }
        return colorAttributes;
    };
    ElementsUtils.scale = function (scaleA, scaleB, scaleC, output, count, offset) {
        if (offset === void 0) { offset = 0; }
        if (output.count < count + offset)
            output.count = count + offset;
        var scaleArray = new Float32Array([scaleA, scaleB, scaleC]);
        var values = output.get(count, offset);
        var outputStride = output.stride;
        var outputDim = output.dimensions;
        var i;
        var j;
        var len = count * outputStride;
        for (i = 0; i < len; i += outputStride)
            for (j = 0; j < outputDim; j++)
                values[i + j] *= scaleArray[j];
        output.invalidate();
    };
    ElementsUtils.applyTransformation = function (transform, positionAttributes, normalAttributes, tangentAttributes, count, offset) {
        if (offset === void 0) { offset = 0; }
        //todo: make this compatible with 2-dimensional positions
        var positions = positionAttributes.get(count, offset);
        var positionStride = positionAttributes.stride;
        var normals;
        var normalStride;
        if (normalAttributes) {
            normals = normalAttributes.get(count, offset);
            normalStride = normalAttributes.stride;
        }
        var tangents;
        var tangentStride;
        if (tangentAttributes) {
            tangents = tangentAttributes.get(count, offset);
            tangentStride = tangentAttributes.stride;
        }
        var i;
        var i1;
        var i2;
        var vector = new Vector3D_1.Vector3D();
        var invTranspose;
        if (normalAttributes || tangentAttributes) {
            invTranspose = transform.clone();
            invTranspose.invert();
            invTranspose.transpose();
        }
        var vi0 = 0;
        var ni0 = 0;
        var ti0 = 0;
        for (i = 0; i < count; ++i) {
            // bake position
            i1 = vi0 + 1;
            i2 = vi0 + 2;
            vector.x = positions[vi0];
            vector.y = positions[i1];
            vector.z = positions[i2];
            vector = transform.transformVector(vector);
            positions[vi0] = vector.x;
            positions[i1] = vector.y;
            positions[i2] = vector.z;
            vi0 += positionStride;
            if (normals) {
                // bake normal
                i1 = ni0 + 1;
                i2 = ni0 + 2;
                vector.x = normals[ni0];
                vector.y = normals[i1];
                vector.z = normals[i2];
                vector = invTranspose.deltaTransformVector(vector);
                vector.normalize();
                normals[ni0] = vector.x;
                normals[i1] = vector.y;
                normals[i2] = vector.z;
                ni0 += normalStride;
            }
            if (tangents) {
                // bake tangent
                i1 = ti0 + 1;
                i2 = ti0 + 2;
                vector.x = tangents[ti0];
                vector.y = tangents[i1];
                vector.z = tangents[i2];
                vector = invTranspose.deltaTransformVector(vector);
                vector.normalize();
                tangents[ti0] = vector.x;
                tangents[i1] = vector.y;
                tangents[i2] = vector.z;
                ti0 += tangentStride;
            }
        }
        positionAttributes.invalidate();
        if (normalAttributes)
            normalAttributes.invalidate();
        if (tangentAttributes)
            tangentAttributes.invalidate();
    };
    ElementsUtils.getSubIndices = function (indexAttributes, numVertices, indexMappings, indexOffset) {
        if (indexOffset === void 0) { indexOffset = 0; }
        var buffer = indexAttributes.attributesBuffer;
        var numIndices = indexAttributes.length;
        //reset mappings
        indexMappings.length = 0;
        //shortcut for those buffers that fit into the maximum buffer sizes
        if (numIndices < ElementsUtils.LIMIT_INDICES && numVertices < ElementsUtils.LIMIT_VERTS)
            return buffer;
        var i;
        var indices = indexAttributes.get(indexAttributes.count, indexOffset);
        var splitIndices = new Array();
        var indexSwap = ElementsUtils._indexSwap;
        indexSwap.length = numIndices;
        for (i = 0; i < numIndices; i++)
            indexSwap[i] = -1;
        var originalIndex;
        var splitIndex;
        var index = 0;
        var offsetLength = indexOffset * indexAttributes.dimensions;
        // Loop over all triangles
        i = 0;
        while (i < numIndices + offsetLength && i + 1 < ElementsUtils.LIMIT_INDICES && index + 1 < ElementsUtils.LIMIT_VERTS) {
            originalIndex = indices[i];
            if (indexSwap[originalIndex] >= 0) {
                splitIndex = indexSwap[originalIndex];
            }
            else {
                // This vertex does not yet exist in the split list and
                // needs to be copied from the long list.
                splitIndex = index++;
                indexSwap[originalIndex] = splitIndex;
                indexMappings[splitIndex] = originalIndex;
            }
            // Store new index, which may have come from the swap look-up,
            // or from copying a new set of vertex data from the original vector
            splitIndices[i++] = splitIndex;
        }
        buffer = new AttributesBuffer_1.AttributesBuffer(indexAttributes.size * indexAttributes.dimensions, splitIndices.length / indexAttributes.dimensions);
        indexAttributes = indexAttributes.clone(buffer);
        indexAttributes.set(splitIndices);
        return buffer;
    };
    ElementsUtils.getSubVertices = function (vertexBuffer, indexMappings) {
        if (!indexMappings.length)
            return vertexBuffer;
        var stride = vertexBuffer.stride;
        var vertices = vertexBuffer.bufferView;
        var splitVerts = new Uint8Array(indexMappings.length * stride);
        var splitIndex;
        var originalIndex;
        var i = 0;
        var j = 0;
        var len = indexMappings.length;
        for (i = 0; i < len; i++) {
            splitIndex = i * stride;
            originalIndex = indexMappings[i] * stride;
            for (j = 0; j < stride; j++)
                splitVerts[splitIndex + j] = vertices[originalIndex + j];
        }
        vertexBuffer = new AttributesBuffer_1.AttributesBuffer(stride, len);
        vertexBuffer.bufferView = splitVerts;
        return vertexBuffer;
    };
    //TODO - generate this dyanamically based on num tris
    ElementsUtils.hitTestTriangleElements = function (x, y, z, box, triangleElements, count, offset) {
        if (offset === void 0) { offset = 0; }
        var positionAttributes = triangleElements.positions;
        var curveAttributes = triangleElements.getCustomAtributes("curves");
        var posStride = positionAttributes.stride;
        var curveStride = curveAttributes.stride;
        var positions = positionAttributes.get(count, offset);
        var curves = curveAttributes ? curveAttributes.get(count, offset) : null;
        var id0;
        var id1;
        var id2;
        var ax;
        var ay;
        var bx;
        var by;
        var cx;
        var cy;
        var hitTestCache = triangleElements.hitTestCache[offset] || (triangleElements.hitTestCache[offset] = new HitTestCache_1.HitTestCache());
        var index = -1; //hitTestCache.lastCollisionIndex;
        if (index != -1 && index < count) {
            precheck: {
                id0 = index + 2;
                id1 = index + 1;
                id2 = index + 0;
                ax = positions[id0 * posStride];
                ay = positions[id0 * posStride + 1];
                bx = positions[id1 * posStride];
                by = positions[id1 * posStride + 1];
                cx = positions[id2 * posStride];
                cy = positions[id2 * posStride + 1];
                //console.log(ax, ay, bx, by, cx, cy);
                //from a to p
                var dx = ax - x;
                var dy = ay - y;
                //edge normal (a-b)
                var nx = by - ay;
                var ny = -(bx - ax);
                //console.log(ax,ay,bx,by,cx,cy);
                var dot = (dx * nx) + (dy * ny);
                if (dot > 0)
                    break precheck;
                dx = bx - x;
                dy = by - y;
                nx = cy - by;
                ny = -(cx - bx);
                dot = (dx * nx) + (dy * ny);
                if (dot > 0)
                    break precheck;
                dx = cx - x;
                dy = cy - y;
                nx = ay - cy;
                ny = -(ax - cx);
                dot = (dx * nx) + (dy * ny);
                if (dot > 0)
                    break precheck;
                if (curves) {
                    //check if not solid
                    if (curves[id0 * curveStride + 2] != -128) {
                        var v0x = bx - ax;
                        var v0y = by - ay;
                        var v1x = cx - ax;
                        var v1y = cy - ay;
                        var v2x = x - ax;
                        var v2y = y - ay;
                        var den = v0x * v1y - v1x * v0y;
                        var v = (v2x * v1y - v1x * v2y) / den;
                        var w = (v0x * v2y - v2x * v0y) / den;
                        //var u:number = 1 - v - w;	//commented out as inlined away
                        //here be dragons
                        var uu = 0.5 * v + w;
                        var vv = w;
                        var d = uu * uu - vv;
                        var az = curves[id0 * curveStride];
                        if (d > 0 && az == -128) {
                            break precheck;
                            ;
                        }
                        else if (d < 0 && az == 127) {
                            break precheck;
                            ;
                        }
                    }
                }
                return true;
            }
        }
        //hard coded min vertex count to bother using a grid for
        if (count > 150) {
            var cells = hitTestCache.cells;
            var divisions = cells.length ? hitTestCache.divisions : (hitTestCache.divisions = Math.min(Math.ceil(Math.sqrt(count)), 32));
            var conversionX = divisions / box.width;
            var conversionY = divisions / box.height;
            var minx = box.x;
            var miny = box.y;
            if (!cells.length) {
                //now we have bounds start creating grid cells and filling
                cells.length = divisions * divisions;
                for (var k = 0; k < count; k += 3) {
                    id0 = k + 2;
                    id1 = k + 1;
                    id2 = k + 0;
                    ax = positions[id0 * posStride];
                    ay = positions[id0 * posStride + 1];
                    bx = positions[id1 * posStride];
                    by = positions[id1 * posStride + 1];
                    cx = positions[id2 * posStride];
                    cy = positions[id2 * posStride + 1];
                    //subtractions to push into positive space
                    var min_index_x = Math.floor((Math.min(ax, bx, cx) - minx) * conversionX);
                    var min_index_y = Math.floor((Math.min(ay, by, cy) - miny) * conversionY);
                    var max_index_x = Math.floor((Math.max(ax, bx, cx) - minx) * conversionX);
                    var max_index_y = Math.floor((Math.max(ay, by, cy) - miny) * conversionY);
                    for (var i = min_index_x; i <= max_index_x; i++) {
                        for (var j = min_index_y; j <= max_index_y; j++) {
                            var index = i + j * divisions;
                            var nodes = cells[index] || (cells[index] = new Array());
                            //push in the triangle ids
                            nodes.push(id0, id1, id2);
                        }
                    }
                }
            }
            var index_x = Math.floor((x - minx) * conversionX);
            var index_y = Math.floor((y - miny) * conversionY);
            if ((index_x < 0 || index_x > divisions || index_y < 0 || index_y > divisions))
                return false;
            var nodes = cells[index_x + index_y * divisions];
            if (nodes == null)
                return false;
            var nodeCount = nodes.length;
            for (var k = 0; k < nodeCount; k += 3) {
                id2 = nodes[k + 2];
                if (id2 == index)
                    continue;
                id1 = nodes[k + 1];
                id0 = nodes[k];
                ax = positions[id0 * posStride];
                ay = positions[id0 * posStride + 1];
                bx = positions[id1 * posStride];
                by = positions[id1 * posStride + 1];
                cx = positions[id2 * posStride];
                cy = positions[id2 * posStride + 1];
                //from a to p
                var dx = ax - x;
                var dy = ay - y;
                //edge normal (a-b)
                var nx = by - ay;
                var ny = -(bx - ax);
                var dot = (dx * nx) + (dy * ny);
                if (dot > 0)
                    continue;
                dx = bx - x;
                dy = by - y;
                nx = cy - by;
                ny = -(cx - bx);
                dot = (dx * nx) + (dy * ny);
                if (dot > 0)
                    continue;
                dx = cx - x;
                dy = cy - y;
                nx = ay - cy;
                ny = -(ax - cx);
                dot = (dx * nx) + (dy * ny);
                if (dot > 0)
                    continue;
                if (curves) {
                    //check if not solid
                    if (curves[id0 * curveStride + 2] != -128) {
                        var v0x = bx - ax;
                        var v0y = by - ay;
                        var v1x = cx - ax;
                        var v1y = cy - ay;
                        var v2x = x - ax;
                        var v2y = y - ay;
                        var den = v0x * v1y - v1x * v0y;
                        var v = (v2x * v1y - v1x * v2y) / den;
                        var w = (v0x * v2y - v2x * v0y) / den;
                        //var u:number = 1 - v - w;	//commented out as inlined away
                        //here be dragons
                        var uu = 0.5 * v + w;
                        var vv = w;
                        var d = uu * uu - vv;
                        var az = curves[id0 * curveStride];
                        if (d > 0 && az == -128)
                            continue;
                        else if (d < 0 && az == 127)
                            continue;
                    }
                }
                hitTestCache.lastCollisionIndex = id2;
                return true;
            }
            return false;
        }
        //brute force
        for (var k = 0; k < count; k += 3) {
            id2 = k + 0;
            if (id2 == index)
                continue;
            id1 = k + 1;
            id0 = k + 2;
            ax = positions[id0 * posStride];
            ay = positions[id0 * posStride + 1];
            bx = positions[id1 * posStride];
            by = positions[id1 * posStride + 1];
            cx = positions[id2 * posStride];
            cy = positions[id2 * posStride + 1];
            //console.log(ax, ay, bx, by, cx, cy);
            //from a to p
            var dx = ax - x;
            var dy = ay - y;
            //edge normal (a-b)
            var nx = by - ay;
            var ny = -(bx - ax);
            //console.log(ax,ay,bx,by,cx,cy);
            var dot = (dx * nx) + (dy * ny);
            if (dot > 0)
                continue;
            dx = bx - x;
            dy = by - y;
            nx = cy - by;
            ny = -(cx - bx);
            dot = (dx * nx) + (dy * ny);
            if (dot > 0)
                continue;
            dx = cx - x;
            dy = cy - y;
            nx = ay - cy;
            ny = -(ax - cx);
            dot = (dx * nx) + (dy * ny);
            if (dot > 0)
                continue;
            if (curves) {
                //check if not solid
                if (curves[id0 * curveStride + 2] != -128) {
                    var v0x = bx - ax;
                    var v0y = by - ay;
                    var v1x = cx - ax;
                    var v1y = cy - ay;
                    var v2x = x - ax;
                    var v2y = y - ay;
                    var den = v0x * v1y - v1x * v0y;
                    var v = (v2x * v1y - v1x * v2y) / den;
                    var w = (v0x * v2y - v2x * v0y) / den;
                    //var u:number = 1 - v - w;	//commented out as inlined away
                    //here be dragons
                    var uu = 0.5 * v + w;
                    var vv = w;
                    var d = uu * uu - vv;
                    var az = curves[id0 * curveStride];
                    if (d > 0 && az == -128) {
                        continue;
                    }
                    else if (d < 0 && az == 127) {
                        continue;
                    }
                }
            }
            hitTestCache.lastCollisionIndex = id2;
            return true;
        }
        return false;
    };
    ElementsUtils.getTriangleGraphicsBoxBounds = function (positionAttributes, output, count, offset) {
        if (offset === void 0) { offset = 0; }
        var positions = positionAttributes.get(count, offset);
        var posDim = positionAttributes.dimensions;
        var posStride = positionAttributes.stride;
        var pos;
        var minX = 0, minY = 0, minZ = 0;
        var maxX = 0, maxY = 0, maxZ = 0;
        var len = count * posStride;
        for (var i = 0; i < len; i += posStride) {
            if (i == 0) {
                maxX = minX = positions[i];
                maxY = minY = positions[i + 1];
                maxZ = minZ = (posDim == 3) ? positions[i + 2] : 0;
            }
            else {
                pos = positions[i];
                if (pos < minX)
                    minX = pos;
                else if (pos > maxX)
                    maxX = pos;
                pos = positions[i + 1];
                if (pos < minY)
                    minY = pos;
                else if (pos > maxY)
                    maxY = pos;
                if (posDim == 3) {
                    pos = positions[i + 2];
                    if (pos < minZ)
                        minZ = pos;
                    else if (pos > maxZ)
                        maxZ = pos;
                }
            }
        }
        if (output == null)
            output = new Box_1.Box();
        output.x = minX;
        output.y = minY;
        output.z = minZ;
        output.right = maxX;
        output.bottom = maxY;
        output.back = maxZ;
        return output;
    };
    ElementsUtils.getTriangleGraphicsSphereBounds = function (positionAttributes, center, output, count, offset) {
        if (offset === void 0) { offset = 0; }
        var positions = positionAttributes.get(count, offset);
        var posDim = positionAttributes.dimensions;
        var posStride = positionAttributes.stride;
        var maxRadiusSquared = 0;
        var radiusSquared;
        var len = count * posStride;
        var distanceX;
        var distanceY;
        var distanceZ;
        for (var i = 0; i < len; i += posStride) {
            distanceX = positions[i] - center.x;
            distanceY = positions[i + 1] - center.y;
            distanceZ = (posDim == 3) ? positions[i + 2] - center.z : -center.z;
            radiusSquared = distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ;
            if (maxRadiusSquared < radiusSquared)
                maxRadiusSquared = radiusSquared;
        }
        if (output == null)
            output = new Sphere_1.Sphere();
        output.x = center.x;
        output.y = center.y;
        output.z = center.z;
        output.radius = Math.sqrt(maxRadiusSquared);
        return output;
    };
    ElementsUtils.tempFloat32x4 = new Float32Array(4);
    ElementsUtils.LIMIT_VERTS = 0xffff;
    ElementsUtils.LIMIT_INDICES = 0xffffff;
    ElementsUtils._indexSwap = new Array();
    return ElementsUtils;
}());
exports.ElementsUtils = ElementsUtils;
