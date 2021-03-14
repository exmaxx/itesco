// NOTE: When programatically controlling showing page action (e.g. popup) on certail url or when certain CSS selector is present.
//   You must declare `background` rule in manifest and pass this file name.

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: "nakup.itesco.cz" },
//           }),
//         ],
//         actions: [new chrome.declarativeContent.ShowPageAction()],
//       },
//     ]);
//   });
// });
