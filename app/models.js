
import * as _ from 'lodash';
import {Model} from 'corona';

export class Room extends Model {
  constructor(data){
    this.users = new ArrayModel(this);
  }

  join(who) {
    this.users.set(who.id, who);
    this.emit('join', who);
  }

  leave(who) {
    this.users.remove(who.id);
    this.emit('leave', who.id);
    console.log(who.id, 'leaved')
    console.log('now ', this.users.length)
    if (this.users.size() == 0 && !this.is('waiting')) {
      this.close();
    }
  }
}


export class User extends Model {
  constructor(){

  }

}


export class RoomRepository extends Repository/*<Room>*/ {

}
