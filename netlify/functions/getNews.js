import { XMLParser } from "fast-xml-parser";
import fetch from 'node-fetch';

exports.handler = async function (event, context, callback) {
  const response = await fetch('https://hnrss.org/newest?q=jamstack').then(res => res.text()).catch((error) => {
    callback(error);
  })

  const news = new XMLParser().parse(response, {
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });

  const newsArticles = news?.rss?.channel?.item?.filter(item => !item?.title.startsWith('Ask HN') && !item?.title.startsWith('Show HN')) 
    .map(item => { 
      return { title : item?.title, url : item?.link }
    });

  return {
    statusCode: newsArticles?.length ? 200 : 500,
    body: newsArticles?.length ? JSON.stringify({ newsArticles }) : undefined
  };
};