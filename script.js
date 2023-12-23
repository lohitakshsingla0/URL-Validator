// Debounce function to delay the request
function debounce(func, delay) {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  // Checking URL if URL is valid or not
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
    //  response after 1 second
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

  inputElement.addEventListener('input', debounce(async function (event) {
    const enteredURL = event.target.value.trim();

    if (isValidURL(enteredURL)) {
      resultElement.textContent = 'Checking...';

      try {
        const response = await checkURLExistence(enteredURL);
        if (response.exists) {
          resultElement.textContent = `URL is Valid and it's a ${response.type}`;
        } else {
          resultElement.textContent = 'URL does not exist';
        }
      } catch (error) {
        resultElement.textContent = 'Error checking URL';
      }
    } else if(enteredURL== "")  {
      resultElement.textContent = 'Enter the URL to Validate';
    }else {
      resultElement.textContent = 'Invalid URL';
    }
  }, 500));
