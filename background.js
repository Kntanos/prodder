let timer = 10 //in minutes
let message = 'How is your posture?'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ timer });
  chrome.storage.sync.set({ message });
  console.log(`Default prodder time interval is set to ${timer} minutes`);
  console.log(`Default prodder message is set to: ${message}`);
  setAlarm();
});

const setAlarm = () => {
  chrome.storage.sync.get(['timer'], (result) => {
    chrome.alarms.create('reminder-alarm', {
      delayInMinutes: result.timer,
      periodInMinutes: result.timer
    });
    setTimeout(clearNotification, 2000);
  });
};

chrome.alarms.onAlarm.addListener(( alarm ) => {
  console.log("Got an alarm!", alarm);
  if (alarm.name === 'reminder-alarm') {
    displayNotification();
    setTimeout(clearNotification, 2000);
  };
});

const displayNotification = () => { 
  chrome.storage.sync.get(['message'], (result) => {
      chrome.notifications.create('posture-reminder', {
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Time to prod you:',
      message: result.message,
      priority: 2
    });
  });
};

const clearNotification = () => {
  chrome.notifications.clear("posture-reminder")
}

chrome.runtime.onMessage.addListener(
  (request) => {
    if (request.message === "change timer" || request.message === "turn on")
      console.log('Received time request')
      setAlarm();
  }
);

chrome.runtime.onMessage.addListener(
  (request) => {
    if (request.message === "change message")
      console.log('Received a new message')
      displayNotification();
  }
);