<template>
  <div class="dropdown m-auto">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @click="onClick"
      v-on:keyup.enter="expandDropList"
      v-on:keyup.down="expandDropList"
    >{{ selectedLabel }}</button>
    <ul
      class="dropdown-menu"
      v-bind:class="{ show: isExpanded }"
      aria-labelledby="dropdownMenuButton"
    >
      <li
        class="dropdown-item"
        v-for="(item, index) in options"
        v-bind:key="index"
        v-on:click="setSelected(item)"
      >{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    selected: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      isExpanded: false,
      selectedLabel: this.selected.label,
    };
  },
  watch: {
    selected() {
      if (!this.selected || !this.selected.label) {
        this.selectedLabel = 'Cost code';
      } else {
        this.selectedLabel = this.selected.label;
      }
    },
  },
  methods: {
    onClick() {
      this.isExpanded = !this.isExpanded;
    },
    expandDropList() {
      this.isExpanded = true;
    },
    collapseDropList() {
      this.isExpanded = false;
    },
    setSelected(item) {
      this.$emit('setSelected', item);
      this.collapseDropList();
    },
  },
};
</script>


<style scoped>
.dropdown-item {
  cursor: pointer;
}
</style>
