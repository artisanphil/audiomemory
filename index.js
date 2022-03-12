async function main() {
  const fs = require('fs');
  const util = require('util');

  const TextToGaps = require('./texttogaps');
  const TextToMP3 = require('./texttomp3');
  
  let text = "The Lord is my shepherd, I lack nothing. ";
    text += "He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. "
    text += "He guides me along the right paths for his name’s sake. ";
    // text += "Even though I walk through the darkest valley, I will fear no evil, for you are with me; "
    // text += "your rod and your staff, they comfort me. "
    // text += "You prepare a table before me in the presence of my enemies. "
    // text += "You anoint my head with oil; my cup overflows. ";
    // text += "Surely your goodness and love will follow me all the days of my life, "
    // text += "and I will dwell in the house of the Lord forever.";
  let textWithGaps = await TextToGaps.process(text, ['NOUN', 'ADJ']);
  textWithGaps += '<break time="2s"/>';
  audioContent = await TextToMP3.convert(textWithGaps);

  // textWithGaps = await TextToGaps.process(text, ['NOUN', 'ADJ', 'VERB']);
  // textWithGaps += '<break time="2s"/>';
  // audioContent += await TextToMP3.convert(textWithGaps);

  // textWithGaps = await TextToGaps.process(text, ['NOUN', 'ADJ', 'VERB', 'PRON']);
  // audioContent += await TextToMP3.convert(textWithGaps);

  // const writeFile = util.promisify(fs.writeFile);
  // await writeFile('output.mp3', audioContent, 'binary');

  console.log(textWithGaps);
}

main(...process.argv.slice(2));