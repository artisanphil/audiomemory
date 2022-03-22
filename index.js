async function main() {
  const SaveAudio = require("./saveaudio");
  const SplitText = require("./splittext");
  const TextToChunks = require("./texttochunks");
  const TextToGaps = require("./texttogaps");
  const fs = require('fs');
  
  const text = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'});

  let textBatches = SplitText.split(text);
  await SaveAudio.removeFilesInDirectory("output");    
  await SaveAudio.removeFilesInDirectory("temporary");    

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
