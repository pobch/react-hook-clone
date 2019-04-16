const ParentScope = (() => {
  // save state in useState's parent scope instead of in useState itself
  let _val

  return {
    useState(initValue) {
      _val = _val || initValue

      const setState = newVal => {
        _val = newVal
      }
      return [_val, setState]
    }
  }
})()

const App = () => {
  const [count, setCount] = ParentScope.useState(0)

  return {
    render() {
      console.log('Current count:', count)
    },
    click() {
      console.log('Clicked')
      setCount(count + 1)
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

// user interact
exe.click()

// react re-renders the component
exe = App()
exe.render()
