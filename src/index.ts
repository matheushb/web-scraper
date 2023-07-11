//informar um array de sites e retornar um array de precos.

import puppeteer from 'puppeteer'

const sites = [
  'https://www.kabum.com.br/produto/432715/placa-de-video-rtx-3060-ti-dual-oc-asus-nvidia-geforce-8-gb-gddr6x-dlss-ray-tracing-dual-rtx3060ti-o8gd6x', //258999
  'https://www.kabum.com.br/produto/468963/placa-de-video-rtx-4060-oc-edition-dual-asus-nvidia-geforce-8gb-gddr6-dlss-ray-tracing-dual-rtx4060-o8g', //259999
  'https://www.kabum.com.br/produto/164854/placa-de-video-rtx-3060-asus-dual-o12g-v2-nvidia-geforce-12gb-gddr6-lhr-dlss-ray-tracing-dual-rtx3060-o12g-v2', //206999
  'https://www.kabum.com.br/produto/270812/placa-de-video-gtx-1660-ti-o6g-evo-oc-asus-tuf-gaming-nvidia-geforce-6gb-gddr6-preto-tuf-gtx1660ti-o6g-evo-gaming', //159999
]

const searchWords = ['rtx', '3060', 'gtx', '1060', '1660', '4060', 'ti', 'asus', 'gddr6', 'gddr6x']

const main = async (urlArr: Array<string>) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const priceArr = new Array()

  for (let url of urlArr) {
    await page.goto(url)

    priceArr.push(
      await page
        .evaluate(() => document.querySelector('h4')?.innerHTML)
        .then(price => {
          return {
            title: url
              .split('/')
              .pop()
              ?.split('-')
              .map(word => {
                if (searchWords.includes(word)) return word
              })
              .join(''),
            price: Number(price?.match(/[\d]+/g)?.join('')) / 100,
            url,
          }
        })
    )
  }
  console.log(priceArr)

  await browser.close()
  return priceArr
}

main(sites)
