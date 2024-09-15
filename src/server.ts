import express, { Application } from "express";
import morgan from "morgan";
import { PORT } from "./config/conf";
import { connectDB } from "./db/config";
import cors from "cors";
import { sync } from "./db/sync";
import routes from "./export.routes";
class Server {
  private app: Application;
  public port: string | undefined;
  constructor() {
    this.app = express();
    this.port = PORT;
    this.middlewares();
    this.routes();
    this.dbConnect();
    this.syncDb();
    this.listen();
  }

  middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }
  async dbConnect(): Promise<void> {
    await connectDB();
  }

  async syncDb(): Promise<void> {
    await sync();
  }

  routes(): void {
    routes(this.app);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
