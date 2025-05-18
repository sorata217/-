const addButton = document.getElementById("textbutton");
const startButton = document.getElementById("start");
const textInput = document.getElementById("text");
const memoDiv = document.querySelector(".memo");
const testDiv = document.querySelector(".test");

let wordList = [];        // 全体のメモ（常に最新状態）
let currentList = [];     // 今の表示用
let currentWord = "";     // 現在表示してる単語

function updateMemo() {
    memoDiv.innerHTML = "";
    wordList.forEach(word => {
        const p = document.createElement("p");
        p.textContent = word;
        memoDiv.appendChild(p);
    });
}

addButton.addEventListener("click", () => {
    const word = textInput.value.trim();
    if (word) {
        wordList.push(word);
        updateMemo();
        textInput.value = "";
    }
});

function showWord() {
    testDiv.innerHTML = "";

    if (currentList.length === 0) {
        testDiv.innerHTML = `<h1 class="end">終了</h1>`;
        return;
    }

    const index = Math.floor(Math.random() * currentList.length);
    currentWord = currentList[index];

    const wordElement = document.createElement("h2");
    wordElement.textContent = currentWord;
    wordElement.style.textAlign = "center";

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.gap = "30px";
    buttonContainer.style.marginTop = "20px";

    const correctButton = document.createElement("button");
    correctButton.textContent = "○";
    correctButton.addEventListener("click", () => {
        currentList = currentList.filter(word => word !== currentWord);
        wordList = wordList.filter(word => word !== currentWord);
        updateMemo();
        showWord();
    });

    const wrongButton = document.createElement("button");
    wrongButton.textContent = "×";
    wrongButton.addEventListener("click", () => {
        currentList = currentList.filter(word => word !== currentWord);
        showWord();
    });

    buttonContainer.appendChild(correctButton);
    buttonContainer.appendChild(wrongButton);

    testDiv.appendChild(wordElement);
    testDiv.appendChild(buttonContainer);
}

startButton.addEventListener("click", () => {
    currentList = [...wordList]; // コピーして使う
    showWord();
});
