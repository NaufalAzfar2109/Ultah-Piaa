/* ===== KONFIGURASI: edit semua data personal di sini ===== */
const birthdayData={
  name:"Dian Ayu Oktavia", nickname:"piaa", birthDate:"09 Oktober 2010", age:"16",
  song:"assets/music/birthday-song.mp3",
  photos:["assets/images/photo1.jpg","assets/images/photo2.jpg","assets/images/photo3.jpg","assets/images/photo4.jpg","assets/images/photo5.jpg"],
  captions:["","","","",""],
  wish:["Make a wish...","Semoga semua harapan baikmu menjadi kenyataan."],
  bouquetText:"piaa, semoga hari-harimu selalu dipenuhi hal-hal seindah bunga ini.",
  letter:[
    "Dear piaa,",
    "Selamat ulang tahun untuk seseorang yang sangat berarti buat aku.",
    "Di hari spesial ini, aku cuma ingin kamu tahu kalau aku bersyukur bisa mengenal kamu dan memiliki kamu dalam hidupku.",
    "Terima kasih untuk semua cerita, tawa, perhatian, dan momen yang sudah kita lewati bersama.",
    "Semoga di umur kamu yang baru ini, kamu selalu diberikan kesehatan, kebahagiaan, dan dimudahkan untuk mencapai semua impian kamu.",
    "Semoga hari ini menjadi salah satu hari yang paling indah buat kamu.",
    "Happy Birthday, piaa.",
    "I love you."
  ]
};

/* ===== Helper ===== */
const D=birthdayData,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const wait=ms=>new Promise(r=>setTimeout(r,ms)),rnd=(a,b)=>a+Math.random()*(b-a);
const fill=s=>s.replaceAll('piaa',D.name);
const NS='https://pin.it/5R94wXuaL';
const ico=(id,c)=>{const s=document.createElementNS(NS,'svg');s.setAttribute('viewBox','0 0 24 24');s.setAttribute('class','ic '+c);s.innerHTML=`<use href="#${id}"/>`;return s};
async function type(el,txt,sp=45){el.textContent='';for(const c of txt){el.textContent+=c;await wait(RM?0:sp)}}
$$('[data-k]').forEach(e=>e.textContent=D[e.dataset.k]);
$('#b2').textContent=fill(D.bouquetText);

/* ===== Background: kelopak & partikel (canvas) ===== */
const cv=$('#fx'),cx=cv.getContext('2d');let W,H,sp=1;
const resize=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};addEventListener('resize',resize);resize();
const mk=r=>({x:rnd(0,W),y:r?rnd(0,H):-20,s:rnd(4,10),v:rnd(.3,.9),w:rnd(0,6),a:rnd(0,6),dot:Math.random()<.4});
const P=Array.from({length:RM?10:innerWidth<700?22:38},()=>mk(1));
(function loop(){cx.clearRect(0,0,W,H);for(const p of P){p.y+=p.v*sp;p.w+=.012*sp;p.a+=.01*sp;p.x+=Math.sin(p.w)*.7*sp;if(p.y>H+20)Object.assign(p,mk(0));
cx.beginPath();if(p.dot){cx.fillStyle='rgba(255,225,170,.7)';cx.arc(p.x,p.y,p.s/3,0,7)}else{cx.fillStyle='rgba(238,150,172,.55)';cx.ellipse(p.x,p.y,p.s,p.s/2,p.a,0,7)}cx.fill()}requestAnimationFrame(loop)})();

