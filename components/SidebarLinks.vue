<template>
  <ul class="sidebar-links rong-sidebar-links" v-if="items.length">
    <li v-for="(item, i) in items" :key="i">
      <SidebarGroup
        v-if="item.type === 'group'"
        :item="item"
        :open="i === openGroupIndex"
        :collapsable="item.collapsable || item.collapsible"
        :depth="depth"
        @toggle="toggleGroup(i)"
      />
      <SidebarRootLink v-else-if="item.isRoot" :item="item" />
      <SidebarLink v-else :sidebarDepth="sidebarDepth" :item="item" />
    </li>
  </ul>
</template>

<script>
import SidebarGroup from "@theme/components/SidebarGroup";
import SidebarLink from "@theme/components/SidebarLink";
import SidebarRootLink from "@theme/components/SidebarRootLink";
import { isActive } from "@theme/helpers/utils";

export default {
  name: "SidebarLinks",

  components: { SidebarGroup, SidebarLink, SidebarRootLink },

  props: [
    "items",
    "depth", // depth of current sidebar links
    "sidebarDepth" // depth of headers to be extracted
  ],

  data() {
    return {
      openGroupIndex: 0
    };
  },

  created() {
    this.refreshIndex();
  },

  watch: {
    $route() {
      this.refreshIndex();
    }
  },

  methods: {
    refreshIndex() {
      const index = resolveOpenGroupIndex(this.$route, this.items);
      if (index > -1) {
        this.openGroupIndex = index;
      }
    },

    toggleGroup(index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index;
    },

    isActive(page) {
      return isActive(this.$route, page.regularPath);
    }
  }
};

let isGroup = item => {
  return item.type === "group";
};
let isSome = (items, route) => {
  return items.some(c => {
      let isPage = c.type === "page";
      if (isPage) {
        return isActive(route, c.path);
      } else {
        return isSome(c.children, route);
      }
    });
};

function resolveOpenGroupIndex (route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    let childrend = item.children || [];
    let _isSome = isSome(childrend, route);
    if (isGroup(item) && _isSome) {
      return i;
    }
  }
  return -1;
}
</script>
