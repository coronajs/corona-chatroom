import {Controller} from 'corona';
import {RoomModel, UserModel} from './models';
import {RoomRepository} from './repositories'

var Rooms = new RoomRepository();


export class HallController extends Controller {
  private rooms:RoomModel[];
  init(params){
    this.rooms = Rooms.find();
    this.sync({
      include: ['rooms', 'rooms.*', 'rooms.*.users.length', 'rooms.*.chats.length'], // sync online users count and chats count in each room
      exclude: ['rooms.*.users', 'rooms.*.chats'] // don't sync users and chats
    });
  }

  create(params){
    this.rooms.create(params);
  }
}

export class RoomController extends Controller {
    init(params) {
        this.user = new UserModel(shortid.generate(), params.name);
        this.sync({
          include: ['room', 'room.**', 'user']
        });
        this.room = Rooms.fetch(params.room_id, () => new Room(params.room_id));

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
