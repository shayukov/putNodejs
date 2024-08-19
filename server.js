//берём Express
const express = require('express'),
  { timeData } = require('./modules/time.js');

// создаём Express-приложение
const app = express();
const port = process.env.PORT || 4000;
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

// запускаем сервер на порту 4000
app.listen(port, () => {
  // отправляем сообщение
  console.log(`Сервер стартовал! http://localhost: ${port}`);
});


module.exports = app;
