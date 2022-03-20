async function main() {
  const SaveAudio = require("./saveaudio");
  const SplitText = require("./splittext");
  const TextToChunks = require("./texttochunks");
  const TextToGaps = require("./texttogaps");
  const fs = require('fs');
  
  let text = "The Lord is my shepherd, I lack nothing.\n ";
  text +=
    "He makes me lie down in green pastures,\n he leads me beside quiet waters,\n he refreshes my soul.\n ";
  text += "He guides me along the right paths\n for his name’s seik.\n ";
  text +=
    "Even though I walk through the darkest valley,\n I will fear no evil, for you are with me;\n ";
  text += "your rod and your staff,\n they comfort me.\n ";
  text += "You prepare a table before me\n in the presence of my enemies.\n ";
  text += "You anoint my head with oil;\n my cup overflows.\n ";
  text +=
    "Surely your goodness and love will follow me\n all the days of my life,\n ";
  text += "and I will dwell in the house of the Lord forever.";

  let textBatches = SplitText.split(text);
  await SaveAudio.removeFilesInDirectory("output");    
  await SaveAudio.removeFilesInDirectory("temporary");    
  //await SaveAudio.createFolder("output");
  while(await !fs.existsSync('output')) {
    await SaveAudio.createFolder("output");
  }
  while(await !fs.existsSync('temporary')) {
    await SaveAudio.createFolder("temporary");
  }

  let dayCount = 0;
  while (dayCount <= textBatches.length) {
    console.log("day " + (dayCount + 1));

    let textWithGaps = "";

    if (dayCount >= 1) {
      textWithGaps += TextToChunks.process(textBatches[dayCount - 1], false);
      textWithGaps += ' <break time="5s"/> ';
    }

    if (dayCount === textBatches.length) {
      for (let nr = 0; nr < textBatches.length; nr++) {
        textWithGaps += TextToChunks.process(textBatches[nr], true);
      }

      await SaveAudio.handle(textWithGaps, (dayCount + 1));

      //console.log(textWithGaps);

      break;
    }

    textWithGaps += textBatches[dayCount];
    textWithGaps += ' <break time="2s"/> ';

    textWithGaps += await TextToGaps.process(textBatches[dayCount], [
      "NOUN",
      "ADJ",
    ]);
    textWithGaps += ' <break time="2s"/> ';

    textWithGaps += await TextToGaps.process(textBatches[dayCount], ["VERB"]);

    textWithGaps += TextToChunks.process(textBatches[dayCount], true);

    await SaveAudio.handle(textWithGaps, (dayCount + 1));
    console.log(textWithGaps);
    
    dayCount++;
  }
}

main(...process.argv.slice(2));
