import { API_URL } from "../../settings.js";


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
        document.getElementById('result4').innerHTML = reply.answer
    } catch (e) {
        result4.style.color = "red";
        result4.innerText = e.message;
    } finally {
        spinner.style.display = "none";
    }
}

async function handleHttpErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const msg = errorResponse.message ? errorResponse.message : "No error details provided"
        throw new Error(msg)
    }
    return res.json()
}