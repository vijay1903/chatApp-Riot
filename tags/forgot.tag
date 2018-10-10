<forgot>
    <form class="form" id="forgot-form">
        <h2>Recover Password <span class="close" onclick="toggleTab('')"><img src="img/close.png"></span></h2>
        <label>Username</label>
        <input type="text" name="username" placehodler="Username" minlength="6" maxlength="32" required><br>
        <label>Email</label>
        <input type="email" name="email" placehodler="abc@example.com" required/><br>
        <button class="btn btn-block" id="verifyAccount">Verify Email</button><br>
        <label>Password</label>
        <input type="password" name="pass" placehodler="********" minlength="6" maxlength="32" required><br>
        <label>Re-enter Password</label>
        <input type="password" name="pass2" placehodler="********" minlength="6" maxlength="32" required><br>
        <button class="btn btn-danger btn-block" type="submit">Reset Password</button>
    </form>
</forgot>