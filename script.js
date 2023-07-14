let questions_arr = [
    ["Which of these characters are friends with Harry Potter?", ["Ron Weasley", "Draco Malfoy", "Hermione Granger", "Voldemort"], 2, ["Ron Weasley", "Hermione Granger"]],
    ["How many planets are in the solar system?", ["8", "9", "10", "7"], 1, "8"],
    ["What is the freezing point of water?", ["0", "-5", "-7", "1"], 1, "0"],
    ["What is the longest river in the world", ["Nile", "Amazon", "Yangtze", "Dnipro"], 1, "Amazon"],
    ["How many chromosomes are in the human genome?", ["42", "44", "46", "47"], 1, "46"],
    ["What is the capital of Canada?", ["Toronto", "Ottawa", "Vancouver", "Calgary"], 1, "Ottawa"],
    ["What is the Jewish New Year called?", ["Hanukkah", "Yom Kippur", "Kwanzaa", "Rosh Hashanah"], 1, "Rosh Hashanah"]
];
let current_ques = 0;
let answers_arr = [
    [],
    []
];
let answers_count = 0;
let right_answers = 0;

changeQuestion();

function addAnswer(id){
    answers_arr[0][answers_count] = document.getElementById(id).innerText;
    answers_arr[1][answers_count] = document.getElementById(id);
    answers_arr[1][answers_count].style.backgroundColor = "aqua";
    answers_count++;
    if(answers_arr[0].length == questions_arr[current_ques][2]){
        document.getElementById("a1").setAttribute("onclick", "");
        document.getElementById("a2").setAttribute("onclick", "");
        document.getElementById("a3").setAttribute("onclick", "");
        document.getElementById("a4").setAttribute("onclick", "");
        setTimeout(checkAnswer, 1000);
    }
}

function checkAnswer(){
    if(questions_arr[current_ques][2] == 1){
        if(answers_arr[0][0] == questions_arr[current_ques][3]){
            answers_arr[1][0].style.backgroundColor = "green";
            current_ques++;
            right_answers++;
            setTimeout(changeQuestion, 1000);
        }
        else{
            answers_arr[1][0].style.backgroundColor = "red";
            current_ques++;
            setTimeout(changeQuestion, 1000);
        }
    }
    else{
        if(answers_arr[0].length == questions_arr[current_ques][2]){
            let isRightAnswer = true;
            for(let i = 0; i < answers_arr[0].length; i++){
                if(questions_arr[current_ques][3].indexOf(answers_arr[0][i]) == -1){
                    answers_arr[1][i].style.backgroundColor = "red";
                    isRightAnswer = false;
                }
                else{
                    answers_arr[1][i].style.backgroundColor = "green";
                }
            }
            if(isRightAnswer) right_answers++;
            current_ques++;
            setTimeout(changeQuestion, 1000);
        }
    }
}

function getResult(){
    document.getElementById("a1").style.visibility = "hidden";
    document.getElementById("a2").style.visibility = "hidden";
    document.getElementById("a3").style.visibility = "hidden";
    document.getElementById("a4").style.visibility = "hidden";
    document.getElementById("text_ques").style.visibility = "hidden";
    document.getElementById("number_of_ques").style.visibility = "hidden";
    document.getElementById("several_answers_text").style.visibility = "hidden";
    document.getElementById("result_container").style.gap = "3em";
    let restart_bttn = document.getElementById("restart_bttn");
    restart_bttn.style.visibility = "visible";
    restart_bttn.style.height = "50px";
    restart_bttn.innerHTML = "Начать заново";
    let result = document.getElementById("result");
    result.style.marginTop = "15%";
    result.style.visibility = "visible";
    result.innerHTML = `Вы ответили на ${right_answers} из ${questions_arr.length} вопросов!!!`;
}

function changeQuestion(){
    if(current_ques == questions_arr.length){
        getResult();
    }
    answers_arr = [[],[]];
    answers_count = 0;
    document.getElementById("a1").style.backgroundColor = "blue";
    document.getElementById("a2").style.backgroundColor = "blue";
    document.getElementById("a3").style.backgroundColor = "blue";
    document.getElementById("a4").style.backgroundColor = "blue";
    document.getElementById("number_of_ques").innerHTML =`Question ${current_ques+1}/${questions_arr.length}`;
    document.getElementById("text_ques").innerHTML = questions_arr[current_ques][0];
    document.getElementById("a1").innerHTML = questions_arr[current_ques][1][0];
    document.getElementById("a2").innerHTML = questions_arr[current_ques][1][1];
    document.getElementById("a3").innerHTML = questions_arr[current_ques][1][2];
    document.getElementById("a4").innerHTML = questions_arr[current_ques][1][3];
    document.getElementById("a1").setAttribute("onclick", "addAnswer(this.id)");
    document.getElementById("a2").setAttribute("onclick", "addAnswer(this.id)");
    document.getElementById("a3").setAttribute("onclick", "addAnswer(this.id)");
    document.getElementById("a4").setAttribute("onclick", "addAnswer(this.id)");

    if(questions_arr[current_ques][2] != 1){
        document.getElementById("several_answers_text").style.visibility = "visible";
        document.getElementById("several_answers_text").style.marginTop = "2%";
    }
    else{
        document.getElementById("several_answers_text").style.visibility = "hidden";
        document.getElementById("several_answers_text").style.marginTop = "0";
    }
}

function restart(){
    current_ques = 0
    answers_arr = [[], []];
    right_answers = 0;
    answers_count = 0;
    let result = document.getElementById("result");
    result.style.marginTop = "0%";
    result.style.visibility = "hidden";
    result.innerHTML = "";
    let restart_bttn = document.getElementById("restart_bttn");
    restart_bttn.style.margin = "0%";
    restart_bttn.style.visibility = "hidden";
    restart_bttn.style.height = "0";
    restart_bttn.innerText = "";
    document.getElementById("result_container").style.visibility = "hidden";
    document.getElementById("result_container").style.gap = "0";
    document.getElementById("a1").style.visibility = "visible";
    document.getElementById("a2").style.visibility = "visible";
    document.getElementById("a3").style.visibility = "visible";
    document.getElementById("a4").style.visibility = "visible";
    document.getElementById("text_ques").style.visibility = "visible";
    document.getElementById("number_of_ques").style.visibility = "visible";
    document.getElementById("some_answers_text").style.visibility = "visible";
    changeQuestion()
}