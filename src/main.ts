import './style.css'
import { Body } from './Body';
import { Vec2 } from './Vec2';


const RED = 'rgb(200, 0, 0)';
const BLUE = 'rgb(0, 0, 200)';
const GREEN = 'rgb(0, 200, 0)';

const spheres: Body[] = [
  new Body(new Vec2(700, 500), 1000, new Vec2(0, 1), RED),
  new Body(new Vec2(900, 500), 1000, new Vec2(0, -1), BLUE),
]
const canvas = document.querySelector<HTMLCanvasElement>('#gl') as HTMLCanvasElement;
const ctx = init(canvas) as CanvasRenderingContext2D;

document.getElementById('plus')?.addEventListener('click', () => {
  const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

  const colors = [RED, BLUE, GREEN]

  spheres.push(new Body(
    new Vec2(random(window.innerWidth * 0.25, window.innerWidth * 0.8), random(window.innerHeight * 0.2, window.innerHeight * 0.8)),
    random(100, 3000),
    new Vec2(0, 0),
    colors[random(0, 3)]
  ))
})

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




