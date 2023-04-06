const amqp = require('amqplib');

const client_queue = 'rpc_queue';

    async function request() {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        //By providing empty string in queue name the server creates a random named queue
        //This will be our replyTo queue unique for each client
        const {queue: replyTo} = await channel.assertQueue('');
        const correlationId = '4525UUID';

        await channel.assertQueue(client_queue);
        console.log('Sending to queue');
        //sending '' as the exchange will send directly to the queue named by the routing key
        channel.publish('', client_queue, Buffer.from('This is an rpc test'), {
            correlationId,
            replyTo,
        });

        console.log(`Reply to: ${replyTo}`);

        await channel.checkQueue(replyTo);
        await channel.consume(replyTo, (message) => {
            console.log(`Consuming message with correlationId = ${message.properties.correlationId}`)
            console.log(message.content.toString());
        })
    }

    request().then();




