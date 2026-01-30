import amqp from "amqplib";

const RABBITMQ_URL = "amqp://localhost"; // Cambia si tienes otro host
const QUEUE_NAME = "mi_cola";

async function startConsumer() {
  try {
    // Conectar a RabbitMQ
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Asegurarnos de que la cola exista
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log(`Esperando mensajes en la cola "${QUEUE_NAME}"...`);

    // Consumir mensajes
    channel.consume(
      QUEUE_NAME,
      (msg: any) => {
        if (msg) {
          const contenido = msg.content.toString();
          console.log("Mensaje recibido:", contenido);

          // Aquí puedes ejecutar la lógica que quieras al recibir el evento

          // Confirmar que el mensaje fue procesado
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Error en RabbitMQ:", error);
  }
}

// Iniciar consumidor
startConsumer();
