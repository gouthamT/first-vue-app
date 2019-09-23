<template>
  <tbody>
    <ViewableItem @click="showActionableContent = !showActionableContent" :id="id" />
    <transition name="bounce">
      <Actionable v-if="showActionableContent" :taskNumber="id" @hide="showActionableContent = false" />
    </transition>
  </tbody>
</template>

<script>
import ViewableItem from './ViewableItem.vue';
import Actionable from './Actionable.vue';
import { logger } from '../common/mixin';

export default {
  name: 'Item',
  mixins: [logger],
  data() {
    return { showActionableContent: false };
  },
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  components: { Actionable, ViewableItem },
  methods: {},
};
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.65s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
