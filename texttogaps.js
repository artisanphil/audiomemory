module.exports = {
    process: async (text, removePOSArray) => {
        // Imports the Google Cloud client library
        const language = require('@google-cloud/language');
    
        // Instantiates a client
        const client = new language.LanguageServiceClient();
    
        const document = {
        content: text,
        type: 'PLAIN_TEXT',
        };
    
        // Detects the sentiment of the text
        const [result] = await client.analyzeSyntax({document: document});

        let textWithGaps = '';
        for(let wordCount = 0; wordCount < result.tokens.length; wordCount++) {
            let addCount = 0;

            let addAfterText = '';
            for(let posCount = 0; posCount < removePOSArray.length; posCount++) {
                if((wordCount + posCount) >= result.tokens.length) {
                    word = result.tokens[wordCount];
                    break;
                } else {
                    addCount = removePOSArray.length - 1;
                    word = result.tokens[(wordCount + posCount)];
                }
                
                let partOfSpeech = word.partOfSpeech.tag;    
                if(removePOSArray.includes(partOfSpeech)) {
                    //textWithGaps += ' * ';
                    textWithGaps += '<audio src="https://www.lernenmitspass.ch/gap.mp3">gap</audio><break time="1s"/>'

                    addAfterText += word.text.content + ' ';                                                                                      
                } else {        
                    textWithGaps += addAfterText + ' ' + word.text.content + ' ';  
                    addAfterText = '';
                }    
            }

            if(addAfterText.length > 0) {
                textWithGaps += addAfterText + ' ';     
            }

            wordCount += addCount;            
        }

        textWithGaps = textWithGaps.replace(/\s\s+/g, ' ');
        textWithGaps = textWithGaps.replace(/\s([.,!:’'])/g, "$1");

        return textWithGaps;
    }
}
