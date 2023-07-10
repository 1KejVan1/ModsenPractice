let quastions_arr = [
    ["Столица Франции?", ["Нью-Йорк", "Дублин", "Прага", "Париж"], 1, "Париж"]
];

document.getElementById("vopros").innerText = quastions_arr[0][0];
document.getElementById("a1").innerHTML = quastions_arr[0][1][0];
document.getElementById("a2").innerHTML = quastions_arr[0][1][1];
document.getElementById("a3").innerHTML = quastions_arr[0][1][2];
document.getElementById("a4").innerHTML = quastions_arr[0][1][3];


function Test(id){
    let x = document.getElementById(id);
    a = 0;
}