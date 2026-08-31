const yts = require('yt-search');

exports.handler = async (event) => {
  const query = event.queryStringParameters.q || '';

  if (!query) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'กรุณาระบุคำค้นหา' })
    };
  }

  try {
    const searchKeyword = query.includes('คาราโอเกะ') ? query : `${query} คาราโอเกะ`;
    const r = await yts(searchKeyword);
    const results = r.videos.slice(0, 10).map(v => ({
      videoId: v.videoId,
      title: v.title,
      thumbnail: v.thumbnail,
      duration: v.timestamp,
      author: v.author.name
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(results)
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
