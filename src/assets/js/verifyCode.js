import getRandomColor from './randomColor'
/**生成验证码canvas */
export default function getVerifyCode(codeArr) {
  let code = ''
  var canvas_width = document.getElementById('canvas').clientWidth
  var canvas_height = document.getElementById('canvas').clientHeight
  var canvas = document.getElementById('canvas') //获取到canvas
  canvas.height = 28
  canvas.width = 70
  var context = canvas.getContext('2d') //获取到canvas画图的环境
  let codeTpl = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
  ]
  let length = codeTpl.length
  for (let i = 0; i < 4; i++) {
    let text = codeTpl[parseInt(Math.random() * length)] //随机字符
    codeArr[i] = text
    code += text
    let x = 10 + i * 15
    let y = Math.random() * 8 + 4
    context.beginPath()
    context.font = 'bold 18px 微软雅黑'
    context.translate(0, 0)
    context.fillStyle = getRandomColor()
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.fillText(text, x, y)
  }
  for (let i = 0; i < 20; i++) {
    context.strokeStyle = getRandomColor()
    context.beginPath()
    let x = Math.random() * canvas_width
    let y = Math.random() * canvas_height
    context.moveTo(x, y)
    context.lineTo(x + 1, y + 1)
    context.stroke()
  }
  return code
}
