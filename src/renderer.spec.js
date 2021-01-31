const test = require('ava')
const {renderer} = require('./renderer.js')





let _element;

test.beforeEach(() => {

  _element = {
    getBoundingClientRect: () => ({ left: 0, top: 0 }),
    style: {
      transform: "",
      transformOrigin: "",
    }
  }
});

test('"panBy" should pan by passed originX and originY (x: 100, y: 100)', t => {

  const instance = renderer({ minScale: .1, maxScale: 20, element: _element })

  instance.panBy({ originX: 100, originY: 100 })

  t.is(
    _element.style.transform,
    'matrix(1, 0, 0, 1, 100, 100)'
  );
});

test('"panBy" should pan by passed originX and originY (x: 50, y: 50)', t => {

  const instance = renderer({ minScale: .1, maxScale: 20, element: _element })

  instance.panBy({ originX: 100, originY: 100 })
  instance.panBy({ originX: -50, originY: -50 })

  t.is(
    _element.style.transform,
    'matrix(1, 0, 0, 1, 50, 50)'
  );
});

test('"panBy" should pan by passed originX and originY (x: -50, y: 50)', t => {

  const instance = renderer({ minScale: .1, maxScale: 20, element: _element })

  instance.panBy({ originX: -100, originY: 100 })
  instance.panBy({ originX: 50, originY: -50 })

  t.is(
    _element.style.transform,
    'matrix(1, 0, 0, 1, -50, 50)'
  );
})


test('"panTo" should pan to passed originX and originY without changing scale (x: -50, y: -50)', t => {

  const instance = renderer({ minScale: .1, maxScale: 20, element: _element })

  instance.panTo({
    originX: -100,
    originY: 100,
    scale: 1,
  })

  instance.panTo({
    originX: -50,
    originY: -50,
    scale: 1,
  })

  t.is(
    _element.style.transform,
    'matrix(1, 0, 0, 1, -50, -50)'
  );
})

test('"panTo" should pan by passed originX and originY with scale 2 (x: 50, y: 50)', t => {

  const instance = renderer({ minScale: .1, maxScale: 20, element: _element })

  instance.panTo({
    originX: 100,
    originY: 100,
    scale: 2.0,
  })

  instance.panTo({
    originX: 50,
    originY: 50,
    scale: 2.0,
  })

  t.is(
    _element.style.transform,
    'matrix(2, 0, 0, 2, 50, 50)'
  );
})

test('"panTo" should pan by passed originX and originY with scale 1.0 and 2.5 (x: 750, y: 500)', t => {

  const instance = renderer({ minScale: .1, maxScale: 20, element: _element })

  instance.panTo({
    originX: 100,
    originY: 100,
    scale: 1.0,
  })

  instance.panTo({
    originX: 750,
    originY: 500,
    scale: 2.5,
  })

  t.is(
    _element.style.transform,
    'matrix(2.5, 0, 0, 2.5, 750, 500)'
  );
})



test('"zoom" should zoom to x: 100, y: 100 and scale: 1.1', t => {

  const instance = renderer({
    minScale: .1,
    maxScale: 20,
    element: {
      ..._element,
      getBoundingClientRect: () => ({
        top: 100,
        left: 50,
      })
    }
  })

  instance.zoom({
    x: 150,
    y: 200,
    deltaScale: 1,
  })

  t.is(
    _element.style.transform,
    'matrix(1.1, 0, 0, 1.1, 0, 0)'
  );

  t.is(
    _element.style.transformOrigin,
    '100px 100px'
  );
})

test('"zoom" should zoom to x: -2500, y: 4000px and scale: 0.5', t => {

  const instance = renderer({
    minScale: .1,
    maxScale: 20,
    element: {
      ..._element,
      getBoundingClientRect: () => ({
        top: -500,
        left: 0,
      })
    }
  })

  instance.zoom({
    x: 750,
    y: 1200,
    deltaScale: -15,
  })

  instance.zoom({
    x: -250,
    y: -100,
    deltaScale: 40,
  })

  t.is(
    _element.style.transform,
    'matrix(0.5, 0, 0, 0.5, 2925, -2070)'
  );

  t.is(
    _element.style.transformOrigin,
    '-2500px 4000px'
  );
})

test('"zoom" should zoom to x: 40px, y: 90px and scale: 20', t => {

  const instance = renderer({
    minScale: .1,
    maxScale: 20,
    element: {
      ..._element,
      getBoundingClientRect: () => ({
        top: -500,
        left: 0,
      })
    }
  })

  instance.zoom({
    x: 750,
    y: 1200,
    deltaScale: 25,
  })

  instance.zoom({
    x: 750,
    y: 1200,
    deltaScale: 40,
  })

  instance.zoom({
    x: 800,
    y: 1300,
    deltaScale: 20,
  })

  instance.zoom({
    x: 800,
    y: 1300,
    deltaScale: 25,
  })

  t.is(
    _element.style.transform,
    'matrix(20, 0, 0, 20, -2890, -6561.428571428572)'
  );

  t.is(
    _element.style.transformOrigin,
    '40px 90px'
  );
})