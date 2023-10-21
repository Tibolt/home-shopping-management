<script lang="ts">
    import Bubble from '../../../components/Bubble.svelte';
    import AddModal from '../../../components/addModal.svelte';
    import AddItemForm from '../../../components/addItemForm.svelte';
    import ItemsGrid from '../../../components/ItemsGrid.svelte';
    import Sugestion from '../../../components/Sugestion.svelte';
    import TextAutocomplete from '../../../components/TextAutocomplete.svelte';
    import type { PageData } from '../$types';
    import { enhance } from '$app/forms';

    let showAddModal = false

    let edit = false

    export let data: PageData;

    const toggleAddModal = () => {
        showAddModal = !showAddModal;
    }

    const toggleEdit = () => {
        edit = !edit;
    }

    const deleteItem = (id) => {
        // itemCount = itemCount.filter((item) => item.id != id);
        
    }

    const addItem = (e) => {
        // const item = e.detail;
        // itemCount = [...itemCount, item]
        toggleAddModal()
    }

    let itemCount = data.items;

    let sugestions = ["chleb", "mleko", "ser", "piwo"]
    let tempItems = []
</script>

<AddModal showAddModal={showAddModal} on:click}>
    <!-- <AddItemForm on:addItem={addItem} action="?/create">
        <h1 >Add New Item </h1>
        <div class="float">
            <label for="name">name</label>
            <input type="text" name="name" id="name" placeholder="type name of item" list="name-suggestions">
        </div>
        <div class="float">
            <label for="amount">amount</label>
            <input type="number" name="amount" id="amount" placeholder="type amount">
        </div>
        <datalist id="name-suggestions">
            {#each sugestions as sugestion}
                <option value={sugestion}></option>
            {/each}
        </datalist>
    </AddItemForm> -->
    <button on:click={toggleAddModal}>back</button>
    <AddItemForm on:click={toggleAddModal}></AddItemForm>
    
    <!-- <div class="addItem">
        <h1 >Add New Item </h1>
        <input type="text" name="name" id="name" placeholder="type name of item" list="name-suggestions">
        <div class="sugestions">
            {#each sugestions as sugestion}
                <Sugestion name={sugestion}/>
            {/each}
        </div>
        <datalist id="name-suggestions">
            {#each sugestions as sugestion}
                <option value={sugestion}></option>
            {/each}
        </datalist>
        <form method="POST" action="?/create">
            <Bubble><button class="btnUnset" on:click={toggleAddModal}>+</button></Bubble>
        </form>
    </div> -->
</AddModal>
<div class="parent">
    <h2>lista</h2>
    <ItemsGrid items={itemCount}/>
    <div class="bottom">
        <div class="corners">
            <Bubble><button class="btnUnset" on:click={toggleEdit}>Edit</button></Bubble>
            <Bubble><button class="btnUnset" on:click={toggleAddModal}>+</button></Bubble>
        </div>
    </div>
</div>

<style>
    .parent {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
        width: 100%;
        height: 95%;
        padding-top: 5em;
    }
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 20%;
        padding-top: 2em;
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
        justify-content: center;
        padding: 0 1em;
    }
    @media screen and (max-width: 600px) {

        .bottom {
            padding: 20px;
            bottom: 3%;
            display: inline-block;
            border-top: 2px solid #ddd;
        }
    }
    .btnUnset {
        all: unset;
    }
    .addItem {
        width: 100%;
    }
    
    .addItem input, p{
        width: 100%;
    }
    form {
        width: 100%;
        padding-top: 50px;
    }
    

    .center {
        display: grid;
        place-items: center;
        margin: 10% auto;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr;
    }
    .sugestions {
        display: flex;
        flex-direction: column;
    }
</style>