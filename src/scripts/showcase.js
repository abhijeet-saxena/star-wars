const showcase = document.querySelector(".showcase");
const prologue = document.querySelector(".prologue");
const banner = document.querySelector(".banner");
const crawl = document.querySelector(".crawl-text");
const stars = document.querySelector(".stars");
const themeSong = document.querySelector("audio");
const finishScroll = document.querySelector(".crawl-text .finish");

let scroll = 0;
let id = null;

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

const setDefaultScrollContent = (crawlObj) =>
  Object.keys(crawlObj).forEach((key) => (sessionStorage[key] = crawlObj[key]));

const generateStarBackground = () => {
  const starsCount = 100;
  let starsHTML = "";
  for (let i = 0; i < starsCount; i++) {
    let randomX = Math.floor(Math.random() * window.innerWidth);
    let randomY = Math.floor(Math.random() * window.innerHeight);
    starsHTML += `<span class="star" style="top: ${randomY}px; left: ${randomX}px"></span>`;
  }
  stars.innerHTML = starsHTML;
};

const getCrawlId = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.has("crawl") ? searchParams.get("crawl") : false;
};

const scrollFunction = () => {
  crawl.scroll({
    top: scroll,
    behavior: "smooth",
  });
  scroll += 0.4;

  if (scroll < crawl.scrollHeight) window.requestAnimationFrame(scrollFunction);
  else window.cancelAnimationFrame(id);
};

const startCrawl = () => {
  themeSong.play();
  prologue.style.animation = "fade-out 5000ms ease-in forwards";
  prologue.onanimationend = () => {
    generateStarBackground();
    themeSong.currentTime = "8.9";
    banner.style.display = "block";
    banner.style.animation = "zoom-out 12000ms 500ms ease-out forwards";

    setTimeout(
      () => (id = window.requestAnimationFrame(scrollFunction)),
      10000
    );
  };
};

window.onload = async () => {
  document.addEventListener("keyup", (event) => {
    if (event.key.toUpperCase() === "F") {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    }
  });

  document.addEventListener("mousewheel", (e) => e.preventDefault(), {
    passive: false,
  });

  document.addEventListener("touchstart", (e) => e.preventDefault(), {
    passive: false,
  });

  if (getCrawlId()) {
    console.log("Will make API call to get Data");
    //TODO: Connect with Database
    // If URL contains crawl ID then get data from
    //  backend and populate localstorage
  } else if (sessionStorage.length < 5) {
    setDefaultScrollContent({
      prologue: `<p>A long time ago in a galaxy far,
  </p><p>far away....</p>`,
      banner: "<p>Star </p><p>Wars</p>",
      episode: "<p>Episode IX</p>",
      title: "<p>The Rise of Skywalker</p>",
      para: `<p>The dead speak! The galaxy has heard a mysterious broadcast, a threat of REVENGE in the sinister voice of the late EMPEROR PALPATINE.
        </p><p>GENERAL LEIA ORGANA dispatches secret agents to gather intelligence, while REY, the last hope of the Jedi, trains for battle against the diabolical FIRST ORDER.
        </p><p>Meanwhile, Supreme Leader KYLO REN rages in search of the phantom Emperor, determined to destroy any threat to his power....</p>`,
    });
  }

  const crawlData = Object.keys(sessionStorage);
  crawlData.forEach((item) => {
    if (document.querySelector(`.${item}`) && sessionStorage[item]) {
      document.querySelector(`.${item}`).innerHTML = sessionStorage[item];
    }
  });

  startCrawl();

  //Used to stop the music when scroll ends
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        themeSong.currentTime = "78.0";
        themeSong.onended = () => stars.classList.add("fade");
        observer.unobserve(finishScroll);
      }
    });
  }, options);

  observer.observe(finishScroll);
};
