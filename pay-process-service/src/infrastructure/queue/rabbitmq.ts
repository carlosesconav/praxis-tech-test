import amqp from "amqplib"; // default import
import type { Connection, Channel } from "amqplib"; // tipos

type Connection = any;
type Channel = any;    

let connection: Connection;
let channel: Channel;

const urlRabbit = process.env.RABBITMQ_URL;

export async function connectRabbitMQ(url = urlRabbit): Promise<Channel> {
  connection = await amqp.connect(url);   // Connection
  channel = await connection.createChannel(); // Channel
  return channel;
}

export function getChannel(): Channel {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  return channel;
}

export function getConnection(): Connection {
  if (!connection) throw new Error("RabbitMQ connection not initialized");
  return connection;
}

export async function closeRabbitMQ() {
  await channel?.close();
  await connection?.close();
}