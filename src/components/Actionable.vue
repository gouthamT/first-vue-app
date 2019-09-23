<template>
  <tr class="container collapse multi-collapse show">
    <td colspan="2">
      <div class="d-flex align-items-center flex-sm-row flex-column">
        <input
          type="text"
          class="m-auto form-control w-50 font-weight-bold"
          aria-label="Default"
          :readonly="isLoading"
          v-model="timeSpent"
        />
        <Dropdown
          :options="costCodeOptions"
          :selected="selectedCostCode"
          @setSelected="setSelectedCostCode"
        />
        <DatePicker @onSelect="onDatePicked" :date="date" />
        <textarea
          class="form-control m-auto font-weight-bold"
          aria-label="With textarea"
          v-model="notes"
          :readonly="isLoading"
        ></textarea>
        <button type="button" class="btn btn-primary m-auto" @click="logTime" :disabled="!isValid">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-if="isLoading"
          ></span>
          {{ logBtnLabel }}
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import axios from 'axios';
import Dropdown from './Dropdown.vue';
import DatePicker from './DatePicker.vue';
import { logger } from '../common/mixin';

export default {
  name: 'actionable',
  components: { Dropdown, DatePicker },
  mixins: [logger],
  created() {
    this.setSelectedCostCode(this.costCodeOptions[0]);
  },
  data() {
    return {
      costCodeOptions: [
        'Billable Hourly',
        'Billable Quoted',
        'Billable - Under Quote',
        'Billable - Over Quote',
        'Not Billable - Bug',
        'Not Billable - Internal',
        'Not Billable - Internal Budgeted',
        'Not Billable - Unsuccessful',
        'Not Billable - Successful Pre-Sale',
        'Not Billable - Sick Leave',
      ],
      timeSpent: '7h 30m',
      selectedCostCode: null,
      date: new Date(),
      notes: null,
      isLoading: false,
      isValid: false,
      logBtnLabel: 'Log Time',
    };
  },
  props: {
    taskNumber: {
      type: String,
      default: () => '',
    },
  },
  watch: {
    timeSpent() {
      this.isFormValid();
    },
    notes() {
      this.isFormValid();
    },
    date() {
      this.isFormValid();
    },
  },
  methods: {
    setSelectedCostCode(selectedCostCode) {
      this.selectedCostCode = { label: selectedCostCode } || null;
    },
    isFormValid() {
      if (
        !this.notes
        || !this.timeSpent
        || !this.date
        || !(
          this.timeSpent.includes('d')
          || this.timeSpent.includes('h')
          || this.timeSpent.includes('m')
        )
      ) {
        this.isValid = false;
        return;
      }
      this.isValid = true;
    },
    async logTime() {
      if (this.isLoading || !this.isValid) return;
      this.isLoading = true;
      this.logBtnLabel = 'Logging...';
      const data = {
        taskNumber: this.taskNumber,
        costCode: this.selectedCostCode.label,
        timeSpent: this.timeSpent,
        comment: this.notes,
        dateTime: this.getDateString(),
      };
      const response = await axios.post('http://localhost:3001/post', data);
      this.isLoading = false;
      this.logBtnLabel = 'Logged';
      this.$emit('hide');
    },
    onDatePicked(date) {
      this.date = date;
    },
    getDateString() {
      const day = this.date.getDate();
      const month = this.date.getMonth() + 1;
      const year = this.date.getFullYear();
      return `${year}-${month}-${day}T00:00:00.000+0000`;
    },
  },
};
</script>


<style lang="scss" scoped>
td {
  border: none;
}

button {
  flex: none;
}

.d-flex > * {
  margin-bottom: 0.5rem !important;
}

@media (min-width: 576px) {
  .d-flex > * {
    margin: 0.5rem !important;
  }
}
</style>
