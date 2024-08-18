const { arrStrongKm, arrStrongAdress, textData } = require('./textData_m');
const servTime = require('../server');
const { msToTime, strToTime, pathToTime } = require('./msAndStrToTime');
const { generatorHtml } = require('../index')

const startOfTheDay = '08:40';
const startLunch = '12:00';
const endLunch = '12:45';

function timeData() {
  let sum_km = textData()
  const zTime = servTime.reqQuery.refillTime,
        z_adress = servTime.reqQuery.z_adress,
        zTimeMl = strToTime(zTime),
        zTimeStartMl = zTimeMl - strToTime('00:05'),
        zTimeEndMl = zTimeMl + strToTime('00:05'),
        friday = servTime.reqQuery.friday,
        endOfTheDay = friday == '' ? '16:10' : '17:20',
        arrMinute = [],
        waitMl = strToTime('00:05'),
        startOfTheDayMl = strToTime(startOfTheDay),
        endOfTheDayMl = strToTime(endOfTheDay),
        startLunchMl = strToTime(startLunch),
        endLunchMl = strToTime(endLunch);


  let sumMinute = startOfTheDayMl,
      m = '',
      difference2 = 0,
      difference = difference2,
      sMr = 0,
      r = 0;



  kmSplice = [];
  adressSplice = [];

  let arrStrongKmLength = Math.round(arrStrongKm.length / 2),
      sumM = startOfTheDayMl;

  if(zTime !== '' && z_adress !== 'Нет'){

    // если заправка есть!!!
    // и заправка до обеда=========================================================================================
    if(zTimeMl < startLunchMl) {
    
      let sM = sumMinute,
          z = 0;
      
      //установка заправки на своё место в списке до обеда
      for (let i = 1; i < arrStrongKm.length; i++) {
        let sM2 = sM
        m = pathToTime(arrStrongKm,i)
        sM += m
        sM += waitMl
        sM += m
        sM += waitMl
        if(sM < zTimeStartMl) {
          kmSplice = arrStrongKm.splice(i,1)
          arrStrongKm.splice(0,0,kmSplice[0])
          adressSplice = arrStrongAdress.splice(i,1)
          arrStrongAdress.splice(0,0,adressSplice[0])
          z++
        }else {
          sM = sM2
          continue
        }
      }
      //запись времени до заправки
      for(r; r < z; r++) {
        m = pathToTime(arrStrongKm,r)
        arrMinute.push(msToTime(sumMinute) + '-')
        sumMinute += m
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
        sumMinute += waitMl
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
        sumMinute += m 
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
        sumMinute += waitMl
      }
      //запись времени заправки
      m = pathToTime(arrStrongKm,r)
      sumMinute = zTimeStartMl - m
      arrMinute.push(msToTime(sumMinute) + '-')
      sumMinute += m
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
      sumMinute = zTimeEndMl
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
      sumMinute += m
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
      sumMinute += waitMl
      r++
      //запись времени после заправки
      //==================================
      //цикл для подсчёта разницы
      sM = sumMinute
      for(let i = r; i < arrStrongKmLength; i++) {
        m = pathToTime(arrStrongKm,i)
        sM += m
        sM += waitMl
        sM += m
        sM += waitMl
      }
      let sumM2 = 0
      if(r != arrStrongKmLength) {      
        sumM = startLunchMl - sM
        sumM2 = (sumM/3)/(arrStrongKmLength - r)
      }      
      //окончательная запись времени после заправки
      for(r; r < arrStrongKmLength; r++) {
        m = pathToTime(arrStrongKm,r)
        arrMinute.push(msToTime(sumMinute) + '-')
        sumMinute += m + sumM2
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
        sumMinute += waitMl + sumM2
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
        sumMinute += m + sumM2 
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
        sumMinute += waitMl
      }
      //запись времени после обеда
      sumMinute = endLunchMl
      sumM = endLunchMl
      arrStrongKmLength = arrStrongKm.length - arrStrongKmLength
      let i = r
      for (i ; i < arrStrongKm.length; i++) {
        m = pathToTime(arrStrongKm,i)
        sumM += m
        sumM += waitMl
        sumM += m
        sumM += waitMl
      }
      difference2 = endOfTheDayMl - sumM
      difference = Math.floor((difference2/arrStrongKmLength)/3)
    
      for (r; r < arrStrongKm.length; r++) {
        m = pathToTime(arrStrongKm,r)
        arrMinute.push(msToTime(sumMinute) + '-')
        sumMinute += m + difference
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
        sumMinute += waitMl + difference
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
        sumMinute += m + difference 
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
        sumMinute += waitMl
      }
    }else if(zTimeMl > endLunchMl) {
      // если заправка есть!!!
      // и заправка после обеда====================================================================================
      //=======================================
      // запись до обеда
      //========================================================================
      for (let i = 0; i < arrStrongKmLength; i++) {
        m = pathToTime(arrStrongKm,i)
        sumM += m
        sumM += waitMl
        sumM += m
        sumM += waitMl
      }
      difference2 = startLunchMl - sumM
      difference = Math.floor((difference2/arrStrongKmLength)/3)
      
      for (r; r < arrStrongKmLength; r++) {
        m = pathToTime(arrStrongKm,r)
        arrMinute.push(msToTime(sumMinute) + '-')
        sumMinute += m + difference
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
        sumMinute += waitMl + difference
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
        sumMinute += m + difference
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
        sumMinute += waitMl
      }
      //===============================================================================
      //запись времени заправки после обеда
      //=========================================
      kmSplice = arrStrongKm.splice(0,1)
      arrStrongKm.splice(r,0,kmSplice[0])
      adressSplice = arrStrongAdress.splice(0,1)
      arrStrongAdress.splice(r,0,adressSplice[0])

      sumMinute = endLunchMl
      let sM = sumMinute,
          afterLanchMl = 0,
          razMl = 0,
          z = 0;
  
      //установка заправки на своё место в списке после обеда
      for (let i = r; i < arrStrongKm.length; i++) {
        m = pathToTime(arrStrongKm,i)
        sM += m
        sM += waitMl
        sM += m
        sM += waitMl
      }
      if(arrStrongKm.length - (r + 1) != 0) {
        afterLanchMl = endOfTheDayMl - sM
        razMl = Math.floor((afterLanchMl/3)/(arrStrongKm.length - (r + 1)))  
      }
      sM = sumMinute
      z = 0

      for (let i = r + 1; i < arrStrongKm.length; i++) {
        let sM2 = sM
        m = pathToTime(arrStrongKm,i)
        sM += m + razMl
        sM += waitMl + razMl
        sM += m + razMl
        sM += waitMl
        if(sM < zTimeStartMl) {
          kmSplice = arrStrongKm.splice(i,1)
          arrStrongKm.splice(r,0,kmSplice[0])
          adressSplice = arrStrongAdress.splice(i,1)
          arrStrongAdress.splice(r,0,adressSplice[0])
          z++
        }else {
          sM = sM2
          continue
        }
      }
      //запись времени до заправки
      z += r
      for(r; r < z; r++) {
        m = pathToTime(arrStrongKm,r)
        arrMinute.push(msToTime(sumMinute) + '-')
        sumMinute += m + razMl
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
        sumMinute += waitMl + razMl
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
        sumMinute += m + razMl 
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
        sumMinute += waitMl
      }
      //запись времени заправки
      m = pathToTime(arrStrongKm,r)
      sumMinute = zTimeStartMl - m
      arrMinute.push(msToTime(sumMinute) + '-')
      sumMinute += m
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
      sumMinute = zTimeEndMl
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
      sumMinute += m
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
      sumMinute += waitMl
      r++

      //запись времени после заправки
      //==================================
      //цикл для подсчёта разницы
      sM = sumMinute
      for(let i = r; i < arrStrongKm.length; i++) {
        m = pathToTime(arrStrongKm,i)
        sM += m
        sM += waitMl
        sM += m
        sM += waitMl
      }
      let sumM2 = 0
      if(r != arrStrongKm.length) {      
        sumM = endOfTheDayMl - sM
        sumM2 = Math.floor(sumM/3)/(arrStrongKm.length - r)
      }      
      //окончательная запись времени после заправки
      for(r; r < arrStrongKm.length; r++) {
        m = pathToTime(arrStrongKm,r)
        arrMinute.push(msToTime(sumMinute) + '-')
        sumMinute += m + sumM2
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
        sumMinute += waitMl + sumM2
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
        sumMinute += m + sumM2 
        arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
        sumMinute += waitMl
      }
    }
  }else {
    // до обеда
    //========================================================================
    for (let i = 0; i < arrStrongKmLength; i++) {
      m = pathToTime(arrStrongKm,i)
      sumM += m
      sumM += waitMl
      sumM += m
      sumM += waitMl
    }
    difference2 = startLunchMl - sumM
    difference = Math.floor((difference2/arrStrongKmLength)/3)
    
    for (r; r < arrStrongKmLength; r++) {
      m = pathToTime(arrStrongKm,r)
      arrMinute.push(msToTime(sumMinute) + '-')
      sumMinute += m + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
      sumMinute += waitMl + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
      sumMinute += m + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
      sumMinute += waitMl
    }
    // после обеда
    //==============================================================================
    sumMinute = endLunchMl
    sumM = endLunchMl
    arrStrongKmLength = arrStrongKm.length - arrStrongKmLength
    let i = r
    for (i ; i < arrStrongKm.length; i++) {
      m = pathToTime(arrStrongKm,i)
      sumM += m
      sumM += waitMl
      sumM += m
      sumM += waitMl
    }
    difference2 = endOfTheDayMl - sumM
    difference = Math.floor((difference2/arrStrongKmLength)/3)

    for (r; r < arrStrongKm.length; r++) {
      m = pathToTime(arrStrongKm,r)
      arrMinute.push(msToTime(sumMinute) + '-')
      sumMinute += m + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br>')
      sumMinute += waitMl + difference
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '-')
      sumMinute += m + difference 
      arrMinute.splice(r,1,arrMinute[r] + msToTime(sumMinute) + '<br><br>')
      sumMinute += waitMl
    }
  }

  //==============================================================================
  //вывод результата
  let arrAdressTXT = arrStrongAdress.toString()
  arrAdressTXT = arrAdressTXT.replace(/,/g, `<br><br>`)
  const root = `${arrAdressTXT} <br><br> ${sum_km} км пройденно!`

  arr = arrMinute.join('')
  return generatorHtml(root, arr)
}

module.exports.timeData = timeData;
