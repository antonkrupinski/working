const fetch = require('node-fetch');

exports.handler = async function(event) {
  const target = event.queryStringParameters.url;
  if(!target) return { statusCode:400, body:'Missing URL' };
  try {
    const res = await fetch(target);
    const text = await res.text();
    return { statusCode:200, headers:{'Content-Type':'text/html'}, body:text };
  } catch(e) {
    return { statusCode:500, body:'Error: '+e.message };
  }
};
