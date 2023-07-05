function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

class Gallery {
  constructor(element) {
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
    this.chooseImage = this.chooseImage.bind(this);
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

  openModal(selectedImage, list) {
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
    this.nextBtn.addEventListener("click", this.nextImage);
    this.prevBtn.addEventListener("click", this.prevImage);
    this.modalImages.addEventListener("click", this.chooseImage);
  }

  setMainImage(selectedImage) {
    this.modalImg.src = selectedImage.src;
    this.imageName.textContent = selectedImage.title;
  }

  closeModal() {
    this.modal.classList.remove("open");
    this.closeBtn.removeEventListener("click", this.closeModal);
    this.nextBtn.removeEventListener("click", this.nextImage);
    this.prevBtn.removeEventListener("click", this.prevImage);
    this.modalImages.removeEventListener("click", this.chooseImage);
  }

  prevImage() {
    const selected = this.modalImages.querySelector(".selected");
    const prev =
      selected.previousElementSibling || this.modalImages.lastElementChild;
    selected.classList.remove("selected");
    prev.classList.add("selected");
    this.setMainImage(prev);
  }

  nextImage() {
    const selected = this.modalImages.querySelector(".selected");
    const next =
      selected.nextElementSibling || this.modalImages.firstElementChild;
    selected.classList.remove("selected");
    next.classList.add("selected");
    this.setMainImage(next);
  }

  chooseImage(e) {
    const chosenImage = e.target;
    const selected = this.modalImages.querySelector(".selected");

    if (e.target.classList.contains("modal-img")) {
      this.setMainImage(chosenImage);
      selected.classList.remove("selected");
      chosenImage.classList.add("selected");
    }
  }
}

const nature = new Gallery(getElement(".nature")),
  city = new Gallery(getElement(".city"));
