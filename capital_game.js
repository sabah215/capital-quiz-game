// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var input = document.getElementById('pr2__answer');
var responses = [];
var tBody;


$( document ).ready(function() {

      var country_capital_pairs = pairs;
     
      document.getElementById('pr2__answer').value = "";
      var question  = getRandomQuestion(country_capital_pairs);
      document.getElementById('pr2__question').innerText = question;
      document.getElementById('no_entry').style.display = 'block'; 
  
});

function deleteRow(el){
 
  if(el.classList.contains('delete')){
    el.parentElement.parentElement.remove();
  }

  // const responseIndex = responses.findIndex((r) =>  r.country === el.parentElement.parentElement.value);
  responses.forEach(r => console.log(r));
}



function clickAnswer(question, answer){

  // $("#country tr").remove();

  var country_capital_pairs = pairs;

  document.getElementById('no_entry').style.display = 'none';

  // User's response to the question
  var response = {
                "question": question,
                "answer":answer
              }
  // Get the matched country capital pair from the country-capital-pair list
  const findQuestion = function(pairs, question){
    const questionIndex = pairs.findIndex(function(pair, index){
        return pair.country === question;
    });
    return pairs[questionIndex];
  }

 
  // check the user's response to the right answer and log it
  console.log(
    findQuestion(country_capital_pairs, response.question)
    .capital
    .toLowerCase() === response.answer.toLowerCase())

  // populate response in table
  var table = document.getElementById('country');
  tBody = document.getElementById('tBody');

  // display row for correct answer
  var row = tBody.insertRow();
  // Condition to check if the user's response is correct
  if(findQuestion(country_capital_pairs, response.question)
      .capital.toLowerCase() === response.answer.toLowerCase()){
      
        row.style.cssText = 'color: blue;'
        var cell0 = row.insertCell(0);
        cell0.innerText = response.question;
        var cell1 = row.insertCell(1);
        cell1.innerText = findQuestion(country_capital_pairs, response.question).capital;
        var cell2 = row.insertCell(2);
        cell2.innerHTML = '<i class="fas fa-check"></i>';   
        var cell3 = row.insertCell(3);
        cell3.innerHTML = '<button class="delete" id="deleteBtn" onclick="deleteRow(this)">Delete</button>';
       
        
        var responseObj = {
          "question": response.question,
          "answer": findQuestion(country_capital_pairs, response.question).capital,
          "userResponse": response.answer.toLowerCase(),
          "isCorrect": true
        }
        console.log(responseObj)
        responses.push(responseObj);
  }
  // display row for incorrect answer
  else{
        row.style.cssText = 'color: red;'
        var cell0 = row.insertCell(0);
        cell0.innerText = response.question;
        var cell1 = row.insertCell(1);
        cell1.innerText = response.answer;
        cell1.style.cssText = 'text-decoration: line-through;'
        var cell2 = row.insertCell(2);
        cell2.innerText = findQuestion(country_capital_pairs, response.question).capital;
        var cell3 = row.insertCell(3);
        cell3.innerHTML = '<button class="delete" id="deleteBtn" onclick="deleteRow(this)">Delete</button>'

        var responseObj = {
          "question": response.question,
          "answer": findQuestion(country_capital_pairs, response.question).capital,
          "userResponse": response.answer,
          "isCorrect": false
        }
        responses.push(responseObj);
  }
  var question = getRandomQuestion(country_capital_pairs);
  document.getElementById('pr2__question').innerText = question;
  input.value = "" 
  console.log(responses);
}

function getRandomQuestion(country_capital_pairs){
  const randomValue = Math.floor(Math.random() * country_capital_pairs.length);
  var question = country_capital_pairs[randomValue].country;
  return question;
}

function clickInput(){
    var country_capital_pairs = pairs;
    var capitals = [];
    input.addEventListener('focus', function () { this.style.backgroundColor = 'yellow'});
    country_capital_pairs.forEach(item => {
          capitals.push(item.capital);
      });
    $('#pr2__answer').autocomplete({
      minLength:2,
      source: capitals,
      
    });
}

function check(){
    var all = document.getElementById('all');
    var correct = document.getElementById('correct-only');
    var wrong = document.getElementById('wrong-only');
    
    // populate response in table
    var tBody = document.getElementById('tBody');
    // var row = tBody.insertRow();

    if(all.checked == true){
        // display row for all answer
        responses.forEach(r => {
          if(r.answer.toLowerCase() === r.userResponse.toLowerCase()){
            var row = tBody.insertRow();
            row.style.cssText = 'color: blue;'
            var cell0 = row.insertCell(0);
            cell0.innerText = r.question;
            var cell1 = row.insertCell(1);
            cell1.innerText = r.answer
            var cell2 = row.insertCell(2);
            cell2.innerHTML = '<i class="fas fa-check"></i>';
            var cell3 = row.insertCell(3);
            cell3.innerHTML = '<button class="delete" id="deleteBtn" onclick="deleteRow(this)">Delete</button>'
            
          }
          else{
            var row = tBody.insertRow();
            row.style.cssText = 'color: red;'
            var cell0 = row.insertCell(0);
            cell0.innerText = r.question;
            var cell1 = row.insertCell(1);
            cell1.innerText = r.userResponse
            cell1.style.cssText = 'text-decoration: line-through;'
            var cell2 = row.insertCell(2);
            cell2.innerHTML = r.answer;
            var cell3 = row.insertCell(3);
            cell3.innerHTML = "<button class='delete' id='deleteBtn' onclick='deleteRow(this)'>Delete</button>";
          }
           
        });
        // console.log(responses);
    }

    if(correct.checked == true){
      var correct = responses.filter(r => r.isCorrect == true);
      if(correct.length == 0) {
        document.getElementById('no_entry').style.display = 'block'; 
      }
      correct.forEach(r => {
          var row = tBody.insertRow();
          row.style.cssText = 'color: blue;'
          var cell0 = row.insertCell(0);
          cell0.innerText = r.question;
          var cell1 = row.insertCell(1);
          cell1.innerText = r.answer
          var cell2 = row.insertCell(2);
          cell2.innerHTML = '<i class="fas fa-check"></i>';
          var cell3 = row.insertCell(3);
          cell3.innerHTML = '<button class="delete" id="deleteBtn" onclick="deleteRow(this)">Delete</button>'
        });
      console.log(correct);
    }

    if(wrong.checked == true){
      var wrong = responses.filter(r => r.isCorrect == false)
      if(wrong.length == 0) {
        document.getElementById('no_entry').style.display = 'block'; 
      }
      else{
        wrong.forEach(r => {
          var row = tBody.insertRow();
              row.style.cssText = 'color: red;'
              var cell0 = row.insertCell(0);
              cell0.innerText = r.question;
              var cell1 = row.insertCell(1);
              cell1.innerText = r.userResponse
              cell1.style.cssText = 'text-decoration: line-through;'
              var cell2 = row.insertCell(2);
              cell2.innerHTML = r.answer;
              var cell3 = row.insertCell(3);
              cell3.innerHTML = '<button class="delete" id="deleteBtn" onclick="deleteRow(this)">Delete</button>'
        });
      }
      
      console.log(wrong);
    }

document.querySelector('#deleteBtn').addEventListener('click', (e) => deleteRow(e.target)); 
}




