<script lang="ts">
  import type { Service } from '$lib/types'
  export let service: Service

  const { id, name, icon, textPrimary, textSecondary, relatedSkills, relatedTags }: Service = service

  import Skills from './Skills.svelte'
  import Tags from './Tags.svelte'
  import Project from './Project.svelte'

  import { sortedProjects } from '$lib/stores/projects'
  import { ROUTES } from '$lib/config'
  import content from '$lib/stores/content'

  $: projects = $sortedProjects[id]

  $: getAnOffer = $content.sections.services.actions.getAnOffer
  $: portfolio = $content.sections.services.actions.portfolio
</script>

<article>
  <section class="content">
    <h1>
      <img src={icon} alt={name} />
      <span class="icon">{name}</span>
    </h1>
    <p class="primary">{textPrimary}</p>
    <p class="secondary">{textSecondary}</p>
    <Skills serviceId={service.id} skillIds={relatedSkills} />
    <Tags serviceId={service.id} tags={relatedTags} />

    <div class="CTAs">
      <a class="button md" href={ROUTES.CONTACT}>{getAnOffer}</a>
      <a class="button secondary md" href={ROUTES.PORTFOLIO}>{portfolio}</a>
    </div>
  </section>

  <section class="portfolio">
    {#if !projects || projects.length < 1}
      <div class="no-data">No projects were found with the given criteria</div>
    {:else}
      {#each projects.slice(0, 4) as project (project.id)}
        <Project {project} />
      {/each}
    {/if}
  </section>
</article>

<style lang="scss">
  article {
    // single column layout for mobile
    display: flex;
    align-items: start;
    flex-direction: column;

    gap: 5vw;
    margin-bottom: 10vh;

    // two column layout for desktop screens
    @include sm {
      flex-direction: row;

      // alternate the order of the sections
      &:nth-child(even) {
        flex-direction: row-reverse;
        right: 0;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;

    top: 15vh;
    left: 0;
    width: 100%;

    // fix position of content section on scroll
    @include sm {
      position: sticky;
    }

    h1 {
      @include title;
      display: flex;
      align-items: center;
      justify-content: start;

      img {
        height: 1em;
      }
    }

    p {
      &.primary {
        @include paragraph(1);
      }
      &.secondary {
        @include paragraph(2, Montserrat);
      }
    }

    .CTAs {
      display: flex;
      justify-self: start;
      align-items: flex-start;
      gap: 1rem;
      margin-top: 2rem;
    }
  }

  .portfolio {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    gap: 1rem;
    width: 100%;
  }
</style>
