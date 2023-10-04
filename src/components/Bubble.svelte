<script>

    export let name = ""

</script>

<style>
    .bubble {
        background-color: whitesmoke;
        padding: 10px;
        border-radius: 60px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        width: min-content;
    }
    h3 {
        color: blue;
    }
</style>


<div class="bubble">
    <h3><slot></slot></h3>
</div>