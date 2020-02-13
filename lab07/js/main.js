function $(x) {
  return document.getElementById(x)
}

function isNum(num) {
  return !isNaN(num)
}

window.press = function (what) {
  // if a numeral
  if (isNum(what.value)) {
    if ($('display').innerHTML === "0")
      $('display').innerHTML = what.value
    else
      $('display').innerHTML += '' + what.value
  } else if (what.value == '.') {
    if ($('display').innerHTML == 0)
      $('display').innerHTML = '0.'
    // else if there's already a decimal, do nothing.
    else if (/\.\d*$/.test($('display').innerHTML))
      return
    else
      $('display').innerHTML += '.'
  } else if (what.value == 'C') {
    $('display').innerHTML = 0
  }
  // backspace
  else if (what.value == '←') {
    keypress({charCode: 8})
  } else {
    var d = $('display').innerHTML

    // if user started entering a negative, abort it.
    if (d.substring(d.length - 1) == '-')
      $('display').innerHTML = d.substring(0, d.length - 1)

    // if display already contains an operator, remove it
    if (/ [^\d\.] $/.test($('display').innerHTML)) {

      // ... unless entry is a minus, in which case
      // prepare for negative number instead.
      if (what.value == '-') {
        $('display').innerHTML += '-'
        return
      }

      // Not a minus.  Carry on.
      d = d.substring(0, d.length - 3)
      $('display').innerHTML = d
    } else {
      // if nothing was removed, do calculation
      calculate()
    }
    // surround operators with a space on each side
    if (what.value != '=')
      $('display').innerHTML += ' ' + what.value + ' '
  }
}

function calculate() {
  var seq = $('display').innerHTML

  // match operators as whatever is surrounded by spaces
  matchArr = seq.match(/ (.) /)

  // if no operator, return.
  if (matchArr === null) return

  // "match" results in an array.  We only need the first parenthetical.
  op = matchArr[1]

  // match numbers as everything else
  numbers = seq.split(matchArr[0])

  // avoid using "eval" just on principle.
  switch (op) {
    case "/":
      if (!(numbers[1] * 1)) {
        $('display').innerHTML = '(╯°□°）╯︵ ┻━┻'
        return
      }
      var res = numbers[0] / numbers[1]
      break
    case "*":
      var res = numbers[0] * numbers[1]
      break
    case "-":
      var res = numbers[0] - numbers[1]
      break
    case "+":
      // multiply * 1 does the same thing as parseInt()
      var res = numbers[0] * 1 + numbers[1] * 1
      break
  }

  // set precision and output
  if ((res + '').length > 11)
    res = res.toPrecision(11)

  // Despite MDN documentation, toPrecision() returns a number, not a string.
  res += ''

  // strip off useless zeroes and / or trailing decimal from end of float
  while (res.indexOf('.') > -1 && /[0\.]$/.test(res))
    res = res.substring(0, res.length - 1)

  $('display').innerHTML = res
}

var keypad = [
    [7, 8, 9, '/'],
    [4, 5, 6, '*'],
    [1, 2, 3, '-'],
    [0, '.', 'C', '+'],
    ['←', '=']
  ],
  output = []

// Generate keypad
for (var i = 0; i < keypad.length; i++) {
  for (var j = 0; j < keypad[i].length; j++) {
    output.push('<button value="' + keypad[i][j] + '"'
      + 'onclick="press(this)">'
      + keypad[i][j] + '</button>')
  }
  output.push('<br />')
}
$('keypad').innerHTML = output.join('\n')

function keypress(e) {
  e = e || event
  key = e.keyCode || e.charCode

  console.log(key)

  // ignore ctrl+keypress to preserve ctrl+c copy capability
  if (e.ctrlKey) return

  var prevent = function (e) {
    // prevent "/" from activating Firefox "quick find", backspace from going back, etc
    if (typeof e.preventDefault === 'function')
      e.preventDefault()
  }

  // treat enter as equals
  if (key == 13) key = 61

  // backspace
  if (key == 8) {
    var d = $('display').innerHTML
    if (d.substring(d.length - 1) == ' ')
      d = d.substring(0, d.length - 3)
    else
      d = d.substring(0, d.length - 1)
    // if d is empty, make d=0.
    if (d == '') d = 0
    $('display').innerHTML = d
    prevent(e)
    return
  }

  var buttons = $('keypad').getElementsByTagName('button')
  for (var i = 0; i < buttons.length; i++) {
    if (String.fromCharCode(key).toUpperCase() == buttons[i].value) {
      press(buttons[i])
      prevent(e)
      break
    }
  }
}

window.onkeypress = keypress

// code to make calculator draggable
var grab = {
  state: 0,
  calc: {x: 0, y: 0},
  mouse: {x: 0, y: 0},
  thingy: null
}

document.onmousedown = function (e) {
  e = e || event
  var el = e.srcElement || e.target
  if (el.id.indexOf('outer-display') > -1)
    while (el.className.indexOf('grab') == -1)
      el = el.parentNode
  if (el.className.indexOf('grab') == -1) return
  el.className = 'grabbing'
  grab.thingy = offsetEl = el
  grab.calc.x = grab.calc.y = 0
  do {
    grab.calc.x += offsetEl.offsetLeft
    grab.calc.y += offsetEl.offsetTop
  } while (offsetEl = offsetEl.offsetParent)
  with (grab) {
    state = 1
    mouse.x = e.clientX
    mouse.y = e.clientY
  }
}
document.onmouseup = function (e) {
  grab.state = 0
  if (grab.thingy) {
    grab.thingy.className = 'grab'
    grab.thingy = null
  }
}
document.onmousemove = function (e) {
  e = e || event
  if (!grab.state) return
  var diffX = (e.clientX - grab.mouse.x),
    diffY = (e.clientY - grab.mouse.y)
  with (grab.thingy.style) {
    left = grab.calc.x + diffX + 'px'
    top = grab.calc.y + diffY + 'px'
  }
}
