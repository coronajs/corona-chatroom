import {Controller} from 'corona';
import {Room, User, RoomRepository} from './models';

export class RoomController extends Controller {
    init(params) {
        this.user = new User(shortid.generate(), params.name);
        this.sync({})
        this.room = RoomRepository.fetch(params.room_id, () => new Room(params.room_id));

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
