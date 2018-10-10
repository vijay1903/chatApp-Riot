function toggleTab(tab){
    var tabs = ['login','signup','forgot'];
    tabs.forEach(t => {
        if(tab == t) {
                document.querySelector(t).style.display = 'initial';
        } else {
                document.querySelector(t).style.display = 'none';
        }   
    });
    // window.animate(scrollTo(0,document.body.scrollHeight),1000);
    document.querySelector(tab).scrollIntoView({ 
        behavior: 'smooth' 
      });
}


document.querySelector("login-signup #showLogin").addEventListener('click',(e)=>{
    e.preventDefault();
    toggleTab('login');
});

document.querySelector("login-signup #showSignup").addEventListener('click',(e)=>{
    e.preventDefault();
    toggleTab('signup');
})

document.querySelector("login-signup #showForgot").addEventListener('click',(e)=>{
    e.preventDefault();
    toggleTab('forgot');
})