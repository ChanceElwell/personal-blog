import posts from './posts.json';

console.log('feed.js loaded');

const postFeed = document.getElementById('post-feed');

// Render posts with .post-item class for snapping
posts.forEach(post => {
  const postElement = document.createElement('div');
  postElement.className = 'post-item bg-white w-full border border-gray-200 rounded-md overflow-hidden p-8';

  const textContent = document.createElement('div');
  textContent.className = 'text-lg text-gray-800 text-center';

  const username = document.createElement('p');
  username.className = 'font-semibold mb-4';
  username.textContent = post.username;
  textContent.appendChild(username);

  const caption = document.createElement('p');
  caption.className = '';
  caption.textContent = post.caption;
  textContent.appendChild(caption);

  postElement.appendChild(textContent);
  postFeed.appendChild(postElement);
});

// Intersection Observer to animate posts in
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.5 });

// Observe each post
document.querySelectorAll('.post-item').forEach(item => {
  observer.observe(item);
});