/* ===== Efek DOM: confetti, sparkle, hati, kelopak ===== */
const L=$('#layer');let hearts=0;
function put(el,x,y,anim,vars,ms,done){el.style.left=x+'px';el.style.top=y+'px';el.style.animation=`${anim} ${ms}ms ease-out forwards`;for(const k in vars)el.style.setProperty(k,vars[k]);L.append(el);setTimeout(()=>{el.remove();done&&done()},ms+80)}
function confetti(n,rain){const c=['#e895a8','#f6d1d8','#f0dcb4','#c8a25a','#ffffff'];for(let i=0;i<(RM?n/4:n);i++){const e=document.createElement('i');e.className='cf';e.style.background=c[i%5];
put(e,rain?rnd(0,innerWidth):innerWidth/2,rain?-14:innerHeight*.45,'cf',{'--dx':rnd(-1,1)*(rain?80:innerWidth*.45)+'px','--dy':(rain?innerHeight+30:rnd(-260,innerHeight*.5))+'px','--rt':rnd(-720,720)+'deg'},rnd(1800,3400))}}
const sparkle=(x,y)=>put(ico('spark','sk'),x,y,'tw',{},rnd(1000,1600));
function heart(x,y){if(hearts>26)return;hearts++;put(ico('heart','hp'),x,y,'up',{'--dx':rnd(-40,40)+'px','--rt':rnd(-40,40)+'deg'},1800,()=>hearts--)}
function petals(n){for(let i=0;i<n;i++)setTimeout(()=>{const e=ico('petal','pt');put(e,rnd(0,innerWidth),-20,'cf',{'--dx':rnd(-90,90)+'px','--dy':innerHeight+40+'px','--rt':rnd(-300,300)+'deg'},rnd(4500,7000))},i*250)}

/* ===== Reveal saat scroll ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.25});
const watch=()=>$$('#app .rv,#app .soft:not(#w1):not(#w2):not(#b2)').forEach(e=>io.observe(e));
addEventListener('scroll',()=>document.documentElement.style.setProperty('--py',scrollY),{passive:true});

/* ===== Musik ===== */
const audio=new Audio(D.song);audio.loop=true;audio.volume=.6;
$('#pp').onclick=()=>audio.paused?audio.play().catch(()=>{}):audio.pause();
audio.onplay=audio.onpause=()=>$('.mp').classList.toggle('playing',!audio.paused);
audio.ontimeupdate=()=>$('#prog').value=audio.currentTime/(audio.duration||1)*1000;
$('#prog').oninput=e=>{if(audio.duration)audio.currentTime=e.target.value/1000*audio.duration};
$('#vol').oninput=e=>audio.volume=e.target.value;

/* ===== Loading -> Opening -> Open gift ===== */
(async()=>{await wait(2600);$('#loader').classList.add('gone');
await type($('#t1'),"Untuk seseorang yang sangat spesial...");await wait(500);
$('#t2').textContent="Today is your special day.";$('#t2').classList.add('in');await wait(2200);
$('#t3').classList.add('in');await wait(1600);$('#openGift').classList.add('in')})();
$('#openGift').onclick=async()=>{audio.play().catch(()=>{});sp=5;$('#intro').classList.add('out');
$('#app').hidden=false;$('.mp').classList.add('show');document.body.classList.remove('locked');scrollTo(0,0);watch();
setTimeout(()=>sp=1,3000);setTimeout(()=>$('#intro').remove(),2000)};

/* ===== Kue ===== */
const CAKE=`<svg viewBox="0 -40 260 310" class="cakeSvg"><ellipse cx="130" cy="245" rx="112" ry="15" fill="#f0e0c6"/>
<rect x="28" y="170" width="204" height="72" rx="16" fill="#f6c3cd"/><rect x="50" y="118" width="160" height="58" rx="14" fill="#fbe3c8"/><rect x="74" y="74" width="112" height="50" rx="13" fill="#f6c3cd"/>
<path d="M28 188q17 24 34 0t34 0 34 0 34 0 34 0 34 0V172H28z" fill="#fff"/><path d="M50 138q16 22 32 0t32 0 32 0 32 0 32 0V124H50z" fill="#fff"/><path d="M74 96q14 20 28 0t28 0 28 0 28 0V82H74z" fill="#fff"/>
<g fill="#c8a25a"><circle cx="62" cy="216" r="5"/><circle cx="96" cy="222" r="5"/><circle cx="130" cy="216" r="5"/><circle cx="164" cy="222" r="5"/><circle cx="198" cy="216" r="5"/></g>
<g fill="#e5798f"><circle cx="86" cy="156" r="4"/><circle cx="130" cy="160" r="4"/><circle cx="174" cy="156" r="4"/></g>
<rect x="125" y="36" width="10" height="42" rx="3" fill="#fff" stroke="#c8a25a"/>
<path class="smoke" d="M130 28c-9-10 9-17 0-30s9-15 2-26" fill="none" stroke="#b8a5ab" stroke-width="3" stroke-linecap="round"/>
<g class="flame"><path d="M130 4c10 11 10 20 0 26-10-6-10-15 0-26z" fill="#ffb84d"/><path d="M130 14c4 5 4 10 0 13-4-3-4-8 0-13z" fill="#fff3c4"/></g></svg>`;
$('#cakeBox').innerHTML=CAKE;
let wished=false;
$('#wishBtn').onclick=async()=>{if(wished)return;wished=true;$('#wishBtn').disabled=true;
$('#cakeBox .flame').classList.add('off');$('#cakeBox .smoke').classList.add('on');$('#cake').classList.add('dim');
const r=$('#cakeBox').getBoundingClientRect();for(let i=0;i<12;i++)setTimeout(()=>sparkle(r.left+rnd(0,r.width),r.top+rnd(0,r.height)),i*120);
confetti(70);$('#cakeBox').classList.add('bounce');
await type($('#w1'),D.wish[0],60);$('#w1').classList.add('show');await wait(500);await type($('#w2'),D.wish[1],40);$('#w2').classList.add('show')};

