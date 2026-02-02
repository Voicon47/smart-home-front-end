// export interface WebSocketMessage<T = unknown> {
//   type?: string;
//   payload?: T;
// }
type WebSocketCallback = (data: any) => void;

// type WebSocketCallback<T = unknown> = (data: WebSocketMessage<T>) => void;

class WebSocketService {
  private static instance: WebSocketService | null = null;
  private callbacks: Record<string, WebSocketCallback[]> = {};
  private socketRef: WebSocket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private timeout?: ReturnType<typeof setTimeout>;
  private messageQueue: any[] = [];

  private constructor() { }

  // Singleton accessor
  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  // Connect to WebSocket server
  public connect(url: string = 'wss://smart-home-back-end.onrender.com/ws'): void {
    if (this.socketRef) return;

    this.socketRef = new WebSocket(url);

    this.socketRef.onopen = () => {
      console.log('WebSocket connected');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      // Register the app connection
      const payload = { type: 'register', role: "frontend" };
      if (this.socketRef && this.isConnected)
        this.socketRef.send(JSON.stringify(payload));

      this.executeCallback('connect', null);
      /// send previously queued messages when connection is re-established
      while (this.messageQueue.length > 0) {
        this.sendMessage(this.messageQueue.shift());
      }
    };

    this.socketRef.onmessage = (e: MessageEvent) => {
      try {
        console.log('WebSocket message received:', e.data);
        const data = JSON.parse(e.data);
        this.executeCallback(data.type, data);
      } catch (err) {
        console.error('Invalid message:', e.data);
      }
    };

    this.socketRef.onerror = (e: Event) => {
      console.error('WebSocket error:', e);
      this.executeCallback('error', e);
    };

    this.socketRef.onclose = (e: CloseEvent) => {
      console.log('WebSocket closed:', e.code, e.reason);
      this.isConnected = false;
      this.socketRef = null;

      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 30000);
        this.timeout = setTimeout(() => {
          this.reconnectAttempts++;
          this.connect();
        }, delay);
      }
    };
  }

  // Disconnect
  public disconnect(): void {
    if (this.socketRef) {
      this.socketRef.close();
      this.socketRef = null;
      this.isConnected = false;
      if (this.timeout) clearTimeout(this.timeout);
    }
  }

  // Send message
  public sendMessage(data: any): boolean {
    if (this.socketRef && this.isConnected) {
      this.socketRef.send(JSON.stringify(data));
      return true;
    } else {
      this.messageQueue.push(data)
      return false;
    }

  }

  // Register callback
  public addCallbacks(messageType: string, callback: WebSocketCallback): void {
    if (!this.callbacks[messageType]) {
      this.callbacks[messageType] = [];
    }
    this.callbacks[messageType].push(callback);
  }

  // Remove callback
  public removeCallbacks(messageType: string, callback: WebSocketCallback): void {
    if (this.callbacks[messageType]) {
      this.callbacks[messageType] = this.callbacks[messageType].filter(
        cb => cb !== callback
      );
    }
  }

  // Execute callbacks
  private executeCallback(messageType: string, data: any): void {
    if (this.callbacks[messageType]) {
      this.callbacks[messageType].forEach(callback => callback(data));
    }
  }
}

export default WebSocketService.getInstance();
