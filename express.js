const express = require('express')
const app = express()

app.get('/u', function (req, res) {
    res.json([{ firstName: 'Gugo', lastName: 'MVP' }, { firstName: 'Pxindz', lastName: 'Erkatovich' }])
})  
app.listen(3000, function(){
    console.log('app listening on port 3000!');
})