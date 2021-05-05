require('dotenv').config();

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const transferRoute = require('./routes/transfer.route');
const authMiddleware = require('./middleware/auth.middleware');
const sessionMiddleware = require('./middleware/session.middleware');
const port = 3001

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.get('/', (req, res) => {
  res.render('index');
})

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})