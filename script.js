// so much empty
// Fetch and display posts
async function fetchPosts() {
const response = await fetch('https://jsonplaceholder.typicode.com/posts');
const posts = await response.json();

document.getElementById("postList").innerHTML = "";
posts.slice(0, 10).forEach(post => {
    document.getElementById("postList").innerHTML += ` <h2>${post.title}</h2> <p>${post.body}</p>`;
});
}
//task2
document.getElementById("fetchButton").addEventListener("click", fetchPosts);
const postForm = document.getElementById("postForm");
const formErrorDiv = document.getElementById("formError");
const formSuccessDiv = document.getElementById("formSuccess");

postForm.addEventListener("submit", function (event) {
  event.preventDefault();
  formErrorDiv.textContent = "";
  formSuccessDiv.textContent = "";

  const newPost = {
    title: document.getElementById("titleInput").value,
    body: document.getElementById("bodyInput").value,
    userId: 1
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost)
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (createdPost) {
      formSuccessDiv.textContent = "Post created: " + createdPost.title;
      postForm.reset();
    })
    .catch(function (error) {
      console.error("Error creating post:", error);
      formErrorDiv.textContent = "Error creating post.";
    });
});
//task3
