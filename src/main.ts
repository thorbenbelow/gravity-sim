import './style.css'
import { Sphere } from './Sphere';
import { Vec2 } from './Vec2';

const spheres: Sphere[] = [
  new Sphere(new Vec2(10, 10), 5, new Vec2(1, 1)),
  new Sphere(new Vec2(300, 100), 10, new Vec2(0, -1)),
  new Sphere(new Vec2(100, 100), 5, new Vec2(0, 1)),
]
const canvas = document.querySelector<HTMLCanvasElement>('#gl') as HTMLCanvasElement;
const ctx = init(canvas) as CanvasRenderingContext2D;
requestAnimationFrame(tick);



function init(canvas: HTMLCanvasElement | null): CanvasRenderingContext2D | undefined {

  if (!canvas) {
    console.error("ERROR cant find canvas")
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("ERROR on getting rendering context");
    return;
  }

  return ctx;
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateAccelerations(spheres);
  updatePositions(spheres);
  renderSpheres(ctx, spheres);

  requestAnimationFrame(tick);
}

function updateAccelerations(objects: Sphere[]) {
  objects.forEach((o, i) => {
    o.updateAcceleration(objects.filter((_, j) => j !== i))
  })
}
function updatePositions(objects: Sphere[]) {
  objects.forEach(o => o.updatePosition());
}
function renderSpheres(ctx: CanvasRenderingContext2D, objects: Sphere[]) {
  objects.forEach(o => o.render(ctx))
}




