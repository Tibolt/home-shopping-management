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
    import EditListForm from '../../components/editListForm.svelte';
    import FixedFooter from '../../components/fixedFooter.svelte';
    import AddIcon from "~icons/material-symbols/add"

    function routeToPage(route: string, replaceState: boolean) {
        console.log(route)
        goto(`/${route}`, { replaceState }) 
    }

    export let data

    // const list_id = writable();
	// $: list_id.set(data.list_id);


    let showAddModal = false

    let showEditForm = false

    let listId: number
    let listName: string
    let isMain: boolean

    const toggleAddModal = () => {
        showAddModal = !showAddModal;
    }

    const toggleEditForm = () => {
        showEditForm = !showEditForm;
    }

    const addItem = () => {
        toggleAddModal()
    }

    const routeToItems = (id) => {
        // setContext('list_id', id)
        routeToPage("list/"+id, false)
    }

    const editList = (id: number, name: string, main: boolean) => {
        console.log(id)
        listId = id
        listName = name
        isMain = main
        toggleEditForm()
    }

    let listsInfo = data.listsInfo
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
<AddModal showAddModal={showEditForm} on:click={toggleEditForm}>
    <EditListForm listId={listId} name={listName} isMain={isMain}></EditListForm>
</AddModal>
<div class="parent">
    <h2>lista</h2>
    <div class="grid">
        {#each listsInfo as list}
        <div class="item">
            <ListDetails name={list.list.name} itemCount={list.itemsCount} tickedCount={list.tickedItemsCount} on:route={() => routeToItems(list.list.id)} on:editList={() => editList(list.list.id, list.list.name, list.list.is_main)}></ListDetails>
        </div>
        {/each}

    </div> 

    <FixedFooter>
            <!-- <Bubble><button class="btnUnset">Edit</button></Bubble> -->
            <Bubble><button class="btnUnset" on:click={toggleAddModal}><AddIcon/></button></Bubble>
    </FixedFooter>
</div>

<style>
    .parent {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-content: center;
        align-items: center;
        width: 100%;
        height: 80%;
        padding-top: 5em;

    }
    .grid {
        display: flexbox;
        /* grid-template-columns: 1fr; */
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        width: 70%;
        height: 85%;
        /* padding-bottom: 10em; */
        overflow-y: auto;
        overflow-x: hidden;
    }
    .item {
        padding-bottom: 1em;
        padding-right: 2em;
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
        .grid {
           width: 90%;
        }
    }
    .btnUnset {
        all: unset;
    }
</style>