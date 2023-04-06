const amqp = require('amqplib');


async function publish(){

    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();

    //queue in default mode

    //create message exchange/queue and define dlx policy arguments
    await channel.assertExchange(
        'message-exchange',
        'direct',
    );

    await channel.assertQueue('message-queue', {
        durable: true
    });
    await channel.bindQueue('message-queue', 'message-exchange', 'message-key');

    console.log('Sending to messages queue...');
    for await (const x of Array.from({length: 1000000})){
        console.log(x);
        await channel.publish('message-exchange', 'message-key', Buffer.from('Test message'),
            {
                persistent: true
            }
         );

    }


}

publish().then();
