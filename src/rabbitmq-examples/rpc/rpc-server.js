const amqp = require('amqplib');

const client_queue = 'rpc_queue';

async function consume() {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();

    let replyTo;
    let correlationId;
    const serverResponse = ' Server did very complex calculations';

    await channel.assertQueue(client_queue);
    console.log('Server is consuming...');

    await channel.prefetch(1);

    await channel.consume(client_queue, (message) => {
        //console.log(message);
        console.log(message.content.toString());

        //console.log('Message being requeue...')
        //channel.nack(message, false, true);
        replyTo = message.properties.replyTo;
        console.log(`Reply to: ${replyTo}`);
        correlationId = message.properties.correlationId;
        channel.ack(message);
    });

    console.log('Server is responding...');
    await channel.checkQueue(replyTo);
    await channel.publish('', replyTo,  Buffer.from(serverResponse),{
        correlationId
    });

}

consume().then();
