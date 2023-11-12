import { API_URL } from "../../settings.js";
import { FETCH_NO_API_ERROR } from "../../settings.js";

export function initZooMap() {
    const zooMapClickable = document.getElementById("zoo-map-clickable");

    zooMapClickable.addEventListener("click", (event) => {
        const target = event.target;

        if (target.tagName === "AREA") {
            event.preventDefault();
            getZooInfo(target.id);
        }
    });
}

const getZooInfo = async (animalId) => {
    const URL = `${API_URL}?answer=${animalId}`;
    console.log(animalId);

    const infoBox = document.getElementById("info-box")
    infoBox.innerText = ""

    try { 
        const reply = await fetch(URL).then(handleHttpErrors)
        infoBox.innerHTML = reply.answer
    } catch (e) {
        infoBox.style.color = "red";
        infoBox.innerText = e.message;
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
