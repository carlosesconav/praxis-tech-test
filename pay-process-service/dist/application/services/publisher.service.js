// src/serviceA.ts
import { connectRabbitMQ } from "@/infrastructure/queue/rabbitmq.js";
const EXCHANGE_NAME = "events";
export async function emitEvent(message) {
    const channel = await connectRabbitMQ(); // Channel
    // Declarar exchange tipo fanout (pub/sub)
    await channel.assertExchange(EXCHANGE_NAME, "fanout", { durable: false });
    // Publicar mensaje
    channel.publish(EXCHANGE_NAME, "", Buffer.from(message));
    console.log("Evento emitido:", message);
    // No cerramos la conexión si vamos a enviar más eventos
}
