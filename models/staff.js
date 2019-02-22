var mongoose= require('mongoose');



var staffSchema= new mongoose.Schema({
                                    sname: String,
                                    oname: String,
                                    nationality: String,
                                    dob: String,
                                    department: String,
                                    position: String,
                                    idNum: String,
                                    image: String,
                                    phone: String,
                                    email: String,
                                    address: String
                                      })

module.exports= mongoose.model("Staff", staffSchema);
