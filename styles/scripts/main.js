const stars = document.querySelector(".stars");

const prepareCrawl = (event) => {
  event.preventDefault();
  const formData = new FormData(document.querySelector("form"));
  for (var [key, value] of formData.entries()) {
    let HTML = "";
    let bannerLines = value.trim().split("\n");

    bannerLines.forEach((element) => {
      if (element) HTML += `<p>${element}</p>`;
    });
    sessionStorage.setItem(key, HTML);
  }
  document.querySelector(".prepare-crawl").style.display = "none";
  window.location.href = "./showcase";
};

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

generateStarBackground();
