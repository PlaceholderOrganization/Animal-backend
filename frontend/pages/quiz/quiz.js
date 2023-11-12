import { API_URL } from "../../settings.js";

let quizData = [];

let quizSlideIndex = 0;

export async function initQuiz() {

    
    
    document.getElementById("btn-get-quiz").addEventListener("click", getQuiz)


}
    
async function getQuiz() {
    const URL = `${API_URL}/animal/quiz`
    const spinner = document.getElementById('spinner4');
    const result4 = document.getElementById('result4');
    result4.innerText = ""
    result4.style.color = "black";
    try {
        spinner.style.display = "block";
        const reply = await fetch(URL).then(handleHttpErrors)
        const quizDataJson = reply.answer;
        console.log(quizDataJson)
        quizData = JSON.parse(quizDataJson)
        quizData.forEach(element => {
            console.log(element.question)
        });
        
    } catch (e) {
        result4.style.color = "red";
        result4.innerText = e.message;
    } finally {
        spinner.style.display = "none";
    }
    generateSlide()
    populateSlide(quizData,quizSlideIndex)
    
}

async function handleHttpErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const msg = errorResponse.message ? errorResponse.message : "No error details provided"
        throw new Error(msg)
    }
    return res.json()
}

function generateSlide() {
    const btnA = document.createElement("button")
    btnA.id="answer-a"
    const btnB = document.createElement("button")
    btnB.id="answer-b"
    const btnC = document.createElement("button")
    btnC.id="answer-c"
    const btnD = document.createElement("button")
    btnD.id="answer-d"

    const btnList = [btnA, btnB, btnC, btnD]
        btnList.forEach(button => {
        button.addEventListener("click", changeSlide);
    });

    document.getElementById("answer-div").appendChild(btnA)
    document.getElementById("answer-div").appendChild(btnB)
    document.getElementById("answer-div").appendChild(btnC)
    document.getElementById("answer-div").appendChild(btnD)
}

function populateSlide(array,quizSlideIndex) {

    document.getElementById("question").innerHTML = array[quizSlideIndex].question
    document.getElementById("answer-a").innerText = array[quizSlideIndex].answers[0]
    document.getElementById("answer-b").innerText = array[quizSlideIndex].answers[1]
    document.getElementById("answer-c").innerText = array[quizSlideIndex].answers[2]
    document.getElementById("answer-d").innerText = array[quizSlideIndex].answers[3]


}

function changeSlide() {
    // Increment quizSlideIndex and check if it's within the bounds of quizData
    if (quizSlideIndex < quizData.length - 1) {
        quizSlideIndex++;
        populateSlide(quizData, quizSlideIndex);
    } else {
        // Handle the scenario when the user reaches the end of the quiz
        console.log("End of quiz");
        // You could reset the quiz or show results here
    }
}