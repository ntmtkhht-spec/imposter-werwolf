import { Peer, DataConnection } from 'peerjs';

/** A selectable player as sent to clients (no role information!). */
export type Candidate = { index: number; name: string };

export type NightStepKind = 'werewolf' | 'seer' | 'witch' | 'hunter';

/** Extra context for the witch's turn. */
export type WitchContext = {
  victimName: string | null;
  canHeal: boolean;
  canPoison: boolean;
};

/** Messages sent from the host to clients. */
export type HostMessage =
  | { type: 'ROLE'; role: string }
  | { type: 'PHASE'; phase: 'night' | 'day' | 'result'; night?: number; winner?: 'village' | 'werewolves' }
  | { type: 'YOUR_TURN'; step: NightStepKind; candidates: Candidate[]; witch?: WitchContext }
  | { type: 'TURN_ENDED'; step: NightStepKind }
  | { type: 'SEER_RESULT'; name: string; role: string }
  | { type: 'YOU_DIED' }
  | { type: 'GAME_OVER' };

/** Messages sent from a client to the host. */
export type ClientMessage =
  | { type: 'JOIN'; name: string }
  | {
      type: 'ACTION';
      step: NightStepKind;
      target?: number;
      witch?: { heal: boolean; poisonTarget: number | null };
    };

export type WerwolfMessage = HostMessage | ClientMessage;

export type ClientState = 'connecting' | 'waiting' | 'role' | 'error';

export class HostManager {
  private peer: Peer | null = null;
  public id: string | null = null;
  public connections: Map<string, DataConnection> = new Map();
  public players: { id: string; name: string }[] = [];
  /** Set by the game screen to receive night actions from clients. */
  public onAction: ((peerId: string, msg: Extract<ClientMessage, { type: 'ACTION' }>) => void) | null =
    null;

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
      conn.on('data', (data: unknown) => {
        const msg = data as ClientMessage;
        if (msg.type === 'JOIN') {
          this.connections.set(conn.peer, conn);
          this.players.push({ id: conn.peer, name: msg.name });
          this.onPlayerJoin([...this.players]);
        } else if (msg.type === 'ACTION') {
          this.onAction?.(conn.peer, msg);
        }
      });

      conn.on('close', () => {
        this.connections.delete(conn.peer);
        this.players = this.players.filter((p) => p.id !== conn.peer);
        this.onPlayerJoin([...this.players]);
      });
    });
  }

  public sendToAll(msg: HostMessage) {
    this.connections.forEach((conn) => {
      conn.send(msg);
    });
  }

  public sendTo(peerId: string, msg: HostMessage) {
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
    private onMessage: (msg: HostMessage) => void,
  ) {
    this.peer = new Peer();
    this.peer.on('open', () => {
      this.conn = this.peer!.connect(this.hostId);

      this.conn.on('open', () => {
        this.onStateChange('waiting');
        this.send({ type: 'JOIN', name: this.playerName });
      });

      this.conn.on('data', (data: unknown) => {
        this.onMessage(data as HostMessage);
      });

      this.conn.on('close', () => {
        this.onStateChange('error');
      });
    });

    this.peer.on('error', () => {
      this.onStateChange('error');
    });
  }

  public send(msg: ClientMessage) {
    this.conn?.send(msg);
  }

  public destroy() {
    this.peer?.destroy();
  }
}
