async function getOrderDate() {
  let date = null

  const isOverrideUsed = await getIsOverrideUsed()

  if (isOverrideUsed) {
    date = await getOrderDateOverride()
  }

  if (!date) {
    date = getOrderDateNormal()
  }

  return date || null
}

function getIsOverrideUsed() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('isOverridedUsed', ({ isOverridedUsed }) => {
      resolve(isOverridedUsed)
    })
  })
}

function getOrderDateOverride() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('orderDateOverride', ({ orderDateOverride }) => {
      resolve(orderDateOverride)
    })
  })
}

function getOrderDateNormal() {
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
