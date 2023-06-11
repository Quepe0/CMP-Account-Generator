const axios = require('axios');
const cheerio = require('cheerio');
const config = require('./config/config.json')

const url = config.website_register_url;
axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const siteKey = $('.g-recaptcha').attr('data-sitekey');
    console.log('SITE KEY:', siteKey);
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
