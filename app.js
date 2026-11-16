const API_URL = "https://official-joke-api.appspot.com/random_joke";

const jokeContent = document.querySelector("#joke-content");
const loadingState = document.querySelector("#loading-state");
const errorState = document.querySelector("#error-state");
const setupElement = document.querySelector("#joke-setup");
const punchlineElement = document.querySelector("#joke-punchline");
const typeElement = document.querySelector("#joke-type");
const newJokeButton = document.querySelector("#new-joke");
const buttonLabel = document.querySelector("#button-label");
const copyButton = document.querySelector("#copy-joke");
const copyFeedback = document.querySelector("#copy-feedback");

let currentJoke = null;

async function getJoke() {
  newJokeButton.disabled = true;
  copyButton.disabled = true;
  buttonLabel.textContent = "Finding a good one...";
  copyFeedback.textContent = "";
  jokeContent.hidden = true;
  errorState.hidden = true;
  loadingState.hidden = false;

  try {
    const response = await fetch(API_URL, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Joke API responded with ${response.status}`);
    }

    const joke = await response.json();
    if (!joke || typeof joke.setup !== "string" || typeof joke.punchline !== "string") {
      throw new Error("The joke API returned an unexpected response.");
    }

    currentJoke = joke;
    typeElement.textContent = (joke.type || "random joke").replaceAll("_", " ").toUpperCase();
    setupElement.textContent = joke.setup;
    punchlineElement.textContent = joke.punchline;
    loadingState.hidden = true;
    jokeContent.hidden = false;
    copyButton.disabled = false;
  } catch (error) {
    console.error("Could not load a joke:", error);
    currentJoke = null;
    loadingState.hidden = true;
    errorState.hidden = false;
  } finally {
    newJokeButton.disabled = false;
    buttonLabel.textContent = "Tell me another";
  }
}

newJokeButton.addEventListener("click", getJoke);

copyButton.addEventListener("click", async () => {
  if (!currentJoke) return;

  try {
    await navigator.clipboard.writeText(`${currentJoke.setup}\n\n${currentJoke.punchline}`);
    copyFeedback.textContent = "Joke copied!";
  } catch (error) {
    console.error("Could not copy the joke:", error);
    copyFeedback.textContent = "Copy isn’t available in this browser.";
  }
});

getJoke();
