// export function displayMessage(message) {
//     return `<div class="message error">${message}</div>`;
// }

export function displayMessage(messageType, message, targetElement) {
    const element = document.querySelector(targetElement);

    element.innerHTML = `<div class="message ${messageType}">${message}</div>`;
}