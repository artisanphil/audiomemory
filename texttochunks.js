module.exports = {
  process: (textBatches, repeatWholeText) => {
    let text = "";

    console.log(textBatches);
    textBatches.split("\n").forEach((chunk) => {
      words = chunk.split(" ");
      text += '<audio src="https://www.lernenmitspass.ch/chunk.mp3">chunk</audio> <break time="1s"/> ' + words[0] + " " + words[1];

      text += ' <break time="8s"/> ';
      text += chunk;
    });

    textBatches.split("\n").forEach((chunk) => {
        words = chunk.split(" ");
        text += '<audio src="https://www.lernenmitspass.ch/chunk.mp3">chunk</audio> <break time="1s"/> ';
  
        text += ' <break time="8s"/> ';
        text += chunk;
      });  

    if (repeatWholeText) {
      words = textBatches.split(" ");

      text += ' <break time="3s"/> ';
      text +=
        ' <break time="1s"/> ' + words[0] + " " + words[1] + " " + words[2];
      text += ' <break time="25s"/> ';

      text += textBatches;
    }

    return text;
  },
};
