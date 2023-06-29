const newPostForm = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const cont = document.querySelector('#cont').value.trim();
  const title = document.querySelector('#title').value.trim();

  if (cont && title) {
    // Send the post content
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, cont }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert('Error!');
    }
  }
};

const deletePost = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  const id = document.querySelector('#post-id').innerHTML;

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert('Error!');
  }

}


document
  .querySelector('.newpost-form')
  .addEventListener('submit', newPostForm);

document
  .querySelector('#delete')
  .addEventListener('click', deletePost);