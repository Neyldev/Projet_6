
async function init() {
    let token = localStorage.getItem("auth");
    this.token = token;

    Privateornotprivate();

    let allinfo = await getallinfo();
    displayallworks(allinfo);

    let allcate = await getallcategories();
    Modaldisplayallcate(allcate)

    listevent();

    sendaddmodal();
    removefrommodal();

}

init();

function Privateornotprivate() {
    const Token = localStorage.getItem('auth');
    if (!Token) {
        window.location.href = "./index.html";
    }
}

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
    //page Admin
    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    //Modal Admin
    let imgProjets = document.querySelector(".gallery-modale");
    imgProjets.innerHTML = "";

    for (const info of allinfo) {
        //page Admin
        gallery.insertAdjacentHTML("beforeend",
            `
            <figure>
                <img src="${info.imageUrl}" alt="${info.title}">
                <figcaption>${info.title}</figcaption>
            </figure>
            `
        )
        //Modal Admin
        imgProjets.insertAdjacentHTML("beforeend",
            `
            <figure>
                <img src="${info.imageUrl}" alt="${info.title}">
                <i id="${info.id}" class="trash fa-solid fa-trash-can"></i>
            </figure>
            `
        );
    }
}

function Modaldisplayallcate(allcate) {
    let list = document.querySelector("#photoCategory")

    for (const cate of allcate) {
        list.insertAdjacentHTML("beforeend",
            `
				<option value="${cate.id}">${cate.name}</option>
            `
        )
    }
}


function listevent() {
    const openmodal = document.querySelectorAll(".js-modal")
    const modale1 = document.querySelector(".modale")
    const modalback = document.querySelector(".modalback");
    const div1 = document.querySelector(".step1");
    const div2 = document.querySelector(".step2");
    const gostep2 = document.querySelector(".AddPhoto");
    const gostep1 = document.getElementById("retourstep1");
    const btnfermermodale = document.getElementById("fermermodale");


    openmodal.forEach((modalBtn) => {
        modalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            modale1.style.display = "block";
            modalback.style.display = "block";
            div1.style.display = "block";
        });
    });

    gostep2.addEventListener("click", (e) => {
        e.preventDefault();
        div1.style.display = "none";
        div2.style.display = "block";
    })

    gostep1.addEventListener("click", (e) => {
        e.preventDefault();
        div1.style.display = "block";
        div2.style.display = "none";
    })
    modalback.addEventListener("click", (e) => {
        e.preventDefault();
        modale1.style.display = "none";
        div1.style.display = "none";
        div2.style.display = "none";
        modalback.style.display = "none";
        div2.style.display = "none";


        document.getElementById("ImageSend").value = "";
        document.getElementById("titre").value = "";
        document.getElementById("photoCategory").value = "";
        document.querySelector("#output").innerHTML = `
         <i class="fa-regular fa-image"></i>
        <button>
            <i class="fa-solid fa-plus"></i> Ajouter une photo
        </button>
        <p>jpg, png : 4mo max</p>
    `;


    })
    btnfermermodale.addEventListener("click", (e) => {
        e.preventDefault();
        modale1.style.display = "none";
        div1.style.display = "none";
        div2.style.display = "none";
        modalback.style.display = "none";
        div2.style.display = "none";


        //reset des champ du formulaire
        document.getElementById("ImageSend").value = "";
        document.getElementById("titre").value = "";
        document.getElementById("photoCategory").value = "";
        document.querySelector("#output").innerHTML = `
         <i class="fa-regular fa-image"></i>
        <button>
            <i class="fa-solid fa-plus"></i> Ajouter une photo
        </button>
        <p>jpg, png : 4mo max</p>
    `;

    })
}

const loadFile = function (event) {
    document.querySelector(".uploadImage").classList.add("previewImage");

    document.querySelector("#output").innerHTML = "<img src='" + URL.createObjectURL(event.target.files[0]) + "' alt='image' width='100%'>";

    let imagesend = document.querySelector("#ImageSend").files[0];
    this.imagesend = imagesend;
};

function btndisabled() {
    let title = document.getElementById("titre").value;
    let categorie = document.getElementById("photoCategory").value;
    let btnsendmodal = document.getElementById("AddWork");


    this.title = title;
    this.categorie = categorie;
    if (!imagesend || !title || !categorie) {
        btnsendmodal.disabled = true
    }
    else {
        btnsendmodal.disabled = false
    }
}



function sendaddmodal() {
    let btnsendmodal = document.querySelector("#AddWork");

    btnsendmodal.addEventListener("click", async function (event) {
        event.preventDefault();

        const tailleMax = 4 * 1024 * 1024;

        if (imagesend) {
            if (imagesend.size > tailleMax) {
                alert('Le fichier dépasse 4 Mo.');
                return;
            } else {

                let formdata = new FormData();
                formdata.append("image", imagesend);
                formdata.append("title", title);
                formdata.append("category", categorie);

                const response = await fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    },
                    body: formdata
                })

                if (response.status === 201) {
                    init();
                }
            }
        }
    });
}

function removefrommodal() {

    const poubelle = document.querySelectorAll(".trash");
    poubelle.forEach(trash => {

        trash.addEventListener("click", (e) => {
            e.preventDefault();

            const workId = trash.id;
            console.log(`j'ai cliqué sur la poubelle numero: ${workId}`);

            const Confirmation = confirm(`Attention vous allez supprimer cet élément`);
            if (Confirmation) {

                return fetch(`http://localhost:5678/api/works/${workId}`, {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
            }
        });
    });
}

const logoutbtn = document.querySelector(".logout")
const logoutUser = () => {
    window.localStorage.removeItem("auth")
    window.location.href = "./index.html";

}
logoutbtn.addEventListener("click", logoutUser)