import fs from "fs";
import chalk from "chalk";

function loadData(): [bigint, Packet] {
  const hex: string = fs.readFileSync("./inputs/16.txt", "utf8").trim();
  return Packet.parse(hex);
}

class Packet {
  packetValue: bigint;
  packetLength: bigint;

  get version() {
    return this.packetValue >> (this.packetLength - 3n);
  }

  get type() {
    return (this.packetValue >> (this.packetLength - 6n)) % 0b1000n;
  }

  constructor(value: bigint, packetLength: bigint) {
    this.packetValue = value;
    this.packetLength = packetLength;
  }

  static parse(hex: string): [bigint, OperatorPacket | ValuePacket] {
    const bitValue = BigInt("0x" + hex);
    const bitLength = BigInt(hex.length * 4);
    return Packet.parseBigInt(bitValue, bitLength, true);
  }

  static parseBigInt(
    bitValue: bigint,
    bitLength: bigint,
    bool: boolean = false
  ): [bigint, OperatorPacket | ValuePacket] {
    if (bitValue > 2n ** bitLength) {
      throw new Error("Invalid packet");
    }
    // const version = (bitValue >> (bitLength - 3n)) % 0b1000n;
    const type = (bitValue >> (bitLength - 6n)) % 0b1000n;
    if (type === 4n) {
      const numPacket = new ValuePacket(bitValue, bitLength);
      return [numPacket.totalLength, new ValuePacket(bitValue >> (bitLength - numPacket.totalLength), numPacket.totalLength)];
    }
    const numPacket = new OperatorPacket(bitValue, bitLength);
    return [
      numPacket.totalLength,
      new OperatorPacket(bitValue >> (bitLength - numPacket.totalLength), numPacket.totalLength),
    ];
  }

  toJSON() {
    return {
      packetHex: this.packetValue.toString(16),
      packetBin: this.packetValue.toString(2),
      packetValue: this.packetValue,
      packetLength: this.packetLength,
      version: this.version,
      type: this.type,
    };
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
    };
    if (this.type === 0n) {
      return sub.reduce((a, b) => a + b.number, 0n);
    }
    if (this.type === 1n) {
      return sub.reduce((a, b) => a * b.number, 1n);
    }
    if (this.type === 2n) {
      return sub.reduce((a, b) => (b.number < a || a === -1n ? b.number : a), -1n);
    }
    if (this.type === 3n) {
      return sub.reduce((a, b) => (b.number > a || a === -1n ? b.number : a), -1n);
    }
    if (this.type === 5n) {
      return sub[0].number > sub[1].number ? 1n : 0n;
    }
    if (this.type === 6n) {
      return sub[0].number < sub[1].number ? 1n : 0n;
    }
    if (this.type === 7n) {
      return sub[0].number === sub[1].number ? 1n : 0n;
    }
    throw new Error(`Invalid operator type: ${this.type}`);
  }

  get operatorLengthType() {
    if (this.type === 4n) return 0n;
    return (this.packetValue >> (this.packetLength - 7n)) % 0b10n;
  }

  get operatorLength() {
    if (this.operatorLengthType === 0n) {
      return (this.packetValue >> (this.packetLength - 22n)) % (1n << 15n);
    }
    return (this.packetValue >> (this.packetLength - 18n)) % (1n << 11n);
  }

  private _subpackets: [bigint, (OperatorPacket | ValuePacket)[]] | null = null;

  get subpackets(): [bigint, (OperatorPacket | ValuePacket)[]] {
    if (!this._subpackets) {
      if (this.operatorLengthType === 0n) {
        const subpackets = [];
        let length = 0n;
        while (length < this.operatorLength) {
          if (this.packetLength - 22n - length < 0n) break;
          const p = this.packetValue % (1n << (this.packetLength - 22n - length));
          if (p === 0n) break;
          const [subpacketLength, subpacket] = Packet.parseBigInt(
            p,
            this.packetLength - 22n - length
          );
          subpackets.push(subpacket);
          length += subpacketLength;
        }
        this._subpackets = [length, subpackets];
      } else {
        const subpackets = [];
        let length = 0n;
        for (let i = 0n; i < this.operatorLength; i++) {
          if (this.packetLength - 18n - length < 0n) break;
          const p = this.packetValue % (1n << (this.packetLength - 18n - length));
          if (p === 0n) break;
          const [subpacketLength, subpacket] = Packet.parseBigInt(
            p,
            this.packetLength - 18n - length
          );
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
  console.log(p.version, p.type, p.versionSum);
  console.log(chalk.red.bold`Answer: ${p.versionSum}`);
}

export function Part2() {
  const [_, packet] = loadData();

  const p = packet as OperatorPacket;
  console.log(chalk.red.bold`Answer: ${p.number}`);
}
