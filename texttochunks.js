module.exports = {
  process: (textBatches, repeatWholeText) => {
    let text = "";

    textBatches.trim().split("\n").forEach((chunk) => {
      words = chunk.trim().split(" ");
      text += words[0] + " " + words[1];

      text += ' <audio src="https://www.lernenmitspass.ch/chunk.mp3">chunk</audio> <break time="8s"/> ';
      text += chunk + ' <break time="1s"/> ';
    });

    words = textBatches.trim().split(" ");
    text += ' <break time="1s"/> ' + words[0] + " " + words[1] + " " + words[2];

    textBatches.trim().split("\n").forEach((chunk) => {
        text += '<audio src="https://www.lernenmitspass.ch/chunk.mp3">chunk</audio> ';
  
        text += ' <break time="8s"/> ';
        text += chunk + ' <break time="1s"/> ';
      });  

    if (repeatWholeText) {      
      text += ' <break time="3s"/> ';
      text += ' <break time="1s"/> ' + words[0] + " " + words[1] + " " + words[2];
      text += ' <break time="25s"/> ';

      text += textBatches;
    }

    return text;
  },
};
