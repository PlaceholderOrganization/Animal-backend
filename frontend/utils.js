export function renderHtml(template, contentId) {
    const content = document.getElementById(contentId);
    if (!content) {
        throw Error(`Element with id ${contentId} not found`);
    }
    content.innerHTML = "";
    content.append(template);
}

export async function loadHtml(page) {
    const resHtml = await fetch(page).then(r => {
        if (!r.ok) {
            throw new Error(`Could not load '${page}' page`)
        }
        return r.text()
    });
    const parser = new DOMParser();
    const content = parser.parseFromString(resHtml, "text/html")
    const div = content.querySelector(".template")
    if (!div) {
        throw new Error(`No outer div with class 'template' found in '${page}' page`)
    }
    return div;
}

export function setActiveLink(topnav, activeUrl) {
    const links = document.getElementById(topnav).querySelectorAll("a");
    links.forEach(child => {
        child.classList.remove("active");
        if (child.getAttribute("href").replace(/\//, "") === activeUrl) {
            child.classList.add("active");
        }
    })
}

export async function handleHttpErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const msg = errorResponse.message ? errorResponse.message:"No error details provided";
        throw new Error(msg);
    }
    return res.json();
}

export function sanitizeStringWithTableRows(tableRows) {
    let secureRows = DOMPurify.sanitize("<table>" + tableRows + "</table>");
    secureRows = secureRows.replace("<table>", "").replace("</table>", "");
    return secureRows;
}