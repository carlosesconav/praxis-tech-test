// src/serviceA.ts
import { connectRabbitMQ } from "@/infrastructure/queue/rabbitmq.js";

const QUEUE_NAME = "mi_cola"; // ← Nombre de la cola fija

export async function emitEvent(message: string) {
  const channel = await connectRabbitMQ(); // Conexión / Channel

  // Declarar la cola (asegurarnos que exista)
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  // Enviar mensaje directamente a la cola
  channel.sendToQueue(QUEUE_NAME, Buffer.from(message));

  console.log("Mensaje enviado a la cola:", QUEUE_NAME, "->", message);

  // No cerramos la conexión si vamos a enviar más mensajes
}
