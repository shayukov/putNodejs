const fs = require('fs');
const parse = require('node-html-parser').parse;
const servText = require('../server');
const { error } = require('console');

const adressArr = fs.readFileSync('adress.txt').toString().split('\r\n');
const adressArrKmPlus = fs.readFileSync('adress_kmPlus.txt').toString().split('\r\n');
const arrStrongKm = [],
    arrStrongAdress = [];


// exports.textData = function () {
function textData() {
    const adressArr2 = fs.readFileSync('adress2.txt').toString().split('\n');
    const adressArr2min = fs.readFileSync('adress2min.txt').toString().split('\n');
    const arr_km = [18, 20, 14, 24, 18, 20, 12, 18, 14, 20, 16, 28, 16, 26, 18, 20, 12, 16, 20, 14, 20, 22, 28, 20, 16, 8, 8, 6, 4, 2, 10, 4, 6, 8, 8, 10];
    const arr_km_plus = [19, 21, 15, 25, 19, 21, 13, 19, 15, 21, 17, 29, 17, 27, 19, 21, 13, 17, 21, 15, 21, 23, 29, 21, 17, 9, 9, 7, 5, 3, 11, 5, 7, 9, 9, 11];

    const m_adress = servText.reqQuery.m_adress,
        z_adress = servText.reqQuery.z_adress,
        zTime = servText.reqQuery.refillTime,
        KM = +servText.reqQuery.km;

    let sum_km = 0,
        i = 0,
        raz_km = 0;

    arrStrongKm.length = 0;
    arrStrongAdress.length = 0;

    if (m_adress === 'Московская 43') {
        sum_km += 6
    }

    if(z_adress !== 'Нет' && zTime !== '') {
        switch (z_adress) {
            case 'Девятаева 15а':
                sum_km += 8
                arrStrongAdress.push('Пушкина8 - Девятаева15А=4<br>Девятаева15А - Пушкина8=4')
                arrStrongKm.push(8)
                break
            case 'Сары Садыковой 65':
                sum_km += 8
                arrStrongAdress.push('Пушкина8 - СарыСадыковой65=4<br>СарыСадыковой65 - Пушкина8=4')
                arrStrongKm.push(8)
                break
            case 'Отрадная 5а':
                sum_km += 14
                arrStrongAdress.push('Пушкина8 - Отрадная5а=7<br>Отрадная5а - Пушкина8=7')
                arrStrongKm.push(14)
                break
            case 'Н.Столбова 1':
                sum_km += 6
                arrStrongAdress.push('Пушкина8 - Н.Столбова1=3<br>Н.Столбова1 - Пушкина8=3')
                arrStrongKm.push(6)
                break
        }    
    }

    if (KM % 2 !== 0) {
        if (adressArr2.length == 25) {
            i = 0
            adressArr2.length = 0
            fs.writeFile('adress2.txt', '', (err) => console.log(err))
        }
        for (i; i < 25; i++) {
            if (!adressArr2.includes(adressArr[i])) {
                sum_km += arr_km_plus[i]
                arrStrongAdress.push(adressArrKmPlus[i])
                arrStrongKm.push(arr_km_plus[i])
                fs.appendFileSync("adress2.txt", adressArr[i] + "\n");
                break
            }
        }
        i++
    }

    while (sum_km !== KM) {
        if (i == 25) {
            i = 0
            adressArr2.length = 0
            fs.writeFileSync('adress2.txt', '', (err) => console.log(err))
            continue
        }
        if (!adressArr2.includes(adressArr[i])) {
            sum_km += arr_km[i]
        } else {
            i++
            continue
        }
        if (sum_km < KM) {
            arrStrongAdress.push(adressArr[i])
            arrStrongKm.push(arr_km[i])
            fs.appendFileSync("adress2.txt", adressArr[i] + "\n");
        } else if (sum_km > KM) {
            sum_km -= arr_km[i]
            raz_km = KM - sum_km
            if (raz_km <= 11) {
                let a = 25
                while (raz_km !== 0) {
                    if (arr_km[a] === raz_km) {
                        if (!adressArr2min.includes(adressArr[a])) {
                            sum_km += raz_km
                            arrStrongAdress.push(adressArr[a])
                            arrStrongKm.push(arr_km[a])
                            fs.appendFileSync("adress2min.txt", adressArr[a] + "\n");
                            raz_km = 0
                            continue
                        }
                    } else if (a == arr_km.length) {
                        a = 25
                        adressArr2min.length = 0
                        fs.writeFileSync('adress2min.txt', '', (err) => console.log(err))
                        continue
                    }
                    a++
                }
            } else {
                let a = 0
                while (raz_km !== 0) {
                    if (arr_km[a] === raz_km) {
                        if (!adressArr2.includes(adressArr[a]) && !arrStrongAdress.includes(adressArr[a])) {
                            sum_km += raz_km
                            arrStrongAdress.push(adressArr[a])
                            arrStrongKm.push(arr_km[a])
                            fs.appendFileSync("adress2.txt", adressArr[a] + "\n");
                            raz_km = 0
                            continue
                        }
                    } else if (a == arr_km.length) {
                        a = 0
                        adressArr2.length = 0
                        fs.writeFileSync('adress2.txt', '', (err) => console.log(err))
                        continue
                    }
                    a++
                }
            }
        } else if (sum_km === KM) {
            arrStrongAdress.push(adressArr[i])
            arrStrongKm.push(arr_km[i])
            fs.appendFileSync("adress2.txt", adressArr[i] + "\n");
            continue
        }
        i++
    }

    if (m_adress === 'Московская 43') {
        arrStrongAdress.push('Пушкина8 - Московская43=3<br>Пушкина8 - Московская43=3')
    }

    if (sum_km != KM) {
        error('Ошибка! Повторите заново!')
    }

    return sum_km
}

module.exports.textData = textData;
module.exports.arrStrongKm = arrStrongKm;
module.exports.arrStrongAdress = arrStrongAdress;
// module.exports.friday = textData.friday;