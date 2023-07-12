import { XMLParser } from "fast-xml-parser";
import fetch from 'node-fetch';

export async function handler(event, context, callback) {
  try {
    const topics = ['jamstack', 'ssg']
    const newsArticles = await Promise.allSettled(topics.map(async topic => await fetch(`https://hnrss.org/newest?q=${topic}`).then(res => res.text()))).then(async (values) => {
      return values.map(topic => {
        const news = new XMLParser().parse(topic.value, {
          ignoreAttributes: false,
          attributeNamePrefix: ''
        });
    
        return news?.rss?.channel?.item?.filter(item => !item?.title.startsWith('Ask HN') && !item?.title.startsWith('Show HN')) 
        .map(item => { 
          return { title : item?.title, url : item?.link, postDate: item?.pubDate }
        });  

      }).flat().sort((a, b) => new Date(a.postDate) + new Date(b.postDate));
      
    })
    
    callback(null, {
      statusCode: newsArticles?.length ? 200 : 500,
      body: newsArticles?.length ? JSON.stringify({newsArticles}) : "An unknown error occurred"
    }
  )


  } catch(error) {
    callback(error);
  }
};