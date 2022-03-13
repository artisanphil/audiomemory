module.exports = {
    split: (text) => {
        let sentences = text.split('.');

        return module.exports.createBatches(sentences);        
    }, 
    
    createBatches: (sentences) => {
        let batches = [];
        for (let nr = 0; nr < sentences.length; nr++) {
            if(nr % 2 == 0 ) {
                batch = sentences[nr] + '.';
                if(sentences[nr + 1]) {
                    batch += sentences[nr + 1] + '.';
                }

                batches.push(batch);
            }             
        }

        return batches;
    }
}
