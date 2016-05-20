
import * as _ from 'lodash';
import {Model, ArrayModel, Repository} from 'corona';

export interface Room {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export class RoomModel extends Model<Room> {
  public users: UserModel[] = [];
  public chats: string[] = [];
  private shutdownTimer: NodeJS.Timer;
  // constructor(data) {
  //   super(data);

  // }

  join(who) {
    this.users.push(who);
    who.room = this;
    this.emit('join', who);
  }

  leave(who) {
    var user = _.remove(this.users, (u) => u.id == who);
    user.room = null;
    this.emit('leave', who.id);
    console.log(who.id, 'leaved')
    console.log('now ', this.users.length)
    if (this.users.length == 0) {
      this.waitForShutdown();
    }
  }

  waitForShutdown(timeout=30000) {
    this.shutdownTimer = setTimeout(() => this.dispose(), timeout);
    this.once('join', () => {
      if (this.shutdownTimer) {
        clearTimeout(this.shutdownTimer)
        this.shutdownTimer = null;
      }
    });
  }

  dispose() {
    this.emit('shutdown');
    this.users.forEach(u => this.leave(u));
    super.dispose();
  }
}


export class UserModel extends Model<User> {
  private socket: SocketIO.Socket;
  private disposeTimeout: NodeJS.Timer;
  public room:RoomModel;

  setSocket(socket: SocketIO.Socket) {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = socket;
    if (this.disposeTimeout) {
      clearTimeout(this.disposeTimeout);
    }
    socket.on('disconnect', this.onDisconnect.bind(this))
  }

  onDisconnect() {
    this.disposeTimeout = setTimeout(() => this.dispose(), 30000);
  }
}