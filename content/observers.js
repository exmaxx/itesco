function initObservers() {
  const config = {
    childList: true,
    attributeFilter: ['data-auto-last-updated'],
  }

  const callback = (mutations) => {
    for (const { type } of mutations) {
      if (type === 'childList') {
        console.log('childList.')
        highlightAll()
      } else if (type === 'attributes') {
        console.log('Attributes.')
        highlightAll()
      }
    }
  }

  const mutationObserver = new MutationObserver(callback)

  const productListEl = document.querySelector('.product-list')
  const mainContentEl = document.querySelector('.main__content')

  if (!productListEl || !mainContentEl) return

  mutationObserver.observe(productListEl, config)
  mutationObserver.observe(mainContentEl, config)
}
