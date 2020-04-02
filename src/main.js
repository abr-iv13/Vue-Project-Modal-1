/* base */
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import { Widget } from '@amodev/widget'
import { Table, Button, Select, notification, Icon, Row, Col, Modal, Dropdown, Menu, Input, Popconfirm } from 'ant-design-vue'

/* styles */
import './assets/css/index.scss'
import 'ant-design-vue/dist/antd.less'
// import 'ant-design-vue/dist/antd.css'

/* misc */
import './helpers/misc'

/* store */
import store from './store'

/* components */
import ListColumn from './components/List/Index.vue'

/* configs */
Vue.config.productionTip = false
moment.locale('ru')
notification.config({
  placement: 'bottomRight',
  bottom: '50px',
  duration: 3
})

/* usages */
Vue.use(Popconfirm)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Dropdown)
Vue.use(Modal)
Vue.use(Col)
Vue.use(Row)
Vue.use(Icon)
Vue.use(Select)
Vue.use(Table)
Vue.use(Button)
Vue.prototype.$notification = notification
Vue.prototype.$moment = moment

/* api & clean http instance */
Vue.prototype.$http = axios

export default class StatusesTemplate extends Widget {
  uuid = process.env.VUE_APP_AMODEV_UUID || ''

  /**
   * Вызывается один раз при инициализации (загрузке) виджета
   * В этом методе можно запросить настройки с бэкенда, а так же параллельно выполнить сразу все что нужно
   */
  async initialize() {
    Vue.prototype.widget = this

    // Инициализируем список
    await this.initList()
  }

  SET(opts) {
    Object.assign(this, opts)
  }

  /**
   * Инициализируем виджет в списке сделок
   */
  async initList() {
    this.lists = this.lists || []

    document.querySelectorAll('.pipeline_status__head').forEach(elem => {
      // ID селектора, в который будет биндится компонент
      const listID = `st_column_${elem.dataset.id}`

      // проверка #1 - чекаем элемент по ID в DOM
      if (!document.getElementById(listID)) {
        // создаем див-контейнер
        const listElem = document.createElement('div')

        // добавляем аттрибут
        listElem.setAttribute('id', listID)
        elem.querySelector('.pipeline_status__head_title').append(listElem)

        const elementTitle = elem.querySelector('.block-selectable').innerHTML

        this.lists.push(
          new (Vue.extend(ListColumn))({
            store,
            propsData: {
              id: listID,
              title: elementTitle,
              access: Object.assign({}, this.access),
              settings: Object.assign({}, this.settings)
            },
            el: `#${listID}`
          })
        )
      }
    })
  }
}
