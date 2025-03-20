const postForm = document.getElementById('postForm');
const postFeed = document.getElementById('post-feed');

postForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const fileInput = document.getElementById('imageUpload');
  const captionText = document.getElementById('caption').value.trim();
  const file = fileInput.files[0];

  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  const timeString = `${hours}:${minutes} ${ampm}`;

  const post = document.createElement('div');
  post.className = "bg-white w-full border border-gray-200 rounded-md overflow-hidden";

  // Build the post content
  let postContent = `<div class="p-4 text-sm text-gray-800">
                      <p class="font-semibold">chanceelwell</p>
                      <p class="mt-2">${captionText}</p>
                      <p class="mt-2 text-gray-500 text-xs">${timeString}</p>
                    </div>`;

  // If an image was uploaded, add it
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageTag = `<img src="${event.target.result}" alt="Uploaded Post" class="w-full object-cover">`;
      post.innerHTML = imageTag + postContent;
      postFeed.prepend(post);
      postForm.reset();
    };
    reader.readAsDataURL(file);
  } else {
    // No image, just text
    post.innerHTML = postContent;
    postFeed.prepend(post);
    postForm.reset();
  }
});
