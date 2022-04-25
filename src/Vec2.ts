export class Vec2 {
  constructor(
    public x: number,
    public y: number,
  ) { }

  addVec(v: Vec2): Vec2 {
    return new Vec2(this.x + v.x, this.y + v.y);
  }

  length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  negate(): Vec2 {
    return new Vec2(this.x * -1, this.y * -1);
  }
}
