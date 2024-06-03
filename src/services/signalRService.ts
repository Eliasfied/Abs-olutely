import * as signalR from "@microsoft/signalr";
import config from "../config/config";
import { loginStore } from "@/store/authentication/loginStore";

export class SignalRService {
  private connection: signalR.HubConnection;

  constructor() {
    const logStore = loginStore();
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(config.signalRUrl, {
        accessTokenFactory: () => {
          return logStore.jwt as string;
        },
        withCredentials: true,
      })
      .build();
  }

  public async startConnection() {
    if (this.connection.state !== signalR.HubConnectionState.Disconnected) {
      console.log("Connection is already started");
      return;
    }

    try {
      await this.connection.start();
      console.log("SignalR Connected.");
    } catch (err) {
      console.log("Error while starting connection: ", err);
      // You might want to implement some retry logic here
    }
  }

  public sharedWorkoutListener(sharedSWorkoutCallback: () => void) {
    this.connection.on("WorkoutShared", sharedSWorkoutCallback);
  }
}
