import start from './src'

start({
  routes: {
    test: {
      method: 'GET',
      params: {
        id: {
          type: 'number',
          required: true
        },
        test: 'string'
      },
      serialString: '%(name) %(id) %(length)'
    },
    post: {
      method: 'post',
      params: {
        as: 'string'
      },
      serialString: '%(name) a %(as)'
    }
  }, 
  serialconfig: {
    portId: '/dev/ttyACM0'
  }
})
