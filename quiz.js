import { all_topics} from "./topics.js";
import { Answer } from "./answer.js";

let current_topic;
let current_ques = 0;
let answers = new Answer();
let answers_count = 0;
let right_answers = 0;
let time_to_answer;
let timer_interval;

const bttn_arr = ["a1", "a2", "a3", "a4"];
const text_divs = ["text_ques", "number_of_ques", "several_answers_text"];
const result_bttn_arr = ["goto_main_page_bttn", "restart_bttn"];
const result_text_divs = ["result"];
const result_containers = ["result_bttns_container", "result_container"];

function searchInLocalStorage(){
    if(localStorage.getItem("time_to_answer") !== null){
        time_to_answer = Number(localStorage.getItem("time_to_answer"));
    }

    else{
        time_to_answer = 10;
    }

    if(localStorage.getItem("right_answers") !== null){
        right_answers = Number(localStorage.getItem("right_answers"));
    }

    if(localStorage.getItem("current_ques") !== null){
        current_ques = Number(localStorage.getItem("current_ques"));
    }

    current_topic = Number(localStorage.getItem("current_topic"));
}

if(document.URL.includes("main.html") == false){
    document.addEventListener("DOMContentLoaded", changeQuestion);
    searchInLocalStorage();
    findTopic(localStorage.getItem("current_topic"));

    timer_interval = setInterval(timer, 1000);
}

function findTopic(name){
    for(let i = 0; i < all_topics.length; i++){
        if(all_topics[i].getTopicName() == name){
            current_topic = i;
            break;
        }
    }
}

function addAnswer(id){
    answers.addAnswer(document.getElementById(id).innerText, document.getElementById(id));
    answers.getAnswersDiv()[answers_count].style.backgroundColor = "#D15F2C";
    answers_count++;

    if(answers.getAnswers().length == all_topics[current_topic].getQuestions()[current_ques].getQuantityOfCurrectAnswer()){
        clearClickOnBttn();
        setTimeout(checkAnswer, 1000);
    }
}

window.addAnswer = addAnswer;

function checkAnswer(){
    if(all_topics[current_topic].getQuestions()[current_ques].getQuantityOfCurrectAnswer() == 1){
        clearInterval(timer_interval);
        timer_interval = null;

        if(answers.getAnswers()[0] == all_topics[current_topic].getQuestions()[current_ques].getCurrectAnswer()){
            answers.getAnswersDiv()[0].style.backgroundColor = "green";
            current_ques++;
            right_answers++;

            localStorage.setItem("current_ques", current_ques);
            localStorage.setItem("right_answers", right_answers);
        }
        else{
            answers.getAnswersDiv()[0].style.backgroundColor = "red";
            current_ques++;
            localStorage.setItem("current_ques", current_ques);
        }
        
        setTimeout(changeQuestion, 1000);
    }
    else{
        if(answers_arr[0].length == all_topics[current_topic].getQuestions()[current_ques].getQuantityOfCurrectAnswer()){
            let isRightAnswer = true;
            stopTimer();

            for(let i = 0; i < answers.getAnswers().length; i++){
                if(all_topics[current_topic].getQuestions()[current_ques].getCurrectAnswer().indexOf(answers.getAnswers()[i]) == -1){
                    answers.getAnswersDiv()[i].style.backgroundColor = "red";
                    isRightAnswer = false;
                }
                else{
                    answers.getAnswersDiv()[i].style.backgroundColor = "green";
                }
            }

            if(isRightAnswer) right_answers++;
            current_ques++;     
            localStorage.setItem("current_ques", current_ques);

            setTimeout(changeQuestion, 1000);
        }
    }
}

function getResult(){
    clearInterval(timer_interval);
    clearAreaBeforeShowAnswer();
    showResult();
}

function showResult(){
    document.getElementById("result_container").style.gap = "3em";
    document.getElementById("timer_div").style.opacity = "0";
    let item;

    for(let i = 0; i < result_bttn_arr.length; i++){
        item = document.getElementById(`${result_bttn_arr[i]}`);

        item.style.visibility = "visible";
        item.style.height = "50px"

        if(result_bttn_arr[i] == "goto_main_page_bttn"){
            item.innerHTML = "На главную";
        }
        else if(result_bttn_arr[i] == "restart_bttn"){
            item.innerHTML = "Начать заново";
        }
    }

    for(let i = 0; i < result_text_divs.length; i++){
        item = document.getElementById(`${result_text_divs[i]}`);
        item.style.marginTop = "20%";
        item.style.visibility = "visible";
        item.innerHTML = `Вы ответили на ${right_answers} из ${all_topics[current_topic].getQuestions().length} вопросов!!!`;
    }
}

function clearClickOnBttn(){
    for(let i = 0; i < bttn_arr.length; i++){
        document.getElementById(`${bttn_arr[i]}`).setAttribute("onclick", "");
    }
}

