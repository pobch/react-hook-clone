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

const exe = App()

exe.render()
exe.click()
exe.render()
exe.click()
exe.click()
exe.render()
