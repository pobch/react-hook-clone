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

let exe = App()
exe.render()

exe.click()

exe = App()
exe.render()

exe.click()

exe = App()
exe.render()

exe.click()

exe = App()
exe.render()
