import {Room, RoomModel, User, UserModel} from './models'
import {Repository} from 'corona'
import * as shortid from 'shortid' 

export class RoomRepository extends Repository<Room, RoomModel> {
    
} 

class UserRepository extends Repository<User, UserModel> {
    createGuest():PromiseLike<UserModel>{
        var m = new UserModel({id: shortid.generate()});
        this.store(m);
    }
}