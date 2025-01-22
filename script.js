
const accessKey = 'CUaUdrBYwJaoUh2qPr4MFW16ScxMjLscD0DPRzDa4BM';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const imageGallery = document.getElementById('image-gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-image');
const captionText = document.getElementById('caption');
const closeBtn = document.getElementsByClassName('close')[0];

async function fetchImages(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=9&client_id=${accessKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}


function displayImages(images) {
  imageGallery.innerHTML = '';
  images.forEach(image => {
    const imageItem = document.createElement('div');
    imageItem.classList.add('image-item');

    const img = document.createElement('img');
    img.src = image.urls.small;
    img.alt = image.alt_description || 'Unsplash Image';


    imageItem.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = image.urls.regular;
      captionText.textContent = image.alt_description || 'Unsplash Image';
    });

    imageItem.appendChild(img);
    imageGallery.appendChild(imageItem);
  });
}

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchImages(query);
  }
});


closeBtn.onclick = function () {
  modal.style.display = 'none';
}


modal.onclick = function (event) { //As if we click any where off the image the image should close
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}
