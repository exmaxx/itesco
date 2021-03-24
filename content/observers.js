/**
 * Observes switching between separated pages (e.g. reservation -> products)
 * when most of the page is destroyed and recreated.
 */
function initContentObserver() {
  const contentEl = document.querySelector('#content')

  if (contentEl) {
    // TODO: Remove.
    contentEl.style.border = '2px solid red'

    const callback = (mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.classList?.contains('content-wrapper')) {
            disconnectMainContentObserver()
            connectMainContentObserver()

            disconnectProductListObserver()
            connectProductListObserver()

            highlightAll()
          }
        }
      }
    }

    const observer = new MutationObserver(callback)

    observer.observe(contentEl, {
      subtree: true,
      childList: true,
    })
  }
}

/**
 * Observes switching categories.
 */
function connectMainContentObserver() {
  const mainContentEl = document.querySelector('.main__content')

  if (mainContentEl) {
    mainContentEl.style.border = '2px solid blue'

    mainContentObserver.observe(mainContentEl, {
      childList: true,
    })
  }
}

function disconnectMainContentObserver() {
  mainContentObserver.disconnect()
}

/**
 * Observes selecting subcategories.
 */
function connectProductListObserver() {
  const productListEl = document.querySelector('.product-list')

  if (productListEl) {
    // TODO: Remove.
    productListEl.style.border = '2px solid pink'

    productListObserver.observe(productListEl, {
      attributeFilter: ['data-auto-last-updated'],
    })
  }
}

function disconnectProductListObserver() {
  productListObserver.disconnect()
}

function createMainContentObserver() {
  const callback = (mutations) => {
    for (const { type } of mutations) {
      if (type === 'childList') {
        disconnectProductListObserver()
        connectProductListObserver()

        highlightAll()
      }
    }
  }

  return new MutationObserver(callback)
}

function createProductListObserver() {
  const callback = (mutations) => {
    for (const { type } of mutations) {
      if (type === 'childList') {
        highlightAll()
      } else if (type === 'attributes') {
        highlightAll()
      }
    }
  }

  return new MutationObserver(callback)
}

let mainContentObserver = null
let productListObserver = null

/**
 * Entry point - init all!
 */
function initObservers() {
  mainContentObserver = createMainContentObserver()
  productListObserver = createProductListObserver()

  initContentObserver()

  connectMainContentObserver()
  connectProductListObserver()
}
