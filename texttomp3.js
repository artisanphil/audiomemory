module.exports = {    
  convert: async (text, batchNr) => {
    const textToSpeech = require('@google-cloud/text-to-speech');
    
    // Creates a client
    const client = new textToSpeech.TextToSpeechClient();    
    // The text to synthesize
    console.log('text length: ' + text.length);

    // Construct the request
    const request = {
      input: {ssml: text},
      // Select the language and SSML voice gender (optional)
      voice: {languageCode: 'en-GB', name:'en-GB-Standard-F', ssmlGender: 'MALE'},
      // select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3'},
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file

    return response.audioContent;    
  }
}
