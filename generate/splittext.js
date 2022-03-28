module.exports = {
    split: (text) => {
        let sentences = text.split('\n');

        return module.exports.createBatches(sentences);        
    }, 
    
    createBatches: (sentences) => {
        let batches = [];
        for (let nr = 0; nr < sentences.length; nr++) {
            if(nr % 3 == 0) {
                batch = sentences[nr] + '\n';
                if(sentences[nr + 1]) {
                    batch += sentences[nr + 1] + '\n';
                }

                if(sentences[nr + 2]) {
                    batch += sentences[nr + 2] + '\n';
                }

                batches.push(batch);
            }             
        }

        return batches;
    }
}
