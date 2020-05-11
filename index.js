const express = require('express');
const app = express();
const Page = require("./Routes/main");
const Auth = require('./Routes/Auth');
const SecretPage = require('./Routes/Secret')
const cookieParser = require('cookie-parser');
const Port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');




app.use(cookieParser());
app.use(session({
	secret:'WinterCommin2020',
	saveUninitialized:true,
	resave:true,

}))



app.get('',(req,res)=>{
	res.redirect('/Api/Main');
})

app.use("/Api",Page);
app.use("/Auth",Auth);
app.use("/Secret",SecretPage);


mongoose.connect("mongodb+srv://Aslanjr:eurosport123@buyers-5wbbh.gcp.mongodb.net/Blog", { 
	useNewUrlParser: true,
	useCreateIndex: true,
	}, 
	function(err){
	if(err) return console.log(err);
	console.log('Mongoose working');
});



app.engine('ejs',require('ejs-mate'));


app.use(express.static('./assets'));
app.set('views', 'views');
app.set('view engine','ejs');

app.listen(Port,()=>{
	console.log(`Server working in ${Port} port`);
})