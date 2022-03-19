module.exports = {
  handle: async (text, day) => {
    
    dir = "temporary/" + day;
    module.exports.createFolder(dir, text, day);  
  },

  async removeFilesInDirectory(dir) {
      const fs = require("fs");

      console.log("removeFilesInDirectory");

      if (await fs.existsSync(dir)){
        await fs.rmSync(dir, { recursive: true }, (err) => {
          if (err) {
              throw err;
          }
      
          console.log(`${dir} is deleted!`);   
          //module.exports.createFolder(dir, "", 0);           
        });
      }      
  },
  async createFolder(dir, text, day) {
    const fs = require("fs");

    console.log("createFolder");

    // if (await !fs.existsSync(dir)){
      await fs.mkdirSync(dir);
      console.log(`${dir} created!`);        

      if(dir == "temporary/" + day) {
        await module.exports.createTemporaryFiles(dir, text, day);
      }        
    //}          
  },
  async createTemporaryFiles(tempDir, text, day) {
    const SSMLSplit = require("ssml-split");
    const TextToMP3 = require("./texttomp3");
    const fs = require("fs");
    const util = require("util");

    console.log("createTemporaryFiles");

    const ssmlSplit = new SSMLSplit.default({
      // The service you are using: "google" or "aws"
      synthesizer: "google",
      // Finds a possible split moment starting from 4000 characters
      softLimit: 4000,
      // Google Text to Speech limitation
      hardLimit: 5000,
      // Allow to split large paragraphs, set to false to keep your <p></p> intact
      breakParagraphsAboveHardLimit: true,
    });

    const batches = ssmlSplit.split("<speak>" + text + "</speak>");
        
    let allMp3s = [];

    for (let batchNr = 0; batchNr < batches.length; batchNr++) {
      //console.log(batches[batchNr]);
      console.log("batchNr: " + batchNr);
      audioContent = await TextToMP3.convert(batches[batchNr], batchNr);

      const writeFile = util.promisify(fs.writeFile);
      mp3File = tempDir + "/" + day + "_" + batchNr + ".mp3";      
      allMp3s.push(mp3File);
      await writeFile(mp3File, audioContent, "binary");
      console.log(mp3File);
    }

    console.log(allMp3s.length + " - " + batches.length);

    await module.exports.createMp3(allMp3s, day);
  },
  async createMp3(allMp3s, day) {
    const audioconcat = require("audioconcat");

    console.log("createMp3: " + day);

    await audioconcat(allMp3s)
      .concat("output/day_" + day + ".mp3")
      .on("start", function (command) {
        console.log("ffmpeg process started:", command);
      })
      .on("error", function (err, stdout, stderr) {
        console.error("Error:", err);
        console.error("ffmpeg stderr:", stderr);
      })
      .on("end", function (output) {
        console.error("Audio created in:", output);
      });
  }
};
