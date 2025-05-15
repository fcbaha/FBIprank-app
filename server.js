const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

const YOUR_EMAIL = 'proviper054@gmail.com';
const YOUR_APP_PASSWORD = 'nkwpmlrbqcdzpcvf';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/send', async (req, res) => {
  const { name, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: YOUR_EMAIL,
      pass: YOUR_APP_PASSWORD
    }
  });

  const mailOptions = {
    from: `"ФБР (Фейковое Бюро Рофлов) 🕵️♂️" <${YOUR_EMAIL}>`,
    to: email,
    subject: '🚨 Ты засветился в деле «Кто тут лох?»',
    html: `
      <h2>${name}, поздравляем! Ты — главный подозреваемый.</h2>
      <p>Наши эксперты (да-да, те самые, что в подвале мамкиного дома) провели анализ твоей жизни и вот выводы:</p>
      <ul>
        <li><b>IQ тест:</b> "Ошибка 404 — значение не найдено"</li>
        <li><b>Стиль:</b> "Мешок с костями в светлом"</li>
        <li><b>Карьера:</b> "Профессиональный грузчик дивана"</li>
      </ul>
      <p><i>P.S. Это шутка😏</i></p>
      <hr>
      <p style="color: gray;">С уважением, <br> Комитет по борьбе с твоей уверенностью в себе</p>
    `,
    attachments: [
      {
        filename: 'доказательство_что_ты_лузер.jpg',
        path: path.join(__dirname, 'assets', 'hacked.jpg'),
        cid: 'dossier'
      }
    ]
};

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Письмо с вложением отправлено:', info.response);
    res.redirect('/');
  } catch (error) {
    console.error('❌ Ошибка при отправке письма:', error);
    res.status(500).send('Ошибка при отправке письма.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Сервер работает: http://localhost:${PORT}`));
