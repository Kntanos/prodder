let timer = 0.1 //in minutes

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ timer });
  console.log(`Default prodder time interval is set to 0.1 minute`);
  setAlarm()
});

const setAlarm = () => {
chrome.storage.sync.get(['timer'], (result) => {
  chrome.alarms.create('reminder-alarm', {
    delayInMinutes: result.timer,
    periodInMinutes: result.timer
  });
});
}

chrome.alarms.onAlarm.addListener(( alarm ) => {
  console.log("Got an alarm!", alarm);
  if (alarm.name === 'reminder-alarm') {
    displayNotification()
    setTimeout(clearNotification, 2000)
  } 
});

const displayNotification = () => { 
  chrome.notifications.create('posture-reminder', {
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'Time to check..',
    message: "How is your posture?",
    priority: 2
  });
}

const clearNotification = () => {
  chrome.notifications.clear("posture-reminder")
}

chrome.action.setBadgeText({text: 'On'});
chrome.action.setBadgeBackgroundColor({color: '#4688F1'});

chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.message === "update" || request.message === "turn on")
      console.log('Receieved a message')
      setAlarm();
  }
);