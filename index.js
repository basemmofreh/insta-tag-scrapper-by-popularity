const rp = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hashtagDetails = require('./modules/index');
const hashtagFinder = require('./modules/hashtag');
// let keyWord = "fashion";



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/tags/:tag',async(req,res)=>{
      
    let keyWord = req.params.tag;
    let hashtag = await hashtagFinder(keyWord);
    res.status(200).send(hashtag);
})
app.get('/api/:tag', async(req,res)=>{
    
    let keyWord = req.params.tag;
    
    let fullData = [];
    let hashtag = await hashtagFinder(keyWord);
   let results =  hashtag.slice(0,10).map(async(item,i)=>{
        let details = await hashtagDetails(hashtag[i].toString());
        fullData.push({
        HashTag:hashtag[i].toString(), 
        NumberOfPost:details.length, 
        HighestLikesOnPost:details[i].like_count.count   
         } );
    })

    
Promise.all(results).then((completed) =>{
   fullData.sort((a,b)=>{
       if(a.HashTag.length <= b.HashTag.length)
        {
            return -1;
        }
        else if (a.HashTag.length >= b.HashTag.length)
        {
            return 1;
        }
   })
    res.status(200).send({fullData});
});

 
//    console.log("test",filterArr[0])
//     let details = await hashtagDetails(filterArr[0]);
//     console.log("details",details)
//     res.status(200).send(details);
  

})

app.listen(3000,()=>{
    console.log('listen on port 3500');
})
