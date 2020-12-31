
var fs = require('fs');
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);
console.log(words);
console.log("Server is Starting.");
var express = require('express');
var app = express();


var server =  app.listen(3000, listening);
function listening(){
	console.log("Listening.......");
}

app.use(express.urlencoded({
  extended: true
}));

app.post('/getResult', (req, res) => {
	const buttonClicked = req.body.button_clicked;
  const key = req.body.key;
  const value = req.body.value;
  
  if(!(key === "")&& !(value === "")){
  addWord(key, value, res);
}
else if(!(key === "")&& (value === "")){
	   if("Read" === buttonClicked){
       searchWord(key, value, res);
   }
   else if("Delete" === buttonClicked){
   	deleteWord(key, res);
   }
}
});

app.use(express.static('website'));

app.get('/add/:word/:score?', addWord);

function addWord(key, value, res){
	var reply;
	if(words[key]){
		reply = "Key-Value Pair is Already Present, Please Consider Some Other Key.";
		res.send(reply);
	}
	if(!(key === "")&& !(value === "")){
		words[key] = value;
	data = JSON.stringify(words, null, 2);
	fs.writeFile('words.json', data, finished);
	function finished(err){
		reply = "The Key-Value Pair is Added. Thanks!";
		 res.send(reply);
		
	}
	

	}
	else{
       reply = "You Need To Provide Both The Fields for Creation";
       console.log(key + " " + value);
        res.send(reply);
       
	}
	
	
}


function sendFlower(request, response){
	var data = request.params;
	response.send("I Love " +  data.flower + " Too.");
}

app.get('/all', sendAll);
function sendAll(request, response){
	response.send(words);
}

app.get('/search/:word', searchWord);
function searchWord(key, value, res){
	var reply;
	if(words[key]){
		reply = {
			status : "found",
			key : key,
			value : words[key]
		}
	}
	else{
		reply = {
			status : "not found",
			key : key
		}
	}

	res.send(reply);
}
function deleteWord(key, res){
	var reply;
	if(words[key]){
       delete words[key];
        reply = "The Word is Deleted Safely. Thanks!"
	}
	else{
       reply = "The Key You Want to Delete is NotPresent in The Data-Store."
	}
	res.send(reply);
}