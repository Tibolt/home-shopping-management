<script>
	import Card from "../../components/Card.svelte";

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
    grid-template-rows: 1fr 3fr; 
    grid-template-columns: 1fr 1fr; 
}

.center {
    display: grid;
    place-items: center;
    margin: 10% auto;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    
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
    border-radius: 10px;
}

input::placeholder {
    padding-left: 2px;
}

button {
    border-radius: 5 px;
    height: 25px;
    padding: 0 10px;
}

.btn {
    display: inline-block;
    text-align: center;
    line-height: normal;
    border: 1px solid;
    border-radius: 5px;
    border-style: outset;
    height: 25px;
    padding: 0 10px;
    background-color: buttonface;
    color: buttontext;
    padding-top: 4px;
}

</style>


<form method="POST" action="?/login">
    <Card>
        <div class="center">   
            <h1 >Welcome </h1>
            <div class="float">
                <label for="email">email</label>
                <input type="email" id="email" name="email" placeholder="type your email">
            </div>
            <div class="float">
                <label for="password">password</label>
                <input type="password" id="password" name="password" placeholder="type your password">
            </div>
        </div>
        <div class="grid">
            <h2 >Login</h2>
            <button class="float">Login</button>
            <a href="/register" class="btn" style="">Sign Up</a>
            <a href="/register" class="btn" style="">Forgot Password</a>
        </div>
    </Card>
</form>