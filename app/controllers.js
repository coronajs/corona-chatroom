"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var corona_1 = require('corona');
var models_1 = require('./models');
var Rooms = new models_1.RoomRepository();
var HallController = (function (_super) {
    __extends(HallController, _super);
    function HallController() {
        _super.apply(this, arguments);
    }
    HallController.prototype.init = function (params) {
        this.rooms = Rooms.find();
        this.sync({
            include: ['rooms', 'rooms.*', 'rooms.*.users.length', 'rooms.*.chats.length'],
            exclude: ['rooms.*.users', 'rooms.*.chats'] // don't sync users and chats
        });
    };
    HallController.prototype.create = function (params) {
        this.rooms.create(params);
    };
    return HallController;
}(corona_1.Controller));
exports.HallController = HallController;
var RoomController = (function (_super) {
    __extends(RoomController, _super);
    function RoomController() {
        _super.apply(this, arguments);
    }
    RoomController.prototype.init = function (params) {
        this.user = new models_1.User(shortid.generate(), params.name);
        this.sync({
            include: ['room', 'room.**', 'user']
        });
        this.room = Rooms.fetch(params.room_id, function () { return new models_1.Room(params.room_id); });
        this.room.join(this.user);
    };
    RoomController.prototype.post = function (content) {
        this.room.post(this.user, content);
    };
    RoomController.prototype.onexit = function () {
        this.room.leave(this.user);
        this.user = null;
    };
    return RoomController;
}(corona_1.Controller));
exports.RoomController = RoomController;
