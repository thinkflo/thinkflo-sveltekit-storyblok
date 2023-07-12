import { XMLParser } from "fast-xml-parser";
import axios from 'axios';

export async function handler(event, context, callback) {
  const topics = ['jamstack', 'ssg', 'ssr', 'static site', 'serverless'];

  const newsArticles = await Promise.allSettled(
    topics.map(
      async topic => await axios.get(`https://hnrss.org/newest?q=${topic}`)
      .then(res => res.data)
      .catch(
        (error) => {
          callback(error);
        })
      )
  ).then((values) => values.map(topic => new XMLParser().parse(topic.value, {
      ignoreAttributes: false,
      attributeNamePrefix: '',
    }).rss?.channel?.item?.filter(item => !item?.title.startsWith('Ask HN') && !item?.title.startsWith('Show HN')) 
    .map(({ title, link: url, pubDate: postDate}) => {return {title, url, postDate}})
  ).flat().sort((a, b) => new Date(a.postDate) - new Date(b.postDate)).reverse())
      
  return {
    statusCode: newsArticles?.length ? 200 : 500,
    body: newsArticles?.length ? JSON.stringify({ newsArticles }) : undefined
  };
};