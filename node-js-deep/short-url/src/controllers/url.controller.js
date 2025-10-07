const { nanoid } = require("nanoid");
const URL = require("../models/url.model");
async function handleGenerateNewShorURL(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({ success: false, message: "url is required" });
  const shortID = nanoid(8);
  const createdUser =  await URL.create({
    shorId: shortID,
    redirectURL: body.url,
  });

  return res.status(201).json({success: true, message: 'User created successfully', data: createdUser});

}

module.exports = {
    handleGenerateNewShorURL,
}
