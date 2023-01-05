import { defineComponent } from 'vue'
import banner from './banner'
import style from './index.module.less'
export default defineComponent({
  components: { banner },
  setup() {
    const list = [
      {
        id: '1',
        icon: require('@/assets/logo.png'),
        name: 'H5',
        path: '/h5',
        desc: 'Some quick example text to build on the card title and make up the bulk of the card content.'
      },
      {
        id: '2',
        icon: require('@/assets/logo.png'),
        name: 'Read',
        path: '/read',
        desc: 'Some quick example text to build on the card title and make up the bulk of the card content.'
      }
    ]
    return () => {
      return (
        <div>
          <banner />
          <div class="row  g-3">
            {list.map((item) => {
              return (
                <div class="col-3">
                  <div class={['card', 'red']}>
                    <img src={item.icon} class={['card-img-top']} alt="" />
                    <div class="card-body">
                      <h5 class="card-title">{item.name}</h5>
                      <p class="card-text">{item.desc}</p>
                      <a href="#" class="btn btn-primary">
                        Go view
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }
})
