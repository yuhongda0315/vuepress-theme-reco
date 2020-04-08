<template>
  <section
    class="sidebar-group rong-sidebar-group"
  >
    <router-link
      v-if="item.path"
      class="sidebar-heading clickable rong-sidebar-heading rong-root-heading"
      :class="{
        open,
        'active': isActive($route, item.path)
      }"
      :to="item.path"
    >
      {{ item.title }}
      
    </router-link>
  </section>
</template>

<script>
import { isActive } from '@theme/helpers/utils'

export default {
  name: 'SidebarRootLink',
  props: ['item', 'open', 'collapsable', 'depth'],
  methods: { isActive }
}
</script>
 
<style lang="stylus" scoped>
.sidebar-group
  .sidebar-group
    padding-left 0.5em
  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      cursor auto
      color var(--text-color)
  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left 0
    & > .sidebar-heading
      font-size 0.95em
      line-height 1.4
      font-weight normal
      padding-left 2rem
      &:not(.clickable)
        opacity 0.5
    & > .sidebar-group-items
      padding-left 1rem
      & > li > .sidebar-link
        font-size: 0.95em;
        border-left none
  &.depth-2
    & > .sidebar-heading
      border-left none

.sidebar-heading
  color $textColor
  transition color .15s ease
  cursor pointer
  font-size 0.9em
  font-weight bold
  // text-transform uppercase
  padding 0.35rem 1.5rem 0.35rem 1.25rem
  width 100%
  box-sizing border-box
  margin 0
  border-left 0.25rem solid transparent
  font-size 14px
  &.open, &:hover
    color var(--text-color)
  .arrow
    position relative
    top -0.12em
    left 0.5em

.sidebar-group-items
  transition height .1s ease-out
  font-size 0.95em
  overflow hidden

a.rong-root-heading.active
  color: #09f;
  background-color: #ECF3FF;

a.rong-root-heading:hover{
  color: #09f;
}
a.rong-root-heading {
  color: #333;
}
</style>
