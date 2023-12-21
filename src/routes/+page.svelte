<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { onMount } from 'svelte'
    import PWAPrompt from 'svelte-ios-pwa-prompt'
	import { browser } from '$app/environment'

    let deferredInstallEvent : any
    let installPrompt : boolean = false

    onMount(() => {
        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault()
            deferredInstallEvent = e
            installPrompt = true
        })
    })

    async function handleInstall() {
        const result = await deferredInstallEvent.prompt()
        console.log(`Install prompt was: ${result.outcome}`);
        // let choice = await deferredInstallEvent.userChoice
        // if (choice.outcome === "accepted") {
        // // User accepted to install the application
        // } else {
        // // User dismissed the prompt
        // }
        deferredInstallEvent = undefined
        installPrompt = false
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
        <h1>Grocery Listify</h1>
        <h3>{$_('description')}</h3>
        <p>{$_('shareDescription')}</p>
        <p>{$_('storageDescription')}</p>
        <p>{$_('installDescription')}</p>
        {#if installPrompt==true}
            <button class="install-button" on:click={handleInstall}>Install</button>
        {/if}
    </div>
    <footer>
        <div class="copyright">Copyright 2023 Grocery Listify</div>
    </footer>
</main>

<style>
    main {
        height: 90%;
    }
    .grid-home {
        display: grid;
        place-items: center;
        text-align: center;
        padding: 80px;
        background-color: #f8f9fa;
        height: 80%;
    }
    h1 {
        font-size: 2.5rem;
        color: #343a40; /* Dark text color */
        margin-bottom: 10px;
    }

    h3 {
        font-size: 1.5rem;
        color: #6c757d; /* Medium text color */
        margin-bottom: 10px;
    }

    p {
        font-size: 1rem;
        color: #6c757d; /* Medium text color */
        margin-bottom: 15px;
    }

    footer {
        text-align: center;
        width: 100%;
        margin-top: auto;
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
