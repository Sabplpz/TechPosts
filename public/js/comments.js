const newCommentForm = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const cont = document.querySelector('#cont').value.trim();
    const post_id = document.getElementById('post-id').innerHTML;

    if (cont) {
      // Send the comment content
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ cont , post_id}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/posts/${post_id}`);
      } else {
        alert('Error!');
      }
    }
  };
  
  
  document
    .querySelector('.newcomment-form')
    .addEventListener('submit', newCommentForm);
  
  