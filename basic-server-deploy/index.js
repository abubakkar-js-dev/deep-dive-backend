require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const githubData = {
    "login": "abubakkar-js-dev",
    "id": 128481462,
    "node_id": "U_kgDOB6h4tg",
    "avatar_url": "https://avatars.githubusercontent.com/u/128481462?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/abubakkar-js-dev",
    "html_url": "https://github.com/abubakkar-js-dev",
    "followers_url": "https://api.github.com/users/abubakkar-js-dev/followers",
    "following_url": "https://api.github.com/users/abubakkar-js-dev/following{/other_user}",
    "gists_url": "https://api.github.com/users/abubakkar-js-dev/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/abubakkar-js-dev/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/abubakkar-js-dev/subscriptions",
    "organizations_url": "https://api.github.com/users/abubakkar-js-dev/orgs",
    "repos_url": "https://api.github.com/users/abubakkar-js-dev/repos",
    "events_url": "https://api.github.com/users/abubakkar-js-dev/events{/privacy}",
    "received_events_url": "https://api.github.com/users/abubakkar-js-dev/received_events",
    "type": "User",
    "user_view_type": "public",
    "site_admin": false,
    "name": "Md Abu Bakkar Siddik",
    "company": null,
    "blog": "",
    "location": "Rajshahi, Bangladesh",
    "email": null,
    "hireable": null,
    "bio": "Front-End Developer | 1.5+ years of experience | Skilled in HTML, CSS, JavaScript, React.js, Tailwind CSS & DaisyUI | Passionate about crafting seamless UI/UX",
    "twitter_username": null,
    "public_repos": 79,
    "public_gists": 0,
    "followers": 2,
    "following": 7,
    "created_at": "2023-03-21T11:47:38Z",
    "updated_at": "2025-02-05T05:26:54Z"
  }

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter',(req,res)=>{
    res.send('Hello Twitter');
})

app.get('/register',(req,res)=>{
    res.send('<h2>Please register to create an account.</h2>')
})

app.get('/github',(req,res)=>{
    res.json(githubData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})