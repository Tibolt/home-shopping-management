<script lang="ts">
    import Card from "./Card.svelte";

    
</script>


<style>
    .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        padding: 20px 20px 0 20px;
        border-bottom: 2px solid var(--btn-bg);
    }
    .flex-column {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        width: 90%;
        gap: 10px;
        padding: 20px;
    }
    .left-side {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        width: 100%;
        gap: 20px;
    }
</style>

<div>
    <Card>
        <div class="flex-row">
            <h1>Edit list</h1>
            <button>X</button>
        </div>
        <div class="flex-column">
            <div class="left-side">
                <i>edit</i>
                <p>Edit name</p>
            </div>
            <div class="left-side">
                <i>share</i>
                <p>Share list</p>
            </div>
            <div class="left-side">
                <i>delete</i>
                <p>Delete list</p>
            </div>
        </div>
    </Card>
</div>




