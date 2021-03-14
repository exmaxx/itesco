const orderDate = document.getElementById('order-date')
console.log(orderDate)

chrome.storage.sync.get('orderDate', (data) => {
  orderDate.value = data.orderDate
})

orderDate.addEventListener('input', (event) => {
  console.log('changed!')
  // NOTE: This is in context of popup.html (not the actual tab HTML)
  // document.body.style.backgroundColor = 'pink'

  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //   chrome.tabs.executeScript(tabs[0].id, {
  //     // NOTE: This runs in context of actual tab HTML
  //     // code: 'document.body.style.backgroundColor = "blue";',
  //     file: 'highlight.js'
  //   });
  // });

  chrome.storage.sync.set({ orderDate: event.target.value });
  console.log(event.target.value);
})
