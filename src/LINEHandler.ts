const LINE_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_ACCESS_TOKEN");
const LINE_URL = 'https://api.line.me/v2/bot/message/reply';

/**
 * POSTハンドラ
 * @param e イベント
 */
const doPost = (e: GoogleAppsScript.Events.DoPost) => {
  const json = JSON.parse(e.postData.contents);

  //replyToken…イベントへの応答に使用するトークン(Messaging APIリファレンス)
  // https://developers.line.biz/ja/reference/messaging-api/#message-event
  const reply_token = json.events[0].replyToken;
  const messageText = json.events[0].message.text;

  // 検証
  if (reply_token === undefined) { return; }

  UrlFetchApp.fetch(LINE_URL, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN,
    },
    "method": "post",
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': messageText,
      }],
    }),
  });
}
