const express = require('express'); // express를 불러온다.
const mongoose = require("mongoose"); // mongoose를 불러온다.
const path = require('path'); // path를 불러온다.
const app = express();
const port = process.env.PORT || 8080; // process.env.port is Heroku's port if you choose to deploy the app there

// DB
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useUnifiedTopology: true, 
      //useCreateIndex: true, 
      //useFindAndModify: false 
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

//회원가입
const { User } = require("./models/User")
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

app.use(express.static(path.join(__dirname, '../react-map-app/build')));

/*app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-map-app/build/index.html'));
});*/

app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '../react-map-app/build/index.html'));
});

app.listen(port, function () {
  console.log(`listening on ${port}`)
}); 