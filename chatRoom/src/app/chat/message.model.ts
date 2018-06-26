export class MessageModel {
  public author: string;
  public text: string;
  constructor(_author: string, _text: string){
    this.author = _author;
    this.text = _text;
  }
}
