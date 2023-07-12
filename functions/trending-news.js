const fetch = require("node-fetch");
const { XMLParser } = require("fast-xml-parser");

exports.handler = async function(event, context) {
  try {
    const response = await fetch("https://hnrss.org/newest?q=jamstack");
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.text();
    
    const parser = new XMLParser();
    var jsonObj = parser.parse(data, {
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });

    const items = jsonObj.rss.channel.item
      .filter(item => !item.title.startsWith('Ask HN') && !item.title.startsWith('Show HN')) 
      .map(item => {
        const title = item.title;
        const url = item.link;
        return { title, url };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(items)
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};
