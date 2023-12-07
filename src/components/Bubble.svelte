<script>

    export let name = ""
    export let width = "min-content"

</script>

<style>
    .bubble {
        background-color: var(--btn-bg);
        padding: 10px;
        border-radius: 60px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        width: min-content;
        text-align: center;
    }
    h3 {
        color: var(--btn-text);
    }
</style>


<div class="bubble" style="width: {width};" on:click>
    <h3><slot></slot></h3>
</div>