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
  this.imageName = getElement(".image-name");
  this.modalImages = getElement(".modal-images");
  this.closeBtn = getElement(".close-btn");
  this.nextBtn = getElement(".next-btn");
  this.prevBtn = getElement(".prev-btn");
  // self ref
  // let self = this; people uses this method a lot. but we are going to use bind() here.

  this.closeModal = this.closeModal.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.prevImage = this.prevImage.bind(this);
  // bind functions
  // this.openModal = this.openModal.bind(this); //By using bind(), we can indicate Gallery so that we have access to its values.
  // container event
  this.container.addEventListener(
    "click",
    function (e) {
      if (e.target.classList.contains("img")) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );
}

Gallery.prototype.openModal = function (selectedImage, list) {
  // console.log(selectedImage, list);
  this.setMainImage(selectedImage);
  this.modalImages.innerHTML = list
    .map(function (image) {
      return `<img src="${
        image.src
      }" title="${image.title}" class="${selectedImage.dataset.id === image.dataset.id ? "modal-img selected" : "modal-img"}" data-id="${image.dataset.id}" alt="${image.alt}">`;
    })
    .join("");
  this.modal.classList.add("open");
  this.closeBtn.addEventListener("click", this.closeModal);
  this.closeBtn.addEventListener("click", this.nextImage);
  this.closeBtn.addEventListener("click", this.prevImage);
};

Gallery.prototype.setMainImage = function (selectedImage) {
  this.modalImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove("open");
  this.closeBtn.removeEventListener("click", this.closeModal);
  this.closeBtn.removeEventListener("click", this.nextImage);
  this.closeBtn.removeEventListener("click", this.prevImage);
};
Gallery.prototype.prevImage = function () {
  console.log("empty for now");
};
Gallery.prototype.nextImage = function () {
  console.log("empty for now");
};

const nature = new Gallery(getElement(".nature")),
  city = new Gallery(getElement(".city"));
