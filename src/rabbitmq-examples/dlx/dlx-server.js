const amqp = require('amqplib');


async function consume() {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();

    await channel.checkQueue('message-queue');

    console.log('Server is consuming...');

    await channel.prefetch(1);

    await channel.consume('message-queue', (message) => {

        console.log('Message -> ' + message.content.toString());
        console.log('Message is being reject...');
        channel.nack(message, false, false);
    });

}

consume().then();
