<script lang="ts">
    import Card from "../../components/Card.svelte"

    import type { ActionData } from './$types'

    export let form: ActionData
</script>


<style>

form {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    margin-top: -50px;
}

.grid {
    display: grid;
    place-items: center;
    margin: 10% auto;
    grid-template-rows: 2fr 3fr 2fr 3fr 2fr;
}

/* label {
     width:80px;
     height:20px;
     position:relative;
     right: 50px;
     top: 6px;
     border-radius:12px;
     background:#708090;
     color:white;
     text-align:center;
     vertical-align:bottom;
} */

.float {
    float: left;
}

label, input {
    display:block;
}

input {
    height: 25px;
    border: none;
    background-color: rgb(214, 208, 208);
    border-radius: 5px;
}

input::placeholder {
    padding-left: 2px;
}

button {
    border-radius: 5 px;
    height: 25px;
    padding: 0 10px;
}

form :global(.card) {
    width: 250px;
}
</style>

<form action="?/register" method="POST">
    <Card>
        <div class="grid">
            <h1>Register</h1>
            <div class="float">
                <label for="email">Email<span class="reqField">*</span></label>
                <input type="email" id="email" name="email" placeholder="Type your email">
            </div>
            <div class="float">
                <label for="password">Password<span class="reqField">*</span></label>
                <input type="password" id="password" name="password" placeholder="Type your password">
            </div>
            <div class="float">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Type your name">
            </div>
            
            <button>Create Account</button>
        </div>
    </Card>
</form>