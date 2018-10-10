const nameOfUser = getCookie('name');
const usernameOfUser = getCookie('username');
const emailOfUser = getCookie('email');
const chatForm = document.querySelector('main #chat-form');

window.addEventListener('load', function(){
    if(usernameOfUser != ''){
        document.querySelector('#usernameBtn').innerHTML = document.querySelector('#usernameBtn').innerHTML +" "+ nameOfUser;
        if(getCookie('groupId') != ''){
            getChats(getCookie('groupId'));
        }
        if(getCookie('groupName') != ''){
            document.querySelector('#chatbar').innerHTML = getCookie('groupName') +'<span class="deleteChat" onclick="deleteChat(\''+getCookie('groupId')+'\')"><img src="img/bin.png" class="bin" alt="delete bin icon"></span>';
        }
    } else {
        deleteCookie('username');
        deleteCookie('name');
        deleteCookie('email');
        deleteCookie('groupId');
        deleteCookie('groupName');
        window.open('/','_self');
    }
})

function UpdateScroll() {
    document.querySelector("#chatWrapper").scrollTo(0,document.querySelector("#chatWrapper").scrollHeight);
}

var watchGroup = function(groupId){
    chatRef
    // .where('members','array-contains',usernameOfUser)
    // .where('members','array-contains',friend)
    .doc(groupId)
    .onSnapshot(
        (snap)=>{
            // console.log(snap.data());
        // (groups)=>{
        // groups.docs.forEach(group => {
            // if(group.data().members.indexOf(friend[i]) != -1){
                getChats(groupId);
                console.log('watching:',groupId);
            // }
        // });
    });
}

function toggleTab(tab){
    var tabs = [];
    if(window.outerWidth < 600)
        tabs = ['main','account','group','sidenav'];
    else
        tabs = ['main','account','group'];
    tabs.forEach(t => {
        if(tab == t) {
                document.querySelector(t).style.display = 'initial';
        } else {
                document.querySelector(t).style.display = 'none';
        }   
    });
}

var getAllUsers = function(term){
    userRef
    .get()
    .then(function(querySnapshot) {
        document.getElementById('user_list').innerHTML = '';
        document.getElementById('group_members').innerHTML = '';   
        querySnapshot.forEach((doc)=> {
            if(doc.data().name != getCookie('name')){
                var friend = doc.data().username;
                if(doc.data().name.match(term) || term == ''){
                    document.getElementById('user_list').innerHTML += '<li value="'+friend+'"><button onclick="createGroup([\''+friend+'\'],2)" >'+doc.data().name+'</button></li>';
                    document.getElementById('group_members').innerHTML += '<option value="'+doc.data().username+'">'+doc.data().name+'</option>';
                }
            }
        });
    })
    .catch(function(error){
        console.log("Error getting users: ", error);
    });
}

var getAllGroups = function(term){
    chatRef
    .where('members','array-contains',usernameOfUser)
    .get()
    .then(function(querySnapshot) {
        document.getElementById('group_list').innerHTML = '';   
        querySnapshot.forEach((doc)=> {
            if(doc.data().members.length > 2){
                var friends = '';
                var members_array = doc.data().members;
                for(var i = 0; i < members_array.length; i++){
                    friends += members_array[i];
                    if(i < members_array.length-1){
                        friends += "','";
                    }
                }
                if(doc.data().name.match(term) || term == ''){
                    document.getElementById('group_list').innerHTML += '<li value="'+doc.data().name+'"><button onclick="watchGroup(\''+doc.id+'\')" >'+doc.data().name+'</button></li>';
                }
            }
        });
    })
    .catch(function(error){
        console.log("Error getting groups: ", error);
    });
}

