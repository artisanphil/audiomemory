const TextToChunks = require("./texttochunks");

test('test chunk output', () => {
  let text = 'You prepare a table before me\n ' +
  'in the presence of my enemies.\n' +
  'You anoint my head with oil;\n' + 
  'my cup overflows.\n';

  let expected = 'You prepare <audio src=\"https://www.lernenmitspass.ch/chunk.mp3\">chunk</audio> ' +
  '<break time=\"8s\"/> You prepare a table before me ' +
  '<break time=\"1s\"/> in the <audio src=\"https://www.lernenmitspass.ch/chunk.mp3\">chunk</audio> ' +
  '<break time=\"8s\"/>  in the presence of my enemies. ' +
  '<break time=\"1s\"/> You anoint <audio src=\"https://www.lernenmitspass.ch/chunk.mp3\">chunk</audio> ' + 
  '<break time=\"8s\"/> You anoint my head with oil; ' +
  '<break time=\"1s\"/> my cup <audio src=\"https://www.lernenmitspass.ch/chunk.mp3\">chunk</audio> ' +
  '<break time=\"8s\"/> my cup overflows. ' +
  '<break time=\"1s\"/>  <break time=\"1s\"/> You prepare a<audio src=\"https://www.lernenmitspass.ch/chunk.mp3\">chunk</audio>  ' +
  '<break time=\"8s\"/> You prepare a table before me ' +
  '<break time=\"1s\"/> <audio src=\"https://www.lernenmitspass.ch/chunk.mp3\">chunk</audio>  ' +
  '<break time=\"8s\"/>  in the presence of my enemies. ' +
  '<break time=\"1s\"/> <audio src=\"https://www.lernenmitspass.ch/chunk.mp3\">chunk</audio>  ' +
  '<break time=\"8s\"/> You anoint my head with oil; ' +
  '<break time=\"1s\"/> <audio src=\"https://www.lernenmitspass.ch/chunk.mp3\">chunk</audio>  ' +
  '<break time=\"8s\"/> my cup overflows. <break time=\"1s\"/>  ' +
  
  '<break time="3s"/>  <break time="1s"/> You prepare a <break time="25s"/> ' +
  'You prepare a table before me\n ' +
  'in the presence of my enemies.\n' + 
  'You anoint my head with oil;\n' +
  'my cup overflows.\n';

  expect(TextToChunks.process(text, true)).toBe(expected);
});