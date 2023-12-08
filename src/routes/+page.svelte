<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { onMount } from 'svelte'
    import PWAPrompt from 'svelte-ios-pwa-prompt'
	import { browser } from '$app/environment'

    let deferredInstallEvent : any
 
    onMount(() => {
        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault()
            deferredInstallEvent = e
        })
    })

    async function handleInstall() {
        deferredInstallEvent.prompt()
        let choice = await deferredInstallEvent.userChoice
        if (choice.outcome === "accepted") {
        // User accepted to install the application
        } else {
        // User dismissed the prompt
        }
        deferredInstallEvent = undefined
    }

    // const clickInstall = () => {
    //     if (!installPrompt) {
    //         return;
    //     }
    //     const result = await installPrompt.prompt();
    //     console.log(`Install prompt was: ${result.outcome}`);
    //     disableInAppInstallPrompt();
    // }

</script>

<main>
    {#if browser}
        <PWAPrompt/>
    {/if}
    <div class="grid-home">
        <h1>{$_('Hi')}</h1>
        <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        <a href="/about">about</a>
        {#if deferredInstallEvent}
            <button class="install-button" on:click={handleInstall}>Install</button>
        {/if}
    </div>
    <footer>
        <div class="copyright">Copyright 2023 House Managment App</div>
    </footer>
</main>

<style>
    .grid-home {
        display: grid;
        place-items: center;
    }
    footer {
        padding: 20px;
        text-align: center;
        bottom: 0;
        position: absolute;
        width: 100%;
    }
    main {
        padding-top: 5em;
    }
    .copyright {
        color: #aaa;
        font-size: 14px;
        display: inline-block;
        padding: 10px;
        border-top: 1px solid #ddd;
    }
    .install-button {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }
</style>
