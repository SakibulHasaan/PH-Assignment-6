const imagesArea = document.querySelector(".images");
const gallery = document.querySelector(".gallery");
const galleryHeader = document.querySelector(".gallery-header");
const searchBtn = document.getElementById("search-btn");
const sliderBtn = document.getElementById("create-slider");
const sliderContainer = document.getElementById("sliders");
// selected image

let allData = [];
let sliders = [];
let imageDetail = [];

//Enter to search
document.getElementById("search").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// This is my key
// const KEY = "14033761-2a929b025887a2ff47db07c31";

// show images
const showImages = (images) => {
  imagesArea.style.display = "block";
  gallery.innerHTML = "";
  // show gallery title
  galleryHeader.style.display = "flex";
  allData = [...images];
  images.forEach((image) => {
    let div = document.createElement("div");
    div.className = "col-lg-3 col-md-4 col-xs-6 img-item mb-2";
    div.innerHTML = ` <img id= "image-dbl" class="img-fluid img-thumbnail" alt="${image.tags}") onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}"  alt="${image.tags}">`;
    gallery.appendChild(div);
  });
  toggleSpinner();
};

const getImages = (query) => {
  const url = `https://pixabay.com/api/?key=14033761-2a929b025887a2ff47db07c31&q=${query}&image_type=photo&pretty=true;`;
  toggleSpinner();
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => showImages(data.hits))
    .catch((err) => console.log(err));
};

let slideIndex = 0;

const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle("added");
  let item = sliders.indexOf(img);

  imageDetail.push(allData.filter((item) => item.webformatURL === img)[0])

  // console.log(imageDetail);

  if (item === -1) {
    sliders.push(img);
  } else {
    // alert("Hey, Already added !");
    const index = sliders.indexOf(img);
    console.log("index :", index);
    if (index > -1) {
      sliders.splice(index, 1);
    }
  }
};

var timer;
let imageD = document.getElementById('image-detail');
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert("Select at least 2 image.");
    return;
  }
  const duration = document.getElementById("duration").value || 1000;
  if (duration < 0) {
    alert("Please provide a positive slider duration!");
  } else {
    // crate slider previous next area
    sliderContainer.innerHTML = "";
    const prevNext = document.createElement("div");
    prevNext.className =
            "prev-next d-flex w-100 justify-content-between align-items-center";
          prevNext.innerHTML = `
        <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
        <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>`;

    sliderContainer.appendChild(prevNext);
    document.querySelector(".main").style.display = "block";

    // hide image aria
    imagesArea.style.display = "none";

    sliders.forEach((slide) => {
      let item = document.createElement("div");
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100" src="${slide}" alt="">`;

      sliderContainer.appendChild(item);
    });

    let cardsArea = document.getElementById('cards')
    let imageD = document.getElementById('image-detail');
    // console.log(imageDetail);
    imageD.innerHTML= "";

    let div = document.createElement('div');
    div.classList.add("row", "no-gutters");
    imageD.appendChild(div);
    imageDetail.forEach(singleImageData => {
      let div2 = document.createElement('div');
      div2.innerHTML = `    
      <div class="col-md-4">
        <img src="${singleImageData.webformatURL}" class="" style="padding: 50% alt="...">
      </div>
    <div class="col-md-8">
      <div class="card-body">
          <p class="card-text">Likes: ${singleImageData.likes}</p>
          <p class="card-text">Comments: ${singleImageData.comments}</p>
          <p class="card-text">Downloads: ${singleImageData.downloads} </p>
        </div>
    </div>
    `
    div.appendChild(div2);
    })
    
    
    // console.log(sliders);
    changeSlide(0);
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
  }
};

imageD.innerHTML= "";

// change slider index
const changeItem = (index) => {
  changeSlide((slideIndex += index));
};

// change slide item
const changeSlide = (index) => {
  const items = document.querySelectorAll(".slider-item");
  if (index < 0) {
    slideIndex = items.length - 1;
    index = slideIndex;
  }

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach((item) => {
    item.style.display = "none";
  });

  items[index].style.display = "block";
};

searchBtn.addEventListener("click", function () {
  document.querySelector(".main").style.display = "none";
  clearInterval(timer);
  imageDetail.splice(0,imageDetail.length);
  const search = document.getElementById("search");
  getImages(search.value);
  sliders.length = 0;
});

sliderBtn.addEventListener("click", function () {
  createSlider();
});

//Toggle Spinner
const toggleSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.classList.toggle("d-none");
};
