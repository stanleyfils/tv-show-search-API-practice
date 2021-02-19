const form = document.querySelector('#searchForm');
const input = document.querySelector('#input'); // added this to point to the input on the HTML
form.addEventListener('submit', async function (e) {
  try {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    input.addEventListener('change', clearImages); //adding the clearImages function so that immiedately after a serchTerm is entered, any current images are removed.
    const config = { params: { q: searchTerm } }; // every key value pair in this object will be passed into the API search string.
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    makeImages(res.data);
    form.elements.query.value = ''; // clears the search box after submit
  } catch (err) {
    console.log('Oops, something went wrong', err);
  }
});

// this function creates the image
const makeImages = (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      const img = document.createElement('IMG');
      img.src = result.show.image.medium;
      document.body.append(img);
    }
  }
};

// this function removes the images from the browser
const clearImages = () => {
  const imgs = document.querySelectorAll('img');
  for (let img of imgs) {
    img.remove(); // easiest way is to use the remove() method.
  }
};
