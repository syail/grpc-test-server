import { Server, ServerCredentials } from "@grpc/grpc-js";
import "dotenv/config";
import { GreeterServer, GreeterService } from "./proto/test";

const LISTENING_ADDRESS = process.env.LISTENING_ADDRESS || "localhost:8080";

main();

function main() {
  const server = new Server();

  const serviceImpl: GreeterServer = {
    sayHello: (call, callback) => {
      const name = call.request.name;
      callback(null, { message: `Hello, ${name}!` });
    },
  };
  server.addService(GreeterService, serviceImpl);

  server.bindAsync(
    LISTENING_ADDRESS,
    ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Server is running at ${LISTENING_ADDRESS}`);
    }
  );
}
