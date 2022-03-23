const SplitLongText = require("./splitlongtext");

test('test create temporary files', () => {  
  const fs = require('fs');
  let text = 'You prepare a table before me\n ' +
  'in the presence of my enemies.\n' +
  'You anoint my head with oil;\n' + 
  'my cup overflows.\n';

  jest.mock('./texttomp3', () => ({
    convert: () => text,
  }));  

  jest.mock('./saveaudio', () => ({
    createMp3: () => jest.fn(),
  }));  

  SplitLongText.handle('temporary/1', text, 1)
  const data = fs.readFileSync('temporary/1/1_0.mp3', 'binary')

  expect(data).toBe(text);
});