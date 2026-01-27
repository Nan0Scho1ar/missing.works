const growthStages = {
    seedling: { emoji: "🌱", label: "Seedling", description: "Just planted" },
    sprout:   { emoji: "🌿", label: "Sprout", description: "Starting to take shape" },
    growing:  { emoji: "🪴", label: "Growing", description: "Developing well" },
    tree:     { emoji: "🌳", label: "Tree", description: "Fully grown" }
}

function splitFilename(href) {
    const [, date, titleRaw] = href.match(/.*\/*posts\/(\d{4}-\d{2}-\d{2})-(.+)\.html$/)
    const title = titleRaw.replace(/-/g, " ").replace(/\+\s\+/g, "-")
    const dateFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
    const formattedDate = new Date(date).toLocaleDateString(undefined, dateFormatOptions)

    return { date, formattedDate, title }
}

class SiteHeader extends HTMLElement {
    connectedCallback() {
        const title = "Nan0's Garden"
        const isPost = /\/posts\//.test(location.pathname)
        const index = isPost ? "../index.html" : "index.html"
        this.innerHTML = `
            <main>
                <nav>
                    <h1><a href="${index}">${title}</a></h1>
                    ${isPost ? `<a href="${index}" class="back-link">← All Posts</a>` : ''}
                </nav>
            </main>
        `
    }
}

class PostLink extends HTMLElement {
    connectedCallback() {
        const href = this.getAttribute("href")
        const { formattedDate, title } = splitFilename(href)
        this.innerHTML = `
            <li>
                <a href="${href}">
                <span class="post-title">${title}</span>
                ${formattedDate ? `<time>${formattedDate}</time>` : ""}
                </a>
            </li>
        `
    }
}

class PostContent extends HTMLElement {
    connectedCallback() {
        const { date, title } = splitFilename(location.pathname)
        document.title = title
        const content = this.innerHTML
        const stage = this.getAttribute("stage") || "seedling"
        const growth = growthStages[stage] || growthStages.seedling

        this.innerHTML = `
            <main>
                <header>
                <h1>${title}</h1>
                <div class="post-meta">
                    <time>${date}</time>
                    <span class="growth-stage" data-stage="${stage}" title="${growth.description}">
                        <span class="growth-emoji">${growth.emoji}</span>
                        <span class="growth-label">${growth.label}</span>
                    </span>
                </div>
                </header>
                <article>
                ${content}
                </article>
            </main>
        `
    }
}

customElements.define("site-header", SiteHeader)
customElements.define("post-content", PostContent)
customElements.define("post-link", PostLink)

// Inject header on every page
document.addEventListener("DOMContentLoaded", () => {
    const header = document.createElement("site-header")
    document.body.prepend(header)
})