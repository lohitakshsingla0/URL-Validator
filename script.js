// Function to check if URL is valid
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// Dummy server call
function checkURLExistence(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const exists = Math.random() < 0.5; // Simulate existence randomly
      const type = exists ? (Math.random() < 0.5 ? 'file' : 'folder') : 'not found';
      resolve({ exists, type });
    }, 1000);
  });
}

const inputElement = document.getElementById('urlInput');
const resultElement = document.getElementById('result');

let currentURL = '';

inputElement.addEventListener('input', async function (event) {
  const enteredURL = event.target.value.trim();

  if (enteredURL !== currentURL) {
    currentURL = enteredURL;
    const urlToCheck = enteredURL; // Store the URL to check in case it changes during the async request

    if (isValidURL(urlToCheck)) {
      resultElement.textContent = 'Checking...';

      try {
        const response = await checkURLExistence(urlToCheck);

        // Check if the URL changed during the async request
        if (urlToCheck !== currentURL) {
          return; // If URL changed, don't update the UI with outdated response
        }

        if (response.exists) {
          resultElement.textContent = `URL is Valid and it's a ${response.type}`;
        } else {
          resultElement.textContent = 'URL does not exist';
        }
      } catch (error) {
        resultElement.textContent = 'Error checking URL';
      }
    } else if (urlToCheck === "") {
      resultElement.textContent = 'Enter the URL to Validate';
    } else {
      resultElement.textContent = 'Invalid URL';
    }
  }
});