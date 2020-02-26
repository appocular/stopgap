
export const toggleModal = ({state}) => {
  state.bugreport.open = !state.bugreport.open
}

export const setEmail = ({state}, email) => {
  state.bugreport.email = email
}


export const resetBugreport = ({state}) => {
  state.bugreport.email = ''
  state.bugreport.description = ''
  state.bugreport.open = false
  state.bugreport.submitted = false
}

export const setDescription = ({state}, description) => {
  state.bugreport.description = description
}

export const submitBug = ({state, effects}) => {
  // Append scroll offset, it might be relevant in some cases.
  let top  = window.pageYOffset || document.documentElement.scrollTop,
      left = window.pageXOffset || document.documentElement.scrollLeft,
      height = window.innerHeight,
      width = window.innerWidth,
      userAgent = window.navigator.userAgent

  effects.bugreport.submitBug({
    url: window.location.href,
    email: state.bugreport.email,
    description: state.bugreport.description +
      `\n\nViewport size: height: ${height}, width: ${width}\nScroll offset: top: ${top}, left: ${left}\nUser agent (perhaps): ${userAgent}`,
  });

  state.bugreport.submitted = true
}