/* ===== Buket (inline SVG, tiap bunga dianimasikan sendiri) ===== */
const rose=(x,y,r,c,d)=>`<g transform="translate(${x} ${y})"><circle r="${r}" fill="${c}"/><circle r="${r*.7}" fill="${d}" opacity=".5"/><path d="M${-r*.5} 0a${r*.5} ${r*.5} 0 1 1 ${r*.5} ${r*.5}a${r*.3} ${r*.3} 0 1 1 ${-r*.3} ${-r*.3}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2"/></g>`;
const tulip=(x,y,s,c)=>`<g transform="translate(${x} ${y})"><path d="M${-s} ${-s*.2}Q${-s} ${s} 0 ${s}Q${s} ${s} ${s} ${-s*.2}L${s*.5} ${-s*1.1}L0 ${-s*.4}L${-s*.5} ${-s*1.1}Z" fill="${c}"/><path d="M0 ${-s*.4}Q${-s*.45} ${s*.3} 0 ${s}Q${s*.45} ${s*.3} 0 ${-s*.4}" fill="#fff" opacity=".35"/></g>`;
const leaf=(x,y,a)=>`<ellipse cx="${x}" cy="${y}" rx="10" ry="26" transform="rotate(${a} ${x} ${y})" fill="#8fb384"/>`;
function bouquetSVG(){
 const F=[{x:150,y:190,m:rose(150,190,34,'#d4768b','#a84862'),t:'0px,50px',r:'-25deg'},
  {x:96,y:208,m:rose(96,208,27,'#f2a7b6','#d4768b'),t:'-70px,10px',r:'-45deg'},
  {x:206,y:208,m:tulip(206,208,27,'#f08ba0'),t:'70px,10px',r:'45deg'},
  {x:196,y:135,m:tulip(196,135,25,'#f6d1d8'),t:'20px,60px',r:'20deg'},
  {x:140,y:112,m:rose(140,112,30,'#fbe3c8','#e7bd96'),t:'0px,70px',r:'0deg'}];
 const g=(c,s)=>`<g class="b" style="${s||''}">${c}</g>`;
 const stems=F.map(f=>`<path d="M${f.x} ${f.y}Q${(f.x+150)/2} 250 150 300" stroke="#7fa273" stroke-width="3" fill="none"/>`).join('');
 const baby=[...Array(18)].map((_,i)=>{const a=i/18*Math.PI*1.2-Math.PI*.6,r=70+(i*37)%55,x=150+Math.sin(a)*r*1.25,y=215-Math.cos(a)*r*1.1;return`<path d="M150 295L${x} ${y}" stroke="#a3c196" stroke-width="1"/><circle cx="${x}" cy="${y}" r="3.4" fill="#fff"/>`}).join('');
 return`<svg viewBox="0 0 300 350" class="bq" aria-label="Buket bunga">`+
  g(stems+leaf(100,262,-50)+leaf(200,262,50)+leaf(80,235,-70)+leaf(220,235,70),'--ty:60px')+
  F.map(f=>g(f.m,`--tx:${f.t.split(',')[0]};--ty:${f.t.split(',')[1]};--r:${f.r}`)).join('')+
  g(baby,'--ty:20px')+g(leaf(122,160,-30)+leaf(178,165,30)+leaf(150,70,0),'--ty:40px')+
  `<path d="M108 288L192 288L170 345L130 345Z" fill="#f0e0c6" stroke="#c8a25a"/>`+
  g(`<path d="M150 290C108 262 98 308 150 296C202 308 192 262 150 290z" fill="#d4768b"/><path d="M146 296L126 338L142 330L150 344z" fill="#e895a8"/><path d="M154 296L174 338L158 330L150 344z" fill="#e895a8"/><circle cx="150" cy="292" r="7" fill="#c8a25a"/>`,'--ty:-30px')+`</svg>`}
