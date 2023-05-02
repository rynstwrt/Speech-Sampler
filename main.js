const textInput = document.querySelector("#text-input");
const submitButton = document.querySelector("#submit-button");

submitButton.addEventListener("click", () =>
{
    const utterance = new SpeechSynthesisUtterance(textInput.value);
    speechSynthesis.speak(utterance);
});