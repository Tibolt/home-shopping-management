<script>
    import ItemDetails from '../../components/ItemDetails.svelte'
    import Bubble from '../../components/Bubble.svelte';
    import AddModal from '../../components/addModal.svelte';
    import AddItemForm from '../../components/addItemForm.svelte';

    let showAddModal = false

    const toggleAddModal = () => {
        showAddModal = !showAddModal
    }

    let itemCount = [
        { name: "Bike", amount: 1},
        { name: "Book", amount: 3},
        { name: "Apple", amount: 6},
        { name: "Bike", amount: 1},
        { name: "Book", amount: 3},
        { name: "Apple", amount: 6}
    ];
</script>

<style>
    .parent {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
        width: 100%;
        height: 95%;
    }
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 20%;
        padding-top: 10em;
        justify-content: center;
    }
    .item {
        padding-bottom: 5em;
    }
    .bottom {
        position: fixed;
        bottom: 8%;
        width: 100%;
    }
    .corners {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding: 0 1em;
    }
    .btnUnset {
        all: unset;
    }
</style>

<AddModal showAddModal={showAddModal} on:click={toggleAddModal}>
    <AddItemForm/>
</AddModal>
<div class="parent">
    <div class="grid">
        {#each itemCount as item}
        <div class="item">
            <ItemDetails name={item.name} amount={item.amount} />
        </div>
        {/each}
    </div> 

    <div class="bottom">
        <div class="corners">
            <!-- <Bubble><button class="btnUnset">Edit</button></Bubble> -->
            <Bubble><button class="btnUnset" on:click={toggleAddModal}>+</button></Bubble>
        </div>
    </div>
</div>