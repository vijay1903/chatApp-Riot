<navibar>
    <nav class="navbar">
        <h2 class="title">ChatsApp</h2>
        <input class="navbar-input" id="searchChat" type="text" placeholder="Search in chats" onchange='filterChat()'/>
        <div class="dropdown">
            <button class="btn btn-dropdown" id="usernameBtn" onclick="account()"></button>
            <button class="btn btn-dropdown" onclick="settings()">Settings</button>
            <button class="btn btn-dropdown btn-danger" onclick="logOut()">Logout</button>
        </div>
    </nav>
</navibar>