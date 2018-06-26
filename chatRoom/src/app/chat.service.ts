import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {MessageModel} from "./chat/message.model"
import * as io from 'socket.io-client';
@Injectable()
export class ChatService {
  private url = 'http://localhost:3030';
  private socket;

  sendMessage(message) {
    console.log('sending', message);
    this.socket.emit('send' ,message);
  }
  getMessages(){
    let observable = new Observable(observer =>{
      this.socket = io(this.url);
      this.socket.on('message', (data) =>{
        observer.next(new MessageModel(data.content.author, data.content.text));
    });
      return () =>{
          this.socket.disconnect();
      }
    });
    return observable;
  }

  constructor() { }

}
