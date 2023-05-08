const textArea = document.querySelector("#text-area");
const voiceSelect = document.querySelector("#voice-select");
const randVoiceButton = document.querySelector("#rand-voice-button");
const rateInput = document.querySelector("#rate-input");
const pitchInput = document.querySelector("#pitch-input");
const submitButton = document.querySelector("#submit-button");

let voices;
const voiceIndexes = {};

function populateVoiceList()
{
    if (typeof speechSynthesis === "undefined") return;

    voices = window.speechSynthesis.getVoices();

    for (let i = 0; i < voices.length; ++i)
    {
        const option = document.createElement("option");

        if (voices[i].lang !== "en-US") continue;

        voiceIndexes[voices[i].name.toUpperCase()] = i;
        option.textContent = voices[i].name.toUpperCase();

        option.setAttribute("data-lang", voices[i].lang);
        option.setAttribute("data-name", voices[i].name);

        voiceSelect.appendChild(option);
    }
}

function speak()
{
    const text = (textArea.value) ? textArea.value : "Hello World";
    const lines = text.split("\n");

    for (let i = 0; i < lines.length; ++i)
    {
        const utterance = new SpeechSynthesisUtterance(lines[i]);

        const voiceIndex = voiceIndexes[voiceSelect.value];
        utterance.voice = voices[voiceIndex];
        utterance.rate = rateInput.value;
        utterance.pitch = pitchInput.value;

        speechSynthesis.speak(utterance);
    }
}

function selectRandomVoice()
{
    const voiceKeys = Object.keys(voiceIndexes);
    const randomVoice = voiceKeys[Math.floor(Math.random() * voiceKeys.length)];

    const options = Array.from(voiceSelect.options);
    options.find(o => o.text === randomVoice).selected = true;
}

function init()
{
    populateVoiceList();

    if (typeof speechSynthesis !== "undefined"
        && speechSynthesis.onvoiceschanged !== undefined)
    {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }
}

submitButton.addEventListener("click", () => speak());
randVoiceButton.addEventListener("click", () => selectRandomVoice());

init();

