async function highlightAll() {
  const orderDateText = await getOrderDate()

  highlightAllCallback(orderDateText)
}

function highlightAllCallback (orderDateText) {
  const orderDate = new Date(orderDateText)

  const dateEls = document.querySelectorAll('.dates')

  for (const dateEl of dateEls) {
    const match = dateEl.textContent.match(/(\d\d)..(\d\d)..(\d\d\d\d)$/)
    const [_, day, month, year] = match

    const saleDate = new Date(`${year}/${month}/${day}`)

    if (orderDate <= saleDate) {
      dateEl.style.backgroundColor = 'pink'
    } else {
      dateEl.style.textDecoration = 'line-through'
    }
  }
}
