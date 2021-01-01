const reminder = () => {
  let today = new Date();
  let first = new Date(today.getFullYear(), 6, 29);
  let theDay = Math.round((today - first) / (1000 * 3600 * 24) + 0.5, 0);
  let week_1 = theDay / 7;
  var message;

  if (theDay % 7 == 0 || theDay % 7 == 6) {
    message = "Hôm nay là cuối tuần, tập thể dục thôi!\n";
  } else {
    message = "Chào cậu nha!\n";
  }

  // var file_time_table = "";
  // var ss = SpreadsheetApp.OpenById(file_time_table);
  // var url = ss.getUrl();

  var mapping = {
    1: "One",
    2: "Two",
    3: "Three",
  };

  const DucKiller = [
    "Bình tĩnh, điềm đạm, cẩn trọng",
    "Thoát khỏi sự tiếc nuối, giành lấy sự tự tin",
    "FreeCodeCamp, Geeksforgeeks, Codeforces, Hackerrank",
    "Biến khó khăn thành ưu thế",
    "Có làm thì mới có ăn",
    "Không ngừng suy nghĩ, tính toán thiên vận",
    "Mỗi lúc cảm thấy cô đơn chán nản thì hãy nghĩ, con Nekko, Bull ở nhà còn không có ai chơi đùa cùng cơ mà",
    "Khoảnh khắc hiểu rõ tất cả thiên địa quy tắc, giải thích được luân hồi, chân giả không thể giải thích nổi được đâu",
  ];

  let weatherObject = JSON.parse(get_weather());
  let description = weatherObject["weather"][0]["description"];
  message +=
    String.fromCharCode(187) +
    " " +
    String.fromCharCode(187) +
    " " +
    description.replace(description[0], description[0].toUpperCase()) +
    "\n" +
    "Nhiệt độ cảm giác: " +
    weatherObject["main"].feels_like +
    String.fromCharCode(176, 67) +
    "\n" +
    "Nhiệt độ thấp nhất: " +
    weatherObject["main"].temp_max +
    String.fromCharCode(176, 67) +
    "\n" +
    "Áp suất: " +
    weatherObject["main"].pressure +
    " Hectopascal" +
    " Độ ẩm: " +
    weatherObject["main"].humidity +
    "%" +
    "\n" +
    String.fromCharCode(187) +
    " " +
    DucKiller[Math.floor(Math.random() * DucKiller.length)];
  send_to_messenger(message);
};

const send_to_messenger = (textMessage) => {
  var recipient_ids = ["4919668594772309"];
  // 3559177047509273
  var API_PAGE_TOKEN =
    "EAACzg4kXXa0BAEZAVRrV5os7lZA6KZBBpsiin2AMlrg9kFs6ZBHLYndZAWgUHoAYRe0miJm15olY9fjY9GT0C3MG851vUFpZAbZBFcojJptRR7NqeZCQZBXGe22beCVPSkdfZBvREhC1JZBP9oQfIKkLX41WmEP96rJMZChzAMS6RwZCXsq88KxKHsBvS";
  for (let i = 0; i < recipient_ids.length; i++) {
    const messageData = {
      recipient: {
        id: recipient_ids[i],
      },
      message: {
        text: textMessage,
      },
    };

    let JSONMessageData = {};

    for (let j in messageData) {
      JSONMessageData[j] = JSON.stringify(messageData[j]);
    }
    const options = {
      method: "post",
      payload: JSONMessageData,
    };
    UrlFetchApp.fetch(
      "https://graph.facebook.com/v9.0/me/messages?access_token=" +
        API_PAGE_TOKEN,
      options
    );
  }
};

const get_weather = () => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=Hanoi,10000,VN&units=metric&lang=vi&appid=0407f9d8e492e0998287575717078017";
  return UrlFetchApp.fetch(url);
};
