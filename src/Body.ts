import { Vec2 } from './Vec2';

const GRAVITY_CONSTANT = 0.5;

export class Body {
  constructor(
    public pos: Vec2,
    readonly mass: number,
    public velocity: Vec2 = new Vec2(0, 0)
  ) { }

  calcGravityForce(obj: Body): Vec2 {
    const r = new Vec2(this.pos.x - obj.pos.x, this.pos.y - obj.pos.y);
    const factor = -GRAVITY_CONSTANT * this.mass * obj.mass / r.length() ** 3;

    return new Vec2(
      factor * r.x,
      factor * r.y
    )
  }

  addVelocity(gravityForce: Vec2): void {
    const acceleration = new Vec2(gravityForce.x / this.mass, gravityForce.y / this.mass);
    this.velocity = this.velocity.addVec(acceleration);
    console.log(this.velocity);
  }

  updatePosition() {
    this.pos = this.pos.addVec(this.velocity)
  }

  render(ctx: CanvasRenderingContext2D): void {
    const RED = 'rgb(200, 0, 0)';
    ctx.fillStyle = RED;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.mass / 100, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
}


