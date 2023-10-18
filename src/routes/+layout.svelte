<script>
    import '../style.css'

    let click = false

    const toggleNav = () => {
        click = !click;
    }
    const disableNav = () => {
        click = false
    }
</script>

<nav class:clicked={click}>
    {#if click == true}
        <h1 on:click={toggleNav}>X</h1>
            <a href="/">Home</a>
            <a href="/list">List</a>
            <a href="/items">Items</a>
            <a href="/store">Store</a>
            <a href="/login">Login</a>
            <a href="/log-out">log-out</a>
    {:else}
        <h1 on:click={toggleNav}>Logo</h1>
        <div class="icons">
            <a href="/">H</a>
            <a href="/list">L</a>
            <a href="/items">I</a>
            <a href="/store">S</a>
            <a href="/login">L</a>
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
    }
</style>

