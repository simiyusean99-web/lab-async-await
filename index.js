/**
 * Fetches posts from the JSONPlaceholder API using async/await,
 * handles potential errors, and triggers the display function.
 */
async function fetchPosts() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    
    try {
        const response = await fetch(apiUrl);
        
        // Check if the network response was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const posts = await response.json();
        
        // Call the display function with the retrieved array of posts
        displayPosts(posts);
        
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        
        // Optionally display a user-friendly error message in the DOM
        const postList = document.getElementById('post-list');
        if (postList) {
            postList.innerHTML = `<li>Error loading posts. Please try again later.</li>`;
        }
    }
}

/**
 * Iterates through an array of posts and dynamically creates 
 * DOM elements to display each post inside the #post-list element.
 * 
 * @param {Array} posts - Array of post objects from the API
 */
function displayPosts(posts) {
    const postList = document.getElementById('post-list');
    
    // Clear out any existing content safely
    postList.innerHTML = '';
    
    posts.forEach(post => {
        // 1. Create a new <li> element
        const li = document.createElement('li');
        
        // 2. Create a new <h1> element for the title
        const h1 = document.createElement('h1');
        h1.textContent = post.title;
        
        // 3. Create a new <p> element for the body
        const p = document.createElement('p');
        p.textContent = post.body;
        
        // 4. Append h1 and p to the li tag
        li.appendChild(h1);
        li.appendChild(p);
        
        // 5. Append the completed li to the ul (#post-list)
        postList.appendChild(li);
    });
}

// Execute the fetch function when the script loads
fetchPosts();