function setStyleAndClickOnBttnAndTextDivs(){
    let item;
    for(let i = 0; i < bttn_arr.length; i++){
        item = document.getElementById(`${bttn_arr[i]}`);

        item.setAttribute("onclick", "addAnswer(this.id)");
        item.style.backgroundColor = "#468B97";
        item.innerHTML = all_topics[current_topic].getQuestions()[current_ques].getAnswerOptions()[i];
    }

    for(let i = 0; i < text_divs.length; i++){
        item = document.getElementById(`${text_divs[i]}`);

        if(text_divs[i] == "number_of_ques"){
            item.innerHTML =`Вопрос ${current_ques+1}/${all_topics[current_topic].getQuestions().length}`;
        }
        else if(text_divs[i] == "text_ques"){
            item.innerHTML = all_topics[current_topic].getQuestions()[current_ques].getQuestion();
        }
    }

    document.getElementById("timer_div").style.opacity = "1";
    if(time_to_answer == 10){
        document.getElementById("timer_div").innerHTML = `0:${time_to_answer}`;
    }
    else{
        document.getElementById("timer_div").innerHTML = `0:0${time_to_answer}`;
    }
}

function clearAreaBeforeShowAnswer(){
    let item;
    for(let i = 0; i < bttn_arr.length; i++){
        item = document.getElementById(`${bttn_arr[i]}`);
        item.style.visibility = "hidden";
    }

    for(let i = 0; i < text_divs.length; i++){
        item = document.getElementById(`${text_divs[i]}`);
        item.style.visibility = "hidden";
    }
}

function setStylesAndClickAfterRestart(){
    let item;
    document.getElementById("timer_div").style.opacity = "1";

    for(let i = 0; i < result_text_divs.length; i++){
        item = document.getElementById(`${result_text_divs[i]}`);
        item.style.marginTop = "0";
        item.style.visibility = "hidden";
        item.innerHTML = ``;
    }

    for(let i = 0; i < result_bttn_arr.length; i++){
        item = document.getElementById(`${result_bttn_arr[i]}`);
        item.style.margin = "0%";
        item.style.visibility = "hidden";
        item.style.height = "0";
        item.innerText = "";
    }

    for(let i = 0; i < bttn_arr.length; i++){
        item = document.getElementById(`${bttn_arr[i]}`);
        item.style.visibility = "visible";
    }

    for(let i = 0; i < text_divs.length; i++){
        item = document.getElementById(`${text_divs[i]}`);
        item.style.visibility = "visible";
    }

    for(let i = 0; i < result_containers.length; i++){
        item = document.getElementById(`${result_containers[i]}`);
        item.style.visibility = "hidden";

        if(result_containers[i] == "result_container"){
            item.style.gap = "0";
        }
        else if(result_containers[i] == "result_bttns_container"){
            item.style.height = "0";
        }
    }
}

function changeQuestion(){
    if(current_ques == all_topics[current_topic].getQuestions().length){
        getResult();
        return;
    }

    if(timer_interval === null){
        time_to_answer = 10;
        document.getElementById("timer_div").innerHTML = `0:${time_to_answer}`;
        timer_interval = setInterval(timer, 1000);
    }

    answers.resetAnswers();
    answers_count = 0;

    setStyleAndClickOnBttnAndTextDivs();

    if(all_topics[current_topic].getQuestions()[current_ques].getQuantityOfCurrectAnswer() != 1){
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
    answers.resetAnswers();
    right_answers = 0;
    answers_count = 0;
    time_to_answer = 10;
    timer_interval = setInterval(timer, 1000);

    setStylesAndClickAfterRestart();
    changeQuestion();
}

window.restart = restart;

function chooseTopic(name){
    localStorage.setItem("current_topic", `${name}`);
    location.href = "quiz.html";
}

window.chooseTopic = chooseTopic;

function timer(){
    if(time_to_answer == 0){
        current_ques++;
        localStorage.setItem("current_ques", current_ques);
        localStorage.setItem("right_answers", right_answers);

        changeQuestion();
        time_to_answer = 10;
    }
    else{
        time_to_answer--;
    }
    if(time_to_answer == 10){
        document.getElementById("timer_div").innerHTML = `0:${time_to_answer}`;
    }
    else{
        document.getElementById("timer_div").innerHTML = `0:0${time_to_answer}`;
    }

    localStorage.setItem("time_to_answer", time_to_answer);
}

function exitFromThisPage(){
    localStorage.removeItem("current_ques");
    localStorage.removeItem("right_answers");
    localStorage.removeItem("current_topic");
    localStorage.removeItem("time_to_answer");
    location.href = "main.html";
}

window.exitFromThisPage = exitFromThisPage;