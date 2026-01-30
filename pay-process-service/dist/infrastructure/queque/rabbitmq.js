import * as amqp from "amqplib"; // namespace import
let connection;
let channel;
export async function connectRabbitMQ(url = "amqp://localhost") {
    // Primero conectamos (Connection)
    connection = await amqp.connect(url);
    // Luego creamos un canal (Channel)
    channel = await connection.createChannel();
    return channel; // Devuelve solo el Channel para publicar/consumir
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
