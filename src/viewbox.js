
SVG.ViewBox = function(element) {
  var x, y, width, height
    , wm   = 1 /* width multiplier */
    , hm   = 1 /* height multiplier */
    , box  = element.bbox()
    , view = (element.attr('viewBox') || '').match(/-?[\d\.]+/g)
    , wElement = element
    , hElement = element

  /* get dimensions of current node */
  width  = new SVG.Number(element.width())
  height = new SVG.Number(element.height())

  /* find nearest non-percentual dimensions */
  while (width.unit == '%') {
    wm *= width.value
    width = new SVG.Number(wElement instanceof SVG.Doc ? wElement.parent.offsetWidth : wElement.parent.width())
    wElement = wElement.parent
  }
  while (height.unit == '%') {
    hm *= height.value
    height = new SVG.Number(hElement instanceof SVG.Doc ? hElement.parent.offsetHeight : hElement.parent.height())
    hElement = hElement.parent
  }
  
  /* ensure defaults */
  this.x      = box.x
  this.y      = box.y
  this.width  = width  * wm
  this.height = height * hm
  this.zoom   = 1
  
  if (view) {
    /* get width and height from viewbox */
    x      = parseFloat(view[0])
    y      = parseFloat(view[1])
    width  = parseFloat(view[2])
    height = parseFloat(view[3])
    
    /* calculate zoom accoring to viewbox */
    this.zoom = ((this.width / this.height) > (width / height)) ?
      this.height / height :
      this.width  / width

    /* calculate real pixel dimensions on parent SVG.Doc element */
    this.x      = x
    this.y      = y
    this.width  = width
    this.height = height
    
  }
  
}

//
SVG.extend(SVG.ViewBox, {
  // Parse viewbox to string
  toString: function() {
    return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height
  }
  
})