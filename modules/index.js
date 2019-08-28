var ig = require('instagram-scraping');


// let hashtags = ['fashion'];

  var hashtagDetails = (hashtag)=>{
   
        try{
        return ig.scrapeTag(hashtag).then(function(result){
            let arra = result.medias.sort((a,b)=>{
                if (a.like_count.count<=b.like_count.count)
                return 1;
                else if (a.like_count.count>=b.like_count.count)
                return -1;
                
            })
            // console.log('highest liked post', arra[0].like_count.count);
            // arra.map((hashtag)=>{
            //     console.log("likes " ,hashtag.like_count.count)
            // })
            let customArr = arra;
            let filterArr=  customArr.filter((tag)=>(tag.text!==null));
           filterArr = filterArr.filter((tag)=>(tag.text.includes(hashtag)))
            // customArr.sort((a,b)=>{
            //     if (a.text !== null && a.text.includes(hashtag)){
            //         return -1;
            //     }
            //     else if (b.text !== null && b.text.includes(hashtag))
            //     {

            //         return 1;
            //     }
            // })
            filterArr.map((hashtag)=>{
                delete hashtag.display_url;
                delete hashtag.thumbnail_resource;
            })
            // console.log('im custom array',customArr)
            return filterArr;
            // customArr.map((hashtag,i)=>{
            //         console.log(`hashtag result\n : ` ,hashtag.text+'\n ----------------------------------------')
            //     })
        })
    }catch(e){
        console.log("error",e);
    }
    ;
}

module.exports = hashtagDetails;