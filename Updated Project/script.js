document.addEventListener("DOMContentLoaded", function () {
    // Search bar
    const searchAny = document.getElementById('search');
    const feeds = document.querySelector('.feeds');
    const feed=feeds.querySelectorAll('.feed');
    const find = () => {
        const val = searchAny.value.toLowerCase(); // Get the search input value
        let anyVisible = false; // Flag to track if any feed is visible
    
        feed.forEach(chat => {
            let name = chat.querySelector('h3').textContent.toLowerCase();
            
            if (name.indexOf(val) !== -1) {
                chat.style.display = 'flex'; // Show the matching feed
                chat.style.flexDirection = 'column';
                anyVisible = true; 
            } else {
                chat.style.display = 'none';
            }
        });
    
        if (anyVisible) {
            document.querySelector('.nouser').style.display = 'none'; 
        } else {
            document.querySelector('.nouser').style.display = 'block'; 
        }
    };
    
    
        searchAny.addEventListener('keyup',find);
    // ------------ SIDEBAR ------------ //
    const left=document.querySelector('.left')
    const bar=document.querySelector('#bar')
    const menuItems = document.querySelectorAll('.menu-item')
    
    //  Messages
    
    const messagesNotification=document.querySelector('#messages-notification');
    const messages = document.querySelector('.messages');
    const message=messages.querySelectorAll('.message');
    const messageSearch  = document.querySelector('#message-search');
    // THEME
    const theme = document.querySelector('#theme');
    const themeModel=document.querySelector('.customize-theme');
    var root =document.querySelector(':root');
    // Font Size
    const fontSizes=document.querySelectorAll('.choose-size span');
    
    // Color 
    const colorPalette =document.querySelectorAll('.choose-color span');
    
    const Bg1 =document.querySelector('.bg-1')
    const Bg2 =document.querySelector('.bg-2')
    const Bg3 =document.querySelector('.bg-3')
    
    
    
    // SideBar 
    bar.addEventListener('click', () => {
        if (left.style.display === 'block') {
            left.style.display = 'none'; //none Show the element
        } else {
            left.style.display = 'block'; // Hide the element
       }
    });
    // Message menu
    const right=document.querySelector('.right')
    messagesNotification.addEventListener('click', () => {
        if (right.style.display === 'none' ) {
            right.style.display = 'block'; //none Show the element
        }else{
        right.style.display = 'block';
       }
    });
    
    const close=document.querySelector('#close')
    close.addEventListener('click', () => {
        right.style.display = 'none';
        changeActiveItem();
    })
    
    
    
    // Remove  active class from all menu items
    const changeActiveItem=() =>{
        menuItems.forEach(item => 
            {
                item.classList.remove('active')
    })
    }
    menuItems.forEach(item =>{
        item.addEventListener('click', () => {
            changeActiveItem();
            item.classList.add('active');  
        if(item.id !='notifications'){
            document.querySelector('.notifications-popup').
            style.display='none'
        } 
        else{
            document.querySelector('.notifications-popup').
            style.display='block';
            document.querySelector('#notifications .notification-count').
            style.display='none';
        }
    })
    }) 
    
    // ------------ MESSAGES ------------//
    // Search Chat
    const searchMessage =() =>{
        const val=messageSearch.value.toLowerCase();
        message.forEach(chat=>{
            let name=chat.querySelector('h5').textContent.toLowerCase();
            if(name.indexOf(val)!=-1){
                chat.style.display='flex  ';
            }
            else{  
            chat.style.display='none';
            }
    
        })
        }
    
        messageSearch.addEventListener('keyup',searchMessage);
    
    
    //  Hightlight Message Card
    messagesNotification.addEventListener('click',()=>
    { 
    
        messages.style.boxShadow='0 0 1rem var(--color-primary)';
        messagesNotification.querySelector('.notification-count').style.display='none'
        setTimeout(()=>{
    messages.style.boxShadow='none';
        },2000)
    })
    
    //THEME DISPLAY CUSTOMIZATION
    // Open Model
    const openThemeModel = () => {
         themeModel.style.display='grid';
    }
    
    //  Close Model
    const closeThemeModel = (e) =>{
        if(e.target.classList.contains('customize-theme')){
            themeModel.style.display='none';
        }
    }
    
    themeModel.addEventListener('click',closeThemeModel);
    theme.addEventListener('click',openThemeModel);
    
    // 
    const removeSizeSelector =() =>{
        fontSizes.forEach(size =>{
            size.classList.remove('active');
        })
    }
    // FOnt size
    fontSizes.forEach(size =>{
    
        size.addEventListener('click',()=>{
            removeSizeSelector();
        
        let fontSize;
        size.classList.toggle('active');
        })
    
      size.addEventListener('click',() =>{
        if(size.classList.contains('font-size-1')){
            fontSize='10px';
            root.style.setProperty('--sticky-top-left','5.4rem')
            root.style.setProperty('--sticky-top-right','5.4rem')
        }else if(size.classList.contains('font-size-2')){
            fontSize='13px';
            root.style.setProperty('--sticky-top-left','5.4rem')
            root.style.setProperty('--sticky-top-right','-7rem')
        }else if(size.classList.contains('font-size-3')){
            fontSize='16px';
            root.style.setProperty('--sticky-top-left','-2rem')
            root.style.setProperty('--sticky-top-right','-17rem')
        }else if(size.classList.contains('font-size-4')){
            fontSize='19px';
            root.style.setProperty('--sticky-top-left','-5rem')
            root.style.setProperty('--sticky-top-right','-25rem')
        }else if(size.classList.contains('font-size-5')){
            fontSize='22px';
            root.style.setProperty('--sticky-top-left','-12rem')
            root.style.setProperty('--sticky-top-right','-35rem')
        }
        // change Font size of the root html element
        document.querySelector('html').style.fontSize=fontSize;
    
      })
        })
    
    // remove active class from color
    const changeActiveColorClass =() =>{
        colorPalette.forEach(colorPicker =>{
            colorPicker.classList.remove('active');
        })
    }
    
    
    
    //  Change Primary Color
    colorPalette.forEach(color =>{
        color.addEventListener('click',() =>{
            let primary;
            // remove active class from color
            changeActiveColorClass();
        if(color.classList.contains('color-1')){
            primaryHue=330;
            
        }
        else if(color.classList.contains('color-2')){
            primaryHue=  52;
        }
        else if(color.classList.contains('color-3')){
            primaryHue=  352;
        }
        else if(color.classList.contains('color-4')){
            primaryHue=  152;
        }
        else if(color.classList.contains('color-5')){
            primaryHue=  202;
        }
        color.classList.add('active');
        root.style.setProperty('--primary-color-hue',primaryHue);
    })
    })
    
    
    // theme backgroud values
    let lightColorLightness;
    let whiteColorLightness;
    let darkColorLightness;
    
    const changeBG =() =>{
        root.style.setProperty('--light-color-lightness',lightColorLightness);
        root.style.setProperty('--white-color-lightness',whiteColorLightness);
        root.style.setProperty('--dark-color-lightness',darkColorLightness);
    }
    
    Bg1.addEventListener('click', () =>{
        Bg1.classList.add('active');
        Bg2.classList.remove('active');
        Bg3.classList.remove('active');
        
        window.location.reload();
    
    })
    Bg2.addEventListener('click', () =>{
        darkColorLightness='95%';
        whiteColorLightness= '20%';
        lightColorLightness='15%';
    
        Bg2.classList.add('active');
        Bg1.classList.remove('active');
        Bg3.classList.remove('active');
        changeBG();
    
    })
    Bg3.addEventListener('click', () =>{
        darkColorLightness='95%';
        whiteColorLightness= '10%';
        lightColorLightness='0%';
    
        Bg3.classList.add('active');
        Bg1.classList.remove('active');
        Bg2.classList.remove('active');
        changeBG();
    })
    
    var arr=[
        {
            dp:"https://media.gettyimages.com/id/2159845100/photo/bridgetown-barbados-virat-kohli-and-rohit-sharma-of-india-celebrates-with-the-icc-mens-t20.jpg?s=612x612&w=0&k=20&c=VJFkMsrMnh_FW3DGN0PhwdatwQ2chFqsOtoQmwKVSiU=",
            story:"https://media.gettyimages.com/id/1744752828/photo/pune-india-virat-kohli-of-india-looks-on-during-the-icc-mens-cricket-world-cup-india-2023.jpg?s=612x612&w=0&k=20&c=kA_uCWyaZAxTt_FsgRm9tvywukonAZloFpFswo1Gjkk=",
            name:"Virat kohli"
            
        },
        {
            dp:"https://media.gettyimages.com/id/2159845100/photo/bridgetown-barbados-virat-kohli-and-rohit-sharma-of-india-celebrates-with-the-icc-mens-t20.jpg?s=612x612&w=0&k=20&c=VJFkMsrMnh_FW3DGN0PhwdatwQ2chFqsOtoQmwKVSiU=",
            story:"https://media.gettyimages.com/id/1495973951/photo/london-england-rohit-sharma-of-india-poses-for-a-portrait-prior-to-the-icc-world-test.jpg?s=612x612&w=0&k=20&c=_alky9t-NwvcqfGHqPCf8BkonUr8rPvB7J6fj253wwA=",
            name:"Rohit sharma"
        },
        {
            dp:"https://media.gettyimages.com/id/1632006227/photo/topshot-nassrs-portuguese-forward-cristiano-ronaldo-celebrates-his-second-goal-during-the.jpg?s=612x612&w=0&k=20&c=766kFi1EYzWSBZO9t-IrvPE8dZBAZWbRrf5MvCpOwNQ=",
            story:"https://media.gettyimages.com/id/1647100266/photo/riyadh-saudi-arabia-cristiano-ronaldo-of-al-nassr-club-looks-on-during-the-saudi-pro-league.jpg?s=612x612&w=0&k=20&c=n3_34L06EMSJWQ1A5t1IvWKHgLOao0QmOl51bskcMug=",
            name:"cristiano ronaldo"
        },
        {
            dp:"https://media.gettyimages.com/id/1357871661/photo/jeddah-saudi-arabia-akshay-kumar-attends-in-conversation-with-akshay-kumar-at-the-red-sea.jpg?s=612x612&w=0&k=20&c=o2BhtrY-_Jt0yr25aIG22SrP9KFoTmiT6t1TXAXDPgU=",
            story:"https://media.gettyimages.com/id/1446479378/photo/jeddah-saudi-arabia-akshay-kumar-poses-during-a-portrait-session-at-the-red-sea-international.jpg?s=612x612&w=0&k=20&c=fqHQrJ7YUvug4x-8ec8mfDZoh_hmLK9M5CJY3oWJXH4=",
            name:"Akshay kumar"
        },
        {
            dp:"https://media.gettyimages.com/id/473171162/photo/cannes-france-katrina-kaif-attends-the-opening-ceremony-and-premiere-of-la-tete-haute-during.jpg?s=612x612&w=0&k=20&c=il8HriDrCRNAV1gqU7iuaknmsjdZsLw7A_WobTh2eog=",
            story:"https://media.gettyimages.com/id/473212886/photo/cannes-france-katrina-kaif-attends-the-opening-ceremony-and-la-tete-haute-premiere-during-the.jpg?s=612x612&w=0&k=20&c=Q5nJHnJbFGwb3skn614SezzxYkHjFdraiS41fKPWmu4=",
            name:"Katrina kaif"
        },
        {
        dp:"https://images.unsplash.com/photo-1722325165767-81c351f64eb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D" ,
        story:"https://images.unsplash.com/photo-1722111059641-be1189421e09?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
        name:"Ram Kumar"
    },
        {
            dp:"https://images.unsplash.com/photo-1722171210773-4a2e54197061?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
            story:"images/story-1.jpg",
            name:"Aanand shrama"
        },
        {
            dp:"https://plus.unsplash.com/premium_photo-1664267832256-176e55ccafd0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZWxzfGVufDB8fDB8fHww",
            story:"https://images.unsplash.com/photo-1566802725767-890e3f6e69b4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZWxzfGVufDB8fDB8fHww",
            name:"Neha sharma"
        },
        {
            dp:"https://images.unsplash.com/photo-1514654306380-538bac0ed82c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9kZWxzfGVufDB8fDB8fHww",
            story:"https://images.unsplash.com/photo-1523944339743-0fe06f079939?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1vZGVsc3xlbnwwfHwwfHx8MA%3D%3D",
            name:"pooja verma"
        },
    
        
    ]
    var storiyan=document.querySelector("#storiyan")
        var clutter=""
    arr.forEach(function(elem,id){
        clutter+=`
                <div class="story">
                <img id="${id}" src="${elem.story}" alt="">
                <div class="profile-photo">
                <img id="${id}" src="${elem.dp}" alt="">
                        </div>
                        <p class="text-muted" id="${id}">${elem.name}</p>
        </div>
        `
    })
    
    storiyan.innerHTML=clutter
    storiyan.addEventListener("click",function(dets){
    document.querySelector("#full-screen").style.display="block"
    document.querySelector("#full-screen").style.backgroundImage=`url(${arr[dets.target.id].story})`
    
    
    setTimeout(function(){
    document.querySelector("#full-screen").style.display="none"
    },3000)
    })
    
    
    //  Message toggle
    const msg =document.querySelectorAll('.msg')
    const messageBox=document.querySelector('.messagebox')
    
    
    const changeActive=() =>{
        msg.forEach(item => 
            {
                item.classList.remove('active')
    })
    }
    msg.forEach(item =>{
        item.addEventListener('click', () => {
            changeActive();
            item.classList.add('active');  
        if(item.id =='pri'){
            messageBox.style.display='block'
            request.style.display='block'
        } else if(item.id =='gen'){
            messageBox.style.display='block'
            request.style.display='none'
        }else{
        messageBox.style.display='none'
            request.style.display='block'
        }
       
    })
    }) 
    
    //like Animation
    // Select all feed elements
    document.querySelectorAll(".feed").forEach(feed => {
        let count = 1; // Like state for each feed
    
        const photo = feed.querySelector(".photo"); // Target photo container
        const love = feed.querySelector("#love"); // Animated heart icon
        const love1 = feed.querySelector("#love1"); // Empty heart icon
        const love2 = feed.querySelector("#love2"); // Filled heart icon
    
        // Double-click on photo to show animated heart and toggle like
        photo.addEventListener("dblclick", function () {
            animateHeart(love); // Show animation
            toggleLikeState(); // Toggle like state
        });
    
        // Click on the empty heart icon to like
        love1.addEventListener("click", function () {
            animateHeart(love); // Show animation
            love1.style.display = "none"; // Hide empty heart
            love2.style.display = "block"; // Show filled heart
            count = 0; // Update like state
        });
    
        // Click on the filled heart icon to unlike
        love2.addEventListener("click", function () {
            love2.style.display = "none"; // Hide filled heart
            love1.style.display = "block"; // Show empty heart
            count = 1; // Reset like state
            love.style.opacity = 0; // Hide animation
        });
    
        // Function to animate the heart
        function animateHeart(heartElement) {
            heartElement.style.transform = "translate(-50%, -50%) scale(1)";
            heartElement.style.opacity = 0.8;
    
            setTimeout(function () {
                heartElement.style.opacity = 0;
            }, 1000);
    
            setTimeout(function () {
                heartElement.style.transform = "translate(-50%, -50%) scale(0)";
            }, 2000);
        }
    
        // Function to toggle like state
        function toggleLikeState() {
            if (count === 1) {
                love1.style.display = "none"; // Hide empty heart
                love2.style.display = "block"; // Show filled heart
                count = 0;
            } else {
                love1.style.display = "none"; // Show empty heart
                love2.style.display = "block"; // Hide filled heart
                count = 1;
            }
        }
    });
    
    
    document.querySelectorAll(".photo").forEach(img => {
        img.addEventListener("contextmenu", e => e.preventDefault());
      });
    document.querySelectorAll(".stories ").forEach(img => {
        img.addEventListener("contextmenu", e => e.preventDefault());
      });
    
    
    const displayUsername = document.getElementById("displayUsername");
        if (displayUsername) {
            if (sessionStorage.getItem("loggedIn") === "true") {
                displayUsername.innerText = localStorage.getItem("username");
            } else {
                window.location.href = "/index.html";
            }
        }
    const name = document.getElementById("name");
        if (name) {
            if (sessionStorage.getItem("loggedIn") === "true") {
                name.innerText = localStorage.getItem("name");
            } else {
                window.location.href = "/index.html";
            }
        }
    
    
    // change Image
    var togglePhoto=document.getElementById('toggle')
    var changePhoto=document.querySelector('.change-profile')
    const openphoto = () => {
        changePhoto.style.display='grid';
    }
    
    //  Close Model
    const closephoto = (e) =>{
       if(e.target.classList.contains('change-profile')){
           changePhoto.style.display='none';
       }
    }
    
    togglePhoto.addEventListener('click',openphoto);
    changePhoto.addEventListener('click',closephoto );
    
    // Logout Button
     const logoutButton = document.getElementById("logoutButton");
        if (logoutButton) {
            logoutButton.addEventListener("click", function () {
                // sessionStorage.removeItem("loggedIn");
                window.location.href = "/index.html";
            });
        }
    });
    // End
    