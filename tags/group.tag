<group>
    
    <form class="form" id="group-form">
        <span class="close" onclick="toggleTab('main')"><img src="img/close.png"></span>
        <input class="form-input" type="text" name="groupName" placeholder="Group name" minlength="4" maxlength="32" required>
        <br>
        <select class="members" name="groupMembers" id="group_members" multiple size="10">
        </select><br>
        <button class="btn" type="submit">Create Group</button>
    </form>
</group>