const inputNumber = document.getElementById('minutes');
const inputText = document.getElementById('text');

chrome.storage.sync.get(['message'], (result) => {
  inputText.setAttribute("value", result.message);
  });

chrome.storage.sync.get(['timer'], (result) => {
  inputNumber.setAttribute("value", result.timer);
  });

const handleOnInput = (event) => {
  chrome.storage.sync.get(['timer'], (result) => {
    result.timer = event.target.value
    let timer = parseInt(result.timer);

    chrome.storage.sync.set({ timer });

    chrome.runtime.sendMessage({message: "change timer"});
  });
  console.log(`Alarm time interval changed to ${event.target.value} minutes`);
};

const handleOnChange = (event) => {
  chrome.storage.sync.get(['message'], (result) => {
    result.message = event.target.value
    let message = result.message

    chrome.storage.sync.set({ message });

    chrome.runtime.sendMessage({message: "change message"});
  });
  console.log(`Notification message changed to ${event.target.value}`);
};


inputNumber.addEventListener('input', handleOnInput);
inputText.addEventListener('change', handleOnChange);