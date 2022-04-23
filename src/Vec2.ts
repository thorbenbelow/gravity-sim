export class Vec2 {
  constructor(
    public x: number,
    public y: number,
  ) { }


  addVec(v: Vec2): Vec2 {
    return new Vec2(this.x + v.x, this.y + v.y);
  }

  squareMembers(): Vec2 {
    this.x *= this.x;
    this.y *= this.y;
    return this
  }

  scalarMult(n: number): Vec2 {
    return new Vec2(this.x * n, this.y * n);
  }

  distance(v: Vec2): number {
    return 0

  }
}
