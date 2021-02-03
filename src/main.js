
const green = document.getElementById("green")
const red = document.getElementById("red")
const yellow = document.getElementById("yellow")
const blue = document.getElementById("blue")

green.onmouseover = () => green.classList.add("active");
green.onmouseleave = () => green.classList.remove("active");

red.onmouseover = () => red.classList.add("active");
red.onmouseleave = () => red.classList.remove("active");

yellow.onmouseover = () => yellow.classList.add("active");
yellow.onmouseleave = () => yellow.classList.remove("active");

blue.onmouseover = () => blue.classList.add("active");
blue.onmouseleave = () => blue.classList.remove("active");

const delay = millis => new Promise((resolve) => {
  setTimeout(_ => resolve(), millis)
});

const blinkColor = async (color) => {
  color.classList.add("active");
  await delay(1000);
  color.classList.remove("active");
  await delay(100);
}

const memory = [];
const memory_pill = []; 

const start = async() => {
  await delay(1000);
  memory.push(green);
  memory.push(red);
  memory.push(blue);
  memory.push(yellow);
  memory.push(green);
  memory.push(green);
  
  for (let i=0; i<memory.length; i++) {
    await blinkColor(memory[i])
  }
}

start();

