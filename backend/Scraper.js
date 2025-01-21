const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.sarkariresult.com/';

const scrapeJobs = async () => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const jobs = [];
    console.log(data);

    $('.post').each((index, element) => {
      const title = $(element).find('.post-title').text().trim();
      const link = $(element).find('a').attr('href');
      const date = $(element).find('.post-date').text().trim();

      jobs.push({ title, link, date });
    });

    return jobs;
  } catch (error) {
    console.error('Error scraping jobs:', error);
    return [];
  }
};

module.exports = scrapeJobs;
