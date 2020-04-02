<template>
  <div :id="id" class="st-desc">
    <a-row type="flex" justify="end">
      <a-col :span="1">
        <a-icon type="info-circle" @click="showModal" />
      </a-col>
    </a-row>
    <app-modal
      v-if="visible"
      @closeModal="visible = $event"
      :title="title"
      @changeState="modalState = $event"
    ></app-modal>
  </div>
</template>
<script>
import AppModal from './Modal/AppModal'

export default {
  name: `list_column`,
  components: { AppModal },
  props: {
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    settings: {
      type: Object,
      default: () => {}
    },
    access: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      modalState: `view`
    }
  },
  methods: {
    showModal() {
      this.visible = !this.visible
    }
  }
}
</script>
