module.exports = {
  handle: async (text, day) => {
    
    dir = "temporary/" + day;
    module.exports.createFolder(dir, text, day);  
  },

  async removeFilesInDirectory(dir) {
      const fs = require("fs");

      console.log("removeFilesInDirectory");

      if (await fs.existsSync(dir)){
        await fs.rmSync(dir, { recursive: true }, (err) => {
          if (err) {
              throw err;
          }
      
          console.log(`${dir} is deleted!`);   
          //module.exports.createFolder(dir, "", 0);           
        });
      }      
  },
  async createFolder(dir, text, day) {
    const fs = require("fs");
    const SplitLongText = require("./splitlongtext");

    console.log("createFolder");

    // if (await !fs.existsSync(dir)){
      await fs.mkdirSync(dir);
      console.log(`${dir} created!`);        

      if(dir == "temporary/" + day) {
        await SplitLongText.handle(dir, text, day);
      }        
    //}          
  }, 
  async createMp3(allMp3s, day) {
    const audioconcat = require("audioconcat");

    console.log("createMp3: " + day);

    await audioconcat(allMp3s)
      .concat("output/day_" + day + ".mp3")
      .on("start", function (command) {
        console.log("ffmpeg process started:", command);
      })
      .on("error", function (err, stdout, stderr) {
        console.error("Error:", err);
        console.error("ffmpeg stderr:", stderr);
      })
      .on("end", function (output) {
        console.error("Audio created in:", output);
      });
  }
};
