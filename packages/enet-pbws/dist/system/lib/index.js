System.register('@ailhc/enet-pbws', [], function (exports) {
    'use strict';
    return {
        execute: function () {

            exports('PackageType', void 0);

            var Byte = exports('Byte', (function () {
                function Byte(data) {
                    if (data === void 0) { data = null; }
                    this._xd_ = true;
                    this._allocated_ = 8;
                    this._pos_ = 0;
                    this._length = 0;
                    if (data) {
                        this._u8d_ = new Uint8Array(data);
                        this._d_ = new DataView(this._u8d_.buffer);
                        this._length = this._d_.byteLength;
                    }
                    else {
                        this._resizeBuffer(this._allocated_);
                    }
                }
                Byte.getSystemEndian = function () {
                    if (!Byte._sysEndian) {
                        var buffer = new ArrayBuffer(2);
                        new DataView(buffer).setInt16(0, 256, true);
                        Byte._sysEndian = (new Int16Array(buffer))[0] === 256 ? Byte.LITTLE_ENDIAN : Byte.BIG_ENDIAN;
                    }
                    return Byte._sysEndian;
                };
                Object.defineProperty(Byte.prototype, "buffer", {
                    get: function () {
                        var rstBuffer = this._d_.buffer;
                        if (rstBuffer.byteLength === this._length)
                            return rstBuffer;
                        return rstBuffer.slice(0, this._length);
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Byte.prototype, "endian", {
                    get: function () {
                        return this._xd_ ? Byte.LITTLE_ENDIAN : Byte.BIG_ENDIAN;
                    },
                    set: function (value) {
                        this._xd_ = (value === Byte.LITTLE_ENDIAN);
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Byte.prototype, "length", {
                    get: function () {
                        return this._length;
                    },
                    set: function (value) {
                        if (this._allocated_ < value)
                            this._resizeBuffer(this._allocated_ = Math.floor(Math.max(value, this._allocated_ * 2)));
                        else if (this._allocated_ > value)
                            this._resizeBuffer(this._allocated_ = value);
                        this._length = value;
                    },
                    enumerable: false,
                    configurable: true
                });
                Byte.prototype._resizeBuffer = function (len) {
                    try {
                        var newByteView = new Uint8Array(len);
                        if (this._u8d_ != null) {
                            if (this._u8d_.length <= len)
                                newByteView.set(this._u8d_);
                            else
                                newByteView.set(this._u8d_.subarray(0, len));
                        }
                        this._u8d_ = newByteView;
                        this._d_ = new DataView(newByteView.buffer);
                    }
                    catch (err) {
                        throw "Invalid typed array length:" + len;
                    }
                };
                Byte.prototype.readString = function () {
                    return this._rUTF(this.readUint16());
                };
                Byte.prototype.readFloat32Array = function (start, len) {
                    var end = start + len;
                    end = (end > this._length) ? this._length : end;
                    var v = new Float32Array(this._d_.buffer.slice(start, end));
                    this._pos_ = end;
                    return v;
                };
                Byte.prototype.readUint8Array = function (start, len) {
                    var end = start + len;
                    end = (end > this._length) ? this._length : end;
                    var v = new Uint8Array(this._d_.buffer.slice(start, end));
                    this._pos_ = end;
                    return v;
                };
                Byte.prototype.readInt16Array = function (start, len) {
                    var end = start + len;
                    end = (end > this._length) ? this._length : end;
                    var v = new Int16Array(this._d_.buffer.slice(start, end));
                    this._pos_ = end;
                    return v;
                };
                Byte.prototype.readFloat32 = function () {
                    if (this._pos_ + 4 > this._length)
                        throw "getFloat32 error - Out of bounds";
                    var v = this._d_.getFloat32(this._pos_, this._xd_);
                    this._pos_ += 4;
                    return v;
                };
                Byte.prototype.readFloat64 = function () {
                    if (this._pos_ + 8 > this._length)
                        throw "getFloat64 error - Out of bounds";
                    var v = this._d_.getFloat64(this._pos_, this._xd_);
                    this._pos_ += 8;
                    return v;
                };
                Byte.prototype.writeFloat32 = function (value) {
                    this._ensureWrite(this._pos_ + 4);
                    this._d_.setFloat32(this._pos_, value, this._xd_);
                    this._pos_ += 4;
                };
                Byte.prototype.writeFloat64 = function (value) {
                    this._ensureWrite(this._pos_ + 8);
                    this._d_.setFloat64(this._pos_, value, this._xd_);
                    this._pos_ += 8;
                };
                Byte.prototype.readInt32 = function () {
                    if (this._pos_ + 4 > this._length)
                        throw "getInt32 error - Out of bounds";
                    var float = this._d_.getInt32(this._pos_, this._xd_);
                    this._pos_ += 4;
                    return float;
                };
                Byte.prototype.readUint32 = function () {
                    if (this._pos_ + 4 > this._length)
                        throw "getUint32 error - Out of bounds";
                    var v = this._d_.getUint32(this._pos_, this._xd_);
                    this._pos_ += 4;
                    return v;
                };
                Byte.prototype.readUint32NoError = function () {
                    if (this._pos_ + 4 > this._length)
                        return undefined;
                    var v = this._d_.getUint32(this._pos_, this._xd_);
                    this._pos_ += 4;
                    return v;
                };
                Byte.prototype.writeInt32 = function (value) {
                    this._ensureWrite(this._pos_ + 4);
                    this._d_.setInt32(this._pos_, value, this._xd_);
                    this._pos_ += 4;
                };
                Byte.prototype.writeUint32 = function (value) {
                    this._ensureWrite(this._pos_ + 4);
                    this._d_.setUint32(this._pos_, value, this._xd_);
                    this._pos_ += 4;
                };
                Byte.prototype.readInt16 = function () {
                    if (this._pos_ + 2 > this._length)
                        throw "getInt16 error - Out of bounds";
                    var us = this._d_.getInt16(this._pos_, this._xd_);
                    this._pos_ += 2;
                    return us;
                };
                Byte.prototype.readUint16 = function () {
                    if (this._pos_ + 2 > this._length)
                        throw "getUint16 error - Out of bounds";
                    var us = this._d_.getUint16(this._pos_, this._xd_);
                    this._pos_ += 2;
                    return us;
                };
                Byte.prototype.writeUint16 = function (value) {
                    this._ensureWrite(this._pos_ + 2);
                    this._d_.setUint16(this._pos_, value, this._xd_);
                    this._pos_ += 2;
                };
                Byte.prototype.writeInt16 = function (value) {
                    this._ensureWrite(this._pos_ + 2);
                    this._d_.setInt16(this._pos_, value, this._xd_);
                    this._pos_ += 2;
                };
                Byte.prototype.readUint8 = function () {
                    if (this._pos_ + 1 > this._length)
                        throw "getUint8 error - Out of bounds";
                    return this._u8d_[this._pos_++];
                };
                Byte.prototype.writeUint8 = function (value) {
                    this._ensureWrite(this._pos_ + 1);
                    this._d_.setUint8(this._pos_, value);
                    this._pos_++;
                };
                Byte.prototype._readUInt8 = function (pos) {
                    return this._d_.getUint8(pos);
                };
                Byte.prototype._readUint16 = function (pos) {
                    return this._d_.getUint16(pos, this._xd_);
                };
                Byte.prototype._rUTF = function (len) {
                    var max = this._pos_ + len, c, c2, c3, f = String.fromCharCode;
                    var u = this._u8d_;
                    var strs = [];
                    var n = 0;
                    strs.length = 1000;
                    while (this._pos_ < max) {
                        c = u[this._pos_++];
                        if (c < 0x80) {
                            if (c != 0)
                                strs[n++] = f(c);
                        }
                        else if (c < 0xE0) {
                            strs[n++] = f(((c & 0x3F) << 6) | (u[this._pos_++] & 0x7F));
                        }
                        else if (c < 0xF0) {
                            c2 = u[this._pos_++];
                            strs[n++] = f(((c & 0x1F) << 12) | ((c2 & 0x7F) << 6) | (u[this._pos_++] & 0x7F));
                        }
                        else {
                            c2 = u[this._pos_++];
                            c3 = u[this._pos_++];
                            var _code = ((c & 0x0F) << 18) | ((c2 & 0x7F) << 12) | ((c3 & 0x7F) << 6) | (u[this._pos_++] & 0x7F);
                            if (_code >= 0x10000) {
                                var _offset = _code - 0x10000;
                                var _lead = 0xd800 | (_offset >> 10);
                                var _trail = 0xdc00 | (_offset & 0x3ff);
                                strs[n++] = f(_lead);
                                strs[n++] = f(_trail);
                            }
                            else {
                                strs[n++] = f(_code);
                            }
                        }
                    }
                    strs.length = n;
                    return strs.join('');
                };
                Byte.prototype.readCustomString = function (len) {
                    var v = "", ulen = 0, c, c2, f = String.fromCharCode;
                    var u = this._u8d_;
                    while (len > 0) {
                        c = u[this._pos_];
                        if (c < 0x80) {
                            v += f(c);
                            this._pos_++;
                            len--;
                        }
                        else {
                            ulen = c - 0x80;
                            this._pos_++;
                            len -= ulen;
                            while (ulen > 0) {
                                c = u[this._pos_++];
                                c2 = u[this._pos_++];
                                v += f((c2 << 8) | c);
                                ulen--;
                            }
                        }
                    }
                    return v;
                };
                Object.defineProperty(Byte.prototype, "pos", {
                    get: function () {
                        return this._pos_;
                    },
                    set: function (value) {
                        this._pos_ = value;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Byte.prototype, "bytesAvailable", {
                    get: function () {
                        return this._length - this._pos_;
                    },
                    enumerable: false,
                    configurable: true
                });
                Byte.prototype.clear = function () {
                    this._pos_ = 0;
                    this.length = 0;
                };
                Byte.prototype.__getBuffer = function () {
                    return this._d_.buffer;
                };
                Byte.prototype.writeUTFBytes = function (value) {
                    value = value + "";
                    for (var i = 0, sz = value.length; i < sz; i++) {
                        var c = value.charCodeAt(i);
                        if (c <= 0x7F) {
                            this.writeByte(c);
                        }
                        else if (c <= 0x7FF) {
                            this._ensureWrite(this._pos_ + 2);
                            this._u8d_.set([0xC0 | (c >> 6), 0x80 | (c & 0x3F)], this._pos_);
                            this._pos_ += 2;
                        }
                        else if (c >= 0xD800 && c <= 0xDBFF) {
                            i++;
                            var c2 = value.charCodeAt(i);
                            if (!Number.isNaN(c2) && c2 >= 0xDC00 && c2 <= 0xDFFF) {
                                var _p1 = (c & 0x3FF) + 0x40;
                                var _p2 = c2 & 0x3FF;
                                var _b1 = 0xF0 | ((_p1 >> 8) & 0x3F);
                                var _b2 = 0x80 | ((_p1 >> 2) & 0x3F);
                                var _b3 = 0x80 | ((_p1 & 0x3) << 4) | ((_p2 >> 6) & 0xF);
                                var _b4 = 0x80 | (_p2 & 0x3F);
                                this._ensureWrite(this._pos_ + 4);
                                this._u8d_.set([_b1, _b2, _b3, _b4], this._pos_);
                                this._pos_ += 4;
                            }
                        }
                        else if (c <= 0xFFFF) {
                            this._ensureWrite(this._pos_ + 3);
                            this._u8d_.set([0xE0 | (c >> 12), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F)], this._pos_);
                            this._pos_ += 3;
                        }
                        else {
                            this._ensureWrite(this._pos_ + 4);
                            this._u8d_.set([0xF0 | (c >> 18), 0x80 | ((c >> 12) & 0x3F), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F)], this._pos_);
                            this._pos_ += 4;
                        }
                    }
                };
                Byte.prototype.writeUTFString = function (value) {
                    var tPos = this.pos;
                    this.writeUint16(1);
                    this.writeUTFBytes(value);
                    var dPos = this.pos - tPos - 2;
                    this._d_.setUint16(tPos, dPos, this._xd_);
                };
                Byte.prototype.writeUTFString32 = function (value) {
                    var tPos = this.pos;
                    this.writeUint32(1);
                    this.writeUTFBytes(value);
                    var dPos = this.pos - tPos - 4;
                    this._d_.setUint32(tPos, dPos, this._xd_);
                };
                Byte.prototype.readUTFString = function () {
                    return this.readUTFBytes(this.readUint16());
                };
                Byte.prototype.readUTFString32 = function () {
                    return this.readUTFBytes(this.readUint32());
                };
                Byte.prototype.readUTFBytes = function (len) {
                    if (len === void 0) { len = -1; }
                    if (len === 0)
                        return "";
                    var lastBytes = this.bytesAvailable;
                    if (len > lastBytes)
                        throw "readUTFBytes error - Out of bounds";
                    len = len > 0 ? len : lastBytes;
                    return this._rUTF(len);
                };
                Byte.prototype.writeByte = function (value) {
                    this._ensureWrite(this._pos_ + 1);
                    this._d_.setInt8(this._pos_, value);
                    this._pos_ += 1;
                };
                Byte.prototype.readByte = function () {
                    if (this._pos_ + 1 > this._length)
                        throw "readByte error - Out of bounds";
                    return this._d_.getInt8(this._pos_++);
                };
                Byte.prototype._ensureWrite = function (lengthToEnsure) {
                    if (this._length < lengthToEnsure)
                        this._length = lengthToEnsure;
                    if (this._allocated_ < lengthToEnsure)
                        this.length = lengthToEnsure;
                };
                Byte.prototype.writeArrayBuffer = function (arraybuffer, offset, length) {
                    if (offset === void 0) { offset = 0; }
                    if (length === void 0) { length = 0; }
                    if (offset < 0 || length < 0)
                        throw "writeArrayBuffer error - Out of bounds";
                    if (length == 0)
                        length = arraybuffer.byteLength - offset;
                    this._ensureWrite(this._pos_ + length);
                    var uint8array = new Uint8Array(arraybuffer);
                    this._u8d_.set(uint8array.subarray(offset, offset + length), this._pos_);
                    this._pos_ += length;
                };
                Byte.prototype.writeUint8Array = function (uint8Array, offset, length) {
                    (offset === void 0) && (offset = 0);
                    (length === void 0) && (length = 0);
                    if (offset < 0 || length < 0)
                        throw "writeArrayBuffer error - Out of bounds";
                    if (length === 0)
                        length = uint8Array.byteLength - offset;
                    this._ensureWrite(this._pos_ + length);
                    this._u8d_.set(uint8Array.subarray(offset, offset + length), this._pos_);
                    this._pos_ += length;
                };
                Byte.prototype.readArrayBuffer = function (length) {
                    var rst;
                    rst = this._u8d_.buffer.slice(this._pos_, this._pos_ + length);
                    this._pos_ = this._pos_ + length;
                    return rst;
                };
                Byte.BIG_ENDIAN = "bigEndian";
                Byte.LITTLE_ENDIAN = "littleEndian";
                Byte._sysEndian = null;
                return Byte;
            }()));

            var PackageType;
            (function (PackageType) {
                PackageType[PackageType["HANDSHAKE"] = 1] = "HANDSHAKE";
                PackageType[PackageType["HANDSHAKE_ACK"] = 2] = "HANDSHAKE_ACK";
                PackageType[PackageType["HEARTBEAT"] = 3] = "HEARTBEAT";
                PackageType[PackageType["DATA"] = 4] = "DATA";
                PackageType[PackageType["KICK"] = 5] = "KICK";
            })(PackageType || (PackageType = exports('PackageType', {})));

            var PbProtoHandler = exports('PbProtoHandler', (function () {
                function PbProtoHandler(pbProtoJs, pkgTypeProtoKeys) {
                    this._byteUtil = new Byte();
                    if (!pbProtoJs) {
                        throw "pbProtojs is undefined";
                    }
                    this._protoMap = pbProtoJs;
                    var pkgTypeProtoKeyMap = {};
                    if (pkgTypeProtoKeys) {
                        for (var i = 0; i < pkgTypeProtoKeys.length; i++) {
                            pkgTypeProtoKeyMap[pkgTypeProtoKeys[i].type] = pkgTypeProtoKeys[i];
                        }
                    }
                    this._pkgTypeProtoKeyMap = pkgTypeProtoKeyMap;
                }
                Object.defineProperty(PbProtoHandler.prototype, "heartbeatConfig", {
                    get: function () {
                        return this._heartbeatCfg;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(PbProtoHandler.prototype, "handShakeRes", {
                    get: function () {
                        return this._handShakeRes;
                    },
                    enumerable: false,
                    configurable: true
                });
                PbProtoHandler.prototype.setHandshakeRes = function (handShakeRes) {
                    this._handShakeRes = handShakeRes;
                    this._heartbeatCfg = handShakeRes;
                };
                PbProtoHandler.prototype.protoKey2Key = function (protoKey) {
                    return protoKey;
                };
                PbProtoHandler.prototype._protoEncode = function (protoKey, data) {
                    var proto = this._protoMap[protoKey];
                    var buf;
                    if (!proto) {
                        console.error("no this proto:" + protoKey);
                    }
                    else {
                        var err = proto.verify(data);
                        if (!err) {
                            buf = proto.encode(data).finish();
                        }
                        else {
                            console.error("encode error:", err);
                        }
                    }
                    return buf;
                };
                PbProtoHandler.prototype.encodePkg = function (pkg, useCrypto) {
                    var pkgType = pkg.type;
                    var byteUtil = this._byteUtil;
                    byteUtil.clear();
                    byteUtil.endian = Byte.LITTLE_ENDIAN;
                    byteUtil.writeUint32(pkgType);
                    var protoKey;
                    var data;
                    if (pkgType === PackageType.DATA) {
                        var msg = pkg.data;
                        byteUtil.writeUTFString(msg.key);
                        var reqId = msg.reqId;
                        byteUtil.writeUint32(!isNaN(reqId) && reqId > 0 ? reqId : 0);
                        data = msg.data;
                        protoKey = msg.key;
                    }
                    else {
                        var protoKeyMap = this._pkgTypeProtoKeyMap;
                        protoKey = protoKeyMap[pkgType] && protoKeyMap[pkgType].encode;
                        data = pkg.data;
                    }
                    if (protoKey && data) {
                        var dataUint8Array = this._protoEncode(protoKey, data);
                        if (!dataUint8Array) {
                            byteUtil.clear();
                        }
                        else {
                            byteUtil.writeUint8Array(dataUint8Array);
                        }
                    }
                    var netData = byteUtil.buffer.byteLength ? byteUtil.buffer : undefined;
                    byteUtil.clear();
                    return netData;
                };
                PbProtoHandler.prototype.encodeMsg = function (msg, useCrypto) {
                    return this.encodePkg({ type: PackageType.DATA, data: msg }, useCrypto);
                };
                PbProtoHandler.prototype.decodePkg = function (data) {
                    var byteUtil = this._byteUtil;
                    byteUtil.clear();
                    byteUtil.endian = Byte.LITTLE_ENDIAN;
                    if (data instanceof ArrayBuffer) {
                        byteUtil.writeArrayBuffer(data);
                    }
                    else if (data instanceof Uint8Array) {
                        byteUtil.writeUint8Array(data);
                    }
                    byteUtil.pos = 0;
                    var pkgType = byteUtil.readUint32();
                    var decodePkg = {};
                    if (pkgType === PackageType.DATA) {
                        var protoKey = byteUtil.readUTFString();
                        var reqId = byteUtil.readUint32NoError();
                        var dataBytes = byteUtil.readUint8Array(byteUtil.pos, byteUtil.length);
                        var proto = this._protoMap[protoKey];
                        decodePkg.reqId = reqId;
                        decodePkg.key = protoKey;
                        if (!proto) {
                            decodePkg.errorMsg = "no this proto:" + protoKey;
                        }
                        else {
                            var decodeData = proto.decode(dataBytes);
                            var err = proto.verify(decodeData);
                            decodePkg.data = decodeData;
                            decodePkg.errorMsg = err;
                            decodePkg.type = pkgType;
                        }
                    }
                    else {
                        var protoKeyMap = this._pkgTypeProtoKeyMap;
                        var protoKey = protoKeyMap[pkgType] && protoKeyMap[pkgType].decode;
                        decodePkg.key = protoKey;
                        if (protoKey) {
                            var dataBytes = byteUtil.readUint8Array(byteUtil.pos, byteUtil.length);
                            var proto = this._protoMap[protoKey];
                            if (!proto) {
                                decodePkg.errorMsg = "no this proto:" + protoKey;
                            }
                            else {
                                var decodeData = proto.decode(dataBytes);
                                var err = proto.verify(decodeData);
                                decodePkg.data = decodeData;
                                decodePkg.errorMsg = err;
                                decodePkg.type = pkgType;
                            }
                        }
                        if (pkgType === PackageType.HANDSHAKE) {
                            this.setHandshakeRes(decodePkg.data);
                        }
                    }
                    return decodePkg;
                };
                return PbProtoHandler;
            }()));

        }
    };
});

    
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIkBhaWxoYy9lbmV0LXBid3Mvc3JjL2J5dGUudHMiLCJAYWlsaGMvZW5ldC1wYndzL3NyYy9wa2ctdHlwZS50cyIsIkBhaWxoYy9lbmV0LXBid3Mvc3JjL3BiLXByb3RvLWhhbmRsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiA8cD4gPGNvZGU+Qnl0ZTwvY29kZT4g57G75o+Q5L6b55So5LqO5LyY5YyW6K+75Y+W44CB5YaZ5YWl5Lul5Y+K5aSE55CG5LqM6L+b5Yi25pWw5o2u55qE5pa55rOV5ZKM5bGe5oCn44CCPC9wPlxuICogPHA+IDxjb2RlPkJ5dGU8L2NvZGU+IOexu+mAgueUqOS6jumcgOimgeWcqOWtl+iKguWxguiuv+mXruaVsOaNrueahOmrmOe6p+W8gOWPkeS6uuWRmOOAgjwvcD5cbiAqL1xuZXhwb3J0IGNsYXNzIEJ5dGUge1xuXG4gICAgLyoqXG4gICAgICogPHA+5Li75py65a2X6IqC5bqP77yM5pivIENQVSDlrZjmlL7mlbDmja7nmoTkuKTnp43kuI3lkIzpobrluo/vvIzljIXmi6zlsI/nq6/lrZfoioLluo/lkozlpKfnq6/lrZfoioLluo/jgILpgJrov4cgPGNvZGU+Z2V0U3lzdGVtRW5kaWFuPC9jb2RlPiDlj6/ku6Xojrflj5blvZPliY3ns7vnu5/nmoTlrZfoioLluo/jgII8L3A+XG4gICAgICogPHA+IDxjb2RlPkJJR19FTkRJQU48L2NvZGU+IO+8muWkp+err+Wtl+iKguW6j++8jOWcsOWdgOS9juS9jeWtmOWCqOWAvOeahOmrmOS9je+8jOWcsOWdgOmrmOS9jeWtmOWCqOWAvOeahOS9juS9jeOAguacieaXtuS5n+ensOS5i+S4uue9kee7nOWtl+iKguW6j+OAgjxici8+XG4gICAgICogPGNvZGU+TElUVExFX0VORElBTjwvY29kZT4g77ya5bCP56uv5a2X6IqC5bqP77yM5Zyw5Z2A5L2O5L2N5a2Y5YKo5YC855qE5L2O5L2N77yM5Zyw5Z2A6auY5L2N5a2Y5YKo5YC855qE6auY5L2N44CCPC9wPlxuICAgICAqL1xuICAgIHN0YXRpYyBCSUdfRU5ESUFOOiBzdHJpbmcgPSBcImJpZ0VuZGlhblwiO1xuICAgIC8qKlxuICAgICAqIDxwPuS4u+acuuWtl+iKguW6j++8jOaYryBDUFUg5a2Y5pS+5pWw5o2u55qE5Lik56eN5LiN5ZCM6aG65bqP77yM5YyF5ous5bCP56uv5a2X6IqC5bqP5ZKM5aSn56uv5a2X6IqC5bqP44CC6YCa6L+HIDxjb2RlPmdldFN5c3RlbUVuZGlhbjwvY29kZT4g5Y+v5Lul6I635Y+W5b2T5YmN57O757uf55qE5a2X6IqC5bqP44CCPC9wPlxuICAgICAqIDxwPiA8Y29kZT5MSVRUTEVfRU5ESUFOPC9jb2RlPiDvvJrlsI/nq6/lrZfoioLluo/vvIzlnLDlnYDkvY7kvY3lrZjlgqjlgLznmoTkvY7kvY3vvIzlnLDlnYDpq5jkvY3lrZjlgqjlgLznmoTpq5jkvY3jgII8YnIvPlxuICAgICAqIDxjb2RlPkJJR19FTkRJQU48L2NvZGU+IO+8muWkp+err+Wtl+iKguW6j++8jOWcsOWdgOS9juS9jeWtmOWCqOWAvOeahOmrmOS9je+8jOWcsOWdgOmrmOS9jeWtmOWCqOWAvOeahOS9juS9jeOAguacieaXtuS5n+ensOS5i+S4uue9kee7nOWtl+iKguW6j+OAgjwvcD5cbiAgICAgKi9cbiAgICBzdGF0aWMgTElUVExFX0VORElBTjogc3RyaW5nID0gXCJsaXR0bGVFbmRpYW5cIjtcbiAgICAvKipAcHJpdmF0ZSAqL1xuICAgIHByaXZhdGUgc3RhdGljIF9zeXNFbmRpYW46IHN0cmluZyA9IG51bGw7XG4gICAgLyoqQHByaXZhdGUg5piv5ZCm5Li65bCP56uv5pWw5o2u44CCKi9cbiAgICBwcm90ZWN0ZWQgX3hkXzogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqQHByaXZhdGUgKi9cbiAgICBwcml2YXRlIF9hbGxvY2F0ZWRfOiBudW1iZXIgPSA4O1xuICAgIC8qKkBwcml2YXRlIOWOn+Wni+aVsOaNruOAgiovXG4gICAgcHJvdGVjdGVkIF9kXzogYW55XG4gICAgLyoqQHByaXZhdGUgRGF0YVZpZXcqL1xuICAgIHByb3RlY3RlZCBfdThkXzogYW55O1xuICAgIC8qKkBwcml2YXRlICovXG4gICAgcHJvdGVjdGVkIF9wb3NfOiBudW1iZXIgPSAwO1xuICAgIC8qKkBwcml2YXRlICovXG4gICAgcHJvdGVjdGVkIF9sZW5ndGg6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiA8cD7ojrflj5blvZPliY3kuLvmnLrnmoTlrZfoioLluo/jgII8L3A+XG4gICAgICogPHA+5Li75py65a2X6IqC5bqP77yM5pivIENQVSDlrZjmlL7mlbDmja7nmoTkuKTnp43kuI3lkIzpobrluo/vvIzljIXmi6zlsI/nq6/lrZfoioLluo/lkozlpKfnq6/lrZfoioLluo/jgII8L3A+XG4gICAgICogPHA+IDxjb2RlPkJJR19FTkRJQU48L2NvZGU+IO+8muWkp+err+Wtl+iKguW6j++8jOWcsOWdgOS9juS9jeWtmOWCqOWAvOeahOmrmOS9je+8jOWcsOWdgOmrmOS9jeWtmOWCqOWAvOeahOS9juS9jeOAguacieaXtuS5n+ensOS5i+S4uue9kee7nOWtl+iKguW6j+OAgjxici8+XG4gICAgICogPGNvZGU+TElUVExFX0VORElBTjwvY29kZT4g77ya5bCP56uv5a2X6IqC5bqP77yM5Zyw5Z2A5L2O5L2N5a2Y5YKo5YC855qE5L2O5L2N77yM5Zyw5Z2A6auY5L2N5a2Y5YKo5YC855qE6auY5L2N44CCPC9wPlxuICAgICAqIEByZXR1cm4g5b2T5YmN57O757uf55qE5a2X6IqC5bqP44CCXG4gICAgICovXG4gICAgc3RhdGljIGdldFN5c3RlbUVuZGlhbigpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIUJ5dGUuX3N5c0VuZGlhbikge1xuICAgICAgICAgICAgdmFyIGJ1ZmZlcjogYW55ID0gbmV3IEFycmF5QnVmZmVyKDIpO1xuICAgICAgICAgICAgbmV3IERhdGFWaWV3KGJ1ZmZlcikuc2V0SW50MTYoMCwgMjU2LCB0cnVlKTtcbiAgICAgICAgICAgIEJ5dGUuX3N5c0VuZGlhbiA9IChuZXcgSW50MTZBcnJheShidWZmZXIpKVswXSA9PT0gMjU2ID8gQnl0ZS5MSVRUTEVfRU5ESUFOIDogQnl0ZS5CSUdfRU5ESUFOO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBCeXRlLl9zeXNFbmRpYW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yib5bu65LiA5LiqIDxjb2RlPkJ5dGU8L2NvZGU+IOexu+eahOWunuS+i+OAglxuICAgICAqIEBwYXJhbVx0ZGF0YVx055So5LqO5oyH5a6a5Yid5aeL5YyW55qE5YWD57Sg5pWw55uu77yM5oiW6ICF55So5LqO5Yid5aeL5YyW55qEVHlwZWRBcnJheeWvueixoeOAgUFycmF5QnVmZmVy5a+56LGh44CC5aaC5p6c5Li6IG51bGwg77yM5YiZ6aKE5YiG6YWN5LiA5a6a55qE5YaF5a2Y56m66Ze077yM5b2T5Y+v55So56m66Ze05LiN6Laz5pe277yM5LyY5YWI5L2/55So6L+Z6YOo5YiG5YaF5a2Y77yM5aaC5p6c6L+Y5LiN5aSf77yM5YiZ6YeN5paw5YiG6YWN5omA6ZyA5YaF5a2Y44CCXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGF0YTogYW55ID0gbnVsbCkge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5fdThkXyA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5fZF8gPSBuZXcgRGF0YVZpZXcodGhpcy5fdThkXy5idWZmZXIpO1xuICAgICAgICAgICAgdGhpcy5fbGVuZ3RoID0gdGhpcy5fZF8uYnl0ZUxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZUJ1ZmZlcih0aGlzLl9hbGxvY2F0ZWRfKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluatpOWvueixoeeahCBBcnJheUJ1ZmZlciDmlbDmja7vvIzmlbDmja7lj6rljIXlkKvmnInmlYjmlbDmja7pg6jliIbjgIJcbiAgICAgKi9cbiAgICBnZXQgYnVmZmVyKCk6IEFycmF5QnVmZmVyIHtcbiAgICAgICAgdmFyIHJzdEJ1ZmZlcjogQXJyYXlCdWZmZXIgPSB0aGlzLl9kXy5idWZmZXI7XG4gICAgICAgIGlmIChyc3RCdWZmZXIuYnl0ZUxlbmd0aCA9PT0gdGhpcy5fbGVuZ3RoKSByZXR1cm4gcnN0QnVmZmVyO1xuICAgICAgICByZXR1cm4gcnN0QnVmZmVyLnNsaWNlKDAsIHRoaXMuX2xlbmd0aCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogPHA+IDxjb2RlPkJ5dGU8L2NvZGU+IOWunuS+i+eahOWtl+iKguW6j+OAguWPluWAvOS4uu+8mjxjb2RlPkJJR19FTkRJQU48L2NvZGU+IOaIliA8Y29kZT5CSUdfRU5ESUFOPC9jb2RlPiDjgII8L3A+XG4gICAgICogPHA+5Li75py65a2X6IqC5bqP77yM5pivIENQVSDlrZjmlL7mlbDmja7nmoTkuKTnp43kuI3lkIzpobrluo/vvIzljIXmi6zlsI/nq6/lrZfoioLluo/lkozlpKfnq6/lrZfoioLluo/jgILpgJrov4cgPGNvZGU+Z2V0U3lzdGVtRW5kaWFuPC9jb2RlPiDlj6/ku6Xojrflj5blvZPliY3ns7vnu5/nmoTlrZfoioLluo/jgII8L3A+XG4gICAgICogPHA+IDxjb2RlPkJJR19FTkRJQU48L2NvZGU+IO+8muWkp+err+Wtl+iKguW6j++8jOWcsOWdgOS9juS9jeWtmOWCqOWAvOeahOmrmOS9je+8jOWcsOWdgOmrmOS9jeWtmOWCqOWAvOeahOS9juS9jeOAguacieaXtuS5n+ensOS5i+S4uue9kee7nOWtl+iKguW6j+OAgjxici8+XG4gICAgICogIDxjb2RlPkxJVFRMRV9FTkRJQU48L2NvZGU+IO+8muWwj+err+Wtl+iKguW6j++8jOWcsOWdgOS9juS9jeWtmOWCqOWAvOeahOS9juS9je+8jOWcsOWdgOmrmOS9jeWtmOWCqOWAvOeahOmrmOS9jeOAgjwvcD5cbiAgICAgKi9cbiAgICBnZXQgZW5kaWFuKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl94ZF8gPyBCeXRlLkxJVFRMRV9FTkRJQU4gOiBCeXRlLkJJR19FTkRJQU47XG4gICAgfVxuXG4gICAgc2V0IGVuZGlhbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3hkXyA9ICh2YWx1ZSA9PT0gQnl0ZS5MSVRUTEVfRU5ESUFOKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiA8cD4gPGNvZGU+Qnl0ZTwvY29kZT4g5a+56LGh55qE6ZW/5bqm77yI5Lul5a2X6IqC5Li65Y2V5L2N77yJ44CCPC9wPlxuICAgICAqIDxwPuWmguaenOWwhumVv+W6puiuvue9ruS4uuWkp+S6juW9k+WJjemVv+W6pueahOWAvO+8jOWImeeUqOmbtuWhq+WFheWtl+iKguaVsOe7hOeahOWPs+S+p++8m+WmguaenOWwhumVv+W6puiuvue9ruS4uuWwj+S6juW9k+WJjemVv+W6pueahOWAvO+8jOWwhuS8muaIquaWreivpeWtl+iKguaVsOe7hOOAgjwvcD5cbiAgICAgKiA8cD7lpoLmnpzopoHorr7nva7nmoTplb/luqblpKfkuo7lvZPliY3lt7LliIbphY3nmoTlhoXlrZjnqbrpl7TnmoTlrZfoioLplb/luqbvvIzliJnph43mlrDliIbphY3lhoXlrZjnqbrpl7TvvIzlpKflsI/kuLrku6XkuIvkuKTogIXovoPlpKfogIXvvJropoHorr7nva7nmoTplb/luqbjgIHlvZPliY3lt7LliIbphY3nmoTplb/luqbnmoQy5YCN77yM5bm25bCG5Y6f5pyJ5pWw5o2u5ou36LSd5Yiw5paw55qE5YaF5a2Y56m66Ze05Lit77yb5aaC5p6c6KaB6K6+572u55qE6ZW/5bqm5bCP5LqO5b2T5YmN5bey5YiG6YWN55qE5YaF5a2Y56m66Ze055qE5a2X6IqC6ZW/5bqm77yM5Lmf5Lya6YeN5paw5YiG6YWN5YaF5a2Y56m66Ze077yM5aSn5bCP5Li66KaB6K6+572u55qE6ZW/5bqm77yM5bm25bCG5Y6f5pyJ5pWw5o2u5LuO5aS05oiq5pat5Li66KaB6K6+572u55qE6ZW/5bqm5a2Y5YWl5paw55qE5YaF5a2Y56m66Ze05Lit44CCPC9wPlxuICAgICAqL1xuICAgIHNldCBsZW5ndGgodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5fYWxsb2NhdGVkXyA8IHZhbHVlKSB0aGlzLl9yZXNpemVCdWZmZXIodGhpcy5fYWxsb2NhdGVkXyA9IE1hdGguZmxvb3IoTWF0aC5tYXgodmFsdWUsIHRoaXMuX2FsbG9jYXRlZF8gKiAyKSkpO1xuICAgICAgICBlbHNlIGlmICh0aGlzLl9hbGxvY2F0ZWRfID4gdmFsdWUpIHRoaXMuX3Jlc2l6ZUJ1ZmZlcih0aGlzLl9hbGxvY2F0ZWRfID0gdmFsdWUpO1xuICAgICAgICB0aGlzLl9sZW5ndGggPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqQHByaXZhdGUgKi9cbiAgICBwcml2YXRlIF9yZXNpemVCdWZmZXIobGVuOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBuZXdCeXRlVmlldzogYW55ID0gbmV3IFVpbnQ4QXJyYXkobGVuKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl91OGRfICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdThkXy5sZW5ndGggPD0gbGVuKSBuZXdCeXRlVmlldy5zZXQodGhpcy5fdThkXyk7XG4gICAgICAgICAgICAgICAgZWxzZSBuZXdCeXRlVmlldy5zZXQodGhpcy5fdThkXy5zdWJhcnJheSgwLCBsZW4pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3U4ZF8gPSBuZXdCeXRlVmlldztcbiAgICAgICAgICAgIHRoaXMuX2RfID0gbmV3IERhdGFWaWV3KG5ld0J5dGVWaWV3LmJ1ZmZlcik7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aDpcIiArIGxlbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIDxwPuW4uOeUqOS6juino+aekOWbuuWumuagvOW8j+eahOWtl+iKgua1geOAgjwvcD5cbiAgICAgKiA8cD7lhYjku47lrZfoioLmtYHnmoTlvZPliY3lrZfoioLlgY/np7vkvY3nva7lpITor7vlj5bkuIDkuKogPGNvZGU+VWludDE2PC9jb2RlPiDlgLzvvIznhLblkI7ku6XmraTlgLzkuLrplb/luqbvvIzor7vlj5bmraTplb/luqbnmoTlrZfnrKbkuLLjgII8L3A+XG4gICAgICogQHJldHVybiDor7vlj5bnmoTlrZfnrKbkuLLjgIJcbiAgICAgKi9cbiAgICByZWFkU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yVVRGKHRoaXMucmVhZFVpbnQxNigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDku47lrZfoioLmtYHkuK0gPGNvZGU+c3RhcnQ8L2NvZGU+IOWPguaVsOaMh+WumueahOS9jee9ruW8gOWni++8jOivu+WPliA8Y29kZT5sZW48L2NvZGU+IOWPguaVsOaMh+WumueahOWtl+iKguaVsOeahOaVsOaNru+8jOeUqOS6juWIm+W7uuS4gOS4qiA8Y29kZT5GbG9hdDMyQXJyYXk8L2NvZGU+IOWvueixoeW5tui/lOWbnuatpOWvueixoeOAglxuICAgICAqIEBwYXJhbVx0c3RhcnRcdOW8gOWni+S9jee9ruOAglxuICAgICAqIEBwYXJhbVx0bGVuXHRcdOmcgOimgeivu+WPlueahOWtl+iKgumVv+W6puOAguWmguaenOimgeivu+WPlueahOmVv+W6pui2hei/h+WPr+ivu+WPluiMg+WbtO+8jOWImeWPqui/lOWbnuWPr+ivu+iMg+WbtOWGheeahOWAvOOAglxuICAgICAqIEByZXR1cm4gIOivu+WPlueahCBGbG9hdDMyQXJyYXkg5a+56LGh44CCXG4gICAgICovXG4gICAgcmVhZEZsb2F0MzJBcnJheShzdGFydDogbnVtYmVyLCBsZW46IG51bWJlcik6IGFueSB7XG4gICAgICAgIHZhciBlbmQ6IG51bWJlciA9IHN0YXJ0ICsgbGVuO1xuICAgICAgICBlbmQgPSAoZW5kID4gdGhpcy5fbGVuZ3RoKSA/IHRoaXMuX2xlbmd0aCA6IGVuZDtcbiAgICAgICAgdmFyIHY6IGFueSA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5fZF8uYnVmZmVyLnNsaWNlKHN0YXJ0LCBlbmQpKTtcbiAgICAgICAgdGhpcy5fcG9zXyA9IGVuZDtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LuO5a2X6IqC5rWB5LitIDxjb2RlPnN0YXJ0PC9jb2RlPiDlj4LmlbDmjIflrprnmoTkvY3nva7lvIDlp4vvvIzor7vlj5YgPGNvZGU+bGVuPC9jb2RlPiDlj4LmlbDmjIflrprnmoTlrZfoioLmlbDnmoTmlbDmja7vvIznlKjkuo7liJvlu7rkuIDkuKogPGNvZGU+VWludDhBcnJheTwvY29kZT4g5a+56LGh5bm26L+U5Zue5q2k5a+56LGh44CCXG4gICAgICogQHBhcmFtXHRzdGFydFx05byA5aeL5L2N572u44CCXG4gICAgICogQHBhcmFtXHRsZW5cdFx06ZyA6KaB6K+75Y+W55qE5a2X6IqC6ZW/5bqm44CC5aaC5p6c6KaB6K+75Y+W55qE6ZW/5bqm6LaF6L+H5Y+v6K+75Y+W6IyD5Zu077yM5YiZ5Y+q6L+U5Zue5Y+v6K+76IyD5Zu05YaF55qE5YC844CCXG4gICAgICogQHJldHVybiAg6K+75Y+W55qEIFVpbnQ4QXJyYXkg5a+56LGh44CCXG4gICAgICovXG4gICAgcmVhZFVpbnQ4QXJyYXkoc3RhcnQ6IG51bWJlciwgbGVuOiBudW1iZXIpOiBVaW50OEFycmF5IHtcbiAgICAgICAgdmFyIGVuZDogbnVtYmVyID0gc3RhcnQgKyBsZW47XG4gICAgICAgIGVuZCA9IChlbmQgPiB0aGlzLl9sZW5ndGgpID8gdGhpcy5fbGVuZ3RoIDogZW5kO1xuICAgICAgICB2YXIgdjogYW55ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fZF8uYnVmZmVyLnNsaWNlKHN0YXJ0LCBlbmQpKTtcbiAgICAgICAgdGhpcy5fcG9zXyA9IGVuZDtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LuO5a2X6IqC5rWB5LitIDxjb2RlPnN0YXJ0PC9jb2RlPiDlj4LmlbDmjIflrprnmoTkvY3nva7lvIDlp4vvvIzor7vlj5YgPGNvZGU+bGVuPC9jb2RlPiDlj4LmlbDmjIflrprnmoTlrZfoioLmlbDnmoTmlbDmja7vvIznlKjkuo7liJvlu7rkuIDkuKogPGNvZGU+SW50MTZBcnJheTwvY29kZT4g5a+56LGh5bm26L+U5Zue5q2k5a+56LGh44CCXG4gICAgICogQHBhcmFtXHRzdGFydFx05byA5aeL6K+75Y+W55qE5a2X6IqC5YGP56e76YeP5L2N572u44CCXG4gICAgICogQHBhcmFtXHRsZW5cdFx06ZyA6KaB6K+75Y+W55qE5a2X6IqC6ZW/5bqm44CC5aaC5p6c6KaB6K+75Y+W55qE6ZW/5bqm6LaF6L+H5Y+v6K+75Y+W6IyD5Zu077yM5YiZ5Y+q6L+U5Zue5Y+v6K+76IyD5Zu05YaF55qE5YC844CCXG4gICAgICogQHJldHVybiAg6K+75Y+W55qEIFVpbnQ4QXJyYXkg5a+56LGh44CCXG4gICAgICovXG4gICAgcmVhZEludDE2QXJyYXkoc3RhcnQ6IG51bWJlciwgbGVuOiBudW1iZXIpOiBhbnkge1xuICAgICAgICB2YXIgZW5kOiBudW1iZXIgPSBzdGFydCArIGxlbjtcbiAgICAgICAgZW5kID0gKGVuZCA+IHRoaXMuX2xlbmd0aCkgPyB0aGlzLl9sZW5ndGggOiBlbmQ7XG4gICAgICAgIHZhciB2OiBhbnkgPSBuZXcgSW50MTZBcnJheSh0aGlzLl9kXy5idWZmZXIuc2xpY2Uoc3RhcnQsIGVuZCkpO1xuICAgICAgICB0aGlzLl9wb3NfID0gZW5kO1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDku47lrZfoioLmtYHnmoTlvZPliY3lrZfoioLlgY/np7vkvY3nva7lpITor7vlj5bkuIDkuKogSUVFRSA3NTQg5Y2V57K+5bqm77yIMzIg5L2N77yJ5rWu54K55pWw44CCXG4gICAgICogQHJldHVybiDljZXnsr7luqbvvIgzMiDkvY3vvInmta7ngrnmlbDjgIJcbiAgICAgKi9cbiAgICByZWFkRmxvYXQzMigpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fcG9zXyArIDQgPiB0aGlzLl9sZW5ndGgpIHRocm93IFwiZ2V0RmxvYXQzMiBlcnJvciAtIE91dCBvZiBib3VuZHNcIjtcbiAgICAgICAgdmFyIHY6IG51bWJlciA9IHRoaXMuX2RfLmdldEZsb2F0MzIodGhpcy5fcG9zXywgdGhpcy5feGRfKTtcbiAgICAgICAgdGhpcy5fcG9zXyArPSA0O1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDku47lrZfoioLmtYHnmoTlvZPliY3lrZfoioLlgY/np7vph4/kvY3nva7lpITor7vlj5bkuIDkuKogSUVFRSA3NTQg5Y+M57K+5bqm77yINjQg5L2N77yJ5rWu54K55pWw44CCXG4gICAgICogQHJldHVybiDlj4znsr7luqbvvIg2NCDkvY3vvInmta7ngrnmlbDjgIJcbiAgICAgKi9cbiAgICByZWFkRmxvYXQ2NCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fcG9zXyArIDggPiB0aGlzLl9sZW5ndGgpIHRocm93IFwiZ2V0RmxvYXQ2NCBlcnJvciAtIE91dCBvZiBib3VuZHNcIjtcbiAgICAgICAgdmFyIHY6IG51bWJlciA9IHRoaXMuX2RfLmdldEZsb2F0NjQodGhpcy5fcG9zXywgdGhpcy5feGRfKTtcbiAgICAgICAgdGhpcy5fcG9zXyArPSA4O1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlnKjlrZfoioLmtYHnmoTlvZPliY3lrZfoioLlgY/np7vph4/kvY3nva7lpITlhpnlhaXkuIDkuKogSUVFRSA3NTQg5Y2V57K+5bqm77yIMzIg5L2N77yJ5rWu54K55pWw44CCXG4gICAgICogQHBhcmFtXHR2YWx1ZVx05Y2V57K+5bqm77yIMzIg5L2N77yJ5rWu54K55pWw44CCXG4gICAgICovXG4gICAgd3JpdGVGbG9hdDMyKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZW5zdXJlV3JpdGUodGhpcy5fcG9zXyArIDQpO1xuICAgICAgICB0aGlzLl9kXy5zZXRGbG9hdDMyKHRoaXMuX3Bvc18sIHZhbHVlLCB0aGlzLl94ZF8pO1xuICAgICAgICB0aGlzLl9wb3NfICs9IDQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Zyo5a2X6IqC5rWB55qE5b2T5YmN5a2X6IqC5YGP56e76YeP5L2N572u5aSE5YaZ5YWl5LiA5LiqIElFRUUgNzU0IOWPjOeyvuW6pu+8iDY0IOS9je+8iea1rueCueaVsOOAglxuICAgICAqIEBwYXJhbVx0dmFsdWVcdOWPjOeyvuW6pu+8iDY0IOS9je+8iea1rueCueaVsOOAglxuICAgICAqL1xuICAgIHdyaXRlRmxvYXQ2NCh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Vuc3VyZVdyaXRlKHRoaXMuX3Bvc18gKyA4KTtcbiAgICAgICAgdGhpcy5fZF8uc2V0RmxvYXQ2NCh0aGlzLl9wb3NfLCB2YWx1ZSwgdGhpcy5feGRfKTtcbiAgICAgICAgdGhpcy5fcG9zXyArPSA4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS7juWtl+iKgua1geeahOW9k+WJjeWtl+iKguWBj+enu+mHj+S9jee9ruWkhOivu+WPluS4gOS4qiBJbnQzMiDlgLzjgIJcbiAgICAgKiBAcmV0dXJuIEludDMyIOWAvOOAglxuICAgICAqL1xuICAgIHJlYWRJbnQzMigpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fcG9zXyArIDQgPiB0aGlzLl9sZW5ndGgpIHRocm93IFwiZ2V0SW50MzIgZXJyb3IgLSBPdXQgb2YgYm91bmRzXCI7XG4gICAgICAgIHZhciBmbG9hdDogbnVtYmVyID0gdGhpcy5fZF8uZ2V0SW50MzIodGhpcy5fcG9zXywgdGhpcy5feGRfKTtcbiAgICAgICAgdGhpcy5fcG9zXyArPSA0O1xuICAgICAgICByZXR1cm4gZmxvYXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LuO5a2X6IqC5rWB55qE5b2T5YmN5a2X6IqC5YGP56e76YeP5L2N572u5aSE6K+75Y+W5LiA5LiqIFVpbnQzMiDlgLzjgIJcbiAgICAgKiBAcmV0dXJuIFVpbnQzMiDlgLzjgIJcbiAgICAgKi9cbiAgICByZWFkVWludDMyKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLl9wb3NfICsgNCA+IHRoaXMuX2xlbmd0aCkgdGhyb3cgXCJnZXRVaW50MzIgZXJyb3IgLSBPdXQgb2YgYm91bmRzXCI7XG4gICAgICAgIHZhciB2OiBudW1iZXIgPSB0aGlzLl9kXy5nZXRVaW50MzIodGhpcy5fcG9zXywgdGhpcy5feGRfKTtcbiAgICAgICAgdGhpcy5fcG9zXyArPSA0O1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5LuO5a2X6IqC5rWB55qE5b2T5YmN5a2X6IqC5YGP56e76YeP5L2N572u5aSE6K+75Y+W5LiA5LiqIFVpbnQzMiDlgLzjgILor7vkuI3liLDkuI3miqXplJnvvIzov5Tlm551bmRlZmluZWQ7XG4gICAgICogQHJldHVybiBVaW50MzIg5YC844CCXG4gICAgICovXG4gICAgcmVhZFVpbnQzMk5vRXJyb3IoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuX3Bvc18gKyA0ID4gdGhpcy5fbGVuZ3RoKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgdjogbnVtYmVyID0gdGhpcy5fZF8uZ2V0VWludDMyKHRoaXMuX3Bvc18sIHRoaXMuX3hkXyk7XG4gICAgICAgIHRoaXMuX3Bvc18gKz0gNDtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Zyo5a2X6IqC5rWB55qE5b2T5YmN5a2X6IqC5YGP56e76YeP5L2N572u5aSE5YaZ5YWl5oyH5a6a55qEIEludDMyIOWAvOOAglxuICAgICAqIEBwYXJhbVx0dmFsdWVcdOmcgOimgeWGmeWFpeeahCBJbnQzMiDlgLzjgIJcbiAgICAgKi9cbiAgICB3cml0ZUludDMyKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZW5zdXJlV3JpdGUodGhpcy5fcG9zXyArIDQpO1xuICAgICAgICB0aGlzLl9kXy5zZXRJbnQzMih0aGlzLl9wb3NfLCB2YWx1ZSwgdGhpcy5feGRfKTtcbiAgICAgICAgdGhpcy5fcG9zXyArPSA0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWcqOWtl+iKgua1geeahOW9k+WJjeWtl+iKguWBj+enu+mHj+S9jee9ruWkhOWGmeWFpSBVaW50MzIg5YC844CCXG4gICAgICogQHBhcmFtXHR2YWx1ZVx06ZyA6KaB5YaZ5YWl55qEIFVpbnQzMiDlgLzjgIJcbiAgICAgKi9cbiAgICB3cml0ZVVpbnQzMih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Vuc3VyZVdyaXRlKHRoaXMuX3Bvc18gKyA0KTtcbiAgICAgICAgdGhpcy5fZF8uc2V0VWludDMyKHRoaXMuX3Bvc18sIHZhbHVlLCB0aGlzLl94ZF8pO1xuICAgICAgICB0aGlzLl9wb3NfICs9IDQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LuO5a2X6IqC5rWB55qE5b2T5YmN5a2X6IqC5YGP56e76YeP5L2N572u5aSE6K+75Y+W5LiA5LiqIEludDE2IOWAvOOAglxuICAgICAqIEByZXR1cm4gSW50MTYg5YC844CCXG4gICAgICovXG4gICAgcmVhZEludDE2KCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLl9wb3NfICsgMiA+IHRoaXMuX2xlbmd0aCkgdGhyb3cgXCJnZXRJbnQxNiBlcnJvciAtIE91dCBvZiBib3VuZHNcIjtcbiAgICAgICAgdmFyIHVzOiBudW1iZXIgPSB0aGlzLl9kXy5nZXRJbnQxNih0aGlzLl9wb3NfLCB0aGlzLl94ZF8pO1xuICAgICAgICB0aGlzLl9wb3NfICs9IDI7XG4gICAgICAgIHJldHVybiB1cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDku47lrZfoioLmtYHnmoTlvZPliY3lrZfoioLlgY/np7vph4/kvY3nva7lpITor7vlj5bkuIDkuKogVWludDE2IOWAvOOAglxuICAgICAqIEByZXR1cm4gVWludDE2IOWAvOOAglxuICAgICAqL1xuICAgIHJlYWRVaW50MTYoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuX3Bvc18gKyAyID4gdGhpcy5fbGVuZ3RoKSB0aHJvdyBcImdldFVpbnQxNiBlcnJvciAtIE91dCBvZiBib3VuZHNcIjtcbiAgICAgICAgdmFyIHVzOiBudW1iZXIgPSB0aGlzLl9kXy5nZXRVaW50MTYodGhpcy5fcG9zXywgdGhpcy5feGRfKTtcbiAgICAgICAgdGhpcy5fcG9zXyArPSAyO1xuICAgICAgICByZXR1cm4gdXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Zyo5a2X6IqC5rWB55qE5b2T5YmN5a2X6IqC5YGP56e76YeP5L2N572u5aSE5YaZ5YWl5oyH5a6a55qEIFVpbnQxNiDlgLzjgIJcbiAgICAgKiBAcGFyYW1cdHZhbHVlXHTpnIDopoHlhpnlhaXnmoRVaW50MTYg5YC844CCXG4gICAgICovXG4gICAgd3JpdGVVaW50MTYodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9lbnN1cmVXcml0ZSh0aGlzLl9wb3NfICsgMik7XG4gICAgICAgIHRoaXMuX2RfLnNldFVpbnQxNih0aGlzLl9wb3NfLCB2YWx1ZSwgdGhpcy5feGRfKTtcbiAgICAgICAgdGhpcy5fcG9zXyArPSAyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWcqOWtl+iKgua1geeahOW9k+WJjeWtl+iKguWBj+enu+mHj+S9jee9ruWkhOWGmeWFpeaMh+WumueahCBJbnQxNiDlgLzjgIJcbiAgICAgKiBAcGFyYW1cdHZhbHVlXHTpnIDopoHlhpnlhaXnmoQgSW50MTYg5YC844CCXG4gICAgICovXG4gICAgd3JpdGVJbnQxNih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Vuc3VyZVdyaXRlKHRoaXMuX3Bvc18gKyAyKTtcbiAgICAgICAgdGhpcy5fZF8uc2V0SW50MTYodGhpcy5fcG9zXywgdmFsdWUsIHRoaXMuX3hkXyk7XG4gICAgICAgIHRoaXMuX3Bvc18gKz0gMjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDku47lrZfoioLmtYHnmoTlvZPliY3lrZfoioLlgY/np7vph4/kvY3nva7lpITor7vlj5bkuIDkuKogVWludDgg5YC844CCXG4gICAgICogQHJldHVybiBVaW50OCDlgLzjgIJcbiAgICAgKi9cbiAgICByZWFkVWludDgoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuX3Bvc18gKyAxID4gdGhpcy5fbGVuZ3RoKSB0aHJvdyBcImdldFVpbnQ4IGVycm9yIC0gT3V0IG9mIGJvdW5kc1wiO1xuICAgICAgICByZXR1cm4gdGhpcy5fdThkX1t0aGlzLl9wb3NfKytdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWcqOWtl+iKgua1geeahOW9k+WJjeWtl+iKguWBj+enu+mHj+S9jee9ruWkhOWGmeWFpeaMh+WumueahCBVaW50OCDlgLzjgIJcbiAgICAgKiBAcGFyYW1cdHZhbHVlXHTpnIDopoHlhpnlhaXnmoQgVWludDgg5YC844CCXG4gICAgICovXG4gICAgd3JpdGVVaW50OCh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Vuc3VyZVdyaXRlKHRoaXMuX3Bvc18gKyAxKTtcbiAgICAgICAgdGhpcy5fZF8uc2V0VWludDgodGhpcy5fcG9zXywgdmFsdWUpO1xuICAgICAgICB0aGlzLl9wb3NfKys7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICog5LuO5a2X6IqC5rWB55qE5oyH5a6a5a2X6IqC5YGP56e76YeP5L2N572u5aSE6K+75Y+W5LiA5LiqIFVpbnQ4IOWAvOOAglxuICAgICAqIEBwYXJhbVx0cG9zXHTlrZfoioLor7vlj5bkvY3nva7jgIJcbiAgICAgKiBAcmV0dXJuIFVpbnQ4IOWAvOOAglxuICAgICAqL1xuICAgIC8vVE9ETzpjb3ZlcmFnZVxuICAgIF9yZWFkVUludDgocG9zOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZF8uZ2V0VWludDgocG9zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKiDku47lrZfoioLmtYHnmoTmjIflrprlrZfoioLlgY/np7vph4/kvY3nva7lpITor7vlj5bkuIDkuKogVWludDE2IOWAvOOAglxuICAgICAqIEBwYXJhbVx0cG9zXHTlrZfoioLor7vlj5bkvY3nva7jgIJcbiAgICAgKiBAcmV0dXJuIFVpbnQxNiDlgLzjgIJcbiAgICAgKi9cbiAgICAvL1RPRE86Y292ZXJhZ2VcbiAgICBfcmVhZFVpbnQxNihwb3M6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kXy5nZXRVaW50MTYocG9zLCB0aGlzLl94ZF8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICog6K+75Y+W5oyH5a6a6ZW/5bqm55qEIFVURiDlnovlrZfnrKbkuLLjgIJcbiAgICAgKiBAcGFyYW1cdGxlbiDpnIDopoHor7vlj5bnmoTplb/luqbjgIJcbiAgICAgKiBAcmV0dXJuIOivu+WPlueahOWtl+espuS4suOAglxuICAgICAqL1xuICAgIHByaXZhdGUgX3JVVEYobGVuOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICB2YXIgdjogc3RyaW5nID0gXCJcIiwgbWF4OiBudW1iZXIgPSB0aGlzLl9wb3NfICsgbGVuLCBjOiBudW1iZXIsIGMyOiBudW1iZXIsIGMzOiBudW1iZXIsIGY6IEZ1bmN0aW9uID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcbiAgICAgICAgdmFyIHU6IGFueSA9IHRoaXMuX3U4ZF8sIGk6IG51bWJlciA9IDA7XG4gICAgICAgIHZhciBzdHJzOiBhbnlbXSA9IFtdO1xuICAgICAgICB2YXIgbjogbnVtYmVyID0gMDtcbiAgICAgICAgc3Rycy5sZW5ndGggPSAxMDAwO1xuICAgICAgICB3aGlsZSAodGhpcy5fcG9zXyA8IG1heCkge1xuICAgICAgICAgICAgYyA9IHVbdGhpcy5fcG9zXysrXTtcbiAgICAgICAgICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgICAgICAgICAgIGlmIChjICE9IDApXG4gICAgICAgICAgICAgICAgICAgIC8vdiArPSBmKGMpO1xcXG4gICAgICAgICAgICAgICAgICAgIHN0cnNbbisrXSA9IGYoYyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGMgPCAweEUwKSB7XG4gICAgICAgICAgICAgICAgLy92ICs9IGYoKChjICYgMHgzRikgPDwgNikgfCAodVtfcG9zXysrXSAmIDB4N0YpKTtcbiAgICAgICAgICAgICAgICBzdHJzW24rK10gPSBmKCgoYyAmIDB4M0YpIDw8IDYpIHwgKHVbdGhpcy5fcG9zXysrXSAmIDB4N0YpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA8IDB4RjApIHtcbiAgICAgICAgICAgICAgICBjMiA9IHVbdGhpcy5fcG9zXysrXTtcbiAgICAgICAgICAgICAgICAvL3YgKz0gZigoKGMgJiAweDFGKSA8PCAxMikgfCAoKGMyICYgMHg3RikgPDwgNikgfCAodVtfcG9zXysrXSAmIDB4N0YpKTtcbiAgICAgICAgICAgICAgICBzdHJzW24rK10gPSBmKCgoYyAmIDB4MUYpIDw8IDEyKSB8ICgoYzIgJiAweDdGKSA8PCA2KSB8ICh1W3RoaXMuX3Bvc18rK10gJiAweDdGKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGMyID0gdVt0aGlzLl9wb3NfKytdO1xuICAgICAgICAgICAgICAgIGMzID0gdVt0aGlzLl9wb3NfKytdO1xuICAgICAgICAgICAgICAgIC8vdiArPSBmKCgoYyAmIDB4MEYpIDw8IDE4KSB8ICgoYzIgJiAweDdGKSA8PCAxMikgfCAoKGMzIDw8IDYpICYgMHg3RikgfCAodVtfcG9zXysrXSAmIDB4N0YpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBfY29kZSA9ICgoYyAmIDB4MEYpIDw8IDE4KSB8ICgoYzIgJiAweDdGKSA8PCAxMikgfCAoKGMzICYgMHg3RikgPDwgNikgfCAodVt0aGlzLl9wb3NfKytdICYgMHg3Rik7XG4gICAgICAgICAgICAgICAgaWYgKF9jb2RlID49IDB4MTAwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgX29mZnNldCA9IF9jb2RlIC0gMHgxMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgX2xlYWQgPSAweGQ4MDAgfCAoX29mZnNldCA+PiAxMCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IF90cmFpbCA9IDB4ZGMwMCB8IChfb2Zmc2V0ICYgMHgzZmYpO1xuICAgICAgICAgICAgICAgICAgICBzdHJzW24rK10gPSBmKF9sZWFkKTtcbiAgICAgICAgICAgICAgICAgICAgc3Ryc1tuKytdID0gZihfdHJhaWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Ryc1tuKytdID0gZihfY29kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHN0cnMubGVuZ3RoID0gbjtcbiAgICAgICAgcmV0dXJuIHN0cnMuam9pbignJyk7XG4gICAgICAgIC8vcmV0dXJuIHY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiDor7vlj5YgPGNvZGU+bGVuPC9jb2RlPiDlj4LmlbDmjIflrprnmoTplb/luqbnmoTlrZfnrKbkuLLjgIJcbiAgICAgKiBAcGFyYW1cdGxlblx06KaB6K+75Y+W55qE5a2X56ym5Liy55qE6ZW/5bqm44CCXG4gICAgICogQHJldHVybiDmjIflrprplb/luqbnmoTlrZfnrKbkuLLjgIJcbiAgICAgKi9cbiAgICAvL1RPRE86Y292ZXJhZ2VcbiAgICByZWFkQ3VzdG9tU3RyaW5nKGxlbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgdmFyIHY6IHN0cmluZyA9IFwiXCIsIHVsZW46IG51bWJlciA9IDAsIGM6IG51bWJlciwgYzI6IG51bWJlciwgZjogRnVuY3Rpb24gPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuICAgICAgICB2YXIgdTogYW55ID0gdGhpcy5fdThkXywgaTogbnVtYmVyID0gMDtcbiAgICAgICAgd2hpbGUgKGxlbiA+IDApIHtcbiAgICAgICAgICAgIGMgPSB1W3RoaXMuX3Bvc19dO1xuICAgICAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICAgICAgdiArPSBmKGMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc18rKztcbiAgICAgICAgICAgICAgICBsZW4tLTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdWxlbiA9IGMgLSAweDgwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc18rKztcbiAgICAgICAgICAgICAgICBsZW4gLT0gdWxlbjtcbiAgICAgICAgICAgICAgICB3aGlsZSAodWxlbiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYyA9IHVbdGhpcy5fcG9zXysrXTtcbiAgICAgICAgICAgICAgICAgICAgYzIgPSB1W3RoaXMuX3Bvc18rK107XG4gICAgICAgICAgICAgICAgICAgIHYgKz0gZigoYzIgPDwgOCkgfCBjKTtcbiAgICAgICAgICAgICAgICAgICAgdWxlbi0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOenu+WKqOaIlui/lOWbniBCeXRlIOWvueixoeeahOivu+WGmeaMh+mSiOeahOW9k+WJjeS9jee9ru+8iOS7peWtl+iKguS4uuWNleS9je+8ieOAguS4i+S4gOasoeiwg+eUqOivu+WPluaWueazleaXtuWwhuWcqOatpOS9jee9ruW8gOWni+ivu+WPlu+8jOaIluiAheS4i+S4gOasoeiwg+eUqOWGmeWFpeaWueazleaXtuWwhuWcqOatpOS9jee9ruW8gOWni+WGmeWFpeOAglxuICAgICAqL1xuICAgIGdldCBwb3MoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc187XG4gICAgfVxuXG4gICAgc2V0IHBvcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3Bvc18gPSB2YWx1ZTtcbiAgICAgICAgLy8kTU9EIGJ5dGVPZmZzZXTmmK/lj6ror7vnmoTvvIzov5nph4zov5vooYzotYvlgLzmsqHmnInmhI/kuYnjgIJcbiAgICAgICAgLy9fZF8uYnl0ZU9mZnNldCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWPr+S7juWtl+iKgua1geeahOW9k+WJjeS9jee9ruWIsOacq+Wwvuivu+WPlueahOaVsOaNrueahOWtl+iKguaVsOOAglxuICAgICAqL1xuICAgIGdldCBieXRlc0F2YWlsYWJsZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVuZ3RoIC0gdGhpcy5fcG9zXztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmuIXpmaTlrZfoioLmlbDnu4TnmoTlhoXlrrnvvIzlubblsIYgbGVuZ3RoIOWSjCBwb3Mg5bGe5oCn6YeN572u5Li6IDDjgILosIPnlKjmraTmlrnms5XlsIbph4rmlL4gQnl0ZSDlrp7kvovljaDnlKjnmoTlhoXlrZjjgIJcbiAgICAgKi9cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcG9zXyA9IDA7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKiDojrflj5bmraTlr7nosaHnmoQgQXJyYXlCdWZmZXIg5byV55So44CCXG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIF9fZ2V0QnVmZmVyKCk6IEFycmF5QnVmZmVyIHtcbiAgICAgICAgLy90aGlzLl9kXy5idWZmZXIuYnl0ZUxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdGhpcy5fZF8uYnVmZmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIDxwPuWwhiBVVEYtOCDlrZfnrKbkuLLlhpnlhaXlrZfoioLmtYHjgILnsbvkvLzkuo4gd3JpdGVVVEYoKSDmlrnms5XvvIzkvYYgd3JpdGVVVEZCeXRlcygpIOS4jeS9v+eUqCAxNiDkvY3plb/luqbnmoTlrZfkuLrlrZfnrKbkuLLmt7vliqDliY3nvIDjgII8L3A+XG4gICAgICogPHA+5a+55bqU55qE6K+75Y+W5pa55rOV5Li677yaIGdldFVURkJ5dGVzIOOAgjwvcD5cbiAgICAgKiBAcGFyYW0gdmFsdWUg6KaB5YaZ5YWl55qE5a2X56ym5Liy44CCXG4gICAgICovXG4gICAgd3JpdGVVVEZCeXRlcyh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIC8vIHV0ZjgtZGVjb2RlXG4gICAgICAgIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwLCBzejogbnVtYmVyID0gdmFsdWUubGVuZ3RoOyBpIDwgc3o7IGkrKykge1xuICAgICAgICAgICAgdmFyIGM6IG51bWJlciA9IHZhbHVlLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgICAgICAgIGlmIChjIDw9IDB4N0YpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyaXRlQnl0ZShjKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA8PSAweDdGRikge1xuICAgICAgICAgICAgICAgIC8v5LyY5YyW5Li655u05o6l5YaZ5YWl5aSa5Liq5a2X6IqC77yM6ICM5LiN5b+F6YeN5aSN6LCD55Sod3JpdGVCeXRl77yM5YWN5Y676aKd5aSW55qE6LCD55So5ZKM6YC76L6R5byA6ZSA44CCXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5zdXJlV3JpdGUodGhpcy5fcG9zXyArIDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3U4ZF8uc2V0KFsweEMwIHwgKGMgPj4gNiksIDB4ODAgfCAoYyAmIDB4M0YpXSwgdGhpcy5fcG9zXyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcG9zXyArPSAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjID49IDB4RDgwMCAmJiBjIDw9IDB4REJGRikge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICBjb25zdCBjMiA9IHZhbHVlLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4oYzIpICYmIGMyID49IDB4REMwMCAmJiBjMiA8PSAweERGRkYpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgX3AxID0gKGMgJiAweDNGRikgKyAweDQwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBfcDIgPSBjMiAmIDB4M0ZGO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IF9iMSA9IDB4RjAgfCAoKF9wMSA+PiA4KSAmIDB4M0YpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBfYjIgPSAweDgwIHwgKChfcDEgPj4gMikgJiAweDNGKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgX2IzID0gMHg4MCB8ICgoX3AxICYgMHgzKSA8PCA0KSB8ICgoX3AyID4+IDYpICYgMHhGKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgX2I0ID0gMHg4MCB8IChfcDIgJiAweDNGKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbnN1cmVXcml0ZSh0aGlzLl9wb3NfICsgNCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3U4ZF8uc2V0KFtfYjEsIF9iMiwgX2IzLCBfYjRdLCB0aGlzLl9wb3NfKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9zXyArPSA0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA8PSAweEZGRkYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbnN1cmVXcml0ZSh0aGlzLl9wb3NfICsgMyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdThkXy5zZXQoWzB4RTAgfCAoYyA+PiAxMiksIDB4ODAgfCAoKGMgPj4gNikgJiAweDNGKSwgMHg4MCB8IChjICYgMHgzRildLCB0aGlzLl9wb3NfKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3NfICs9IDM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Vuc3VyZVdyaXRlKHRoaXMuX3Bvc18gKyA0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl91OGRfLnNldChbMHhGMCB8IChjID4+IDE4KSwgMHg4MCB8ICgoYyA+PiAxMikgJiAweDNGKSwgMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpLCAweDgwIHwgKGMgJiAweDNGKV0sIHRoaXMuX3Bvc18pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc18gKz0gNDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIDxwPuWwhiBVVEYtOCDlrZfnrKbkuLLlhpnlhaXlrZfoioLmtYHjgILlhYjlhpnlhaXku6XlrZfoioLooajnpLrnmoQgVVRGLTgg5a2X56ym5Liy6ZW/5bqm77yI5L2c5Li6IDE2IOS9jeaVtOaVsO+8ie+8jOeEtuWQjuWGmeWFpeihqOekuuWtl+espuS4suWtl+espueahOWtl+iKguOAgjwvcD5cbiAgICAgKiA8cD7lr7nlupTnmoTor7vlj5bmlrnms5XkuLrvvJogZ2V0VVRGU3RyaW5nIOOAgjwvcD5cbiAgICAgKiBAcGFyYW1cdHZhbHVlIOimgeWGmeWFpeeahOWtl+espuS4suWAvOOAglxuICAgICAqL1xuICAgIHdyaXRlVVRGU3RyaW5nKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdmFyIHRQb3M6IG51bWJlciA9IHRoaXMucG9zO1xuICAgICAgICB0aGlzLndyaXRlVWludDE2KDEpO1xuICAgICAgICB0aGlzLndyaXRlVVRGQnl0ZXModmFsdWUpO1xuICAgICAgICB2YXIgZFBvczogbnVtYmVyID0gdGhpcy5wb3MgLSB0UG9zIC0gMjtcbiAgICAgICAgLy90cmFjZShcIndyaXRlTGVuOlwiLGRQb3MsXCJwb3M6XCIsdFBvcyk7XG4gICAgICAgIHRoaXMuX2RfLnNldFVpbnQxNih0UG9zLCBkUG9zLCB0aGlzLl94ZF8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIDxwPuWwhiBVVEYtOCDlrZfnrKbkuLLlhpnlhaXlrZfoioLmtYHjgILlhYjlhpnlhaXku6XlrZfoioLooajnpLrnmoQgVVRGLTgg5a2X56ym5Liy6ZW/5bqm77yI5L2c5Li6IDMyIOS9jeaVtOaVsO+8ie+8jOeEtuWQjuWGmeWFpeihqOekuuWtl+espuS4suWtl+espueahOWtl+iKguOAgjwvcD5cbiAgICAgKiBAcGFyYW1cdHZhbHVlIOimgeWGmeWFpeeahOWtl+espuS4suWAvOOAglxuICAgICAqL1xuICAgIHdyaXRlVVRGU3RyaW5nMzIodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB2YXIgdFBvcyA9IHRoaXMucG9zO1xuICAgICAgICB0aGlzLndyaXRlVWludDMyKDEpO1xuICAgICAgICB0aGlzLndyaXRlVVRGQnl0ZXModmFsdWUpO1xuICAgICAgICB2YXIgZFBvcyA9IHRoaXMucG9zIC0gdFBvcyAtIDQ7XG4gICAgICAgIC8vdHJhY2UoXCJ3cml0ZUxlbjpcIixkUG9zLFwicG9zOlwiLHRQb3MpO1xuICAgICAgICB0aGlzLl9kXy5zZXRVaW50MzIodFBvcywgZFBvcywgdGhpcy5feGRfKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICog6K+75Y+WIFVURi04IOWtl+espuS4suOAglxuICAgICAqIEByZXR1cm4g6K+75Y+W55qE5a2X56ym5Liy44CCXG4gICAgICovXG4gICAgcmVhZFVURlN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICAvL3ZhciB0UG9zOmludCA9IHBvcztcbiAgICAgICAgLy92YXIgbGVuOmludCA9IGdldFVpbnQxNigpO1xuICAgICAgICAvLy8vdHJhY2UoXCJyZWFkTGVuOlwiK2xlbixcInBvcyxcIix0UG9zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZFVURkJ5dGVzKHRoaXMucmVhZFVpbnQxNigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlYWRVVEZTdHJpbmczMigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkVVRGQnl0ZXModGhpcy5yZWFkVWludDMyKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICog6K+75a2X56ym5Liy77yM5b+F6aG75pivIHdyaXRlVVRGQnl0ZXMg5pa55rOV5YaZ5YWl55qE5a2X56ym5Liy44CCXG4gICAgICogQHBhcmFtIGxlblx06KaB6K+755qEYnVmZmVy6ZW/5bqm77yM6buY6K6k5bCG6K+75Y+W57yT5Yay5Yy65YWo6YOo5pWw5o2u44CCXG4gICAgICogQHJldHVybiDor7vlj5bnmoTlrZfnrKbkuLLjgIJcbiAgICAgKi9cbiAgICByZWFkVVRGQnl0ZXMobGVuOiBudW1iZXIgPSAtMSk6IHN0cmluZyB7XG4gICAgICAgIGlmIChsZW4gPT09IDApIHJldHVybiBcIlwiO1xuICAgICAgICB2YXIgbGFzdEJ5dGVzOiBudW1iZXIgPSB0aGlzLmJ5dGVzQXZhaWxhYmxlO1xuICAgICAgICBpZiAobGVuID4gbGFzdEJ5dGVzKSB0aHJvdyBcInJlYWRVVEZCeXRlcyBlcnJvciAtIE91dCBvZiBib3VuZHNcIjtcbiAgICAgICAgbGVuID0gbGVuID4gMCA/IGxlbiA6IGxhc3RCeXRlcztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JVVEYobGVuKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiA8cD7lnKjlrZfoioLmtYHkuK3lhpnlhaXkuIDkuKrlrZfoioLjgII8L3A+XG4gICAgICogPHA+5L2/55So5Y+C5pWw55qE5L2OIDgg5L2N44CC5b+955Wl6auYIDI0IOS9jeOAgjwvcD5cbiAgICAgKiBAcGFyYW1cdHZhbHVlXG4gICAgICovXG4gICAgd3JpdGVCeXRlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZW5zdXJlV3JpdGUodGhpcy5fcG9zXyArIDEpO1xuICAgICAgICB0aGlzLl9kXy5zZXRJbnQ4KHRoaXMuX3Bvc18sIHZhbHVlKTtcbiAgICAgICAgdGhpcy5fcG9zXyArPSAxO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIDxwPuS7juWtl+iKgua1geS4reivu+WPluW4puespuWPt+eahOWtl+iKguOAgjwvcD5cbiAgICAgKiA8cD7ov5Tlm57lgLznmoTojIPlm7TmmK/ku44gLTEyOCDliLAgMTI344CCPC9wPlxuICAgICAqIEByZXR1cm4g5LuL5LqOIC0xMjgg5ZKMIDEyNyDkuYvpl7TnmoTmlbTmlbDjgIJcbiAgICAgKi9cbiAgICByZWFkQnl0ZSgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fcG9zXyArIDEgPiB0aGlzLl9sZW5ndGgpIHRocm93IFwicmVhZEJ5dGUgZXJyb3IgLSBPdXQgb2YgYm91bmRzXCI7XG4gICAgICAgIHJldHVybiB0aGlzLl9kXy5nZXRJbnQ4KHRoaXMuX3Bvc18rKyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGludGVybmFsXG4gICAgICogPHA+5L+d6K+B6K+l5a2X6IqC5rWB55qE5Y+v55So6ZW/5bqm5LiN5bCP5LqOIDxjb2RlPmxlbmd0aFRvRW5zdXJlPC9jb2RlPiDlj4LmlbDmjIflrprnmoTlgLzjgII8L3A+XG4gICAgICogQHBhcmFtXHRsZW5ndGhUb0Vuc3VyZVx05oyH5a6a55qE6ZW/5bqm44CCXG4gICAgICovXG4gICAgX2Vuc3VyZVdyaXRlKGxlbmd0aFRvRW5zdXJlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2xlbmd0aCA8IGxlbmd0aFRvRW5zdXJlKSB0aGlzLl9sZW5ndGggPSBsZW5ndGhUb0Vuc3VyZTtcbiAgICAgICAgaWYgKHRoaXMuX2FsbG9jYXRlZF8gPCBsZW5ndGhUb0Vuc3VyZSkgdGhpcy5sZW5ndGggPSBsZW5ndGhUb0Vuc3VyZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiA8cD7lsIbmjIflrpogYXJyYXlidWZmZXIg5a+56LGh5Lit55qE5LulIG9mZnNldCDkuLrotbflp4vlgY/np7vph4/vvIwgbGVuZ3RoIOS4uumVv+W6pueahOWtl+iKguW6j+WIl+WGmeWFpeWtl+iKgua1geOAgjwvcD5cbiAgICAgKiA8cD7lpoLmnpznnIHnlaUgbGVuZ3RoIOWPguaVsO+8jOWImeS9v+eUqOm7mOiupOmVv+W6piAw77yM6K+l5pa55rOV5bCG5LuOIG9mZnNldCDlvIDlp4vlhpnlhaXmlbTkuKrnvJPlhrLljLrvvJvlpoLmnpzov5jnnIHnlaXkuoYgb2Zmc2V0IOWPguaVsO+8jOWImeWGmeWFpeaVtOS4que8k+WGsuWMuuOAgjwvcD5cbiAgICAgKiA8cD7lpoLmnpwgb2Zmc2V0IOaIliBsZW5ndGgg5bCP5LqOMO+8jOacrOWHveaVsOWwhuaKm+WHuuW8guW4uOOAgjwvcD5cbiAgICAgKiBAcGFyYW1cdGFycmF5YnVmZmVyXHTpnIDopoHlhpnlhaXnmoQgQXJyYXlidWZmZXIg5a+56LGh44CCXG4gICAgICogQHBhcmFtXHRvZmZzZXRcdFx0QXJyYXlidWZmZXIg5a+56LGh55qE57Si5byV55qE5YGP56e76YeP77yI5Lul5a2X6IqC5Li65Y2V5L2N77yJXG4gICAgICogQHBhcmFtXHRsZW5ndGhcdFx05LuOIEFycmF5YnVmZmVyIOWvueixoeWGmeWFpeWIsCBCeXRlIOWvueixoeeahOmVv+W6pu+8iOS7peWtl+iKguS4uuWNleS9je+8iVxuICAgICAqL1xuICAgIHdyaXRlQXJyYXlCdWZmZXIoYXJyYXlidWZmZXI6IGFueSwgb2Zmc2V0OiBudW1iZXIgPSAwLCBsZW5ndGg6IG51bWJlciA9IDApOiB2b2lkIHtcbiAgICAgICAgaWYgKG9mZnNldCA8IDAgfHwgbGVuZ3RoIDwgMCkgdGhyb3cgXCJ3cml0ZUFycmF5QnVmZmVyIGVycm9yIC0gT3V0IG9mIGJvdW5kc1wiO1xuICAgICAgICBpZiAobGVuZ3RoID09IDApIGxlbmd0aCA9IGFycmF5YnVmZmVyLmJ5dGVMZW5ndGggLSBvZmZzZXQ7XG4gICAgICAgIHRoaXMuX2Vuc3VyZVdyaXRlKHRoaXMuX3Bvc18gKyBsZW5ndGgpO1xuICAgICAgICB2YXIgdWludDhhcnJheTogYW55ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuICAgICAgICB0aGlzLl91OGRfLnNldCh1aW50OGFycmF5LnN1YmFycmF5KG9mZnNldCwgb2Zmc2V0ICsgbGVuZ3RoKSwgdGhpcy5fcG9zXyk7XG4gICAgICAgIHRoaXMuX3Bvc18gKz0gbGVuZ3RoO1xuICAgIH1cbiAgICAvKipcbiAgICAqPHA+5bCG5oyH5a6aIFVpbnQ4QXJyYXkg5a+56LGh5Lit55qE5LulIG9mZnNldCDkuLrotbflp4vlgY/np7vph4/vvIwgbGVuZ3RoIOS4uumVv+W6pueahOWtl+iKguW6j+WIl+WGmeWFpeWtl+iKgua1geOAgjwvcD5cbiAgICAqPHA+5aaC5p6c55yB55WlIGxlbmd0aCDlj4LmlbDvvIzliJnkvb/nlKjpu5jorqTplb/luqYgMO+8jOivpeaWueazleWwhuS7jiBvZmZzZXQg5byA5aeL5YaZ5YWl5pW05Liq57yT5Yay5Yy677yb5aaC5p6c6L+Y55yB55Wl5LqGIG9mZnNldCDlj4LmlbDvvIzliJnlhpnlhaXmlbTkuKrnvJPlhrLljLrjgII8L3A+XG4gICAgKjxwPuWmguaenCBvZmZzZXQg5oiWIGxlbmd0aCDlsI/kuo4w77yM5pys5Ye95pWw5bCG5oqb5Ye65byC5bi444CCPC9wPlxuICAgICpAcGFyYW0gdWludDhBcnJheSDpnIDopoHlhpnlhaXnmoQgVWludDhBcnJheSDlr7nosaHjgIJcbiAgICAqQHBhcmFtIG9mZnNldCBVaW50OEFycmF5IOWvueixoeeahOe0ouW8leeahOWBj+enu+mHj++8iOS7peWtl+iKguS4uuWNleS9je+8iVxuICAgICpAcGFyYW0gbGVuZ3RoIOS7jiBVaW50OEFycmF5IOWvueixoeWGmeWFpeWIsCBCeXRlIOWvueixoeeahOmVv+W6pu+8iOS7peWtl+iKguS4uuWNleS9je+8iVxuICAgICovXG4gICAgcHVibGljIHdyaXRlVWludDhBcnJheSh1aW50OEFycmF5OiBVaW50OEFycmF5LCBvZmZzZXQ/OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcikge1xuICAgICAgICAob2Zmc2V0ID09PSB2b2lkIDApICYmIChvZmZzZXQgPSAwKTtcbiAgICAgICAgKGxlbmd0aCA9PT0gdm9pZCAwKSAmJiAobGVuZ3RoID0gMCk7XG4gICAgICAgIGlmIChvZmZzZXQgPCAwIHx8IGxlbmd0aCA8IDApIHRocm93IFwid3JpdGVBcnJheUJ1ZmZlciBlcnJvciAtIE91dCBvZiBib3VuZHNcIjtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMCkgbGVuZ3RoID0gdWludDhBcnJheS5ieXRlTGVuZ3RoIC0gb2Zmc2V0O1xuICAgICAgICB0aGlzLl9lbnN1cmVXcml0ZSh0aGlzLl9wb3NfICsgbGVuZ3RoKTtcbiAgICAgICAgdGhpcy5fdThkXy5zZXQodWludDhBcnJheS5zdWJhcnJheShvZmZzZXQsIG9mZnNldCArIGxlbmd0aCksIHRoaXMuX3Bvc18pO1xuICAgICAgICB0aGlzLl9wb3NfICs9IGxlbmd0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K+75Y+WQXJyYXlCdWZmZXLmlbDmja5cbiAgICAgKiBAcGFyYW1cdGxlbmd0aFxuICAgICAqIEByZXR1cm5cbiAgICAgKi9cbiAgICByZWFkQXJyYXlCdWZmZXIobGVuZ3RoOiBudW1iZXIpOiBBcnJheUJ1ZmZlciB7XG4gICAgICAgIHZhciByc3Q6IEFycmF5QnVmZmVyO1xuICAgICAgICByc3QgPSB0aGlzLl91OGRfLmJ1ZmZlci5zbGljZSh0aGlzLl9wb3NfLCB0aGlzLl9wb3NfICsgbGVuZ3RoKTtcbiAgICAgICAgdGhpcy5fcG9zXyA9IHRoaXMuX3Bvc18gKyBsZW5ndGhcbiAgICAgICAgcmV0dXJuIHJzdDtcbiAgICB9XG59IiwiZXhwb3J0IGVudW0gUGFja2FnZVR5cGUge1xuICAgIC8qKuaPoeaJiyAqL1xuICAgIEhBTkRTSEFLRSA9IDEsXG4gICAgLyoq5o+h5omL5Zue5bqUICovXG4gICAgSEFORFNIQUtFX0FDSyA9IDIsXG4gICAgLyoq5b+D6LezICovXG4gICAgSEVBUlRCRUFUID0gMyxcbiAgICAvKirmlbDmja4gKi9cbiAgICBEQVRBID0gNCxcbiAgICAvKirouKLkuIvnur8gKi9cbiAgICBLSUNLID0gNVxufSIsImltcG9ydCB7fSBmcm9tIFwiQGFpbGhjL2VuZXRcIjtcbmltcG9ydCB7IFBhY2thZ2VUeXBlIH0gZnJvbSBcIi4vcGtnLXR5cGVcIjtcbmltcG9ydCB7IEJ5dGUgfSBmcm9tIFwiLi9ieXRlXCI7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICBpbnRlcmZhY2UgSUhhbmRTaGFrZVJlcSB7XG4gICAgICAgIHN5cz86IHtcbiAgICAgICAgICAgIC8qKuWuouaIt+err+exu+WeiyAqL1xuICAgICAgICAgICAgdHlwZT86IG51bWJlciB8IHN0cmluZztcbiAgICAgICAgICAgIC8qKuWuouaIt+err+eJiOacrCAqL1xuICAgICAgICAgICAgdmVyc2lvbj86IG51bWJlciB8IHN0cmluZztcbiAgICAgICAgICAgIC8qKuWNj+iurueJiOacrCAqL1xuICAgICAgICAgICAgcHJvdG9WZXJzaW9uPzogbnVtYmVyIHwgc3RyaW5nO1xuICAgICAgICAgICAgLyoqcnNhIOagoemqjCAqL1xuICAgICAgICAgICAgcnNhPzogYW55O1xuICAgICAgICB9O1xuICAgICAgICB1c2VyPzogYW55O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpu5jorqTmlbDmja7ljIXljY/orq5rZXnvvIzmnInlsLHlgZrmlbDmja7ljY/orq7nvJbnoIHvvIzmsqHmnInlsLHkuI3lgZrmlbDmja7ljY/orq7nvJbnoIFcbiAgICAgKi9cbiAgICAvLyBpbnRlcmZhY2UgSVBhY2thZ2VUeXBlUHJvdG9LZXlNYXAge1xuICAgIC8vICAgICAvKirmj6HmiYvor7fmsYLljY/orq5rZXkgKi9cbiAgICAvLyAgICAgaGFuZHNoYWtlUmVxUHJvdG9LZXk/OiBzdHJpbmdcbiAgICAvLyAgICAgLyoq5o+h5omL6L+U5Zue5Y2P6K6ua2V5ICovXG4gICAgLy8gICAgIGhhbmRzaGFrZVJlc1Byb3RvS2V5Pzogc3RyaW5nXG4gICAgLy8gICAgIC8qKuaPoeaJi+WbnuW6lOWNj+iurmtleSAqL1xuICAgIC8vICAgICBoYW5kc2hha2VBY2tQcm90b0tleT86IHN0cmluZ1xuICAgIC8vICAgICAvKirlv4Pot7Plj5HpgIHljY/orq5rZXkgKi9cbiAgICAvLyAgICAgaGVhcnRiZWF0UmVxUHJvdG9LZXk/OiBzdHJpbmdcbiAgICAvLyAgICAgLyoq5b+D6Lez5o6o6YCB5Y2P6K6ua2V5ICovXG4gICAgLy8gICAgIGhlYXJ0YmVhdFB1c2hQcm90b0tleT86IHN0cmluZ1xuICAgIC8vICAgICAvKirooqvouKLmjqjpgIHnmoTljY/orq5rZXkgKi9cbiAgICAvLyAgICAga2lja1B1c2hQcm90b0tleT86IHN0cmluZ1xuICAgIC8vIH1cbiAgICBpbnRlcmZhY2UgSVBhY2thZ2VUeXBlUHJvdG9LZXlNYXAge1xuICAgICAgICBba2V5OiBudW1iZXJdOiBJUGFja2FnZVR5cGVQcm90b0tleTtcbiAgICB9XG4gICAgaW50ZXJmYWNlIElQYWNrYWdlVHlwZVByb3RvS2V5IHtcbiAgICAgICAgdHlwZTogUGFja2FnZVR5cGU7XG4gICAgICAgIGVuY29kZT86IHN0cmluZztcbiAgICAgICAgZGVjb2RlPzogc3RyaW5nO1xuICAgIH1cbiAgICBpbnRlcmZhY2UgSVBiUHJvdG9JbnMge1xuICAgICAgICAvKipcbiAgICAgICAgICog57yW56CBXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICAgICAqL1xuICAgICAgICBlbmNvZGUoZGF0YTogYW55KTogcHJvdG9idWYuV3JpdGVyO1xuICAgICAgICAvKipcbiAgICAgICAgICog6Kej56CBXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICAgICAqL1xuICAgICAgICBkZWNvZGUoZGF0YTogVWludDhBcnJheSk6IGFueTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOmqjOivgVxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAgICAgKiBAcmV0dXJucyDlpoLmnpzpqozor4Hlh7rmlbDmja7mnInpl67popjvvIzliJnkvJrov5Tlm57plJnor6/kv6Hmga/vvIzmsqHpl67popjvvIzov5Tlm57kuLrnqbpcbiAgICAgICAgICovXG4gICAgICAgIHZlcmlmeShkYXRhOiBhbnkpOiBhbnk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGJQcm90b0hhbmRsZXIgaW1wbGVtZW50cyBlbmV0LklQcm90b0hhbmRsZXIge1xuICAgIHByb3RlY3RlZCBfcHJvdG9NYXA6IHsgW2tleTogc3RyaW5nXTogSVBiUHJvdG9JbnMgfTtcbiAgICBwcm90ZWN0ZWQgX2J5dGVVdGlsOiBCeXRlID0gbmV3IEJ5dGUoKTtcbiAgICAvKirmlbDmja7ljIXnsbvlnovljY/orq4ge1BhY2thZ2VUeXBlOiDlr7nlupTnmoTljY/orq5rZXl9ICovXG4gICAgcHJvdGVjdGVkIF9wa2dUeXBlUHJvdG9LZXlNYXA6IElQYWNrYWdlVHlwZVByb3RvS2V5TWFwO1xuICAgIHByb3RlY3RlZCBfaGFuZFNoYWtlUmVzOiBhbnk7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGJQcm90b0pzIOWNj+iuruWvvOWHumpz5a+56LGhXG4gICAgICogQHBhcmFtIHBrZ1R5cGVQcm90b0tleXMg5pWw5o2u5YyF57G75Z6L5Y2P6K6uIHtQYWNrYWdlVHlwZX0g5a+55bqU55qE5Y2P6K6ua2V5XG4gICAgICovXG5cbiAgICBjb25zdHJ1Y3RvcihwYlByb3RvSnM6IGFueSwgcGtnVHlwZVByb3RvS2V5cz86IElQYWNrYWdlVHlwZVByb3RvS2V5W10pIHtcbiAgICAgICAgaWYgKCFwYlByb3RvSnMpIHtcbiAgICAgICAgICAgIHRocm93IFwicGJQcm90b2pzIGlzIHVuZGVmaW5lZFwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Byb3RvTWFwID0gcGJQcm90b0pzO1xuICAgICAgICBjb25zdCBwa2dUeXBlUHJvdG9LZXlNYXAgPSB7fSBhcyBhbnk7XG4gICAgICAgIGlmIChwa2dUeXBlUHJvdG9LZXlzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBrZ1R5cGVQcm90b0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwa2dUeXBlUHJvdG9LZXlNYXBbcGtnVHlwZVByb3RvS2V5c1tpXS50eXBlXSA9IHBrZ1R5cGVQcm90b0tleXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGtnVHlwZVByb3RvS2V5TWFwID0gcGtnVHlwZVByb3RvS2V5TWFwO1xuICAgIH1cbiAgICBwcml2YXRlIF9oZWFydGJlYXRDZmc6IGVuZXQuSUhlYXJ0QmVhdENvbmZpZztcbiAgICBwdWJsaWMgZ2V0IGhlYXJ0YmVhdENvbmZpZygpOiBlbmV0LklIZWFydEJlYXRDb25maWcge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVhcnRiZWF0Q2ZnO1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0IGhhbmRTaGFrZVJlcygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGFuZFNoYWtlUmVzO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0SGFuZHNoYWtlUmVzPFQ+KGhhbmRTaGFrZVJlczogVCkge1xuICAgICAgICB0aGlzLl9oYW5kU2hha2VSZXMgPSBoYW5kU2hha2VSZXM7XG4gICAgICAgIHRoaXMuX2hlYXJ0YmVhdENmZyA9IGhhbmRTaGFrZVJlcyBhcyBhbnk7XG4gICAgfVxuICAgIHByb3RvS2V5MktleShwcm90b0tleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHByb3RvS2V5O1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgX3Byb3RvRW5jb2RlPFQ+KHByb3RvS2V5OiBzdHJpbmcsIGRhdGE6IFQpOiBVaW50OEFycmF5IHtcbiAgICAgICAgY29uc3QgcHJvdG8gPSB0aGlzLl9wcm90b01hcFtwcm90b0tleV07XG4gICAgICAgIGxldCBidWY6IFVpbnQ4QXJyYXk7XG4gICAgICAgIGlmICghcHJvdG8pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYG5vIHRoaXMgcHJvdG86JHtwcm90b0tleX1gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IHByb3RvLnZlcmlmeShkYXRhKTtcbiAgICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAgICAgYnVmID0gcHJvdG8uZW5jb2RlKGRhdGEpLmZpbmlzaCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBlbmNvZGUgZXJyb3I6YCwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH1cblxuICAgIGVuY29kZVBrZzxUPihwa2c6IGVuZXQuSVBhY2thZ2U8VD4sIHVzZUNyeXB0bz86IGJvb2xlYW4pOiBlbmV0Lk5ldERhdGEge1xuICAgICAgICBjb25zdCBwa2dUeXBlID0gcGtnLnR5cGU7XG4gICAgICAgIGNvbnN0IGJ5dGVVdGlsID0gdGhpcy5fYnl0ZVV0aWw7XG4gICAgICAgIGJ5dGVVdGlsLmNsZWFyKCk7XG4gICAgICAgIGJ5dGVVdGlsLmVuZGlhbiA9IEJ5dGUuTElUVExFX0VORElBTjtcbiAgICAgICAgYnl0ZVV0aWwud3JpdGVVaW50MzIocGtnVHlwZSk7XG4gICAgICAgIGxldCBwcm90b0tleTogc3RyaW5nO1xuICAgICAgICBsZXQgZGF0YTogYW55O1xuICAgICAgICBpZiAocGtnVHlwZSA9PT0gUGFja2FnZVR5cGUuREFUQSkge1xuICAgICAgICAgICAgY29uc3QgbXNnOiBlbmV0LklNZXNzYWdlID0gcGtnLmRhdGEgYXMgYW55O1xuICAgICAgICAgICAgYnl0ZVV0aWwud3JpdGVVVEZTdHJpbmcobXNnLmtleSk7XG4gICAgICAgICAgICBjb25zdCByZXFJZCA9IG1zZy5yZXFJZDtcbiAgICAgICAgICAgIGJ5dGVVdGlsLndyaXRlVWludDMyKCFpc05hTihyZXFJZCkgJiYgcmVxSWQgPiAwID8gcmVxSWQgOiAwKTtcbiAgICAgICAgICAgIGRhdGEgPSBtc2cuZGF0YTtcbiAgICAgICAgICAgIHByb3RvS2V5ID0gbXNnLmtleTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3RvS2V5TWFwID0gdGhpcy5fcGtnVHlwZVByb3RvS2V5TWFwO1xuICAgICAgICAgICAgcHJvdG9LZXkgPSBwcm90b0tleU1hcFtwa2dUeXBlXSAmJiBwcm90b0tleU1hcFtwa2dUeXBlXS5lbmNvZGU7XG4gICAgICAgICAgICBkYXRhID0gcGtnLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3RvS2V5ICYmIGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFVaW50OEFycmF5OiBVaW50OEFycmF5ID0gdGhpcy5fcHJvdG9FbmNvZGUocHJvdG9LZXksIGRhdGEpO1xuICAgICAgICAgICAgaWYgKCFkYXRhVWludDhBcnJheSkge1xuICAgICAgICAgICAgICAgIGJ5dGVVdGlsLmNsZWFyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ5dGVVdGlsLndyaXRlVWludDhBcnJheShkYXRhVWludDhBcnJheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV0RGF0YSA9IGJ5dGVVdGlsLmJ1ZmZlci5ieXRlTGVuZ3RoID8gYnl0ZVV0aWwuYnVmZmVyIDogdW5kZWZpbmVkO1xuICAgICAgICBieXRlVXRpbC5jbGVhcigpO1xuICAgICAgICByZXR1cm4gbmV0RGF0YTtcbiAgICB9XG4gICAgZW5jb2RlTXNnPFQ+KG1zZzogZW5ldC5JTWVzc2FnZTxULCBhbnk+LCB1c2VDcnlwdG8/OiBib29sZWFuKTogZW5ldC5OZXREYXRhIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlUGtnKHsgdHlwZTogUGFja2FnZVR5cGUuREFUQSwgZGF0YTogbXNnIH0sIHVzZUNyeXB0byk7XG4gICAgfVxuICAgIGRlY29kZVBrZzxUPihkYXRhOiBlbmV0Lk5ldERhdGEpOiBlbmV0LklEZWNvZGVQYWNrYWdlPFQ+IHtcbiAgICAgICAgY29uc3QgYnl0ZVV0aWwgPSB0aGlzLl9ieXRlVXRpbDtcbiAgICAgICAgYnl0ZVV0aWwuY2xlYXIoKTtcbiAgICAgICAgYnl0ZVV0aWwuZW5kaWFuID0gQnl0ZS5MSVRUTEVfRU5ESUFOO1xuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICBieXRlVXRpbC53cml0ZUFycmF5QnVmZmVyKGRhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgICAgICBieXRlVXRpbC53cml0ZVVpbnQ4QXJyYXkoZGF0YSBhcyBVaW50OEFycmF5KTtcbiAgICAgICAgfVxuICAgICAgICAvL+S9jee9ruW9kumbtu+8jOeUqOS6juivu+aVsOaNrlxuICAgICAgICBieXRlVXRpbC5wb3MgPSAwO1xuICAgICAgICBjb25zdCBwa2dUeXBlID0gYnl0ZVV0aWwucmVhZFVpbnQzMigpO1xuICAgICAgICBsZXQgZGVjb2RlUGtnOiBlbmV0LklEZWNvZGVQYWNrYWdlPFQ+ID0ge30gYXMgYW55O1xuICAgICAgICBpZiAocGtnVHlwZSA9PT0gUGFja2FnZVR5cGUuREFUQSkge1xuICAgICAgICAgICAgY29uc3QgcHJvdG9LZXkgPSBieXRlVXRpbC5yZWFkVVRGU3RyaW5nKCk7XG4gICAgICAgICAgICBjb25zdCByZXFJZCA9IGJ5dGVVdGlsLnJlYWRVaW50MzJOb0Vycm9yKCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhQnl0ZXMgPSBieXRlVXRpbC5yZWFkVWludDhBcnJheShieXRlVXRpbC5wb3MsIGJ5dGVVdGlsLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3RvID0gdGhpcy5fcHJvdG9NYXBbcHJvdG9LZXldO1xuICAgICAgICAgICAgZGVjb2RlUGtnLnJlcUlkID0gcmVxSWQ7XG4gICAgICAgICAgICBkZWNvZGVQa2cua2V5ID0gcHJvdG9LZXk7XG4gICAgICAgICAgICBpZiAoIXByb3RvKSB7XG4gICAgICAgICAgICAgICAgZGVjb2RlUGtnLmVycm9yTXNnID0gYG5vIHRoaXMgcHJvdG86JHtwcm90b0tleX1gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWNvZGVEYXRhID0gcHJvdG8uZGVjb2RlKGRhdGFCeXRlcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyID0gcHJvdG8udmVyaWZ5KGRlY29kZURhdGEpO1xuICAgICAgICAgICAgICAgIGRlY29kZVBrZy5kYXRhID0gZGVjb2RlRGF0YTtcbiAgICAgICAgICAgICAgICBkZWNvZGVQa2cuZXJyb3JNc2cgPSBlcnI7XG4gICAgICAgICAgICAgICAgZGVjb2RlUGtnLnR5cGUgPSBwa2dUeXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcHJvdG9LZXlNYXAgPSB0aGlzLl9wa2dUeXBlUHJvdG9LZXlNYXA7XG4gICAgICAgICAgICBjb25zdCBwcm90b0tleSA9IHByb3RvS2V5TWFwW3BrZ1R5cGVdICYmIHByb3RvS2V5TWFwW3BrZ1R5cGVdLmRlY29kZTtcbiAgICAgICAgICAgIGRlY29kZVBrZy5rZXkgPSBwcm90b0tleTtcbiAgICAgICAgICAgIGlmIChwcm90b0tleSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFCeXRlcyA9IGJ5dGVVdGlsLnJlYWRVaW50OEFycmF5KGJ5dGVVdGlsLnBvcywgYnl0ZVV0aWwubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm90byA9IHRoaXMuX3Byb3RvTWFwW3Byb3RvS2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoIXByb3RvKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY29kZVBrZy5lcnJvck1zZyA9IGBubyB0aGlzIHByb3RvOiR7cHJvdG9LZXl9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWNvZGVEYXRhID0gcHJvdG8uZGVjb2RlKGRhdGFCeXRlcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IHByb3RvLnZlcmlmeShkZWNvZGVEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgZGVjb2RlUGtnLmRhdGEgPSBkZWNvZGVEYXRhO1xuICAgICAgICAgICAgICAgICAgICBkZWNvZGVQa2cuZXJyb3JNc2cgPSBlcnI7XG4gICAgICAgICAgICAgICAgICAgIGRlY29kZVBrZy50eXBlID0gcGtnVHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGtnVHlwZSA9PT0gUGFja2FnZVR5cGUuSEFORFNIQUtFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIYW5kc2hha2VSZXMoZGVjb2RlUGtnLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlY29kZVBrZztcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Z0JBcURJLGNBQVksSUFBZ0I7b0JBQWhCLHFCQUFBLEVBQUEsV0FBZ0I7b0JBaENsQixTQUFJLEdBQVksSUFBSSxDQUFDO29CQUV2QixnQkFBVyxHQUFXLENBQUMsQ0FBQztvQkFNdEIsVUFBSyxHQUFXLENBQUMsQ0FBQztvQkFFbEIsWUFBTyxHQUFXLENBQUMsQ0FBQztvQkF1QjFCLElBQUksSUFBSSxFQUFFO3dCQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFD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
