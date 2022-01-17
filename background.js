let timer = 0.1

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ timer });
  console.log(`Default timer is set to ${timer}`);

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
  chrome.notifications.create('reminder', {
    type: 'basic',
    iconUrl: 'icon.png',
    // imageUrl: 'image.png', images do not show on Mac OS X
    title: 'Time to check',
    message: "How's your posture?",
    priority: 2
  });
}

const clearNotification = () => {
  chrome.notifications.clear("reminder")
}