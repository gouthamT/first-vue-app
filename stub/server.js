const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const request = require('request');

const token = Buffer.from('goutham.tupakula@xxxxxxxx.com:xxxxxxxx').toString('base64');

server.use(jsonServer.bodyParser);

const mapRequest = req => `{
      "timeSpent": "${req.timeSpent}",
      "visibility": {
        "type": "group",
        "value": "jira-developers"
      },
      "comment": {
        "type": "doc",
        "version": 1,
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "text": "${req.comment || ''}",
                "type": "text"
              }
            ]
          }
        ]
      },
      "started": "${req.dateTime}"
    }`;

server.use(middlewares);

server.get('/get', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://4mation.atlassian.net/rest/api/3/search?jql=assignee = currentUser() and ((issuetype != "Story" and status  not in (Closed, Done)) OR (issuetype = "Story" )) ORDER BY updated DESC',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${token}`,
    },
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    res.jsonp(JSON.parse(response.body));
  });
});

server.post('/post', (req, res) => {
  const options = {
    method: 'POST',
    url: `https://4mation.atlassian.net/rest/api/3/issue/${req.body.taskNumber}/worklog`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
    body: mapRequest(req.body),
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    res.jsonp(JSON.parse(response.body));
  });
});


server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  next();
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
