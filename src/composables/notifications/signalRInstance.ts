import { SignalRService } from "@/services/signalRService";

let _signalRService: SignalRService | null = null;

export function getSignalRService() {
  if (!_signalRService) {
    _signalRService = new SignalRService();
  }
  return _signalRService;
}