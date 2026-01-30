import amqp from "amqplib"; // default import
let connection;
let channel;
export async function connectRabbitMQ(url = "amqp://localhost") {
    connection = await amqp.connect(url); // Connection
    channel = await connection.createChannel(); // Channel
    return channel;
}
export function getChannel() {
    if (!channel)
        throw new Error("RabbitMQ channel not initialized");
    return channel;
}
export function getConnection() {
    if (!connection)
        throw new Error("RabbitMQ connection not initialized");
    return connection;
}
export async function closeRabbitMQ() {
    await channel?.close();
    await connection?.close();
}
