// NOTE: This only works when `page_action.default_popup` is not specified.
// chrome.pageAction.onClicked.addListener((ev) => {})

chrome.runtime.onInstalled.addListener(async () => {
  const action = await new chrome.declarativeContent.SetIcon({
    path: {
      19: 'images/19.png',
      38: 'images/38.png',
    },
  })

  // NOTE: Hack. We wait for image data. See: https://stackoverflow.com/questions/28750081/cant-pass-arguments-to-chrome-declarativecontent-seticon
  for (let i = 0; i < 10; i++) {
    const checkAvailability = new Promise((resolve) => {
      setTimeout(() => resolve(!!action.imageData), 100)
    })

    const isAvailable = await checkAvailability

    if (isAvailable) break
  }

  const condition = new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { hostEquals: 'nakup.itesco.cz' },
  })

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [condition],
        actions: [new chrome.declarativeContent.ShowPageAction(), action],
      },
    ])
  })
})

// NOTE: Alternative solution with `chrome.tabs`.
// chrome.tabs.onUpdated.addListener(function (tabId, { status }, { url }) {
//   if (status !== 'complete') return
// 
//   const isOurPage = url?.match(/nakup\.itesco\.cz/)
// 
//   if (isOurPage) {
//     // NOTE: Needed when setting up the popup dynamically.
//     // chrome.pageAction.setPopup({ popup: 'popup/popup.html', tabId }, () => {
//     //   console.log('popup callback')
//     // })
// 
//     chrome.pageAction.setIcon({
//       path: {
//         19: 'images/19.png',
//         38: 'images/38.png',
//       },
//       tabId,
//     })
// 
//     chrome.pageAction.show(tabId)
//   } else {
//     chrome.pageAction.setIcon({
//       path: {
//         19: 'images/19-inactive.png',
//         38: 'images/38-inactive.png',
//       },
//       tabId,
//     })
// 
//     chrome.pageAction.hide(tabId)
//   }
// })
