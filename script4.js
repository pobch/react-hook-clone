// useState() + useEffect()
// better version: support multiple useState and useEffect

const ParentScope = (() => {
  // save state and deps in the same array
  let hooks = []
  // pointer for each index
  let currentHook = 0

  return {
    useState(initValue) {
      _val = _val || initValue

      const setState = newVal => {
        _val = newVal
      }
      return [_val, setState]
    },
    useEffect(callback, deps) {
      const isDepsChanged = _deps ? _deps.some((val, i) => val !== deps[i]) : true
      if (isDepsChanged) {
        callback()
        _deps = deps
      }
    },
    // need to create render method in this module to reset 'currentHook'
    render(component) {
      let exe = component()
      exe.render()
      currentHook = 0
      return exe
    }
  }
})()

const App = () => {
  const [count, setCount] = ParentScope.useState(0)

  ParentScope.useEffect(() => {
    console.log('Effect was called, count:', count)
  }, [count])

  return {
    render() {
      console.log('Current count:', count)
      console.log('-------------- End of render ------------')
    },
    click() {
      console.log('Clicked')
      setCount(count + 1)
    },
    setSameState() {
      console.log('Set state to the same value as previous state')
      setCount(count)
    }
  }
}

// react renders the component
let exe = App()
exe.render()

// user interact
exe.click()

// react re-renders the component
exe = App()
exe.render()

exe.setSameState()

// react re-renders the component
exe = App()
exe.render()

// user interact
exe.click()

// react re-renders the component
exe = App()
exe.render()
