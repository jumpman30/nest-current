const amqp = require('amqplib');


async function consume() {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();

    await channel.checkQueue('pq-queue');

    console.log('Server is consuming...');

    await channel.prefetch(1);

    await channel.consume('pq-queue', (message) => {

        console.log('Message -> ' + message.content.toString());
        channel.ack(message);
    });

}

consume().then();
