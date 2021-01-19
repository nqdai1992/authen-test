const express = require('express')
const session = require('express-session')
const admin = require('firebase-admin')
const cors = require('cors')
const FirebaseStore = require('connect-session-firebase')(session)
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")

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
    origin: ['http://localhost:8080', 'https://localhost:8080'],
    credentials: true,
}))
app.use(session({ secret: "thepolyglotdeveloper", cookie: { secure: true, maxAge: 60000 }, saveUninitialized: true, resave: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/session", (request, response, next) => {
    request.session.example = Date.now();
    response.send({ id: request.session.example });
});

app.post("/session", (request, response, next) => {
    if(request.body.session != request.session.example) {
        return response.status(500).send({ message: "The data in the session does not match!" });
    }
    response.send({ message: "Success!" });
});


app.listen(process.env.PORT || 8080)