import puppeteer from 'puppeteer'

async function main() {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  await page.goto(
    'https://www.kabum.com.br/hardware/placa-de-video-vga?page_number=1&page_size=20&facet_filters=&sort=most_searched'
  )

  const siteInfo = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.sc-d55b419d-11')).map(
      item => item.textContent
    )
  })

  console.log(siteInfo)

  await browser.close()
}

main()
