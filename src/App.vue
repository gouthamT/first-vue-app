<template>
  <main class="container">
    <template v-if="isLoading">
      <Spinner />
    </template>
    <template v-else>
      <ListView />
    </template>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Spinner from './components/Spinner.vue';
import ListView from './components/ListView.vue';

export default {
  name: 'app',
  components: { ListView, Spinner },
  created() {
    this.getTasksAction();
  },
  methods: {
    ...mapActions('userTasks', ['getTasksAction']),
  },
  computed: {
    ...mapGetters('app', { isLoading: 'isLoading' }),
  },
};
</script>

<style lang="scss">
@import "bootstrap/scss/bootstrap.scss";
</style>
