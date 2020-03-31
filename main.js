const prologue = document.querySelector(".prologue");
const banner = document.querySelector(".banner");
const crawl = document.querySelector(".crawl-text");
const themeSong = document.querySelector("audio");

const starsCount = 50;
let scroll = 0;
let id = null;

function scrollFunction() {
  crawl.scroll({
    top: scroll,
    behavior: "smooth"
  });
  scroll += 0.5;

  if (scroll < crawl.scrollHeight) window.requestAnimationFrame(scrollFunction);
  else window.cancelAnimationFrame(id);
}

window.onload = () => {
  prologue.style.animation = "fade-out 5000ms ease-in forwards";
  prologue.onanimationend = () => {
    prologue.style.display = "none";
    themeSong.currentTime = "8.9";
    generateStarBackground();
    banner.style.display = "block";
    banner.style.animation = "zoom-out 12000ms 500ms ease-out forwards";

    setTimeout(() => {
      id = window.requestAnimationFrame(scrollFunction);
    }, 10000);
  };
};

const generateStarBackground = () => {
  let height = window.innerHeight;
  let width = window.innerWidth;
  let starsHTML = "";

  for (let i = 0; i < starsCount; i++) {
    let randomX = Math.floor(Math.random() * width);
    let randomY = Math.floor(Math.random() * height);
    starsHTML += `<span class="star" style="top: ${randomY}px; left: ${randomX}px"></span>`;
  }

  document.querySelector(".stars").innerHTML += starsHTML;
};
