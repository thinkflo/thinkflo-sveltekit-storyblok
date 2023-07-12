import axios from 'axios';
import { XMLParser } from "fast-xml-parser";

export async function handler(event, context, callback) {
  const topics = ['jamstack', 'ssg', 'ssr', 'static site', 'serverless'];

  const newsArticles = await Promise.allSettled(
    topics.map(
      async topic => await axios.get(`https://hnrss.org/newest?q=${topic}`)
      .then(news => new XMLParser().parse(news.data, {
          ignoreAttributes: false,
          attributeNamePrefix: ''
        }).rss?.channel?.item?.filter(item => !item?.title.startsWith('Ask HN') && !item?.title.startsWith('Show HN')) 
        .map(({ title, link: url, pubDate: postDate}) => {return {title, url, postDate}})
      )
      .catch(
        (error) => {
          callback(error);
        })
      )
  ).then((values) => values.map(({value}) => value).flat().sort((a, b) => new Date(a.postDate) - new Date(b.postDate)).reverse())
      
  return {
    statusCode: newsArticles?.length ? 200 : 500,
    body: newsArticles?.length ? JSON.stringify({ newsArticles }) : undefined
  };
};