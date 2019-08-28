const rp = require('request-promise');
const cheerio = require('cheerio');

// let keyWord = "developers"

var hashtagFinder =  (keyWord)=>{ 
let URL = `https://www.instagram.com/explore/tags/${keyWord}/`



const scrapeHashtags = (html) => {  
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(html))) {
        matches.push(match[1]);
    }

    return matches;
}

const removeDuplicates =(arr) =>{
    let newArr = [];

    arr.map(ele => {
        if (newArr.indexOf(ele) == -1){
            newArr.push(ele)
        }
    })
    

    let filterArr= newArr.filter((tag)=>(tag.includes(keyWord)))
    // newArr.sort((a,b)=>{
    //     if (a.includes(keyWord)){
    //         return -1;
    //     }
    //     else if (b.includes(keyWord))
    //     {

    //         return 1;
    //     }
    // })
    
    filterArr.sort((a,b)=>{
        if(a.length>=b.length  )
        
            return 1;
        else if (a.length<=b.length )
        return -1;
    })   
    return filterArr;
}
return rp(URL)
    .then((html) => {
        let hashtags = scrapeHashtags(html);
        hashtags = removeDuplicates(hashtags);
        // hashtags = hashtags.map(ele => "#" + ele)
        return hashtags;
        console.log(hashtags);
    })
    .catch((err) => {
        console.log(err);
    });
}
module.exports = hashtagFinder;