<script lang="ts">
    import Card from "./Card.svelte";
    import { _ } from 'svelte-i18n'
    import CloseIcon from "~icons/ep/back"
    import Bubble from "./Bubble.svelte";

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
        <Bubble><button on:click><CloseIcon/></button></Bubble>
        <div class="flex-row">
            <h1>{$_('edit')}</h1>
        </div>
        <div class="flex-column">

            <form method="POST" action="?/edit">
                <div class="left-side">
                {#if isNameEditable}
                    <input type="hidden" hidden value={id} name="id">
                    <div>
                        <p>{$_('name')}</p>
                        <input type="text" hidden value={name} name="name" placeholder={name} style="width: 250px;">
                    </div>
                {/if}
                </div>
                <div class="left-side">
                    <div>
                        <p>{$_('amount')}</p>
                        <input type="number" hidden value={amount} name="amount" placeholder={amount.toString()}>
                    </div>
                    <div>
                        <p>{$_('unit')}</p>
                        <select name="unit">
                                <option value=""></option>
                                <option value="g">g</option>
                                <option value="dag">dag</option>
                                <option value="kg">kg</option>
                                <option value="ml">ml</option>
                                <option value="l">l</option>
                        </select>
                        <!-- <input type="text" hidden value={unit} name="unit" placeholder={unit}> -->
                    </div>
                </div>
                <div class="left-side">
                    <div>
                        <p>{$_('prize')}</p>
                        <input type="number" hidden value={prize} name="prize" placeholder={prize.toString()} step="0.01">
                    </div>
                </div>
                <div class="submit-div">
                    <button type="submit" class="add-btn">{$_('submit')}</button>
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

    button {
        all: unset;
    }
    
    .add-btn {
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
</style>




