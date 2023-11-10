import "./navigo.js";

import { setActiveLink, loadHtml, renderHtml } from "./utils.js";

// import { initSomething } from "./js/something.js";

window.addEventListener("load", async () => {

    // const templateSomething = await loadHtml("something.html");

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
                <h1>Home</h1>
                <img style="width: 50%;max-width: 150px;margin-top:1em;" src="./img/logo.png" alt="Logo">
        `,
        "/signup": () => {
            renderHtml(templateSignup, "content")
            initSignup()
        }
        })
});