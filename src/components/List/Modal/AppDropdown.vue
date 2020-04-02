<template>
  <div class="st-desc">
    <a-dropdown :getPopupContainer="$e=>$e.parentNode">
      <a class="ant-dropdown-link" href="#">
        <a-icon v-if="$root.modalState === 'view'" type="ellipsis" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <a @click="$emit('changeState', 'edit')">Редактировать</a>
        </a-menu-item>
        <a-menu-item>
          <a-popconfirm
            :getPopupContainer="getConfirmContainer"
            placement="topLeft"
            @confirm="confirm"
            title="Are you sure？"
            okText="Да"
            cancelText="Нет"
          >
            <a>Удалить</a>
          </a-popconfirm>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      deleteVisble: false
    }
  },
  methods: {
    showEdit() {
      this.$parent.flag = 'edit'
    },
    deleteConfirm() {
      this.deleteVisble = true
    },
    confirm(e) {
      this.$emit('closeModal', false)
    },
    getConfirmContainer(e) {
      return document.getElementById('stDesc')
    }
  }
}
</script>
