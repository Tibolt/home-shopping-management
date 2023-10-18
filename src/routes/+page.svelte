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
</style>

<main>
    <div class="grid-home">
        <h1>Welcome to SvelteKit</h1>
        <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        <a href="/about">about</a>
    </div>
    <footer>
        <div class="copyright">Copyright 2023 House Managment App</div>
    </footer>
</main>
