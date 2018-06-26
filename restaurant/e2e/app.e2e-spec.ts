import { Restaurant2Page } from './app.po';

describe('restaurant2 App', () => {
  let page: Restaurant2Page;

  beforeEach(() => {
    page = new Restaurant2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
