function loading(){
    var tl=gsap.timeline()
tl.to("#yellow1",{
    top:"-100%",
    delay:.5,
    duration:.7,
    ease:"expo.out"
})
tl.from("#yellow2",{
     top:"100%",
    delay:.6,
    duration:.7,
    ease:"expo.out"
},"anim")
tl.to("#loader h1",{
    delay:.6,
    duration:.5,
    color:"black",
},"anim")
tl.to("#loader",{
    opacity:0
})
tl.to("#loader",{
    display:"none",
})
}
loading()

function locomotive(){
     const scroll =new LocomotiveScroll({
    el:document.querySelector("#main"),
    smooth:true,
    // lerp:0.05,
})

document.querySelector("#footer h3").addEventListener("click",function(){
    scroll.scrollTo(0)
})

let elems=document.querySelectorAll(".elem")
var page2=document.querySelector("#page2")
elems.forEach((e)=>{
    e.addEventListener("mouseenter",function(){
       let bgimg= e.getAttribute("data-img")

       page2.style.backgroundImage=`url(${bgimg})`
    })
})
}
locomotive()