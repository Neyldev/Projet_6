const token = window.localStorage.getItem("auth")
if (token) {
    window.location.href = "./index_admin.html";
}

function init() {

    document.querySelector("#log").addEventListener("submit", async function (event) {

        event.preventDefault();

        let formdata = PrepareForm(event);

        let tokeninfo = await fetchinfo(formdata);

        StoreToken(tokeninfo)

        setTimeout(() => {
            window.location.href = "./index_admin.html";
        }, 2000);
    })

    document.getElementById("forgotPassword").addEventListener("click", function (event) {
        event.preventDefault();

        alert("Mot de passe oublié? Veuillez contacter l'administrateur du site.");
    });


}

init()

function PrepareForm() {

    let email = document.querySelector("#Email").value;
    let mdp = document.querySelector("#pass").value;

    let formData = {
        email: email,
        password: mdp
    }

    return formData;
}

function fetchinfo(formdata) {

    return fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formdata)
    })
        .then((response) => {

            if (response.status == 200) {
                document.getElementById("message").textContent = "Connexion réussie!";
                return response.json();
            } else {
                document.getElementById("message").textContent = "Identifiants invalides. Veuillez réessayer.";
            }
        })
        .catch(() => {
            document.getElementById("message").textContent = "Le server ne réponds pas";
        })

}

function StoreToken(tokeninfo) {
    window.localStorage.setItem("auth", tokeninfo.token)
}