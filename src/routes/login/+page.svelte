<script>
	import { date } from "drizzle-orm/mysql-core";
	import Card from "../../components/Card.svelte";
    import { user } from "../../stores";
    import { _ } from 'svelte-i18n'

    export let data  
    export let form;

    $:clearUser = data?.clearUser

    $:{
        if(clearUser) {
            user.set(undefined)
        }
    }
</script>


<form method="POST" action="?/login">
    <Card>
        {form?.message || ""}
        <div class="center">   
            <h1>{$_('login')}</h1>
            <div class="float">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder={$_('typeYourEmail')} value={form?.email ?? ""}>
            </div>
            <div class="float">
                <label for="password">{$_('password')}</label>
                <input type="password" id="password" name="password" placeholder={$_('typeYourPass')}>
            </div>
        </div>
        <div class="center-login">
            <button class="float">{$_('login')}</button>

        </div>
        <div class="grid">
            <a href="/register" class="btn" style="">{$_('register')}</a>
            <a href="/register" class="btn" style="">{$_('forgotPass')}</a>
        </div>
    </Card>
</form>


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
    margin: 15% auto;
    grid-template-rows: 1fr; 
    grid-template-columns: 1fr 1fr; 
}

.center {
    display: grid;
    place-items: center;
    margin: 10% auto;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
}

.center-login{
    display: grid;
    place-items: center;
    margin: 10% auto;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
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
    line-height: 30px;
    border: 1px solid;
    border-radius: 5px;
    border-style: outset;
    height: 30px;
    padding: 0 10px;
    background-color: buttonface;
    color: buttontext;
}

button {
        all: unset;
        display: inline-block;
        text-align: center;
        line-height: 30px;
        border: 1px solid;
        border-radius: 5px;
        border-style: outset;
        height: 30px;
        padding: 0 10px;
        background-color: buttonface;
        color: buttontext;
    }

</style>

