const w=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}};w();class r{constructor(t,e){this.x=t,this.y=e}addVec(t){return new r(this.x+t.x,this.y+t.y)}scalarMultiply(t){return new r(this.x*t,this.y*t)}distance(t){return Math.sqrt((this.x-t.x)**2-(this.y-t.y))}length(){return Math.sqrt(this.x**2+this.y**2)}negate(){return new r(this.x*-1,this.y*-1)}}const m=.5;class y{constructor(t,e,s=new r(0,0)){this.pos=t,this.mass=e,this.velocity=s}calcGravityForce(t){const e=new r(this.pos.x-t.pos.x,this.pos.y-t.pos.y),s=-m*this.mass*t.mass/e.length()**3;return new r(s*e.x,s*e.y)}addVelocity(t){const e=new r(t.x/this.mass,t.y/this.mass);this.velocity=this.velocity.addVec(e),console.log(this.velocity)}updatePosition(){this.pos=this.pos.addVec(this.velocity)}render(t){const e="rgb(200, 0, 0)";t.fillStyle=e,t.beginPath(),t.arc(this.pos.x,this.pos.y,this.mass/100,0,2*Math.PI),t.closePath(),t.stroke()}}const l=[new y(new r(700,500),1e3,new r(0,1)),new y(new r(900,500),1e3,new r(0,-1))],d=document.querySelector("#gl"),p=v(d);let u=0,a=0,f=0,h=0;function x(n){u=1e3/n,f=Date.now(),g()}x(60);function v(n){if(!n){console.error("ERROR cant find canvas");return}n.width=window.innerWidth,n.height=window.innerHeight;const t=n.getContext("2d");if(!t){console.error("ERROR on getting rendering context");return}return t}function g(){requestAnimationFrame(g),a=Date.now(),h=a-f,!(h<=u)&&(f=a-h%u,p.clearRect(0,0,d.width,d.height),P(l),R(l),O(p,l))}function P(n){if(!(n.length<2))for(let t=0;t<n.length;++t)for(let e=0;e<n.length;++e){if(t===e)continue;const s=n[t],o=n[e],i=s.calcGravityForce(o),c=i.negate();s.addVelocity(i),o.addVelocity(c)}}function R(n){n.forEach(t=>t.updatePosition())}function O(n,t){t.forEach(e=>e.render(n))}