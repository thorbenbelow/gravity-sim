import './style.css'
import { Body } from './Body';
import { Vec2 } from './Vec2';

const spheres: Body[] = [
  new Body(new Vec2(500, 500), 1000, new Vec2(0, 1)),
  new Body(new Vec2(700, 500), 1000, new Vec2(0, -1))
  //new Body(new Vec2(100, 100), 5001, new Vec2(0, 1)),
]
const canvas = document.querySelector<HTMLCanvasElement>('#gl') as HTMLCanvasElement;
const ctx = init(canvas) as CanvasRenderingContext2D;


let fpsInterval = 0, now = 0, then = 0, elapsed = 0;
function initFPS(fps: number) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  tick();
}

initFPS(60);



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

  requestAnimationFrame(tick);

  now = Date.now();
  elapsed = now - then;

  if (elapsed <= fpsInterval) {
    return;
  }

  then = now - (elapsed % fpsInterval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateAccelerations(spheres);
  updatePositions(spheres);
  renderBodies(ctx, spheres);

}

function updateAccelerations(objects: Body[]): void {
  if (objects.length < 2) {
    return;
  }

  for (let i = 0; i < objects.length; ++i) {
    for (let j = 0; j < objects.length; ++j) {
      if (i === j) {
        continue;
      }

      const o1 = objects[i];
      const o2 = objects[j];

      const gravity_o1_o2 = o1.calcGravityForce(o2);
      const gravity_o2_o1 = gravity_o1_o2.negate();

      o1.addVelocity(gravity_o1_o2);
      o2.addVelocity(gravity_o2_o1);
    }
  }
}
function updatePositions(objects: Body[]) {
  objects.forEach(o => o.updatePosition());
}
function renderBodies(ctx: CanvasRenderingContext2D, objects: Body[]) {
  objects.forEach(o => o.render(ctx))
}




