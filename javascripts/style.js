document.querySelector('login-signup #showLogin').addEventListener('click',()=>{
    if(document.querySelector('login').style.display = 'none')
        document.querySelector('login').style.display = 'initial';
    else // if(document.querySelector('login').style.display = 'initial')
        document.querySelector('login').style.display = 'none';
});

document.querySelector('login-signup #showSignup').addEventListener('click',()=>{
    if(document.querySelector('signup').style.display = 'none')
        document.querySelector('signup').style.display = 'initial';
    else // if(document.querySelector('signup').style.display = 'initial')
        document.querySelector('signup').style.display = 'none';
})

document.querySelector('login-signup #showForgot').addEventListener('click',()=>{
    if(document.querySelector('forgot').style.display = 'none')
        document.querySelector('forgot').style.display = 'initial';
    else // if(document.querySelector('forgot').style.display = 'initial')
        document.querySelector('forgot').style.display = 'none';
})