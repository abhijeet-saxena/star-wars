const prologue = document.querySelector(".prologue");
const banner = document.querySelector(".banner");
const crawl = document.querySelector(".crawl-text");
const themeSong = document.querySelector("audio");
const finishScroll = document.querySelector(".crawl-text .finish");

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

window.onload = async () => {
  document
    .querySelector(".showcase")
    .addEventListener("mousewheel", (e) => e.preventDefault(), {
      passive: false,
    });

  document
    .querySelector(".showcase")
    .addEventListener("touchstart", (e) => e.preventDefault(), {
      passive: false,
    });

  if (getCrawlId()) {
    console.log("Will make API call to get Data");
    //TODO: Connect with Database
  } else {
    const crawlData = Object.keys(sessionStorage);

    crawlData.forEach((item) => {
      if (document.querySelector(`.${item}`)) {
        document.querySelector(`.${item}`).innerHTML = sessionStorage[item];
      }
    });

    startCrawl();

    const options = {
      root: document.querySelector(".body"),
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          themeSong.currentTime = "78.0";
          themeSong.onended = () => {
            document.querySelector(".stars").classList.add("fade");
          };
          observer.unobserve(finishScroll);
        }
      });
    }, options);

    observer.observe(finishScroll);
  }
};
