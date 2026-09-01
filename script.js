const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

const words=["Aviation","Technology","Web Development","Programming","Engineering","Innovation"];
let wi=0,li=0,deleting=false;
function type(){
  const el=$("#typing"), word=words[wi];
  if(!deleting){el.textContent=word.slice(0,++li); if(li===word.length){deleting=true;setTimeout(type,1000);return}}
  else{el.textContent=word.slice(0,--li);if(li===0){deleting=false;wi=(wi+1)%words.length}}
  setTimeout(type,deleting?55:95)
}
type();

$("#menuToggle").addEventListener("click",()=>$("#navLinks").classList.toggle("open"));
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>$("#navLinks").classList.remove("open")));

const saved=localStorage.getItem("greg-theme");
if(saved==="dark")document.body.classList.add("dark");
$("#themeToggle").addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("greg-theme",document.body.classList.contains("dark")?"dark":"light");
  $("#themeToggle").textContent=document.body.classList.contains("dark")?"🌙":"☀️";
});

$$(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  $$(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
  const f=btn.dataset.filter;
  $$(".project-card").forEach(card=>card.style.display=f==="all"||card.dataset.category===f?"block":"none");
}));

const galleryItems=[...$$(".gallery-item")];
let current=0;
function openLightbox(index){
  current=index;const item=galleryItems[current];
  $("#lightboxImage").src=item.dataset.full;
  $("#lightboxImage").alt=item.dataset.title;
  $("#lightboxTitle").textContent=item.dataset.title;
  $("#lightboxCaption").textContent=item.dataset.caption;
  $("#lightbox").classList.add("open");
  $("#lightbox").setAttribute("aria-hidden","false");
}
function closeLightbox(){$("#lightbox").classList.remove("open");$("#lightbox").setAttribute("aria-hidden","true")}
function moveGallery(dir){current=(current+dir+galleryItems.length)%galleryItems.length;openLightbox(current)}
galleryItems.forEach((item,i)=>item.addEventListener("click",()=>openLightbox(i)));
$("#lightboxClose").addEventListener("click",closeLightbox);
$("#lightboxPrev").addEventListener("click",()=>moveGallery(-1));
$("#lightboxNext").addEventListener("click",()=>moveGallery(1));
$("#lightbox").addEventListener("click",e=>{if(e.target.id==="lightbox")closeLightbox()});
document.addEventListener("keydown",e=>{
  if(!$("#lightbox").classList.contains("open"))return;
  if(e.key==="Escape")closeLightbox();
  if(e.key==="ArrowLeft")moveGallery(-1);
  if(e.key==="ArrowRight")moveGallery(1);
});

$$(".gallery-filter").forEach(btn=>btn.addEventListener("click",()=>{
  $$(".gallery-filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
  const f=btn.dataset.galleryFilter;
  $$(".gallery-item").forEach(item=>item.style.display=f==="all"||item.dataset.category===f?"block":"none");
}));

$("#contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("#visitorName").value.trim(),email=$("#visitorEmail").value.trim(),msg=$("#visitorMessage").value.trim();
  const subject=encodeURIComponent("Website message from "+name);
  const body=encodeURIComponent(`Hello Greg,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
  window.location.href=`mailto:gregmom1357@gmail.com?subject=${subject}&body=${body}`;
});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));

window.addEventListener("scroll",()=>{
  const h=document.documentElement.scrollHeight-window.innerHeight;
  $("#progress").style.width=(window.scrollY/h*100)+"%";
});
$("#year").textContent=new Date().getFullYear();
