const nodemailer = require('nodemailer');

async function sendEmail(destinatario, noticias) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const htmlNoticias = noticias.map(noticia => 
        `<li><a href="${noticia.link}" target="_blank">${noticia.titulo}</a></li>`
    ).join('');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: destinatario,
        subject: 'Últimas Notícias',
        html: `<h1>Confira as últimas notícias:</h1><ul>${htmlNoticias}</ul>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado para:', destinatario);
}

module.exports = sendEmail;
