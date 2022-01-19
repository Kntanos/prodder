let toggleSwitch = document.getElementById('toggle');

const handleClick = () => {
  if (toggleSwitch.innerText == 'Turn off') {
    chrome.action.setBadgeText({text: 'Off'});
    toggleSwitch.innerText = "Turn on"
  } else {
    chrome.action.setBadgeText({text: 'On'});
    toggleSwitch.innerText = "Turn off"
  }
}

toggleSwitch.addEventListener('click', handleClick);
