const inputNumber = document.getElementById('minutes');

const handleOnChange = (event) => {
  chrome.storage.sync.get(['timer'], (result) =>{
    result.timer = event.target.value
    let timer = parseInt(result.timer)

    chrome.storage.sync.set({ timer })

    chrome.runtime.sendMessage({message: "change timer"});
  });
  console.log(`Alarm time interval changed to ${event.target.value} minutes`)
}

inputNumber.addEventListener('input', handleOnChange);