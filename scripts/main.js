function prepareCrawl(event) {
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
}
