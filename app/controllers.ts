import {Controller} from 'corona';
import {RoomModel, UserModel} from './models';
import {RoomRepository} from './repositories'
import * as shortid from 'shortid';

var Rooms = new RoomRepository();


export class HallController extends Controller {
  private rooms: RoomModel[];
  init(params) {
    this.rooms = Rooms.find();
    this.sync({
      include: ['rooms', 'rooms.*', 'rooms.*.users.length', 'rooms.*.chats.length'], // sync online users count and chats count in each room
      exclude: ['rooms.*.users', 'rooms.*.chats'] // don't sync users and chats
    });
    this.expose('create')
  }

  create(params) {
    let room = Rooms.create(params);
    this.rooms.push(room);
  }
}

export class RoomController extends Controller {
  private user: UserModel;
  private room: RoomModel;
  init(params) {
    this.user = new UserModel(shortid.generate(), params.name);
    this.user.setSocket(this.socket);
    this.sync({
      include: ['room', 'room.**', 'user']
    });
    this.expose('post');
    this.room = Rooms.fetch(params.room_id, () => new RoomModel({ id: params.room_id, name: shortid.generate() }));

    this.room.join(this.user);
  }

  post(content) {
    this.room.post(this.user, content);
  }

  onexit() {
    this.room.leave(this.user);
    this.user = null;
  }
}
