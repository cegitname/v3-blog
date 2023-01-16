import { defineComponent } from 'vue'
import { EvnentTypes } from './data'
export default defineComponent({
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
