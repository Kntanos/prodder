let onButton = document.getElementById('on');
let offButton = document.getElementById('off');

const handleClickOff = () => {
    chrome.action.setBadgeText({text: 'Off'});
    chrome.alarms.clearAll()
}

const handleClickOn = () => {
    chrome.action.setBadgeText({text: 'On'});
    chrome.runtime.sendMessage({message: "turn on"});
  }

onButton.addEventListener('click', handleClickOn);
offButton.addEventListener('click', handleClickOff);
