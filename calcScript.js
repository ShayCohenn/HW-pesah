
let resScreen = document.getElementById('resScreen');
let screenTxt = "";
let calcTxt = "";
let decPressed = false;
let btnTxt = "";
let screenBtnTxt = "";
let res = 0;
const operators = ['+', '-', 'x', '÷', '%','xⁿ',''];

function btnClick() {
  const btn = event.target.innerHTML;
  btnTxt = btn;
  screenBtnTxt = btn;
  if (isNaN(btn) && btn != '.')
    decPressed = false;
  basicOp();
  avdOp();
  calcTxt += btnTxt;
  screenTxt += screenBtnTxt;
  resScreen.innerHTML = screenTxt;
  console.log(calcTxt)
}

function basicOp() {
  const btn = event.target.innerHTML;
  if (btn == '÷')
    btnTxt = '/';
  else if (btn == 'x')
    btnTxt = '*';
  else if (btn == 'xⁿ') {
    btnTxt = '**';
    screenBtnTxt = '^';
  }
  else if (btn == '.') {
    decPressed ? (btnTxt = '', screenBtnTxt = '') : (decPressed = true)
  }
  else if (btn == 'π') {
    btnTxt = Math.PI;
    screenBtnTxt = Math.PI;
    decPressed = true;
  }
  else if (btn == 'e') {
    btnTxt = Math.E;
    screenBtnTxt = Math.E;
    decPressed = true;
  }
}

function avdOp() {
  const btn = event.target.innerHTML;
  if (btn == '√x') {
    btnTxt = 'Math.sqrt(';
    screenBtnTxt = '√(';
  }
  else if (btn == 'log₂') {
    btnTxt = 'Math.log2(';
    screenBtnTxt = 'log₂(';
  }
  else if (btn == 'ln') {
    btnTxt = 'Math.log(';
    screenBtnTxt = 'ln(';
  }
  else if (btn == 'sin') {
    btnTxt = 'Math.sin(';
    screenBtnTxt = 'sin(';
  }
  else if (btn == 'cos') {
    btnTxt = 'Math.cos(';
    screenBtnTxt = 'cos(';
  }
  else if (btn == 'tan') {
    btnTxt = 'Math.tan(';
    screenBtnTxt = 'tan(';
  }
}

function ansBtn(){
  calcTxt = res;
  screenTxt = res;
  resScreen.innerHTML = res;
}

function equal() {
  res = eval(calcTxt);
  opPressed = false;
  console.log(res);
  calcTxt = res.toString();
  screenTxt = res.toString();
  resScreen.innerHTML = screenTxt;
}

function CE() {
  screenTxt = "";
  decPressed = false;
  btnTxt = "";
  calcTxt = "";
  screenBtnTxt = "";
  resScreen.innerHTML = 0;
}

  function del() {
      calcTxt = calcTxt.substr(0, calcTxt.length - 1);
      screenTxt = screenTxt.substr(0, screenTxt.length - 1);
      resScreen.innerHTML = screenTxt;
      console.log(calcTxt);
  }
