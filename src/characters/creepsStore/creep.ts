import { TCreepMove } from ".";
import EventEmitter from "../../../util/eventEmitter";
import { TCoordinates, plane } from "../../../util/plane";

export type TCreepEvents = {
  move: TCreepMove;
  position: TCreepMove;
};

let maxCreep = 0;

type TBuff = "ATTACK_IMPROVED" | "DEFENSE_IMPROVED";

export class Creep extends EventEmitter<TCreepEvents> {
  private _currentHp: number;
  private _maxHp: number;
  private _movementSpeed: number;
  private _buffs: TBuff[] = [];
  private _size: number;
  private _position: TCoordinates = { x: 0, y: 0 };

  id = `creep${maxCreep++}`;

  constructor(maxHp: number, movementSpeed: number) {
    super();

    this._currentHp = maxHp;
    this._maxHp = maxHp;
    this._movementSpeed = movementSpeed;
    this._size = 0.6;
  }

  element: HTMLElement | null = null;
  el() {
    if (!this.element || !document.contains(this.element)) {
      this.element = document.getElementById(this.id);
      if (!this.element) throw new Error(`Can't find creep with id ${this.id}`);
    }

    return this.element;
  }

  init() {
    plane.setPosition(this.el(), this.position);
  }

  move(destination: TCoordinates) {
    this.position = destination;
    try {
      plane.move(this.el(), destination, this.movementSpeed);
    } catch (e) {}
  }

  // Setters and getters for currentHp
  set currentHp(value: number) {
    this._currentHp = value;
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
}
