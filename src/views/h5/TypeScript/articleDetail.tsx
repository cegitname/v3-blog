import { defineComponent } from 'vue'
import { EvnentTypes } from './data'
import Code from '@/components/preCode'
export default defineComponent({
  components: { preCode: Code },
  setup() {
    return () => {
      return (
        <>
          <h4>{EvnentTypes.title}</h4>

          {EvnentTypes.data.map((item) => (
            <preCode code={item}></preCode>
          ))}
        </>
      )
    }
  }
})
