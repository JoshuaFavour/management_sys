var mongoose=require('mongoose');


var annSchema= new mongoose.Schema({
                                    from: String,
                                    to: String,
                                    head: String,
                                    cont: String,
                                    time: {type:Date, default: Date.now}
                                  })

module.exports= mongoose.model("Announcement", annSchema)
