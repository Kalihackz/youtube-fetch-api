// const yt = require("youtube-search-without-api-key");
const yt = require("./youtube-api");
const express = require("express");
var cors = require('cors');
const app = express();
app.use(cors())
const port = 8000;

app.get("/", (req, res) => {
  res.send("YT API");
});

app.get("/videos/:search", async (req, res) => {
    
    var jsonRes = {
        "sucess": "true",
        "items": []
    };

    try {
        var searchVal = req.params.search;
        
        const videos = await yt.search(searchVal);

        console.log(videos);
   
        if (videos.length == 0) {
          res.send(jsonRes);
        }
        jsonRes.items = videos;

        jsonFile = JSON.stringify(jsonRes);

        res.send( jsonFile );
    } catch (e) {
        res.send( JSON.stringify(jsonRes) );
    }

});

app.listen(port, () => {
  console.log(`Web Server app listening...`);
});