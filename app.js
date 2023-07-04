function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallery(element) {
  this.list = [...element.querySelectorAll(".img")]; //ES6 Feature: [... the items that you want to copy and paste in array]
  console.log(this.list);
  // target
  this.modal = getElement(".modal");
  this.modalImg = getElement(".main-img");
  this.modalImages = getElement(".modal-img");
  this.closeBtn = getElement(".close-btn");
  this.nextBtn = getElement(".next-btn");
  this.prevBtn = getElement(".prev-btn");
}

const nature = new Gallery(getElement(".nature")),
  city = new Gallery(getElement(".city"));
