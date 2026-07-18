import { Peer, DataConnection } from 'peerjs';

export type WerwolfMessage =
  | { type: 'ROLE'; role: string }
  | { type: 'GAME_OVER' };

export type ClientState = 'connecting' | 'waiting' | 'role' | 'error';

/**
 * Hook or class to manage the host's connections.
 * For simplicity, we'll expose a class-based HostManager.
 */
export class HostManager {
  private peer: Peer | null = null;
  public id: string | null = null;
  public connections: Map<string, DataConnection> = new Map();
  public players: { id: string; name: string }[] = [];

  constructor(
    private onReady: (id: string) => void,
    private onPlayerJoin: (players: { id: string; name: string }[]) => void,
  ) {
    this.peer = new Peer();
    this.peer.on('open', (id) => {
      this.id = id;
      this.onReady(id);
    });

    this.peer.on('connection', (conn) => {
      conn.on('data', (data: any) => {
        if (data.type === 'JOIN') {
          this.connections.set(conn.peer, conn);
          this.players.push({ id: conn.peer, name: data.name });
          this.onPlayerJoin([...this.players]);
        }
      });

      conn.on('close', () => {
        this.connections.delete(conn.peer);
        this.players = this.players.filter((p) => p.id !== conn.peer);
        this.onPlayerJoin([...this.players]);
      });
    });
  }

  public sendToAll(msg: WerwolfMessage) {
    this.connections.forEach((conn) => {
      conn.send(msg);
    });
  }

  public sendTo(peerId: string, msg: WerwolfMessage) {
    const conn = this.connections.get(peerId);
    if (conn) {
      conn.send(msg);
    }
  }

  public destroy() {
    this.peer?.destroy();
  }
}

export class ClientManager {
  private peer: Peer | null = null;
  private conn: DataConnection | null = null;

  constructor(
    private hostId: string,
    private playerName: string,
    private onStateChange: (state: ClientState) => void,
    private onMessage: (msg: WerwolfMessage) => void,
  ) {
    this.peer = new Peer();
    this.peer.on('open', () => {
      this.conn = this.peer!.connect(this.hostId);

      this.conn.on('open', () => {
        this.onStateChange('waiting');
        this.conn!.send({ type: 'JOIN', name: this.playerName });
      });

      this.conn.on('data', (data: any) => {
        this.onMessage(data as WerwolfMessage);
      });

      this.conn.on('close', () => {
        this.onStateChange('error');
      });
    });

    this.peer.on('error', () => {
      this.onStateChange('error');
    });
  }

  public destroy() {
    this.peer?.destroy();
  }
}
