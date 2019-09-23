<template>
  <div class="table-responsive-sm">
    <table class="table table-hover table-dark mt-5">
      <thead>
        <tr>
          <th scope="col">Jira Number</th>
          <th scope="col">Summary</th>
        </tr>
      </thead>
      <template v-for="item in actionableItems">
        <Item v-bind:key="item.key" :id="item.key" />
      </template>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Item from './Item.vue';

export default {
  name: 'ListView',
  computed: {
    ...mapGetters('userTasks', { actionableItems: 'tasks' }),
  },
  components: { Item },
};
</script>
