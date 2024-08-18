fs = require("fs");

generatorHtml = function (tx, tm) {
    str = '';
    str += '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge">';
    str += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    str += '<title>Результат</title><link rel="stylesheet" href="css/genHtml.css"></head>';
    str += `<body><div id="flex-box"><div id="text">${tx}</div><div id="time">${tm}</div></div></body></html>`;

    // fs.writeFileSync("genHtml.html", str);
    return str
}

module.exports.generatorHtml = generatorHtml;