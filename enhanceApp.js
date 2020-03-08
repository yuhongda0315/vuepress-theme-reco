import postMixin from '@theme/mixins/posts'
import VModal from 'vue-js-modal'

export default ({
  Vue
}) => {
  Vue.use(VModal)
  Vue.mixin(postMixin)
}
