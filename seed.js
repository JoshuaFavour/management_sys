var mongoose= require('mongoose');
var staff= require('./models/staff.js')
var ann= require('./models/ann.js')
var users=require('./models/user')

var data1=[{
  sname: "Juma",
  oname: "Joshua Favour",
  nationality: "Kenyan",
  dob: "12/10/1997",
  department: "ICT department",
  position: "Head of Department",
  idNum: "A2130869",
  image: "https://scontent.fnbo2-1.fna.fbcdn.net/v/t1.0-9/40644311_1823401427774382_6756611708459941888_n.jpg?_nc_cat=100&_nc_ht=scontent.fnbo2-1.fna&oh=4df30b2e41d186c3eab1b2e275b20073&oe=5CEEB047",
  phone: "+254791717858",
  email: "joshfavour.ecoyouth@gmail.com",
  address: "Mombasa"
}, {
  sname: "Alpha",
  oname: "Lael Ahenda",
  nationality: "Kenyan",
  dob: "29/11/1994",
  department: "Human Resource department",
  position: "Head of Department",
  idNum: "A2130657",
  image: "https://scontent.fnbo2-1.fna.fbcdn.net/v/t1.0-9/20292813_857404607744496_2965323607514438429_n.jpg?_nc_cat=110&_nc_ht=scontent.fnbo2-1.fna&oh=bffde08383455394c1faa66623a60cc9&oe=5CB57194",
  phone: "+254703105445",
  email: "lael.ecoyouth@gmail.com",
  address: "Mombasa"
},{
  sname: "Aumann",
  oname: "Charlotte",
  nationality: "American",
  dob: "29/6/1998",
  department: "Environmental Department",
  position: "Head of Department",
  idNum: "A2130845",
  image: "https://scontent.fnbo2-1.fna.fbcdn.net/v/t1.0-9/25289680_1759723684100068_7752633993362703330_n.jpg?_nc_cat=106&_nc_ht=scontent.fnbo2-1.fna&oh=9c32a3f46637940e427ad826f1391cfb&oe=5CB3BB18",
  phone: "+254743922321",
  email: "charlotte.ecoyouth@gmail.com",
  address: "Mombasa"
        }]
var data2=[{from: "Youth Ministry",
            to: "youth",
            head: "Youth Retreit",
            cont: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          },
          {from: "Ushers Ministry",
           to: "Ushers",
           head: "Ushers Practice",
           cont: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
         },
         {from: "Outreach Ministry",
          to: "leaders",
          head: "Prison Outreach",
          cont: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }]

        function seedDB(){
          staff.deleteMany({}, function(err){
            if (err) {
              console.log(err);
            }
            console.log("deleted all staff");
            data1.forEach(function(seed){
              staff.create(seed, function(err, newdata){
                if (err) {
                  console.log(err);
                }else {
                  console.log("new workers added to the system");
                }
            })

            })
          })
          ann.deleteMany({}, function(err){
            if (err) {
              console.log(err);
            }data2.forEach(function(data){
              ann.create(data, function(err, done){
                if (err) {
                  console.log(err);
                }else {
                  console.log("added new Announcement");
                }
              })
            })
          })
        
        }

  module.exports= seedDB;
