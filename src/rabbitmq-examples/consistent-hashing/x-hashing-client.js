const amqp = require('amqplib');
const {log} = require("util");

const queue1 = 'x_queue_1';
const queue2 = 'x_queue_2';
const queue3 = 'x_queue_3';
const exchange = 'message-exchange';

async function publish() {


    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();

    //creating specific exchange
    await channel.assertExchange(
        'message-exchange',
        'x-consistent-hash',
        {durable: true}
    );

    await channel.assertQueue(queue1);
    await channel.assertQueue(queue2);
    await channel.assertQueue(queue3);
    //binding queue to exchange with a weight (aka: routing key)
    //this weight will be compared to hash(key of message) at the time of publishing
    await channel.bindQueue(queue1, exchange, '1');
    await channel.bindQueue(queue2, exchange, '1');
    await channel.bindQueue(queue3, exchange, '1');


    let counter = 0;
    Array.from({length: 100}, () => {
        channel.publish(exchange, counter.toString() , Buffer.from('This is a test message'));
        counter++;
    });
}

publish().then();
