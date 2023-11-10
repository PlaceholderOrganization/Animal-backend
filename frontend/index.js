import "./navigo.js";

import { setActiveLink, loadHtml, renderHtml } from "./utils.js";

// import { initSomething } from "./js/something.js";
import { initWorldMap } from "./pages/worldMap/worldMap.js";


window.addEventListener("load", async () => {

    // const templateSomething = await loadHtml("something.html");
    const templateNotFound = await loadHtml("./pages/notfound/notFound.html");
    const templateWorldMap = await loadHtml("./pages/worldMap/worldMap.html");

    const router = new Navigo("/", { hash: true });
    // Not nice but works. Makes router globally available
    window.router = router;

    router
        .hooks({
            before(done, match){
                setActiveLink("menu", match.url)
                done();
            }
        })
        .on({
            "/": () => document.getElementById("content").innerHTML = `
                <h1>Velkommen til OpenAnimal</h1>
                <img style="width: 50%;max-width: 350px;margin-top:1em;" src="./img/Logo.png" alt="Logo">
            `,
            "/signup": () => {
                renderHtml(templateSignup, "content")
                initSignup()
            },

            "/worldmap": () => {
                renderHtml(templateWorldMap, "content")
                initWorldMap()
            }
        })
        .notFound(() => {
            renderHtml(templateNotFound, "content")
        })
        .resolve();   
});

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber + ' Column: ' + column + ' StackTrace: ' +  errorObj);
}