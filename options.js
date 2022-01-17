const inputNumber = document.getElementById('minutes');

const handleOnChange = (event) => {
  chrome.alarms.create('reminder-alarm', {
    periodInMinutes: parseInt(event.target.value)
  });
}

inputNumber.addEventListener('input', handleOnChange);