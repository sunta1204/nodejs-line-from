const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let port = 8080;

app.set('views', __dirname + '/views');
app.set('vies engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const lineNotify = require('line-notify-nodejs')('7Q77sxdtQnbTBoMrm56yV3NCF0aP1HY3dT4p5qhnez1');

app.get('/', async(req, res) => {
    res.render('index.ejs')
})

app.post('/submitform', async(req, res) => {

    const input = req.body.input

    lineNotify.notify({
        message: `Detail From Website : ${input}`,
    }).then(() => {
        console.log('send completed!');
    });

    res.send()
})

app.listen(port, () => {
    console.log('server running.');
});

module.exports = app