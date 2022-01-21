let onButton = document.getElementById('on');
let offButton = document.getElementById('off');

const handleClickOff = () => {
    chrome.action.setBadgeText({text: 'Off'});
    chrome.action.setBadgeBackgroundColor({color: '#9a0a31'});
    chrome.alarms.clearAll()
}

const handleClickOn = () => {
    chrome.action.setBadgeText({text: ''});
    chrome.action.setBadgeBackgroundColor({color: '#4688F1'});
    chrome.runtime.sendMessage({message: "turn on"});
  }

onButton.addEventListener('click', handleClickOn);
offButton.addEventListener('click', handleClickOff);
