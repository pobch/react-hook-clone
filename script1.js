const useState = initValue => {
  let _val = initValue

  const state = () => {
    return _val
  }

  const setState = newVal => {
    _val = newVal
  }

  return [state, setState]
}

const App = () => {
  const [count, setCount] = useState(0)

  return {
    render: () => {
      console.log('Current count:', count())
    },
    click: () => {
      console.log('Clicked')
      setCount(count() + 1)
    }
  }
}

// Flaws:
// 1. `state` returned from `useState` is a function, we want it to be variable
// 2. `App` functional component can be called only once, otherwise we will lose the state

// call `App` component
let exe = App()

exe.render()
exe.click()
exe.render()
exe.click()
exe.click()
exe.render()

// if we call the component 2nd time
console.log('======================')
exe = App()
// we will lose the state
exe.render()
