import EventEmitter from "../../util/eventEmitter";
import { TCoordinates } from "../../util/plane";
import { TCharacterMove } from "./creepsStore";

export type TCharacterEvents = {
  die: null;
  mount: null;
  move: TCharacterMove;
  position: TCharacterMove;
};
export type TBuff = "ATTACK_IMPROVED" | "DEFENSE_IMPROVED";

export class Character extends EventEmitter<TCharacterEvents> {
  private _color: string;
  private _currentHp: number;
  private _maxHp: number;
  private _movementSpeed: number;
  private _buffs: TBuff[] = [];
  private _size: number;
  private _position: TCoordinates = { x: 0, y: 0 };

  constructor(protected _id: string, maxHp: number, movementSpeed: number, color: string) {
    super();

    this._color = color;
    this._currentHp = maxHp;
    this._maxHp = maxHp;
    this._movementSpeed = movementSpeed;
    this._size = 0.6;
  }

  get id() {
    return this._id;
  }

  // Setters and getters for currentHp
  set currentHp(value: number) {
    this._currentHp = value;
    if (value === 0) {
      this.emit("die", null);
    }
  }
  get currentHp(): number {
    return this._currentHp;
  }

  // Setters and getters for maxHp
  set maxHp(value: number) {
    this._maxHp = value;
  }
  get maxHp(): number {
    return this._maxHp;
  }

  // Setters and getters for movementSpeed
  set movementSpeed(value: number) {
    this._movementSpeed = value;
  }
  get movementSpeed(): number {
    return this._movementSpeed;
  }

  // Setters and getters for buffs
  set buffs(value: TBuff[]) {
    this._buffs = value;
  }
  get buffs(): TBuff[] {
    return this._buffs;
  }

  // Setters and getters for buffs
  set color(value: string) {
    this._color = value;
  }
  get color(): string {
    return this._color;
  }

  // Setters and getters for position
  set position(value: TCoordinates) {
    this._position = value;
  }
  get position(): TCoordinates {
    return this._position;
  }

  // Setters and getters for size
  set size(value: number) {
    this._size = value;
  }
  get size(): number {
    return this._size;
  }

  // Chainable setters
  setColor(value: string): this {
    this._color = value;
    return this;
  }

  // Chainable setters
  setCurrentHp(value: number): this {
    this.currentHp = value;
    return this;
  }

  setMaxHp(value: number): this {
    this.maxHp = value;
    return this;
  }

  setMovementSpeed(value: number): this {
    this.movementSpeed = value;
    return this;
  }

  setBuffs(value: TBuff[]): this {
    this.buffs = value;
    return this;
  }

  setPosition(value: TCoordinates): this {
    this.position = value;
    return this;
  }

  setSize(value: number): this {
    this.size = value;
    return this;
  }

  kill() {
    this.currentHp = 0;
  }
}
