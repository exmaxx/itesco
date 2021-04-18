function getOrderDate() {
  const tile = document.querySelector('.context-card-date-tile')

  if (!tile) return null

  const day = tile.querySelector('.date')?.textContent
  const monthText = tile.querySelector('.month')?.textContent
  const month = normalizeMonth(monthText)
  const year = new Date().getFullYear()

  return `${year}/${month}/${day}`
}

function normalizeMonth(month) {
  const MONTHS_CZ = {
    led: '01',
    úno: '02',
    bře: '03',
    dub: '04',
    kvě: '05',
    čvn: '06',
    čvc: '07',
    srp: '08',
    zář: '09',
    říj: '10',
    lis: '11',
    pro: '12',
  }

  const MONTHS_EN = {
    led: '01',
    úno: '02',
    bře: '03',
    dub: '04',
    kvě: '05',
    čvn: '06',
    čvc: '07',
    srp: '08',
    zář: '09',
    říj: '10',
    lis: '11',
    pro: '12',
  }

  return MONTHS_CZ[month] || MONTHS_EN[month]
}
