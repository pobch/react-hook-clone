// replicate useState() + useEffect()
// but support only 1 useState and 1 useEffect maximum in a functional component

const ParentScope = (() => {
  // save state in useState's parent scope instead of in useState itself
  let _val
  // for useEffect
  let _deps

  return {
    useState(initValue) {
      _val = _val || initValue

      const setState = newVal => {
        _val = newVal
      }
      return [_val, setState]
    },
    useEffect(callback, deps) {
      _deps = _deps || deps // undefined, [], [....]
      console.log('_deps:', _deps)
      const isDepsChanged = _deps ? _deps.some((val, i) => val !== deps[i]) : true
      if (isDepsChanged) {
        callback()
      }
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
