import { ChatRoomPage } from './app.po';

describe('chat-room App', () => {
  let page: ChatRoomPage;

  beforeEach(() => {
    page = new ChatRoomPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
