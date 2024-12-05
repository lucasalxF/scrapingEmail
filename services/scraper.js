require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const sendEmail = require('./SendEmail');

const url = 'https://www.nytimes.com/section/world';

async function fetchNews() {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const noticias = [];

    $('.css-1l4spti a').each((i, el) => {
        const titulo = $(el).text().trim();
        const link = $(el).attr('href');
        noticias.push({
            titulo,
            link: link.startsWith('http') ? link : `https://www.nytimes.com${link}`,
        });
    });

    return noticias;
}

async function main() {
    const destinatario = 'luquinhasaff@gmail.com'; // Atualize o destinatário
    const noticias = await fetchNews();

    if (noticias.length > 0) {
        await sendEmail(destinatario, noticias);
        console.log('E-mail enviado com sucesso!');
    } else {
        console.log('Nenhuma notícia encontrada.');
    }
}

// Exporte a função main para uso no app.js
module.exports = main;
