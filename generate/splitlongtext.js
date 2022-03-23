module.exports = {
  handle: async (tempDir, text, day) => {   
    const SaveAudio = require("./saveaudio");
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
      console.log("batchNr: " + batchNr);
      audioContent = await TextToMP3.convert(batches[batchNr], batchNr);

      const writeFile = util.promisify(fs.writeFile);
      mp3File = tempDir + "/" + day + "_" + batchNr + ".mp3";      
      allMp3s.push(mp3File);
      await writeFile(mp3File, audioContent, "binary");
      // console.log(mp3File);
    }

    //console.log(allMp3s.length + " - " + batches.length);

    await SaveAudio.createMp3(allMp3s, day);
  },
};
