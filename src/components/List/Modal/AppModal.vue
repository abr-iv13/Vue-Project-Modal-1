/* eslint-disable no-undef */
<template>
  <div>
    <a-modal
      wrapClassName="st-desc"
      :destroyOnClose="true"
      :visible="true"
      :footer="null"
      :maskClosable="true"
      :closable="false"
    >
      <div id="stDesc">
        <!-- ХЕДЕР -->
        <header>
          <span
            class="title-header"
            v-if="$parent.modalState === 'view'"
          >Описание статуса "{{ title }}"</span>
          <span class="title-header" v-else>Редактирование "{{ title }}"</span>
        </header>
        <div>
          <span class="x-close-modal" v-show="$parent.modalState === 'view'">
            <a-icon @click="$emit('closeModal', false)" type="close" />
          </span>
        </div>

        <!-- ХЕДЕР -->
        <app-drop
          @closeModal="$emit('closeModal', $event)"
          @changeState="$emit('changeState', $event)"
        ></app-drop>
        <template v-if="$parent.modalState === 'view'">
          <p>{{ text || 'Описание не задано' }}</p>
        </template>
        <template v-else-if="$parent.modalState === 'edit'">
          <a-textarea
            placeholder="Basic usage"
            :autosize="{ minRows: 6, maxRows: 6 }"
            v-model="text"
          ></a-textarea>
          <div class="button-header">
            <a-button @click="saveDescription">Сохранить</a-button>
            <a-button @click="$emit('changeState', 'view')">Отмена</a-button>
          </div>
        </template>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { get } from 'lodash'
import AppDrop from './AppDropdown'

export default {
  props: {
    title: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      flag: `view`,
      text: '',
      pipelineId: `need_to_put_here_id`,
      statusId: `need_to_put_here_id`
    }
  },
  mounted() {
    this.text = get(this.widget, `accountProduct.settings.${this.pipelineId}_${this.statusId}`, '')
  },
  components: { AppDrop },
  methods: {
    async saveDescription() {
      try {
        const {
          data: { item: accountProduct }
        } = await this.widget.$amodevApi.request({
          method: `PUT`,
          url: `/app/accounts/${this.widget.account.amoId}/products/${this.widget.accountProduct.id}`,
          data: {
            settings: {
              [`${this.pipelineId}_${this.statusId}`]: this.text
            }
          }
        })

        // обновляем в глобалке настройки, чтобы после перехода на новую страницу все было ок
        this.widget.SET({
          accountProduct
        })
        // TODO: прокидываем наверх, чтобы сохранить реактивность
        // this.$emit('setSettings', settings)
      } catch (e) {
        alert(`Ошибка при сохранении: ${e.message || e}`)
      }
      this.$emit('changeState', 'view')
    }
  }
}
</script>
