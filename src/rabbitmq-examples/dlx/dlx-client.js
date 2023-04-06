const amqp = require('amqplib');


async function publish(){

    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createConfirmChannel();

    //set policy in rabbitmq ctl: rabbitmqctl set_policy DLX ".*" '{"dead-letter-exchange":"dlx-exchange", "dead-letter-routing-key":"dlx-key"}' --apply-to queues

    //create dlx exchange and bind queue
    await channel.assertExchange(
        'dlx-exchange',
        'direct'
    );

    await channel.assertQueue('dlx-queue');
    await channel.bindQueue('dlx-queue', 'dlx-exchange', 'dlx-key');

    //create message exchange/queue and define dlx policy arguments
    await channel.assertExchange(
        'message-exchange',
        'direct',
    );

    await channel.assertQueue('message-queue');
    await channel.bindQueue('message-queue', 'message-exchange', 'message-key');

    console.log('Sending to message queue...');
    await channel.publish('message-exchange', 'message-key', Buffer.from('Test message'),
        {
            //message will be dead-lettered after 2000 milliseconds
            expiration: 10000
        }
        );
    //slows down performance
    await channel.waitForConfirms();
}

publish().then();
