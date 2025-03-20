const form = document.getElementById('postForm');
const feed = document.getElementById('post-feed');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const image = document.getElementById('imageInput').files[0];
  const caption = document.getElementById('captionInput').value;

  let postHTML = `<div class="bg-white rounded-lg shadow p-4 relative">`;

  if (image) {
    const imgURL = URL.createObjectURL(image);
    postHTML += `<img src="${imgURL}" alt="Uploaded image" class="rounded mb-4">`;
  }

  if (caption.trim() !== '') {
    postHTML += `<p class="text-gray-700">${caption}</p>`;
  }

  postHTML += `<button class="mt-4 text-red-600 hover:underline delete-post">Delete</button>`;
  postHTML += `</div>`;

  feed.insertAdjacentHTML('afterbegin', postHTML);
  form.reset();
});

// ✅ Add Delete functionality
feed.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-post')) {
    e.target.parentElement.remove();
  }
});
