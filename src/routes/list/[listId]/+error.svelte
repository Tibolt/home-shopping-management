<script>
    import { page } from '$app/stores';
    import { _ } from 'svelte-i18n'
</script>
  
<h1>{$page.status}: {$page.error.message}</h1>
{#if $page.status === 500}
    <p>{$_('500Error')}</p>
{/if}

<style>
    p {
        text-align: center;
        color: var(--red)
    }
</style>