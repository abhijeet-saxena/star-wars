const prologue = document.querySelector(".prologue");
const banner = document.querySelector(".banner");
const crawl = document.querySelector(".crawl-text");
const starsCount = 50;

window.onload = () => {
  let scroll = 0;
  //   let i = null;

  let id = setInterval(() => {
    crawl.scroll({
      top: scroll,
      behavior: "smooth"
    });
    scroll++;
    if (1000 < scroll) {
      clearInterval(id);
      console.log(crawl.getBoundingClientRect());
      console.log(scroll);
    }
  }, 16);

  //   prologue.style.animation = "fade-out 5000ms ease-in forwards";
  //   prologue.onanimationend = () => {
  //     prologue.style.display = "none";
  //     setTimeout(() => {
  //       banner.style.display = "block";
  //       generateStarBackground();
  //     }, 200);
  //   };
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
  document.body.innerHTML += starsHTML;
};
