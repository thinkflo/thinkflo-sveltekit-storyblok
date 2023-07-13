import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export async function handler(event, context, callback) {
  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  }

	const topics = ['jamstack', 'ssg', 'ssr', 'static site', 'serverless', 'headless cms'];

	const newsArticles = await Promise.allSettled(
		topics.map(
			async (topic) =>
				await axios
					.get(`https://hnrss.org/newest?q=${topic}`)
					.then((news) =>
            news?.data && new XMLParser()
							.parse(news?.data, {
								ignoreAttributes: false,
								attributeNamePrefix: ''
							})
							.rss?.channel?.item?.filter(
								(item) => !item?.title.startsWith('Ask HN') && !item?.title.startsWith('Show HN')
							)
							.map(({ title, link: url, pubDate: postDate }) => {
								return { title, url, postDate };
							})
					)
					.catch(() => {
						callback(null, {
							statusCode: 500,
							body: {'Error':'Internal Server Error'},
							headers: {
								...CORS_HEADERS,
								'Content-Type': 'application/json',
							},  
						});
					})
		)
	).then((values) =>
    [...new Set(values
			.map(({ value }) => value)
			.flat()
			.sort((a, b) => new Date(a.postDate) - new Date(b.postDate))
			.reverse()
    )]
	);

	callback(null, {
		statusCode: newsArticles?.length ? 200 : 500,
		body: JSON.stringify(newsArticles?.length ? newsArticles : {'Error':'Internal Server Error'}),
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json',
    },   
	});
}
