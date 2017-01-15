import { WuhuWebPage } from './app.po';

describe('wuhu-web App', function() {
  let page: WuhuWebPage;

  beforeEach(() => {
    page = new WuhuWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
