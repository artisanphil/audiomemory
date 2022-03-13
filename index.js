async function main() {
  const SaveAudio = require("./saveaudio");
  const SplitText = require("./splittext");
  const TextToGaps = require("./texttogaps");
  
  let text = "The Lord is my shepherd, I lack nothing.\n";
  text +=
    "He makes me lie down in green pastures,\nhe leads me beside quiet waters,\nhe refreshes my soul.\n";
  text += "He guides me along the right paths\nfor his name’s seik.\n";
  text +=
    "Even though I walk through the darkest valley,\nI will fear no evil, for you are with me;\n";
  text += "your rod and your staff,\bthey comfort me.\n";
  text += "You prepare a table before me\nin the presence of my enemies.\n";
  text += "You anoint my head with oil;\nmy cup overflows.\n";
  text +=
    "Surely your goodness and love will follow me\nall the days of my life,\n";
  text += "and I will dwell in the house of the Lord forever.";

  let textBatches = SplitText.split(text);

  let dayCount = 0;
  while (dayCount <= textBatches.length) {
    console.log("day " + (dayCount + 1));

    let textWithGaps = "";

    if (dayCount >= 1) {
      textWithGaps += await TextToGaps.process(textBatches[dayCount - 1], [
        "NOUN",
        "ADJ",
        "VERB",
      ]);
      textWithGaps += '<break time="3s"/>';

      words = textBatches[dayCount - 1].split(" ");
      textWithGaps += words[0] + " " + words[1] + " " + words[2];

      textWithGaps += '<break time="10s"/>';
      textBatches[dayCount - 1].split('\n').forEach((chunk) => {
        textWithGaps += chunk + '<break time="10s"/>';
      });

      textWithGaps += words[0] + " " + words[1] + " " + words[2];
      textWithGaps += '<break time="30s"/>';
  
      textWithGaps += textBatches[dayCount - 1];

      textWithGaps += '<break time="5s"/>';
    }

    if (dayCount === textBatches.length) {
      for (let nr = 0; nr < textBatches.length; nr++) {
        words = textBatches[nr].split(" ");
        textWithGaps += words[0] + " " + words[1] + " " + words[2];

        textWithGaps += '<break time="10s"/>';
        textBatches[nr].split('\n').forEach((chunk) => {
          textWithGaps += chunk + '<break time="10s"/>';
        });
  
        textWithGaps += words[0] + " " + words[1] + " " + words[2];
        textWithGaps += '<break time="30s"/>';

        textWithGaps += textBatches[nr];
      }

      SaveAudio.handle(textWithGaps, (dayCount + 1));

      console.log(textWithGaps);

      break;
    }

    textWithGaps += textBatches[dayCount];
    textWithGaps += '<break time="2s"/>';

    textWithGaps += await TextToGaps.process(textBatches[dayCount], [
      "NOUN",
      "ADJ",
    ]);
    textWithGaps += '<break time="2s"/>';

    textWithGaps += await TextToGaps.process(textBatches[dayCount], ["VERB"]);
    textWithGaps += '<break time="2s"/>';

    textWithGaps += await TextToGaps.process(textBatches[dayCount], [
      "NOUN",
      "ADJ",
      "VERB",
      "PRON",
    ]);

    words = textBatches[dayCount].split(" ");
    textWithGaps += words[0] + " " + words[1] + " " + words[2];

    textWithGaps += '<break time="10s"/>';

    textBatches[dayCount].split('\n').forEach((chunk) => {
      textWithGaps += chunk + '<break time="10s"/>';
    });

    textWithGaps += words[0] + " " + words[1] + " " + words[2];
    textWithGaps += '<break time="30s"/>';
    textWithGaps += textBatches[dayCount];

    SaveAudio.handle(textWithGaps, (dayCount + 1));
    console.log(textWithGaps);

    dayCount++;
  }
}

main(...process.argv.slice(2));
