const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    let email;
    try {
        ({ email } = JSON.parse(event.body));
    } catch {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email address' }) };
    }

    try {
        await resend.contacts.create({
            email,
            audienceId: process.env.RESEND_AUDIENCE_ID,
        });

        await resend.emails.send({
            from: 'Worlds Only <band@worldsonly.world>',
            to: email,
            subject: "Hello from Worlds Only",
            html: `<p>Welcome to W0`,
            text: `We'll send you updates about Worlds Only, leaks, links, etc.`,
        });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ok: true }),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: err?.message || JSON.stringify(err) }),
        };
    }
};
