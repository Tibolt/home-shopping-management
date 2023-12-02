<script lang="ts">
    import '../style.css'
    import CloseIcon from "~icons/ep/back"
    import HomeIcon from "~icons/clarity/home-line"
    import ListIcon from "~icons/ep/list"
    import StoreIcon from "~icons/lucide/box"
    import LoginIcon from "~icons/tabler/login"
    import LogoutIcon from "~icons/akar-icons/door"
    import { _ } from 'svelte-i18n'
    import { locale, locales, waitLocale, init } from 'svelte-i18n'

    import { browser } from '$app/environment'
    import "../lib/i18n" // Import to initialize. Important :)

    if (browser) {
        const lang = localStorage.getItem('locale')
        if (lang) {
            locale.set(lang)
        }
    }

    const setLocaleInLocalStorage = (locale: string) => {
        localStorage.setItem('locale', locale)
    }
    
 
    export let data
    let click = false

    const toggleNav = () => {
        click = !click;
    }
    const disableNav = () => {
        click = false
    }

    let auth = false
    const logout = () => {
        auth = false
    }
    $: auth = data.logged ? true : false

</script>

<nav class:clicked={click}>
    {#if click == true}
        <h1 on:click={toggleNav}><CloseIcon/></h1>
            <a href="/"><HomeIcon/>{$_('home')}</a>
            <a href="/list"><ListIcon/>{$_('list')}</a>
            <a href="/store/{data.storageId}"><StoreIcon/>{$_('storage')}</a>
            {#if auth == false}                
            <a href="/login"><LoginIcon/>{$_('login')}</a>
            {:else}
            <a data-sveltekit-preload-data="off" href="/log-out" on:click={logout}><LogoutIcon/>{$_('logout')}</a>
            {/if}
            <div class="langSelect">
                <p>{$_('lang')}</p>
                <select bind:value={$locale} on:change={()=>setLocaleInLocalStorage($locale)}>
                    {#each $locales as locale}
                        <option value={locale}>{locale}</option>
                    {/each}
                </select>
            </div>
    {:else}
        <h1 on:click={toggleNav}>Logo</h1>
        <div class="icons">
            <a href="/"><HomeIcon/></a>
            <a href="/list"><ListIcon/></a>
            <a href="/store/{data.storageId}"><StoreIcon/></a>
            {#if auth == false}
            <a href="/login"><LoginIcon/></a>
            {:else}
            <a data-sveltekit-preload-data="off" href="/log-out" on:click={logout}><LogoutIcon/></a>
            {/if}
            <!-- <button on:click={() => setLocale('en')}>English</button>
            <button on:click={() => setLocale('pl')}>Polski</button> -->
        </div>
    {/if}
    
</nav>
<body on:click={disableNav}>
    <slot></slot>
</body>

<style>

    nav{
        display: flex;
        align-items: start;
        justify-content: left;
        background: #49516F;
        position: fixed;
        width: 35px;
        height: 100%;
        flex-direction: column;
        padding-right: 20px;
        gap: 20px;
        padding-left: 10px;

    }

    .clicked {
        width: 20%;
    }   

    nav h1 {
        padding-bottom: 20px;
        padding-top: 10px;
    }

    .icons {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .langSelect {
        display: flex;
        flex-direction: row;
        margin-top: auto;
        gap: 20px;
        padding-bottom: 70px;
    }
    .langSelect p {
        color: var(--special-text);
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

    select {
        height: 30px;
        border-radius: 5px;
    }

    @media screen and (max-width: 600px) {

        @keyframes slideInLeft {
            from {
                transform: translateX(-30px);
            }
            to {
                transform: translateX(0);
            }
        }
        nav {
            height: 3em;
            justify-content: start;
            flex-direction: column;
            align-items: start;
            padding-left: 20px;
            gap: 20px;
            width: 100%;
            background: unset;
            
        }

        .clicked {
            height: 100%;
            background-color: #49516F;
            z-index: 9;
            width: 50px;
            animation: slideInLeft 90ms ease-in;
        }

        .icons {
            display: none;
        }

        .langSelect {
            flex-direction: column;
        }
    }
</style>

