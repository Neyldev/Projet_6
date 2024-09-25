async function init() {
    let allinfo = await getallinfo();

    displayallworks(allinfo);

    let allcate = await getallcategories();

    displayallcate(allcate);

    filtercate();
}

init();

function getallinfo() {
    return fetch("http://localhost:5678/api/works")
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
        })
}

function getallcategories() {
    return fetch("http://localhost:5678/api/categories")
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error)
        })
}

function displayallworks(allinfo) {
    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    for (const info of allinfo) {
        gallery.insertAdjacentHTML("beforeend",
            `
            <figure>
                <img src="${info.imageUrl}" alt="${info.title}">
                <figcaption>${info.title}</figcaption>
            </figure>
            `
        )
    }
}

function displayallcate(allcate) {
    let containerbuttons = document.querySelector("#buttons")


    for (const cate of allcate) {
        containerbuttons.insertAdjacentHTML("beforeend",
            `
            <li>
				<button class="button" id="${cate.id}">${cate.name}</button>
			</li>
            `
        )
    }
}

function filtercate() {
    let btnall = document.querySelector(".btnall");
    let containerbutton = document.querySelectorAll(".button");


    btnall.addEventListener("click", async () => {
        let allinfo = await getallinfo();
        displayallworks(allinfo);
    })

    for (const btn of containerbutton) {
        btn.addEventListener("click", async () => {
            let allinfo = await getallinfo();
            let filterallinfo = allinfo.filter(info => info.categoryId == btn.id)

            displayallworks(filterallinfo);
        })
    }
}