// This script to be injected in the page and display a prod in the browser every some minutes

const displayProd = () => {
  let image = document.createElement("img");
  var imageURL = chrome.runtime.getURL("images/get_started128.png")
  image.src = imageURL;
  document.body.appendChild(image)
}