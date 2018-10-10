<navibar>
    <nav class="navbar">
        <button class="btn" id="collapseBtn"><img src="img/menu.png"></button>
        <h2 class="title"><img src="img/chat.png" alt="Chat Icon" style="height:25px;width:25px"> &nbsp;ChatsApp</h2>
        <input class="navbar-input" id="searchChat" type="text" placeholder="Search in chats (Press enter to search)" onchange='filterChat()'/>
        <div class="dropdown">
            <button class="btn" id="usernameBtn" onclick="account()"><img src="img/user.png" alt="User Icon" style="height:15px;width:15px"></button>
            <button class="btn btn-danger" onclick="logOut()"><img src="img/logout.png" alt="Search Icon" style="height:15px;width:15px"></button>
        </div>
    </nav>
</navibar>