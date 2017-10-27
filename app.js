var express				=	require("express"),
	bodyParser			=	require("body-parser"),
	app					=	express(),
	expressSanitizer	=	require("express-sanitizer"),
	methodOverride      =	require("method-override"),
	mongoose			=	require("mongoose"),
	
	passport			=	require("passport"),
	LocalStrategy		=	require("passport-local");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.static("semantic"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

mongoose.Promise	=	global.Promise;
mongoose.connect('mongodb://localhost/tennis_webdemo',{useMongoClient:true});


app.get('/',function(req,res){
	res.render("landing");
});

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Focus Bew!",
	resave: false,
	saveUninitialized: false
}));


app.use(function(req,res,next){
	res.locals.currentUser	=	req.user;
	next();
});




app.listen(3000,function(){
	console.log("SERVER STARTED!");
});