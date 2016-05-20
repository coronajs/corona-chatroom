"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var corona_1 = require('corona');
var RoomModel = (function (_super) {
    __extends(RoomModel, _super);
    function RoomModel(data) {
        this.users = new ArrayModel(this);
    }
    RoomModel.prototype.join = function (who) {
        this.users.set(who.id, who);
        this.emit('join', who);
    };
    RoomModel.prototype.leave = function (who) {
        this.users.remove(who.id);
        this.emit('leave', who.id);
        console.log(who.id, 'leaved');
        console.log('now ', this.users.length);
        if (this.users.size() == 0 && !this.is('waiting')) {
            this.close();
        }
    };
    return RoomModel;
}(corona_1.Model));
exports.RoomModel = RoomModel;
var RoomRepository = (function (_super) {
    __extends(RoomRepository, _super);
    function RoomRepository() {
        _super.apply(this, arguments);
    }
    return RoomRepository;
}(corona_1.Repository));
exports.RoomRepository = RoomRepository;
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
    }
    return UserModel;
}(corona_1.Model));
exports.UserModel = UserModel;
var RoomRepository = (function (_super) {
    __extends(RoomRepository, _super);
    function RoomRepository() {
        _super.apply(this, arguments);
    }
    return RoomRepository;
}(corona_1.Repository));
exports.RoomRepository = RoomRepository;
