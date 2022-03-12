async function main() {
  const TextToGaps = require("./texttogaps");
  const TextToMP3 = require("./texttomp3");
  const SSMLSplit = require("ssml-split");
  const audioconcat = require("audioconcat");
  const fs = require("fs");
  const util = require("util");

  let text = "The Lord is my shepherd, I lack nothing. ";
  text +=
    "He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. ";
  text += "He guides me along the right paths for his name’s seik. ";
  text +=
    "Even though I walk through the darkest valley, I will fear no evil, for you are with me; ";
  text += "your rod and your staff, they comfort me. ";
  text += "You prepare a table before me in the presence of my enemies. ";
  text += "You anoint my head with oil; my cup overflows. ";
  text +=
    "Surely your goodness and love will follow me all the days of my life, ";
  text += "and I will dwell in the house of the Lord forever.";
  let textWithGaps = await TextToGaps.process(text, ["NOUN", "ADJ"]);
  textWithGaps += '<break time="2s"/>';

  textWithGaps += await TextToGaps.process(text, ["NOUN", "ADJ", "VERB"]);
  textWithGaps += '<break time="2s"/>';

  textWithGaps += await TextToGaps.process(text, [
    "NOUN",
    "ADJ",
    "VERB",
    "PRON",
  ]);

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

  const batches = ssmlSplit.split(textWithGaps);

  let allMp3s = [];
  for (let batchNr = 0; batchNr < batches.length; batchNr++) {
    console.log(batches[batchNr]);
    audioContent = await TextToMP3.convert(batches[batchNr], batchNr);

    const writeFile = util.promisify(fs.writeFile);
    mp3File = "output/" + batchNr + ".mp3";
    allMp3s.push(mp3File);
    await writeFile(mp3File, audioContent, "binary");
  }

  audioconcat(allMp3s)
    .concat("output.mp3")
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

  //console.log(textWithGaps);
}

main(...process.argv.slice(2));
