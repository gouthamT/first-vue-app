<template>
  <input class="form-control font-weight-bold" type="text" :id="id" ref="datePicker" readonly v-bind="date" />
</template>

<script>
import Pikaday from 'pikaday';
import { type } from 'os';
import { randomDatePickerId } from '../common/utils';

export default {
  name: 'datePicker',
  data() {
    return {
      id: randomDatePickerId.next().value,
    };
  },
  props: {
    date: {
      type: Date,
    },
  },
  watch: {
    date() {

    },
  },
  mounted() {
    const today = new Date();
    const picker = new Pikaday({
      field: this.$refs.datePicker,
      defaultDate: today,
      setDefaultDate: true,
      maxDate: today,
      position: 'bottom left',
      onSelect: (e) => {
        this.$emit('onSelect', e);
      },
    });
  },
  methods: {},
};
</script>

<style scoped>
@import "~pikaday/css/pikaday.css";
input {
  cursor: pointer;
}
</style>
