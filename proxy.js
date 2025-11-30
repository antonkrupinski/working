const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const target = event.queryStringParameters.url;
  if (!target) return { statusCode: 400, body: 'Missing URL parameter' };

  try {
    const response = await fetch(target);
    let body = await response.text();

    // Simple rewrite for relative links
    body = body.replace(/(href|src)="(\/[^"]*)"/g, `$1="/.netlify/functions/proxy?url=${target}$2"`);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body
    };
  } catch (err) {
    return { statusCode: 500, body: 'Proxy error: ' + err.message };
  }
};
