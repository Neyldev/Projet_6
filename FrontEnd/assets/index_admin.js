// verifier si le token et bon, si oui rien, sinon retour sur page index normal






async function init() {
    let allinfo = await getallinfo();

    displayallworks(allinfo);

    // let allcate = await getallcategories();

    displayImgProjets(allinfo);

    // chevron();

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




//////////////////////////////////////////////////////////////////////////////////////

/// modal ///
let modal = null;

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);


    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

/// modal ///

/// ajoute image dans modal

function displayImgProjets(allinfo) {
    let imgProjets = document.querySelector(".Img_projets");
    imgProjets.innerHTML = "";

    for (const info of allinfo) {
        imgProjets.insertAdjacentHTML("beforeend",
            `
                   <img src="${info.imageUrl}" alt="${info.title}">
               `
        );
    }
}



// function chevron() {
//     let chevron = document.querySelector(".js-chevron");
//     chevron.addEventListener("click", () => {
//         console.log("test");
//     });
// }

const Formulaire = document.querySelector('#Formulaire')
Formulaire.addEventListener('submit', addinfo)

function addinfo(e) {
    e.preventDefault();
    const formData = new FormData(Formulaire)

    const FormTitle = formData.get('photoTitle')
    const FormCate = formData.get('photoCategory')
    const FormImg = formData.get('plusAjouter')

    const tailleMax = 4 * 1024 * 1024;

    if (FormImg) {
        if (tailleMax.size > tailleMax) {
            alert('Le fichier dépasse 4 Mo.');
        } else {
            console.log('Le fichier est en dessous de 4 Mo.');


        }
    }


    console.log('Test', { FormTitle, FormCate, FormImg })
}
