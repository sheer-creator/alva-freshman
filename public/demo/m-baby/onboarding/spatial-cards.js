const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

// Sample a damped, unit-mass spring for WAAPI. These are physical response
// samples, not a bezier with an artificial overshoot control point.
export function springSamples(duration=560,{stiffness=300,damping=23,samples=60}={}){
  const dt=1/480,values=[{offset:0,value:0}];let x=0,v=0,time=0;
  for(let i=1;i<=samples;i++){
    const target=duration/1000*i/samples;
    while(time<target){const step=Math.min(dt,target-time);v+=(stiffness*(1-x)-damping*v)*step;x+=v*step;time+=step;}
    values.push({offset:i/samples,value:i===samples?1:x});
  }
  return values;
}

// Cards keep their rectangular rendering. Small contact footprints govern how
// their centres pack together, allowing old cards to overlap and remain visible
// at the edges while the current card stays fully readable in front.
export class SpatialCards {
  constructor(width,height){this.width=width;this.height=height;this.bodies=new Map();this.active=null;this.order=0;this.quiet=0;}
  resize(width,height){
    const dx=(width-this.width)/2,dy=(height-this.height)/2;
    this.width=width;this.height=height;
    for(const body of this.bodies.values()){body.x+=dx;body.y+=dy;}
    this.quiet=0;
  }
  measure(id,width,height){
    const body=this.bodies.get(id);if(!body)return;
    body.width=width;body.height=height;
    body.radius=clamp(Math.min(width,height)*.22,22,48);
  }
  promote(id,width,height,{instant=false}={}){
    let body=this.bodies.get(id);
    if(!body){body={id,x:0,y:0,vx:0,vy:0,scale:1,vs:0,rotation:0,vr:0,order:0};this.bodies.set(id,body);}
    this.measure(id,width,height);this.active=id;body.order=++this.order;
    body.x=this.width/2;body.y=this.height/2;body.vx=body.vy=body.vs=body.vr=0;
    body.scale=instant?1:.78;body.rotation=0;this.quiet=0;
    return body;
  }
  step(elapsed){
    // Fixed, bounded substeps keep collision response stable after a slow frame.
    const time=clamp(elapsed,0,1/20),count=Math.max(1,Math.ceil(time/(1/120))),dt=time/count;
    const bodies=[...this.bodies.values()],cx=this.width/2,cy=this.height/2;
    for(let n=0;n<count;n++){
      const forces=bodies.map(body=>({x:(cx-body.x)*12-body.vx*10,y:(cy-body.y)*12-body.vy*10}));
      for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){
        const a=bodies[i],b=bodies[j];let dx=b.x-a.x,dy=b.y-a.y,distance=Math.hypot(dx,dy);
        // At exact contact, the insertion side breaks symmetry; all subsequent
        // positions come from contact forces, not predetermined slide targets.
        if(distance<.01){dx=(Math.max(a.order,b.order)%2?1:-1);dy=.16;distance=Math.hypot(dx,dy);}
        const nx=dx/distance,ny=dy/distance;
        const overlap=(a.radius*a.scale+b.radius*b.scale)-distance;
        if(overlap<=0)continue;
        const relative=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
        const contact=Math.max(0,overlap*240-relative*12);
        if(a.id!==this.active){forces[i].x-=nx*contact;forces[i].y-=ny*contact;}
        if(b.id!==this.active){forces[j].x+=nx*contact;forces[j].y+=ny*contact;}
      }
      bodies.forEach((body,index)=>{
        const active=body.id===this.active;
        if(active){body.x=cx;body.y=cy;body.vx=body.vy=0;}
        else{
          body.vx+=forces[index].x*dt;body.vy+=forces[index].y*dt;body.x+=body.vx*dt;body.y+=body.vy*dt;
          const x=clamp(body.x,24,Math.max(24,this.width-24)),y=clamp(body.y,24,Math.max(24,this.height-24));
          if(x!==body.x){body.x=x;body.vx*=.1;}if(y!==body.y){body.y=y;body.vy*=.1;}
        }
        const targetScale=active?1:.94;
        body.vs+=(300*(targetScale-body.scale)-23*body.vs)*dt;body.scale+=body.vs*dt;
        const targetRotation=active?0:clamp((body.x-cx)*.018+body.vx*.012,-3,3);
        body.vr+=(180*(targetRotation-body.rotation)-22*body.vr)*dt;body.rotation+=body.vr*dt;
        body.rotation=clamp(body.rotation,-3,3);
      });
    }
    const moving=bodies.some(body=>Math.hypot(body.vx,body.vy)>.25||Math.abs(body.vs)>.002||Math.abs(body.vr)>.03);
    this.quiet=moving?0:this.quiet+time;
    return this.quiet<.2;
  }
  snapshot(){return [...this.bodies.values()].map(body=>({...body,active:body.id===this.active}));}
}
