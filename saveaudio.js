module.exports = {
  handle: async (text, day) => {
    const TextToMP3 = require("./texttomp3");
    const SSMLSplit = require("ssml-split");
    const audioconcat = require("audioconcat");
    const fs = require("fs");
    const util = require("util");
  
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

    const batches = ssmlSplit.split(text);

    let allMp3s = [];
    for (let batchNr = 0; batchNr < batches.length; batchNr++) {
      console.log(batches[batchNr]);
      audioContent = await TextToMP3.convert(batches[batchNr], batchNr);

      const writeFile = util.promisify(fs.writeFile);
      mp3File = "temporary/" + batchNr + ".mp3";
      allMp3s.push(mp3File);
      await writeFile(mp3File, audioContent, "binary");
    }

    audioconcat(allMp3s)
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
  },
};
