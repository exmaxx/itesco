function highlightAll() {
  // TOOD: Remove.
  console.log('highlightAll!')

  chrome.storage.sync.get('orderDate', ({ orderDate }) => {
    highlightAllCallback(orderDate)
  })
}

function highlightAllCallback (date) {
  // TOOD: Remove.
  console.log('highlightAllCallback!')

  const dateEls = document.querySelectorAll('.dates')

  for (const dateEl of dateEls) {
    const match = dateEl.textContent.match(/(\d\d)..(\d\d)..(\d\d\d\d)$/)
    const [_, day, month, year] = match

    const checkedDate = new Date(`${year}/${month}/${day}`)
    const orderDate = new Date(date)

    if (orderDate <= checkedDate) {
      dateEl.style.backgroundColor = 'pink'
    } else {
      dateEl.style.textDecoration = 'line-through'
    }
  }
}
