<script lang="ts">
  import type { Service as TypeService } from '$lib/types'
  import services from '$lib/stores/services'

  import Service from '$lib/components/services/Service.svelte'
  import { onMount } from 'svelte'
</script>

<section id="services">
  {#each $services as service}
    <Service {service} />
  {/each}
</section>

<style lang="scss">
  section {
    @include section;
  }
</style>
