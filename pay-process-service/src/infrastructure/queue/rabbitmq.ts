import amqp from "amqplib"; // default import
import type { Connection, Channel } from "amqplib"; // tipos

type Connection = any;
type Channel = any;    

let connection: Connection;
let channel: Channel;

export async function connectRabbitMQ(url = "amqp://localhost"): Promise<Channel> {
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