var createGroup = function(friends,group_name){     
    var groupFound = false;
    if(friends.length == 1){
        chatRef
        .where('members','array-contains',usernameOfUser)
        .get()
        .then((groups)=>{
            groups.forEach((group) => {
                if((group.data().members.indexOf(friends[0]) != -1) && (group.data().members.length == 2)){
                    console.log('Group found with these members :', group.data().members);
                    setCookie('groupId',group.id,24,'/');
                    groupFound = true;
                }
            });
            if(!groupFound){
                chatRef.add({
                    members: [usernameOfUser,friends[0]]
                }).then(function(group){
                    console.log("New group created with id :",group.id," and name: ",group_name, "and members: ", friends,usernameOfUser);
                    setCookie('groupId',group.id,24,'/');
                }).catch((err)=>{
                    console.log("Error creating group of two users: ", err);
                })
            }
        });
        userRef.where('username','==',friends[0]).get().then((snap)=>{
            snap.forEach((user) => {
                setCookie('groupName',user.data().name,24,"/");
                getChats(getCookie('groupId'));
            });
        }).catch((err)=>{
            console.log("Error getting friend's name for chatbar : ",err);
        });
    } else {
        console.log("Creating a group of multiple users.");
        chatRef
        .where('members','array-contains',usernameOfUser)
        .get()
        .then((groups)=>{
            console.log("Friends: ",friends);
            groups.forEach((group) => {
                console.log(group.data().members,"==",friends);
                if(group.data().members == friends){
                    console.log('Group found with these members :', group.data().members);
                    setCookie('groupId',group.id,24,'/');
                    groupFound = true;
                }
            });
            if(!groupFound){
                friends.push(usernameOfUser);
                console.log(friends);
                chatRef.add({
                    name: group_name,
                    members: friends
                }).then(function(group){
                    console.log("New group created with id :",group.id," and name: ",group_name, "and members: ", friends,usernameOfUser);
                    setCookie('groupId',group.id,24,'/');
                    setCookie('groupName',group_name,24,'/');
                }).catch((err)=>{
                    console.log("Error creating group : ", err);
                })
            }
        }).catch((err)=>{
            console.log("Error creating a group of more than 2 users : ",err);
        });
        chatRef.where('members','==',friends).get().then((snap)=>{
            snap.forEach((user) => {
                setCookie('groupName',user.data().name,24,"/");
                getChats(getCookie('groupId'));
            });
        }).catch((err)=>{
            console.log("Error getting group name for chatbar : ",err);
        });
    }
    if(window.outerWidth < 600){
        document.querySelector('#collapseBtn').click();
    }
    document.querySelector("#searchChat").value = '';
    document.querySelector("#searchUser").value = '';
    toggleTab('main');
}

function removeUser(){
    username = getCookie('username');
    if(window.confirm("Do you really want to delete this account? You would not be able to retrieve this account once deleted.")){
        var password = window.prompt("Please enter your password to delete this account","");
        userRef
        .where("username", "==", username)
        .get()
        .then(function(user) {
            if(user.docs.length == 1){
                user.docs.forEach(doc => {
                    if(doc.data().password === hash(password)){
                        userRef
                        .doc(username)
                        .delete()
                        .then(function(user) {
                            window.alert("You account was deleted. Thank you for using the service. Please signup to continue using this application.");
                            deleteCookie('username');
                            deleteCookie('name');
                            deleteCookie('email');
                            deleteCookie('groupId');
                            console.log("User Deleted and cookies removed.", user);
                        })
                        .catch(function(error) {
                            console.log("Error deleting user: ", error);
                        });   
                    } else {
                        window.alert("Wrong Password used.");
                    }
                })
            } else {
                window.alert("Something went wrong while deleting the account.");
            }
        })
    } else {
        window.alert("That was a good decision.");
    }

    
}

function getUser(){
    var username = getCookie('username');
    var userDetail = {};
    userRef
    .where('username','==',username)
    .get()
    .then((snapshot)=>{
        snapshot.forEach(user => {
            if(user.data().username == username)
                userDetail = user.data();
                // console.log(userDetail);
                document.querySelector("#acc_username").innerHTML = userDetail.username;
                document.querySelector("#acc_email").innerHTML = userDetail.email;
                document.querySelector("#acc_login").innerHTML = new Date(userDetail.lastLogin.toDate()).toLocaleString();
                document.querySelector("#acc_pass_change").innerHTML = new Date(userDetail.passwordUpdatedOn.toDate()).toLocaleString();
        });
    }).catch((err)=>{
        console.log("Error getting user details: ",err);
    })
    return userDetail;
}

function updateUser(id, field, value){
    userRef
    .where("id", "==", id)
    .get()
    .then(function(user) {
        return user;
    })
    .catch(function(error) {
        console.log("Error getting user: ", error);
    });
}

