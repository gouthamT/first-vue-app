<template>
  <tr @click="onClick">
    <th scope="row">{{ task.key }}</th>
    <td>{{ task.summary }}</td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ViewableItem',
  created() {
    this.getTask();
  },
  data() {
    return {
      task: {},
    };
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
    getTask() {
      if (!this.tasks || !this.tasks.length) {
        return;
      }
      this.task = this.tasks.find(t => t.key === this.id);
    },
  },
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters('userTasks', { tasks: 'tasks' }),
  },
};
</script>

<style lang="scss" scoped>
tr:hover {
  cursor: pointer;
}
</style>
