const inputNumber = document.getElementById('minutes');

const handleOnChange = (event) => {
  chrome.alarms.create('test-alarm', {
    periodInMinutes: parseInt(event.target.value)
  });
}

inputNumber.addEventListener('input', handleOnChange);