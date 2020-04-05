import postMixin from '@theme/mixins/posts'
import routerMixin from '@theme/mixins/router'
import VModal from 'vue-js-modal'

export default ({
  Vue
}) => {
  Vue.use(VModal)
  Vue.mixin(postMixin)
  Vue.mixin(routerMixin)
}
