const SERVER_URL = 'http://localhost:8080/api/';

document.getElementById("btn-get-quiz").addEventListener("click", getQuiz)
document.getElementById('btn-get-answer').addEventListener('click', getInfo);


 async function getInfo() {
    const URL = `${SERVER_URL}animal?answer= + ${document.getElementById('the-question').value}`
    const spinner = document.getElementById('spinner3');
    const result3 = document.getElementById('result3');
    result3.innerText = ""
    result3.style.color = "black";
    try {
        spinner.style.display = "block";
        const reply = await fetch(URL).then(handleHttpErrors)
        document.getElementById('result3').innerHTML = convertToLink(reply.answer)
    } catch (e) {
        result3.style.color = "red";
        result3.innerText = e.message;
    } finally {
        spinner.style.display = "none";
    }

    function convertToLink(str) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return str.replace(urlRegex, function(match) {
            if (match.endsWith('.')) {
                match = match.slice(0, -1); // Remove the trailing dot
            }
            return `<a href="${match}" target="_blank">${match}</a>`;
        });
    }
}

async function getQuiz() {
    const URL = `${SERVER_URL}animal/quiz`
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