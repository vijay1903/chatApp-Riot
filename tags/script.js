
riot.tag2('chats', '<div class="chatWrapper"> <div class="chats"> <ul class="chat-list" id="chats"> </ul> </div> </div>', '', '', function(opts) {
});
riot.tag2('forgot', '<form id="forgot-form"> <h2>Recover Password</h2> <label>Username</label> <input type="text" name="username" minlength="6" maxlength="32" required><br> <label>Email</label> <input name="email" required type="email"><br> <button class="btn btn-block" id="verifyAccount">Verify Email</button><br> <label>Password</label> <input type="password" name="pass" minlength="6" maxlength="32" required><br> <label>Re-enter Password</label> <input type="password" name="pass2" minlength="6" maxlength="32" required><br> <button class="btn btn-danger btn-block" type="submit">Reset Password</button> </form>', '', '', function(opts) {
});
riot.tag2('login-signup', '<div id="selector"> <button class="btn btn-xl" id="showLogin">Login</button> or <button class="btn btn-xl" id="showSignup">Sign up</button> <br> <button class="btn" id="showForgot">Forgot password</button> </div> <br> <signup class="form"></signup> <br> <login class="form"></login> <br> <forgot class="form"></forgot>', '', '', function(opts) {
});
riot.tag2('login', '<form id="login-form"> <h2>Login</h2> <label>Username</label> <input type="text" name="username" minlength="4" maxlength="32" required><br> <label>Password</label> <input type="password" name="pass" minlength="8" maxlength="32" required><br> <button class="btn btn-block" type="submit">Login</button> </form>', '', '', function(opts) {
});
riot.tag2('main', '<chats></chats> <form class="message-form" id="chat-form"> <input class="message-input" type="text" name="text"> <button class="btn btn-send" type="submit">Send</button> </form>', '', '', function(opts) {
});
riot.tag2('navibar', '<nav class="navbar"> <h2 class="title">ChatsApp</h2> <div class="dropdown"> <input class="navbar-input" type="text" placeholder="Search in chats"> <button class="btn btn-dropdown" id="usernameBtn">&nbsp;&nabla;</button> <ul class="dropdown-list"> <li>Account</li> <li>Settings</li> <li><button class="btn btn-nav" onclick="logOut()">Logout</button></li> </ul> </div> </nav>', '', '', function(opts) {
});

riot.tag2('sidenav', '<input class="sidenav-input" type="text" placeholder="Search"> <h3 style="text-align: center;margin: 5px;">Registered Users</h3> <div class="userWrap"> <ul class="sidenav-list" id="user_list"> </ul> </div> <div class="sidenav-footer"> <h6>Invite Report About<h6> <h6>&copy; 2018 ChatsApp</h6> </div>', '', '', function(opts) {
});
riot.tag2('signup', '<form id="signup-form"> <h2>Signup</h2> <p>{this.error}</p> <label>UserName</label> <input type="text" name="username" maxlength="32" minlength="6" required><br> <label>Name</label> <input type="text" name="name" maxlength="50" minlength="6" required><br> <label>Email</label> <input name="email" required type="email"><br> <label>Password</label> <input type="password" name="pass" maxlength="32" minlength="8" required><br> <label>Re-enter Password</label> <input type="password" name="pass2" maxlength="32" minlength="8" required><br> <button class="btn btn-block" type="submit">Sign Up</button> </form>', '', '', function(opts) {
});
