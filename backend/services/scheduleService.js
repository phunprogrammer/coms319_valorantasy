const cron = require('node-cron');
const { scrapeStats } = require('./scraperService');

// cron.schedule('0 0 * * *', async () => {
//     try {
//         const id = 2004;
//         scrapeStats(id);
//         console.log('scrapeStats method executed successfully.');
//     } catch (error) {
//         console.error('Error executing scrapeStats method:', error);
//     }
// });