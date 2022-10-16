const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();

let port = 8080;

// app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// const lineNotify = require('line-notify-nodejs')('7Q77sxdtQnbTBoMrm56yV3NCF0aP1HY3dT4p5qhnez1');8nMvVDQOe8EL69tfll9uHj63In4fdhWxZbaSfVq8iog
const lineNotify = require('line-notify-nodejs')('8nMvVDQOe8EL69tfll9uHj63In4fdhWxZbaSfVq8iog')
const request = require('request');
const thaibulk = require('api')('@thaibulksms/v1.0#1of51jl4qvzac3');

app.get('/', async(req, res) => {
    res.render('index')
})

app

app.get('/linelogin', async(req, res) => {
    res.render('linelogin')
})

app.post('/submitform', async(req, res) => {

    console.log('submit form')

    const userId = req.body.userId
    const email = req.body.email
    const name = req.body.name

    lineNotify.notify({
        message: `Line Login on Ads Website \n\n UserId : ${userId} \n Name : ${name} \n email : ${email}`,
    }).then(() => {
        console.log('send completed!');
    });

    res.send('succes')
})

app.post('/getotp', async(req, res) => {

    console.log('getotp')

    const phone = req.body.phone

    await thaibulk.post('/v2/otp/request', {
        key: '1746681368175116',
        secret: '436744f87809e54e908e6f017bfc0301',
        msisdn: phone
    }, {accept: 'application/json'})
    .then((response) => {
        console.log(response)
        res.send({
            data : response
        })
    })
    .catch((err) => {
        console.log(err)
    })
})

app.post('/verify', async(req, res) => {

    const code = req.body.code 
    const token = req.body.token

    const otp = thaibulk.post('/v2/otp/verify', {
        secret: '436744f87809e54e908e6f017bfc0301',
        key: '1746681368175116',
        token: token,
        pin: code
    }, {accept: 'application/json'})
    .then((response) => {
        res.send({
            data : 'success'
        })
    })
    .catch((err) => {
        res.send({
            data : err
        })
    });
    
})

app.post('/sendphone', async(req, res) => {

    console.log('send phone')

    const phone = req.body.phone

    lineNotify.notify({
        message: `Line Send Phone Number : ${phone}`,
    }).then(() => {
        console.log('send completed!');
    });

    res.send('succes')
})

app.get('/testapi', async(req, res) => {

    const cluster = await Cluster.launch({
        puppeteer,
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 5,
        monitor : false,
        puppeteerOptions : {
            headless: true,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
            ignoreDefaultArgs: [ '--enable-automation','--window-size=1366,768'],
            defaultViewport: {width: 1366,height: 768},
        },
        timeout : 9999999
    });

    await cluster.queue(async({page}) => {
        await page.setDefaultTimeout(180000)
        await page.goto('https://facebook.com/')
        await page.waitForTimeout(3000)
        const titlePage = await page.title()
        console.log(titlePage)
        
        res.send({
            data : titlePage
        })
    })

    cluster.on('taskerror', (err, data) => {
        console.log(`  Error crawling ${data}: ${err.message}`);
    });

    await cluster.idle();
    await cluster.close();

})


app.listen(port, () => {
    console.log('server running.');
});

module.exports = app