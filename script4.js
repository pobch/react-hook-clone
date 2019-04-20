// useState() + useEffect()
// better version: support multiple useState and useEffect

const ParentScope = (() => {
  // save state and deps in the same array
  let hooks = []
  // pointer for each index
  let currentHook = 0

  return {
    useState(initValue) {
      hooks[currentHook] = hooks[currentHook] || initValue
      // setState will be called in the future, so we have to copy currentHook number here
      const currentIndx = currentHook
      currentHook++

      const setState = newVal => {
        hooks[currentIndx] = newVal
      }
      return [hooks[currentIndx], setState]
    },
    useEffect(callback, deps) {
      const isDepsChanged = hooks[currentHook]
        ? hooks[currentHook].some((val, i) => val !== deps[i])
        : true
      if (isDepsChanged) {
        callback()
        hooks[currentHook] = deps
      }
      currentHook++
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
  const [num, setNum] = ParentScope.useState(2)

  ParentScope.useEffect(() => {
    console.log('Effect was called, count:', count)
  }, [count])

  ParentScope.useEffect(() => {
    console.log('Effect-2 was called, num:', num)
  }, [num])

  return {
    render() {
      console.log('Current count:', count, 'Current num:', num)
      console.log('-------------- End of render ------------')
    },
    click() {
      console.log('Clicked')
      setCount(count + 1)
      setNum(num * 2)
    },
    setSameState() {
      console.log('Set state to the same value as previous state')
      setCount(count)
      setNum(num)
    }
  }
}

// react renders the component
let exe = ParentScope.render(App)

// user interact
exe.click()

// react re-renders the component
exe = ParentScope.render(App)

// set state with the same value (useEffect shouldn't be called)
exe.setSameState()

// react re-renders the component
exe = ParentScope.render(App)

// user interact
exe.click()

// react re-renders the component
exe = ParentScope.render(App)
