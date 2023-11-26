<script lang="ts">
    import Card from "./Card.svelte";

    export let id: number
    export let name: string
    export let amount: number
    export let prize: number
    export let unit: string

    let isNameEditable = true
    let isAmountEditable = true
    let isPrizeEditable = true

    const handleEditName = () => {
        isNameEditable = !isNameEditable
    }
    const handleEditAmount = () => {
        isAmountEditable = !isAmountEditable
    }
    const handleEditPrize = () => {
        isPrizeEditable = !isPrizeEditable
    }
</script>

<div>
    <Card>
        <div class="flex-row">
            <h1>Edit list</h1>
            <button>X</button>
        </div>
        <div class="flex-column">

            <form method="POST" action="?/edit">
                <div class="left-side">
                {#if isNameEditable}
                    <input type="hidden" hidden value={id} name="id">
                    <div>
                        <p>name</p>
                        <input type="text" hidden value={name} name="name" placeholder={name}>
                    </div>
                    <div>
                        <input type="radio" hidden>
                    </div>
                {/if}
                </div>
                <div class="left-side">
                    <div>
                        <p>amount</p>
                        <input type="text" hidden value={amount} name="amount" placeholder={amount.toString()}>
                    </div>
                    <div>
                        <p>unit</p>
                        <input type="text" hidden value={unit} name="unit" placeholder={unit}>
                    </div>
                </div>
                <div class="left-side">
                    <div>
                        <p>prize</p>
                        <input type="number" hidden value={prize} name="prize" placeholder={prize.toString()}>
                    </div>
                </div>
                <div class="submit-div">
                    <button type="submit">submit</button>
                </div>
            </form>
        </div>
    </Card>
</div>

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
        justify-content: space-around;
        align-items: center;
        width: 100%;
        gap: 20px;
    }
    .submit-div {
        padding-top: 10px;
    }
</style>




