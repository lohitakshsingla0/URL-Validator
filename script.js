// Debounce function
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Function to check if URL is valid
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// Function to simulate server request
function checkURLExistence(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const exists = Math.random() < 0.5;
      const type = exists ? (Math.random() < 0.5 ? 'file' : 'folder') : 'not found';
      resolve({ exists, type });
    }, 500);
  });
}

const inputElement = document.getElementById('urlInput');
const resultElement = document.getElementById('result');

const debouncedCheck = debounce(async function (url) {
  if (isValidURL(url)) {
    resultElement.textContent = 'Checking...';

    try {
      const response = await checkURLExistence(url);
      if (response.exists) {
        resultElement.textContent = `Website exists and it's a ${response.type}`;
      } else {
        resultElement.textContent = 'Website does not exist';
      }
    } catch (error) {
      resultElement.textContent = 'Error checking the website';
    }
  } else {
    resultElement.textContent = 'Not a valid website address';
  }
}, 500);

inputElement.addEventListener('input', function () {
  const enteredURL = inputElement.value.trim();
  debouncedCheck(enteredURL);
});
