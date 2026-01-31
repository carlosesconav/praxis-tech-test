import amqp from "amqplib";
import "dotenv/config";

const RABBITMQ_URL =
  process.env.RABBITMQ_URL || "amqp://guest:guest@rabbitmq:5672";
const QUEUE_NAME = "mi_cola";

const RETRY_DELAY_MS = 5000; // tiempo entre intentos

async function startConsumer() {
  while (true) {
    try {
      console.log("Intentando conectar a RabbitMQ...");

      // Conectar a RabbitMQ
      const connection = await amqp.connect(RABBITMQ_URL);
      const channel = await connection.createChannel();

      // Asegurarnos de que la cola exista
      await channel.assertQueue(QUEUE_NAME, { durable: true });

      console.log(`Conectado. Esperando mensajes en "${QUEUE_NAME}"...`);

      // Consumir mensajes
      channel.consume(
        QUEUE_NAME,
        (msg: any) => {
          if (msg) {
            const contenido = msg.content.toString();
            console.log("Mensaje recibido:", contenido);
            console.log("email sent successfully!");

            // Confirmar que el mensaje fue procesado
            channel.ack(msg);
          }
        },
        { noAck: false },
      );

      // Si llega aquí, salimos del loop
      break;
    } catch (error) {
      console.error(
        "Error conectando a RabbitMQ. Reintentando en 5s...",
        error,
      );

      // Esperar antes de reintentar
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
}

// Iniciar consumidor
startConsumer();
