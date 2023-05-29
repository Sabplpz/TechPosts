const session = require("express-session");

const newCommentForm = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const cont = document.querySelector('#cont').value.trim();
    const user = session.getAttribute("id");

    if (cont) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ cont , user }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Error!');
      }
    }
  };
  
  
  document
    .querySelector('.newcomment-form')
    .addEventListener('submit', newCommentForm);
  
  