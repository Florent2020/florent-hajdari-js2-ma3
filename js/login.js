import { strapiApi } from "./settings/api.js";
import { displayMessage } from "./ui/displayMessage.js";
import { saveToken, saveUser } from "./utils/localStorage.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message--container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length === 0 || passwordValue.length === 0) {
        displayMessage("warning", "Invalid values", ".message--container");
    }

    doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
    const strapiUrl = strapiApi + "auth/local";

    const data = JSON.stringify({ identifier: username, password: password });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    }

    try {
        const response = await fetch(strapiUrl, options);
        const json = await response.json();

        console.log(json);

        if (json.user) {

            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "/";
        }

        if (json.error) {
            displayMessage("warning", "Invalid login details", ".message--container");
        }

    } catch (error) {
        console.log(error);
    }
}