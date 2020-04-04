const prologue = document.querySelector(".prologue");
const banner = document.querySelector(".banner");
const crawl = document.querySelector(".crawl-text");
const themeSong = document.querySelector("audio");

const starsCount = 100;
let scroll = 0;
let id = null;

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

const getCrawlId = () => {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.has("crawl") ? searchParams.get("crawl") : false;
};

function scrollFunction() {
  crawl.scroll({
    top: scroll,
    behavior: "smooth",
  });
  scroll += 0.5;

  if (scroll < crawl.scrollHeight) window.requestAnimationFrame(scrollFunction);
  else window.cancelAnimationFrame(id);
}

const startCrawl = () => {
  // document.body.requestFullscreen().catch((err) => console.log(err));
  document.querySelector(".showcase").style.display = "block";
  themeSong.play();

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

function prepareCrawl(event) {
  event.preventDefault();
  const formData = new FormData(document.querySelector("form"));
  for (var [key, value] of formData.entries()) {
    let HTML = "";
    let bannerLines = value.trim().split("\n");

    bannerLines.forEach((element) => {
      if (element) HTML += `<p>${element}</p>`;
    });
    document.querySelector(`.${key}`).innerHTML = HTML;
  }
  document.querySelector(".prepare-crawl").style.display = "none";
  startCrawl();
}

window.onload = async () => {
  if (getCrawlId()) {
    console.log("Will make API call to get Data");
    //TODO: Connect with Database
  }
};

document.body.addEventListener("mousewheel", (e) => e.preventDefault(), {
  passive: false,
});
