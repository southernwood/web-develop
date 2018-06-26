import { Component, OnInit, OnDestroy} from '@angular/core';
import { ChatService} from "../chat.service";
import {MessageModel} from "./message.model"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: MessageModel[];
  connection;
  message: MessageModel;
  constructor(private chatService: ChatService) {
  }
  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message.text = '';
  }
  ngOnInit() {
    this.message = new MessageModel(null, null);
    this.messages = [];
    this.connection = this.chatService.getMessages().subscribe((message: MessageModel) =>{
      this.messages.push(message);
    })
    console.log(this.connection);
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
