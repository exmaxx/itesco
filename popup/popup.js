const switchEl = document.getElementById('is-override-used')
const orderDateEl = document.getElementById('order-date-override')

chrome.storage.sync.get('isOverridedUsed', ({ isOverridedUsed }) => {
  switchEl.checked = isOverridedUsed
  orderDateEl.disabled = !isOverridedUsed
})

chrome.storage.sync.get('orderDateOverride', ({ orderDateOverride }) => {
  orderDateEl.value = orderDateOverride
})

switchEl.addEventListener('input', onCheckboxChanged)
orderDateEl.addEventListener('input', onInputChanged)

function onCheckboxChanged(event) {
  const { checked } = event.target

  orderDateEl.disabled = !checked
  chrome.storage.sync.set({ isOverridedUsed: checked })
}

function onInputChanged(event) {
  chrome.storage.sync.set({ orderDateOverride: event.target.value })
}
