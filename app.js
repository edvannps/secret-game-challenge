let drawnNumbers = [];
let numberLimit = 10;
let secretNumber = generateRandomNumber();
let attempts = 1;
function displayTextOnScreen(tag, text) {
  let field = document.querySelector(tag);
  field.innerHTML = text;
  responsiveVoice.speak(text, "Brazilian Portuguese Female", { rate: 1.2 });
}

displayTextOnScreen("h1", "Jogo do número secreto");
displayTextOnScreen("p", "Escolha um número entre 1 e 10");

function checkKick() {
  let kick = parseInt(document.querySelector("input").value);

  if (kick == secretNumber) {
    displayTextOnScreen("h1", "Acertou!");
    let attemptWord = attempts > 1 ? "tentativas" : "tentativa";
    let attemptsText = `Você descobriu o número secreto com ${attempts} ${attemptWord}!`;
    displayTextOnScreen("p", attemptsText);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (kick > secretNumber) {
      displayTextOnScreen("p", "O número secreto é menor");
    } else {
      displayTextOnScreen("p", "O número secreto é maior");
    }
    attempts++;
    clearField();
  }
}

function generateRandomNumber() {
  let chosenNumber = parseInt(Math.random() * numberLimit + 1);
  let numberOfElementsInTheList = drawnNumbers.length;

  if (numberOfElementsInTheList === numberLimit) {
    drawnNumbers = [];
  }

  if (drawnNumbers.includes(chosenNumber)) {
    return generateRandomNumber();
  } else {
    drawnNumbers.push(chosenNumber);
    return chosenNumber;
  }
}

function clearField() {
  kick = document.querySelector("input");
  kick.value = "";
}

function restartGame() {
  secretNumber = generateRandomNumber();
  clearField();
  attempts = 1;
  displayTextOnScreen("h1", "Jogo do número secreto");
  displayTextOnScreen("p", "Escolha um número entre 1 e 10");
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
