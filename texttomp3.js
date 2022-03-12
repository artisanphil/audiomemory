module.exports = {
  convert: async (input) => {
    const textToSpeech = require('@google-cloud/text-to-speech');
    const textSynthesize =require('google-text-to-speech-concat');
    
    // Import other required libraries
    const fs = require('fs');
    const path = require('path');
    
    try {
      // Creates a client
      const client = new textToSpeech.TextToSpeechClient();    
      // The text to synthesize
      const text = '<speak>' + input + '</speak>';
      console.log('text length: ' + text.length);

      // Construct the request
      const request = {
        input: {ssml: text},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: 'en-GB', name:'en-GB-Standard-B', ssmlGender: 'MALE'},
        // select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
      };

      // Synthesize the text, resulting in an audio buffer
      const buffer = await textSynthesize.synthesize(client, request);
  
      // Handle the buffer
      // For example write it to a file or directly upload it to storage, like S3 or Google Cloud Storage
      const outputFile = path.join(__dirname, 'output.mp3');

      fs.writeFile(outputFile, buffer, 'binary', (err) => {
          if (err) throw err;
          console.log('Got audio!', outputFile);
        });
    } catch (err) {
      console.log(err);
    }     
  
     // Write the file
  //    fs.writeFile(outputFile, buffer, 'binary', (err) => {
  //      if (err) throw err;
  //      console.log('Got audio!', outputFile);
  //    });
  //  } catch (err) {
  //    console.log(err);
  //  }

  //   // Performs the text-to-speech request
  //   const [response] = await client.synthesizeSpeech(request);
    
  //   return response.audioContent;
  }
}
