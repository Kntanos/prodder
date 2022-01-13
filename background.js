let timer = 1000

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ timer });
  console.log(`Default timer is set to ${timer}`);

  chrome.alarms.create('test-alarm', {
    delayInMinutes: 0.1,
    periodInMinutes: 0.2,
  });
});

chrome.alarms.onAlarm.addListener(( alarm ) => {
  console.log("Got an alarm!", alarm);
  if (alarm.name === 'test-alarm') {
    displayNotification()
    setTimeout(clearNotification, 2000)
  } 
});

const displayNotification = () => { 
  chrome.notifications.create('reminder', {
    type: 'basic',
    iconUrl: 'icon.png',
    // imageUrl: 'Lieko.png', images do not show on Mac OS X
    title: 'Just to remind you',
    message: 'Shoulders back',
    priority: 2
}, function(notificationId) {});
}

const clearNotification = () => {
  chrome.notifications.clear("reminder")
}