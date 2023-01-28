const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const path = require('path')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var baseURL = 'https://www.list.am/category?q=traktr'

const PORT = process.env.PORT || 8005;

    axios(baseURL, { headers: { "Accept-Encoding": "gzip,deflate,compress" } }).then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        var list = []
       
        $('a').each(function () {
            const csvWriter = createCsvWriter({
                path: 'file.csv',
                header: ['title', 'price', 'location', 'pageURL', 'image', 'jpg']
            })
            const a = $(this).children('img').attr('src')
            const b = $(this).children('img').attr('data-original')
            const title = $(this).find('a>div>div:first-child').text()
            const v = "https:"
            const image = v + a
            const jpg = v + b
            var URl = $(this).attr('href')
            const listURL = 'https://www.list.am'
            const pageURL = listURL + URl
            const price = $(this).find(".p").text()
            const location = $(this).find('.at').text()
            list.push({
                title: title,
                price: price,
                location: location,
                pageURL:pageURL,
                image: image,
                jpg: jpg
            })
            app.get('/list', (req,res)=>{
            res.sendFile(path.resolve("file.csv"))
            })
            console.log(list);
            csvWriter.writeRecords(list)       // returns a promise
                .then(() => {
                    // console.log('...Done');
                });


        })
        
    })

app.listen(PORT, () => console.log(`server runing on PORT: ${PORT}`))

/*

//axios.get('https://www.list.am/item/16793715', { headers: { "Accept-Encoding": "gzip,deflate,compress" } }).then(html => {
*/