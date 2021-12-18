import fs from "fs";
import chalk from "chalk";

function loadData(): [bigint, Packet] {
  const hex: string = fs.readFileSync("./inputs/16.txt", "utf8").trim();
  return Packet.parse(hex);
}

class PacketSection {
  start: bigint;
  end?: bigint;

  constructor(start: bigint, end?: bigint) {
    this.start = start;
    this.end = end;
  }

  sliceBigInt(value: bigint, bitLength: bigint): bigint {
    const v = this.end ? value >> (bitLength - this.end) : value;
    return v % (1n << ((this.end ?? bitLength) - this.start));
  }

  slice(value: Packet): bigint {
    return this.sliceBigInt(value.packetValue, value.packetLength);
  }

  length(value: Packet): bigint {
    return (this.end ?? value.packetLength) - this.start;
  }

  static Version = new PacketSection(0n, 3n);
  static Type = new PacketSection(3n, 6n);
  static Number = new PacketSection(6n);
  static OperatorLengthType = new PacketSection(6n, 7n);
  static OperatorLengthA = new PacketSection(7n, 22n);
  static OperatorLengthB = new PacketSection(7n, 18n);
  static OperatorSubpacketA(length: bigint) {
    return new PacketSection(22n + length);
  }
  static OperatorSubpacketB(length: bigint) {
    return new PacketSection(18n + length);
  }
}

class Packet {
  packetValue: bigint;
  packetLength: bigint;

  get version() {
    return PacketSection.Version.slice(this);
  }

  get type() {
    return PacketSection.Type.slice(this);
  }

  constructor(value: bigint, packetLength: bigint) {
    this.packetValue = value;
    this.packetLength = packetLength;
  }

  static parse(hex: string): [bigint, OperatorPacket | ValuePacket] {
    const bitValue = BigInt("0x" + hex);
    const bitLength = BigInt(hex.length * 4);
    return Packet.parseBigInt(bitValue, bitLength);
  }

  static parseBigInt(bitValue: bigint, bitLength: bigint): [bigint, OperatorPacket | ValuePacket] {
    if (bitValue > 2n ** bitLength) {
      throw new Error("Invalid packet");
    }
    const type = (bitValue >> (bitLength - 6n)) % 0b1000n;
    if (type === 4n) {
      const numPacket = new ValuePacket(bitValue, bitLength);
      return [
        numPacket.totalLength,
        new ValuePacket(bitValue >> (bitLength - numPacket.totalLength), numPacket.totalLength),
      ];
    }
    const numPacket = new OperatorPacket(bitValue, bitLength);
    return [
      numPacket.totalLength,
      new OperatorPacket(bitValue >> (bitLength - numPacket.totalLength), numPacket.totalLength),
    ];
  }
}

class ValuePacket extends Packet {
  constructor(value: bigint, packetLength: bigint) {
    super(value, packetLength);
  }

  get number() {
    let number = 0n;
    for (let i = 0n; i < 100n; i++) {
      const bit = (this.packetValue >> (this.packetLength - 11n - i * 5n)) % 0b100000n;
      number = number << 4n;
      number += bit % 0b10000n;
      if (bit === bit % 0b10000n) break;
    }
    return number;
  }

  get numberLength() {
    let length = 0n;
    for (let i = 0n; i < 100n; i++) {
      const bit = (this.packetValue >> (this.packetLength - 11n - i * 5n)) % 0b100000n;
      length = (i + 1n) * 5n;
      if (bit === bit % 0b10000n) break;
    }
    return length;
  }

  get totalLength() {
    return this.numberLength + 6n;
  }

  get versionSum() {
    return this.version;
  }
}

class OperatorType {
  static Add = 0n;
  static Sub = 1n;
  static Min = 2n;
  static Max = 3n;
  static Grt = 5n;
  static Lst = 6n;
  static Eq = 7n;
}

class OperatorPacket extends Packet {
  constructor(value: bigint, packetLength: bigint) {
    super(value, packetLength);
  }

  private _number: bigint | null = null;
  get number() {
    if (this._number !== null) return this._number;
    this._number = this.getNumber();
    return this._number;
  }

  getNumber(): bigint {
    const sub = this.subpackets[1];
    if (sub.length === 1) {
      return sub[0].number;
    }
    switch (this.type) {
      case OperatorType.Add:
        return sub.reduce((a, b) => a + b.number, 0n);
      case OperatorType.Sub:
        return sub.reduce((a, b) => a * b.number, 1n);
      case OperatorType.Min:
        return sub.reduce((a, b) => (b.number < a || a === -1n ? b.number : a), -1n);
      case OperatorType.Max:
        return sub.reduce((a, b) => (b.number > a || a === -1n ? b.number : a), -1n);
      case OperatorType.Grt:
        return sub[0].number > sub[1].number ? 1n : 0n;
      case OperatorType.Lst:
        return sub[0].number < sub[1].number ? 1n : 0n;
      case OperatorType.Eq:
        return sub[0].number === sub[1].number ? 1n : 0n;
      default:
        throw new Error(`Invalid operator type: ${this.type}`);
    }
  }

  get operatorLengthType() {
    if (this.type === 4n) return 0n;
    return PacketSection.OperatorLengthType.slice(this);
  }

  get operatorLength() {
    if (this.operatorLengthType === 0n) {
      return PacketSection.OperatorLengthA.slice(this);
    }
    return PacketSection.OperatorLengthB.slice(this);
  }

  private _subpackets: [length: bigint, packets: (OperatorPacket | ValuePacket)[]] | null = null;

  get subpackets(): [length: bigint, packets: (OperatorPacket | ValuePacket)[]] {
    if (!this._subpackets) {
      if (this.operatorLengthType === 0n) {
        const subpackets = [];
        let length = 0n;
        while (length < this.operatorLength) {
          const ps = PacketSection.OperatorSubpacketA(length);
          const [subpacketLength, subpacket] = Packet.parseBigInt(ps.slice(this), ps.length(this));
          subpackets.push(subpacket);
          length += subpacketLength;
        }
        this._subpackets = [length, subpackets];
      } else {
        const subpackets = [];
        let length = 0n;
        for (let i = 0n; i < this.operatorLength; i++) {
          const ps = PacketSection.OperatorSubpacketB(length);
          const [subpacketLength, subpacket] = Packet.parseBigInt(ps.slice(this), ps.length(this));
          subpackets.push(subpacket);
          length += subpacketLength;
        }
        this._subpackets = [length, subpackets];
      }
    }
    return this._subpackets!;
  }

  get totalLength() {
    return 7n + (this.operatorLengthType === 0n ? 15n : 11n) + this.subpackets[0];
  }

  get versionSum(): bigint {
    return (
      this.version + this.subpackets[1].reduce((sum, subpacket) => sum + subpacket.versionSum, 0n)
    );
  }
}

export function Part1() {
  const [_, packet] = loadData();

  const p = packet as OperatorPacket;
  console.log(chalk.red.bold`Answer: ${p.versionSum}`);
  if (p.versionSum !== 955n) throw new Error(`Wrong answer`);
}

export function Part2() {
  const [_, packet] = loadData();

  const p = packet as OperatorPacket;
  console.log(chalk.red.bold`Answer: ${p.number}`);
  if (p.number !== 158135423448n) throw new Error(`Wrong answer`);
}
