const { nanoid } = require("nanoid");
const URL = require("../models/url.model");
async function handleGenerateNewShorURL(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({ success: false, message: "url is required" });
  const shortID = nanoid(8);
  const createdUser =  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render('home',{
    id: shortID
  })
  
}
// return res.status(201).json({success: true, message: 'User created successfully', data: createdUser});

async function handleGetAnalytics(req,res){
  const shortId = req.params.shortId;
  console.log(shortId,'from ...')
  const result = await URL.findOne({shortId});
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  })
}

module.exports = {
    handleGenerateNewShorURL,
    handleGetAnalytics,
}
