//функция преобразовывает миллисекунды в строку формата HH:mm
function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes;
  }
  //функция преобразовывает строку HH:mm в миллисекунды 
  function strToTime(duration) {
    duration = duration.split(':');
    var minutes = Math.floor(duration[1] * 1000 * 60),
      hours = Math.floor(duration[0] * 1000 * 60 * 60);
    return hours + minutes;
  }

  //функция поиска и преоброзования времени в пути
  function pathToTime(arr,r) {
    let m = ''
    if (arr[r] >= 2 && arr[r] <= 9) {
      m = "00:05";
    } else if (arr[r] >= 10 && arr[r] <= 12) {
      m = "00:10";
    } else if (arr[r] >= 13 && arr[r] <= 17) {
      m = "00:15";
    } else if (arr[r] == 18) {
      m = "00:20";
    } else if (arr[r] >= 19 && arr[r] <= 20) {
      m = "00:25";
    } else if (arr[r] >= 21 && arr[r] <= 25) {
      m = "00:30";
    } else if (arr[r] >= 26 && arr[r] <= 30) {
      m = "00:35";
    } else if (arrStrongKm[r] >= 31) {
      m = "00:40";
    }
    m = strToTime(m)
    return m
  }

module.exports.msToTime = msToTime;
module.exports.strToTime = strToTime;
module.exports.pathToTime = pathToTime;