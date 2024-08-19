//берём Express
const express = require('express'),
  { timeData } = require('./modules/time.js');

// создаём Express-приложение
const app = express();

// подключаем статические файлы css, и другие
app.use(express.static('static'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/genHtml.html', (req, res) => {
  exports.reqQuery = req.query
  res.end(
    timeData()
  )
})

// запускаем сервер на порту 8080
app.listen(8080)

// отправляем сообщение
console.log('Сервер стартовал! http://localhost: 8080');

module.exports = app;
