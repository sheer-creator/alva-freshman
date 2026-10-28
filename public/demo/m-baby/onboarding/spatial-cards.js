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

const GAP=8;
const PRESSURE_GAP=20;

// All cards occupy one plane. Full rectangular bounds determine contact and the
// minimum separating axis; only the incoming card changes scale. Older cards may
// leave the viewport instead of shrinking or passing behind one another.
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
    body.width=Math.max(1,width);body.height=Math.max(1,height);this.quiet=0;
  }
  promote(id,width,height,{instant=false}={}){
    let body=this.bodies.get(id);
    if(!body){body={id,x:0,y:0,vx:0,vy:0,scale:1,growth:1,vs:0,rotation:0,vr:0,order:0,side:0};this.bodies.set(id,body);}
    this.measure(id,width,height);this.active=id;body.order=++this.order;
    body.x=this.width/2;body.y=this.height/2;body.vx=body.vy=body.vs=0;body.side=0;
    body.growth=instant?1:.12;body.scale=instant?1:0;body.admitted=instant;this.quiet=0;
    for(const other of this.bodies.values()){
      other.rotation=other.vr=0;
      if(other!==body){other.scale=other.growth=1;other.vs=0;}
    }
    this.separate(instant);
    return body;
  }
  contact(a,b,gap=GAP,pressure=false){
    const scaleA=pressure&&a.id===this.active?a.growth:a.scale;
    const scaleB=pressure&&b.id===this.active?b.growth:b.scale;
    if(!pressure&&(scaleA<=0||scaleB<=0))return null;
    const dx=b.x-a.x,dy=b.y-a.y;
    const overlapX=(a.width*scaleA+b.width*scaleB)/2+gap-Math.abs(dx);
    const overlapY=(a.height*scaleA+b.height*scaleB)/2+gap-Math.abs(dy);
    if(overlapX<=0||overlapY<=0)return null;
    const axis=overlapX<overlapY?'x':'y';
    const delta=axis==='x'?dx:dy;
    const overlap=axis==='x'?overlapX:overlapY;
    let sign=Math.abs(delta)>.001?Math.sign(delta):(Math.max(a.order,b.order)%2?1:-1);
    if(Math.abs(delta)<=.001&&(a.id===this.active||b.id===this.active)){
      const old=a.id===this.active?b:a;
      const cost=direction=>{
        const x=old.x+(axis==='x'?direction*overlap:0),y=old.y+(axis==='y'?direction*overlap:0);
        let result=0;
        for(const other of this.bodies.values()){
          if(other===old||other.id===this.active)continue;
          const px=(old.width+other.width*other.scale)/2+gap-Math.abs(x-other.x);
          const py=(old.height+other.height*other.scale)/2+gap-Math.abs(y-other.y);
          if(px>0&&py>0)result+=Math.min(px,py);
        }
        return result;
      };
      const negative=cost(-1),positive=cost(1);
      if(Math.abs(negative-positive)>.001)sign=(negative<positive?-1:1)*(a.id===this.active?1:-1);
    }
    return {axis,sign,overlap};
  }
  separate(includeActive=false){
    const bodies=[...this.bodies.values()];
    for(let pass=0;pass<12;pass++){
      let changed=false;
      for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){
        const a=bodies[i],b=bodies[j];
        if(!includeActive&&(a.id===this.active||b.id===this.active))continue;
        const contact=this.contact(a,b);if(!contact||contact.overlap<.00001)continue;
        const invA=a.id===this.active?0:1,invB=b.id===this.active?0:1,total=invA+invB;
        if(!total)continue;
        const {axis,sign,overlap}=contact,velocity=axis==='x'?'vx':'vy';
        a[axis]-=sign*overlap*invA/total;b[axis]+=sign*overlap*invB/total;
        const closing=(b[velocity]-a[velocity])*sign;
        if(closing<0){const impulse=-closing/total;a[velocity]-=sign*impulse*invA;b[velocity]+=sign*impulse*invB;}
        changed=true;
      }
      if(!changed)break;
    }
  }
  availableScale(body){
    let space=Infinity;
    for(const other of this.bodies.values()){
      if(other===body)continue;
      const x=(2*Math.abs(body.x-other.x)-other.width*other.scale-2*GAP)/body.width;
      const y=(2*Math.abs(body.y-other.y)-other.height*other.scale-2*GAP)/body.height;
      space=Math.min(space,Math.max(x,y));
    }
    return Math.max(0,space);
  }
  step(elapsed){
    const time=clamp(elapsed,0,1/20),count=Math.max(1,Math.ceil(time/(1/120))),dt=time/count;
    const bodies=[...this.bodies.values()],cx=this.width/2,cy=this.height/2;
    for(let n=0;n<count;n++){
      const active=this.bodies.get(this.active);
      if(active){
        active.x=cx;active.y=cy;active.vx=active.vy=0;
        active.vs+=(300*(1-active.growth)-23*active.vs)*dt;active.growth+=active.vs*dt;
        if(active.admitted)active.scale=active.growth;
      }
      const forces=bodies.map(body=>({x:(cx+body.side*32-body.x)*(body.side?100:6)-body.vx*(body.side?20:14),y:(cy-body.y)*6-body.vy*14}));
      for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){
        const a=bodies[i],b=bodies[j],contact=this.contact(a,b,active?.admitted?GAP:PRESSURE_GAP,true);
        if(!contact)continue;
        const {axis,sign,overlap}=contact,velocity=axis==='x'?'vx':'vy';
        // A vertical contact also transfers a small sideways impulse. Its
        // settling offset follows the contact direction, never a depth order.
        if(axis==='y'&&(a.id===this.active||b.id===this.active)){
          const old=a.id===this.active?b:a,direction=a.id===this.active?sign:-sign;
          if(old.side!==direction){old.side=direction;old.vx+=direction*36;}
        }
        if(axis==='x'&&(a.id===this.active||b.id===this.active))(a.id===this.active?b:a).side=0;
        const relative=(b[velocity]-a[velocity])*sign;
        const pressure=Math.max(0,overlap*280-relative*20);
        if(a.id!==this.active)forces[i][axis]-=sign*pressure;
        if(b.id!==this.active)forces[j][axis]+=sign*pressure;
      }
      bodies.forEach((body,index)=>{
        if(body.id!==this.active){
          body.vx+=forces[index].x*dt;body.vy+=forces[index].y*dt;
          body.x+=body.vx*dt;body.y+=body.vy*dt;
          body.scale=body.growth=1;body.vs=0;
        }
        body.rotation=body.vr=0;
      });
      this.separate(active?.admitted);
      // The card cannot materialise through an occupied rectangle. Its spring
      // applies pressure immediately; its visible scale follows the space that
      // pressure opens, so even the first visible frame remains on one plane.
      if(active&&!active.admitted){
        active.scale=Math.min(active.growth,this.availableScale(active));
        if(active.scale>=1){active.admitted=true;active.scale=active.growth;this.separate(true);}
      }
    }
    const moving=bodies.some(body=>Math.hypot(body.vx,body.vy)>.25||Math.abs(body.vs)>.002||Math.abs(body.scale-1)>.001);
    this.quiet=moving?0:this.quiet+time;
    if(this.quiet<.2)return true;
    for(const body of bodies){
      body.scale=body.growth=1;body.vx=body.vy=body.vs=0;
      if(body.side&&Math.abs(body.x-cx-body.side*32)<.05)body.x=cx+body.side*32;
    }
    this.separate(true);return false;
  }
  snapshot(){return [...this.bodies.values()].map(body=>({...body,active:body.id===this.active,layer:0}));}
}
