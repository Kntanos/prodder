let timer = 0.1

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ timer });
  console.log(`Default prodder time interval is set to ${timer} minute`);

  chrome.alarms.create('reminder-alarm', {
    delayInMinutes: timer,
    periodInMinutes: 0.1
  });
});

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
    title: 'Time to check',
    message: "How's your posture?",
    priority: 2
  });
}

const clearNotification = () => {
  chrome.notifications.clear("posture-reminder")
}

chrome.action.setBadgeText({text: 'On'});
chrome.action.setBadgeBackgroundColor({color: '#4688F1'});