const API_PAGE_TOKEN = "";

const parseXml = () => {
  
  const url = 'https://vnexpress.net/rss/suc-khoe.rss';
  const xml = UrlFetchApp.fetch(url).getContentText();
  const document = XmlService.parse(xml);
  const root = document.getRootElement();
  const entries = root.getChild('channel').getChildren();
  const random = Math.floor(Math.random() * entries.length) + 6;

  const title = entries[random].getChild('title').getText();
  const date = entries[random].getChild('pubDate').getText();
  const link = entries[random].getChild('link').getText();
  const message = {
    message: `${title}\n${date}`,
    link: link
  }

  var options = {
    'method' : 'post',
    'payload' : message
  };

  UrlFetchApp.fetch(`https://graph.facebook.com/v11.0/me/feed?access_token=${API_PAGE_TOKEN}`, options);
}