async function grow(box,step){for(const g of box.querySelectorAll('.b')){g.classList.add('on');await wait(RM?60:step)}}
$('#bqBox').innerHTML=bouquetSVG();$$('#bqBox .b').forEach(b=>b.classList.remove('on'));
// keadaan awal: hanya daun/batang kecil + bagian bawah buket
$('#bqBtn').onclick=async()=>{$('#bqBtn').disabled=true;const box=$('#bqBox');await grow(box,480);
const r=box.getBoundingClientRect();for(let i=0;i<14;i++)setTimeout(()=>sparkle(r.left+rnd(0,r.width),r.top+rnd(0,r.height*.7)),i*150);
petals(10);box.firstChild.classList.add('done');$('#b1').classList.add('in');await wait(1500);$('#b2').classList.add('show')};

/* ===== Surat ===== */
async function openLetter(){const env=$('#env');if(env.classList.contains('open'))return;env.classList.add('open');$('#letter').classList.add('warm');$('#openLetter').hidden=true;
await wait(1900);const a=$('#letterText');a.classList.add('show');
for(const l of D.letter){const p=document.createElement('p');a.append(p);await type(p,fill(l),18)}}
$('#env').onclick=$('#openLetter').onclick=openLetter;$('#env').onkeydown=e=>(e.key==='Enter'||e.key===' ')&&openLetter();

/* ===== Galeri ===== */
const modal=$('#modal');
D.photos.forEach((src,i)=>{const f=document.createElement('figure');f.className='pol rv';f.style.setProperty('--rot',(i%2?3:-3)+'deg');
const im=new Image();im.src=src;im.alt=D.captions[i]||'Foto kenangan '+(i+1);im.loading='lazy';
im.onerror=()=>{const p=document.createElement('div');p.className='ph';p.append(ico('heart',''));im.replaceWith(p);f.dataset.empty=1};
const c=document.createElement('figcaption');c.textContent=D.captions[i]||'';f.append(im,c);
f.onclick=()=>{if(f.dataset.empty)return;modal.querySelector('img').src=src;modal.querySelector('figcaption').textContent=D.captions[i]||'';modal.hidden=false};$('#grid').append(f)});
const closeModal=()=>modal.hidden=true;$('#mclose').onclick=closeModal;modal.onclick=e=>e.target===modal&&closeModal();addEventListener('keydown',e=>e.key==='Escape'&&closeModal());

/* ===== Love particles ===== */
$('#love').addEventListener('pointerdown',e=>{for(let i=0;i<3;i++)heart(e.clientX+rnd(-18,18),e.clientY+rnd(-10,10))});

/* ===== Final surprise ===== */
let timers=[];
$('#lastBtn').onclick=async()=>{const f=$('#fin');f.hidden=false;await wait(40);f.classList.add('show');sp=4;
$('#finCake').innerHTML=CAKE;$('#finBq').innerHTML=bouquetSVG();$$('#finBq .b').forEach(b=>b.classList.remove('on'));
await wait(1500);confetti(80);petals(16);
timers.push(setInterval(()=>sparkle(rnd(0,innerWidth),rnd(0,innerHeight)),260),setInterval(()=>confetti(10,true),1400));
grow($('#finBq'),250);await wait(1800);$('#finBq').classList.add('on');$('#finCake').classList.add('on');
const rv=$$('#fin .rv');for(let i=0;i<rv.length;i++){await wait(i?2200:1000);rv[i].classList.add('in')}};
$('#fclose').onclick=()=>{const f=$('#fin');f.classList.remove('show');sp=1;timers.forEach(clearInterval);timers=[];
setTimeout(()=>{f.hidden=true;$$('#fin .rv').forEach(e=>e.classList.remove('in'));$$('.finrow>div').forEach(e=>e.classList.remove('on'))},1500)};
