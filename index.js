const inputElement = document.getElementById("input");
const infoTextElement = document.getElementById("info-text");
const meaningElement = document.getElementById("meaning-container");
const title = document.getElementById("title");
const meaning = document.getElementById("meaning");
const audioElement = document.getElementById("audio");

inputElement.addEventListener("keyup", (e) => {
  if (e.target.value && e.key == "Enter") {
    fetchAPI(e.target.value);
  }
});

async function fetchAPI(word) {
  try {
    meaningElement.style.display = "none";
    infoTextElement.style.display = "block";
    infoTextElement.textContent = `Searching the meaning of '${word}'...`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(url).then((res) => res.json());

    if (response.title) {
      infoTextElement.style.display = "block";
      infoTextElement.textContent = "No definitions for that word!";
      meaningElement.style.display = "none";
    } else {
      infoTextElement.style.display = "none";
      meaningElement.style.display = "block";
      title.innerText = response[0].word;
      meaning.innerText = response[0].meanings[0].definitions[0].definition;
      audioElement.src = response[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    meaningElement.style.display = "none";
    infoTextElement.style.display = "block";
    infoTextElement.textContent = "An error occurred, please try again later!";
  }
}
