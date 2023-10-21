<script lang="ts">
    import ListDetails from '../../components/listDetails.svelte'
    import Bubble from '../../components/Bubble.svelte';
    import AddModal from '../../components/addModal.svelte';
    import AddListForm from '../../components/addListForm.svelte';
    import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
    import { redirect } from "@sveltejs/kit";
	import { item } from '$lib/db/schema';
	import { setContext } from 'svelte';

    function routeToPage(route: string, replaceState: boolean) {
        console.log(route)
        goto(`/${route}`, { replaceState }) 
    }

    export let data

    // const list_id = writable();
	// $: list_id.set(data.list_id);


    let showAddModal = false

    const toggleAddModal = () => {
        showAddModal = !showAddModal;
    }

    // const deleteItem = (id) => {
    //     itemList = itemList.filter((item) => item.id != id);
    // }

    const addItem = (e) => {
        const item = e.detail;
        itemList = [...itemList, item]
        toggleAddModal()
    }

    const routeToItems = (id) => {
        // setContext('list_id', id)
        routeToPage("list/"+id, false)
    }

    let itemList = data.lists
</script>

<AddModal showAddModal={showAddModal} on:click={toggleAddModal}>
    <AddListForm on:addItem={addItem} action="?/create">
        <h1 >Add New List </h1>
        <div class="float">
            <label for="name">name</label>
            <input type="text" name="name" id="name" placeholder="type name of item">
        </div>
        <div class="float">
            <label for="content">description</label>
            <input type="text" name="content" id="content" placeholder="type description">
        </div>
    </AddListForm>
</AddModal>
<div class="parent">
    <h2>lista</h2>
    <div class="grid">
        {#each itemList as list}
        <div class="item">
            <ListDetails name={list.name} on:click={() => routeToItems(list.id)}></ListDetails>
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
        grid-template-columns: 1fr;
        column-gap: 20%;
        padding-top: 2em;
        justify-content: center;
    }
    .item {
        padding-bottom: 1em;
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
</style>