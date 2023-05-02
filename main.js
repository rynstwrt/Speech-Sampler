const textInput = document.querySelector("#text-input");
const submitButton = document.querySelector("#submit-button");

let playing;

submitButton.addEventListener("click", () =>
{
    if (playing) return;
    playing = true;

    const utterance = new SpeechSynthesisUtterance(textInput.value);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[3];
    speechSynthesis.speak(utterance);

    speechSynthesis.addEventListener("end", () =>
    {
        playing = false;
    });
});