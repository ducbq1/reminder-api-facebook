
const API_PAGE_TOKEN = "";

const reminder = () => {
  let dayDigit = new Date();
  let theDay = dayDigit.getDay();
  var message;

  var mapping = {
    0: "Chủ Nhật",
    1: "thứ Hai",
    2: "thứ Ba",
    3: "thứ Tư",
    4: "thứ Năm",
    5: "thứ Sáu",
    6: "thứ Bảy"
  };

  let dayWord = mapping[theDay];
  
  if (theDay == 0) {
    message = "𝗟𝗢𝗔𝗟𝗢𝗔𝗢𝗞𝗘𝗟𝗔𝗖𝗔𝗡𝗔𝗗𝗔\n📣📢📢📢 Cuối tuần rồi, tập thể dục thôi 🙂🙂🙂\n";
  } else {
    message = `𝗟𝗢𝗔𝗟𝗢𝗔𝗢𝗞𝗘𝗟𝗔𝗖𝗔𝗡𝗔𝗗𝗔\n📣📢📢📢 Hôm nay là ${dayWord} 😄😄😄\n`;
  }

  const sentences = [
    "Mỗi lúc cảm thấy cô đơn chán nản thì hãy nghĩ, con Nekko, Bull ở nhà còn không có ai chơi đùa cùng cơ mà",
    "Khoảnh khắc hiểu rõ tất cả thiên địa quy tắc, giải thích được luân hồi, chân giả không thể giải thích nổi được đâu",
    "Bình tĩnh, điềm đạm, cẩn trọng",
    "Thoát khỏi sự tiếc nuối, giành lấy sự tự tin",
    "Biến khó khăn thành ưu thế",
    "Có làm thì mới có ăn",
    "Không ngừng suy nghĩ, tính toán thiên vận",
    "Chúc buổi sáng an lành, một ngày làm việc may mắn và thành công, chúc bạn luôn vui vẻ tràn ngập tiếng cười",
    "Người ta nói rằng một nụ cười là hệ thống siêu ánh sáng cho khuôn mặt, hệ thống làm mát cho cái đầu và hệ thống sưởi ấm cho trái tim. Vì vậy, bạn hãy mỉm cười mỗi ngày bạn nhé! Ngày mới vui vẻ",
    "Chúc bạn buổi sáng tốt lành, thật sự tốt lành đủ để bạn có thể mỉm cười được ấy",
    "Khi nhận được tin nhắn này thì bạn hãy cười đi nhé, vì ít nhất đâu đó quanh đây có một người mong bạn hạnh phúc, vui vẻ và luôn yêu đời. He, chúc bạn một ngày tươi trẻ nhé",
    "Ông mặt trời mọc rồi kìa, với nụ cười ấm áp biết bao! Ông chúc bạn một buổi sáng tốt lành và mong bạn sẽ có một ngày thật tuyệt",
    "Sương mai long lanh trên cành, hoa nở, chim hót đầy sức sống, hãy đứng dậy và bước đi vững chắc trong ngày mới với những hy vọng cho tương lai của bạn nhé",
    "Khi nhận được tin nhắn này thì hãy cười lên nhé, vì ít nhất ở đâu đó có người đang mong bạn luôn vui vẻ, tự tin, yêu đời. Chúc một ngày mới thật suôn sẻ và tốt lành"
  ];
  let { Confirmed, Deaths, Recovered } = get_covid()[get_covid().length - 1];
  let beforeConfirmed = get_covid()[get_covid().length - 2].Confirmed;
  let weatherObject = JSON.parse(get_weather());
  let description = weatherObject["weather"][0]["description"];
  message +=
    String.fromCharCode(10) +
    "🌦️ 𝕎𝔼𝔸𝕋ℍ𝔼ℝ ℂ𝕆ℕ𝔻𝕀𝕋𝕀𝕆ℕ𝕊\nTổng quan: " +
    description.replace(description[0], description[0].toUpperCase()) +
    "\nNhiệt độ cảm giác: " +
    weatherObject["main"].feels_like +
    String.fromCharCode(176, 67, 10) +
    "Nhiệt độ thấp nhất: " +
    weatherObject["main"].temp_max +
    String.fromCharCode(176, 67, 10) +
    "Áp suất: " +
    weatherObject["main"].pressure +
    "hPa\nĐộ ẩm: " +
    weatherObject["main"].humidity +
    "% 💧💧💧💧💧\n\n" +
    "🐛 𝕊𝔸ℝ𝕊-ℂ𝕠𝕍-𝟚\n" +
    `Việt Nam có tổng số ca nhiễm bệnh tính đến thời điểm hiện tại là ${Confirmed} ca, tăng ${Confirmed - beforeConfirmed} ca so với ngày hôm qua. Có ${Deaths} trường hợp tử vong, hiện đã chữa khỏi ${Recovered} người 😭` +
    "\n\n😋 𝔾𝕆𝕆𝔻 𝕄𝕆ℝℕ𝕀ℕ𝔾\n" +
    sentences[Math.floor(Math.random() * sentences.length)];
  send_to_messenger(message);
};

const send_to_messenger = async (textMessage) => {

  var recipient_ids = get_UID();
  
  for (let i = 0; i < recipient_ids.length; i++) {

    const messageData = {
      "recipient": {
        "id": recipient_ids[i],
      },
      "message": {
        "text": textMessage,
      },
    };

    const jsonMessage = {};
    for (let j in messageData) {
      jsonMessage[j] = JSON.stringify(messageData[j]);
    }

    const options = {
      method: "post",
      payload: jsonMessage,
    };

    try {
      UrlFetchApp.fetch(`https://graph.facebook.com/v11.0/me/messages?access_token=${API_PAGE_TOKEN}`, options);
    } catch (error) {
      Logger.log(error);
    }
  }
};

const get_UID = () => JSON.parse(UrlFetchApp.fetch(`https://graph.facebook.com/v11.0/me/conversations?fields=participants&access_token=${API_PAGE_TOKEN}`))
  .data.map(item => item.participants.data[0].id);

const get_covid = () => JSON.parse(UrlFetchApp.fetch("https://api.covid19api.com/live/country/vietnam/status/confirmed"));

const get_weather = () => UrlFetchApp.fetch("http://api.openweathermap.org/data/2.5/weather?q=Hanoi,10000,VN&units=metric&lang=vi&appid=0407f9d8e492e0998287575717078017");

