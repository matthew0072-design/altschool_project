


const  readingTime =  (article)  =>  {
    const WORDS = article.split(" ").length;
    const WORD_PER_MINUTE = 225;

    const TOTAL = WORDS / WORD_PER_MINUTE;
  
    return Math.ceil(TOTAL) === 0 ? 1 + " min" : Math.ceil(TOTAL) + " mins"
  }

  
  module.exports = { readingTime }