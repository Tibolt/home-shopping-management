<script lang="ts">
    import Card from "../../components/Card.svelte"
    import { _ } from 'svelte-i18n'

    import type { ActionData } from './$types'

    export let form
</script>

<form method="POST" action="?/register">
    <Card>
        {form?.message || ""}
        <div class="grid">
            <h1>{$_('register')}</h1>
            <div class="float">
                <label for="email">Email<span class="reqField">*</span></label>
                <input type="email" id="email" name="email" placeholder={$_('typeYourEmail')} value={form?.email ?? ""} required>
            </div>
            <div class="float">
                <label for="name">{$_('personName')}<span class="reqField">*</span></label>
                <input type="text" id="name" name="name" placeholder={$_('typeYourName')} value={form?.name ?? ""} required>
            </div>
            <div class="float">
                <label for="password">{$_('password')}<span class="reqField">*</span></label>
                <input type="password" id="password" name="password" placeholder={$_('typeYourPass')} required>
            </div>
            <div class="float">
                <label for="password">{$_('confirmPass')}<span class="reqField">*</span></label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder={$_('typeYourPass')} required>
            </div>
            <div class="grid-buttons">
                <a href="/login" class="btn" style="">{$_('login')}</a>
                <button>{$_('createAccount')}</button>
            </div>
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
        margin: 10% auto;
        grid-template-rows: 2fr 3fr 2fr 3fr 2fr;
    }

    .grid-buttons {
    display: grid;
    place-items: center;
    margin: 15% auto;
    grid-template-rows: 1fr; 
    grid-template-columns: 1fr 1fr; 
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
    
    form :global(.card) {
        width: 250px;
    }
    </style>