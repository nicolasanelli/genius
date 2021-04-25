const menu = document.getElementById("menu")
const game = document.getElementById("game")
const plays = document.getElementById("plays")
const green = document.getElementById("green")
const red = document.getElementById("red")
const yellow = document.getElementById("yellow")
const blue = document.getElementById("blue")

const colors = [green, red, yellow, blue]

colors.forEach(color => {
  color.onmouseover = () => onMouseOver(color);
  color.onmousedown = () => onMouseDown(color);
  color.onmouseleave = () => onMouseLeave(color);
})

let memory;
let memory_pill;
let canPlay;
let totalPlays;

const onMouseOver = (color) => {
  if (canPlay)
    color.classList.add("hover")
}
const onMouseDown = (color) => {
  if (canPlay) {
    color.classList.add("active")
    setTimeout(() => color.classList.remove("active", "hover"), 100)
    const actual_color = memory_pill.shift();
    if (actual_color !== color) {
      gameOver();
    } else {
      if (memory_pill.length === 0) {
        setPlays(totalPlays + 1);
        nextPlay();
      }
    }
  }
}
const onMouseLeave = (color) => {
  color.classList.remove("hover")
  color.classList.remove("active")
}
const removeAllHover = () => {
  colors.forEach(color => {
    color.classList.remove("hover")
    color.classList.remove("active")
  });
}

const sleep = millis => new Promise((resolve) => {
  setTimeout(_ => resolve(), millis)
});

const blinkColor = async (color) => {
  color.classList.add("active");
  await sleep(625);
  color.classList.remove("active");
  await sleep(100);
}

const blinkAllColors = async () => {
  for (let i=0; i<memory.length; i++) {
    await blinkColor(memory[i])
  }
}

const pickRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}

const setPlays = (value) => {
  totalPlays = value;
  plays.innerHTML = value;
}

const nextPlay = async () => {
  canPlay = false;
  await sleep(500);
  removeAllHover();
  await sleep(1000);
  memory.push(pickRandomColor());
  memory_pill = [...memory]
  await blinkAllColors();
  canPlay = true;
}

const gameOver = () => {
  game.classList.add('disabled')
  alert(`Game Over: You made ${totalPlays} moves!`)
  menu.classList.remove('disabled')
}

const newGame = async() => {
  menu.classList.add('disabled')
  game.classList.remove('disabled')
  setPlays(0)
  memory = [];
  memory_pill = [];
  nextPlay();
}

