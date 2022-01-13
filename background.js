let timer = 1000

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ timer });
  console.log(`Default timer is set to ${timer}`);

  chrome.alarms.create('test-alarm', {
    delayInMinutes: 0.05,
    periodInMinutes: 0.1,
  });
});

chrome.alarms.onAlarm.addListener(( alarm ) => {
  console.log("Got an alarm!", alarm);
  if (alarm.name === 'test-alarm') {
    displaySomething()
  } 
});

const displaySomething = () => { 
  chrome.notifications.create('reminder', {
    type: 'basic',
    iconUrl: 'image.png',
    title: 'Don\'t forget!',
    message: 'Wake up, dude!',
    priority: 2
}, function(notificationId) {});
}