<sidenav>
    <input class="sidenav-input" id="searchUser" type="text" placeholder="Search (Press enter to search)" onchange="filterUser()">
    
    <div class="userWrap">
        <h3 style="text-align: center;margin: 5px;">Registered Users</h3>
        <ul class="sidenav-list" id="user_list"> 
        </ul>
        <h3 style="text-align: center;margin: 5px;">Registered Groups <span class="btn" onclick="makeGroup()">+</span></h3>
        <ul class="sidenav-list" id="group_list"> 
        </ul>
    </div>
    <div class="sidenav-footer">
        <h6>Invite Report About<h6>
        <h6>&copy; 2018 ChatsApp</h6>
    </div>
</sidenav>