function getChats(group_id, term) {
    setCookie('groupId',group_id,24,"/");
    chatRef
    .doc(group_id)
    .get()
    .then(function(group) {
        if(group.data().name)
            setCookie('groupName',group.data().name,24,"/");
        document.querySelector('#chatbar').innerHTML = getCookie('groupName') +'<span class="deleteChat" onclick="deleteChat(\''+getCookie('groupId')+'\')"><img src="img/bin.png" class="bin" alt="delete bin icon"></span>';
        if(group.data().messages){
            // console.log('Messages for group: ', group.data().members);
            
            document.getElementById('chats').innerHTML = '';
            group.data().messages.forEach(element => {
                if(element.text.match(term) || term == ''){
                    var string = '';
                    if(element.sender == usernameOfUser){
                        string += '<li class=\"chat-list-item chat-sent\">'+element.text+'<br><sub>'+new Date(element.sentAt.toDate()).toLocaleString()+'</sub></li>';
                    } else {
                        string += '<li class=\"chat-list-item chat-received\">'+element.text+'<br><sub>';
                        if(group.data().members.length > 2){
                            string += '~'+element.sender+" ";
                        }
                        string += new Date(element.sentAt.toDate()).toLocaleString()+'</sub></li>';
                    }
                    document.getElementById('chats').innerHTML += string;
                }
            });
            UpdateScroll();
        } else {
            // window.alert("No message for this group.");
            document.getElementById('chats').innerHTML = 'No Messages';
            // console.log("No message for this group.");
        }
    })
    .catch(function(error) {
        console.log("Error getting chats: ", error);
    });
}

function sendChat(group_id, sender, text) {
    chatRef.doc(group_id)
    .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
            sender:sender,
            text:text,
            sentAt: new Date()
        })
    })
    .then(function(docRef) {
        UpdateScroll();
        getChats(group_id);
        console.log("Sent message to group with ID: ", group_id);
    })
    .catch(function(error) {
        console.error("Error sending message: ", error);
    });
}

function deleteChat(group_id) {
    if(window.confirm('Do you want to delete this chat group?')){
        // var gotName = window.prompt('Enter the name of group or friend you want to delete:','');
        chatRef
        .doc(group_id)
        .get()
        .then((group)=> {
            // if((gotName != '') && (group.data().name == gotName || group.data().members.indexOf(gotName) != -1) && (group.data().members.indexOf(usernameOfUser) != -1)){
                chatRef
                .doc(group_id)
                .delete()
                .then(()=>{
                    window.alert('The chat was deleted and cannot be retreived back! You can start a new chat session by selecting the user or creating a new group.');
                    console.log('Chat was deleted.');
                    location.reload();
                })
                .catch((err)=>{
                    console.log('Error deleting the chat : ',err);
                })
            // } else {
            //     window.alert("Chat could not be deleted. Name was incorect or you are not authorized to delete this chat.");
            //     console.log("Name or user incorect.");
            // }
        })
        .catch((err)=>{
            window.alert("Chat could not be deleted. You are not authorized to delete this chat.");
            console.log('Error getting chat for deletion: ',err);
        })
    }
}

getAllUsers();
getAllGroups();

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    // console.log(chatForm.text.value);
    if(getCookie('groupId')){
        sendChat(getCookie('groupId'),usernameOfUser,chatForm.text.value);
        chatForm.text.value = '';
    } else {
        window.alert('Please select a friend.');
    }
})

var logOut = function(){
    deleteCookie('username');
    deleteCookie('name');
    deleteCookie('email');
    // deleteSession(usernameOfUser);
    window.open('/','_self');
}

function filterUser() {
    var term = document.getElementById('searchUser').value;
    getAllUsers(term);
    getAllGroups(term);
}

function filterChat() {
    var term = document.getElementById('searchChat').value;
    getChats(getCookie('groupId'),term);
}

document.querySelector("#collapseBtn").addEventListener('click',(e)=>{
    e.preventDefault();
    var sidenav = document.querySelector("sidenav").style.display;
    if(sidenav == 'none'){
        toggleTab('sidenav');
    } else {
        toggleTab('main');
    }
})

function account() {
    getUser();
    toggleTab('account');
}

function makeGroup(){
    toggleTab('group');    
    document.querySelector("#group-form").addEventListener('submit',function(e) {
        e.preventDefault();
        var members = [];
        for (let i = 0; i < this.groupMembers.options.length; i++) {
            const element = this.groupMembers.options[i];
            if(element.selected == true){
                members.push(element.value);  
            }
        }
        console.log("Creating a group for : ",members);
        createGroup(members,this.groupName.value);
    })
}

function getGroupChats(groupId, groupName){
    setCookie('groupId',group_id,24,"/");
    setCookie('groupName',groupName,24,"/");
    getChats(groupId);

}