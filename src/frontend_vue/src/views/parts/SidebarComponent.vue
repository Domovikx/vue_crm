<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SidebarComponent',
  props: ['value'],
  data: () => ({
    links: [
      { title: 'Счет', url: '/', exact: true },
      { title: 'История', url: '/history' },
      { title: 'Планирование', url: '/planning' },
      { title: 'Новая запись', url: '/record' },
      { title: 'Категории', url: '/categories' },
    ],
  }),
});
</script>

<template>
  <ul class="sidebar" :class="{ open: value }">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      :exact="link.exact"
      tag="li"
      active-class="active"
      class="btn"
    >
      {{ link.title }}
    </router-link>
  </ul>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/_fonts.scss';

.sidebar {
  background-color: #445a6d;
}
.btn {
  font-family: $font__Lora;
  display: block;
  text-align: left;
  padding: 5px;
}
</style>
