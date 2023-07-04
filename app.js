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
  this.container = element;
  this.list = [...element.querySelectorAll(".img")]; //ES6 Feature: [... the items that you want to copy and paste in array]
  // target
  this.modal = getElement(".modal");
  this.modalImg = getElement(".main-img");
  this.modalImages = getElement(".modal-img");
  this.closeBtn = getElement(".close-btn");
  this.nextBtn = getElement(".next-btn");
  this.prevBtn = getElement(".prev-btn");
  // self ref
  // let self = this; people uses this method a lot. but we are going to use bind() here.
  // bind functions
  // this.openModal = this.openModal.bind(this); //By using bind(), we can indicate Gallery so that we have access to its values.
  // container event
  this.container.addEventListener(
    "click",
    function (e) {
      this.openModal();
    }.bind(this)
  );
}

Gallery.prototype.openModal = function () {
  console.log(this);
  console.log("open modal");
  this.modal.classList.add("open");
};

const nature = new Gallery(getElement(".nature")),
  city = new Gallery(getElement(".city"));
