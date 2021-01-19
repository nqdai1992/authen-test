const express = require('express')
const session = require('express-session')
const admin = require('firebase-admin')
const cors = require('cors')
const FirebaseStore = require('connect-session-firebase')(session)
const app = express()

const firebaseConfig = {
    apiKey: "AIzaSyCXXM7gSvNeOomibXnLK5i9Wpn98j5PRUw",
    authDomain: "demofirebase-ffabd.firebaseapp.com",
    databaseURL: "https://demofirebase-ffabd.firebaseio.com",
    projectId: "demofirebase-ffabd",
    storageBucket: "demofirebase-ffabd.appspot.com",
    messagingSenderId: "455787756804",
    appId: "1:455787756804:web:b4b20a8eff437bf4b26451"
};

const serviceAccount = require("./demofirebase-ffabd-firebase-adminsdk-c485j-7ba0ad295a.json");

const ref = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://demofirebase-ffabd.firebaseio.com"
});

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(session({
    secret: 'secretkey',
    resave: true,
    saveUninitialized: true,
    store: new FirebaseStore({
        database: ref.database()
      }),
}))

app.get('/login', (req, res, next) => {
    req.session.views = 0
    res.end('login')
})

app.get('/test', (req, res, next) => {
    console.log(req.session)
    res.json({
        views: req.session.views++
    })
})


app.listen(6060)