import { SocialcrawlerPage } from './app.po';

describe('socialcrawler App', () => {
  let page: SocialcrawlerPage;

  beforeEach(() => {
    page = new SocialcrawlerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
