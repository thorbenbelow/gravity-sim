import { Vec2 } from './Vec2';

const G = 6.67 * 10 ** -11;
export class Sphere {
  constructor(
    public pos: Vec2,
    readonly mass: number,
    public acceleration: Vec2,
    public gravity = new Vec2(0, 0)
  ) { }

  updateAcceleration(objects: Sphere[]): void {

    const acceleration = objects.map(obj => {
      const n = new Vec2(obj.pos.x - this.pos.x, obj.pos.y - this.pos.y)
      //const n = new Vec2(this.pos.x - obj.pos.x, this.pos.y - obj.pos.y)

      const normalizer = Math.sqrt(n.x ** 2 + n.y ** 2)
      const n_normed = new Vec2(n.x * obj.mass / normalizer, n.y * obj.mass / normalizer);

      console.info(n_normed, n)
      return n_normed
    }).reduce((a, b) => a.addVec(b))

    this.gravity = acceleration;
  }

  updatePosition() {
    this.pos = this.pos.addVec(this.acceleration).addVec(this.gravity)
  }

  render(ctx: CanvasRenderingContext2D): void {
    const RED = 'rgb(200, 0, 0)';
    ctx.fillStyle = RED;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.mass, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
}


