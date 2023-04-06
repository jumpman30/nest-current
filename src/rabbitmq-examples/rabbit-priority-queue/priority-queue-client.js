const amqp = require('amqplib');


async function publish(){

    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();

    //set policy in rabbitmq ctl: rabbitmqctl set_policy DLX ".*" '{"dead-letter-exchange":"dlx-exchange", "dead-letter-routing-key":"dlx-key"}' --apply-to queues

    //create dlx exchange and bind queue
    await channel.assertExchange(
        'pq-exchange',
        'direct'
    );

    await channel.assertQueue('pq-queue',
        {
            arguments: {
                "x-max-priority": 10
            }
        }
        );
    await channel.bindQueue('pq-queue', 'pq-exchange', 'pq-key');


    console.log('Sending to message queue...');
    await channel.publish('pq-exchange', 'pq-key', Buffer.from('Test message 1 - lower priority'), {
        priority: 3
    });
    await channel.publish('pq-exchange', 'pq-key', Buffer.from('Test message - max priority'), {
        priority: 11
    });

    const confirmation = await channel.wait;

    console.log(confirmation);

}

publish().then();
