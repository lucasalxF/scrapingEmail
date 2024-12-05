const main = require('./services/scraper');

main().catch(err => console.error('Erro no App:', err));
