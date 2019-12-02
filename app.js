const querystring = require('querystring');

const handleBolgRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// 处理 post
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', (chunk) => {
      postData += chunk.toString();
    })
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  })
}

const serverHandle = (req, res) => {
  // 设置返回格式为 json
  res.setHeader('Content-Type', 'application/json');
  
  // 解析 query
  req.query = querystring.parse(req.url.split('?')[1]);

  // 处理 postData
  getPostData(req).then(postData => {
    // console.log('postData: ', postData);
    req.body = postData;
    // 处理 blog 
    // const blogData = handleBolgRouter(req, res);
    const blogRes = handleBolgRouter(req, res);
    if (blogRes) {
      blogRes.then(blogData => {
        if (blogData) {
          res.end(
            JSON.stringify(blogData)
          )
        }
      });
      return;
    }
    // if (blogData) {
    //   res.end(
    //     JSON.stringify(blogData)
    //   )
    //   return;
    // }

    // 处理 user
    const userData = handleUserRouter(req, res);
    if (userData) {
      res.end(
        JSON.stringify(userData)
      )
      return;
    }

    // 未命中， 返回404
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write("404 Not Found");
    res.end();
  });
}

module.exports = serverHandle;