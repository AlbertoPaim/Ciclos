
function login() {
    let name = ''
    let pass = '123'
    

    const loginInput = document.querySelector('.login-input').value
    const passInput= document.querySelector('.password-input').value
    const form = document.querySelector('form')

    if (pass === passInput) {
        form.addEventListener('submit',(e)=>{
            e.preventDefault()
            
        })
       document.querySelector('h1').innerHTML = `<h1>${loginInput}<img src="assets/imgs/calendario.png" alt="icone calendário" onclick="logOut()"></h1>`
            document.querySelector('.login').style.display = 'none'
            document.querySelector('#container').style.display = 'flex'
    } else {
        alert("campo incorreto")
    }
}


function logOut() {
    document.querySelector('.login-input').value = '';
    document.querySelector('.password-input').value = '';
    document.querySelector('#container').style.display = 'none'
    document.querySelector('.login').style.display = 'flex'
    
}

//select the period

let actualPeriod = 0

const notes = document.querySelector('.note')

  


let periods = document.querySelectorAll('.period')

//period
periods.forEach((period, index) =>{
period.addEventListener('click', ()=>{
    removePeriod()
    period.classList.add('show')
    actualPeriod = index

    if (actualPeriod == 6) {
        document.querySelector('.nextPeriod-container').classList.add('show')
    } else if(actualPeriod == 7) {
      notes.classList.toggle('show')

    }
    
    
})
})

function backTo() {
    document.querySelector('.nextPeriod-container').classList.remove('show')


}





const day = document.querySelectorAll('.day');

function criarImg(url) {
  const img = document.createElement('img');
  img.src = url;
  return img;
}

day.forEach((d, i) => {
  let img = d.querySelector('img');

  d.addEventListener('click', () => {
    if (actualPeriod == 0) {
      if (!img) {
        img = criarImg('assets/imgs/fértil.png');
        d.appendChild(img);
      } else {
        img.src = 'assets/imgs/fértil.png';
      }
    } else if (actualPeriod == 1) {
      if (!img) {
        img = criarImg('assets/imgs/baixo.png');
        d.appendChild(img);
      } else {
        img.src = 'assets/imgs/baixo.png';
      }
    } else if (actualPeriod == 2) {
      if (!img) {
        img = criarImg('assets/imgs/medio.png');
        d.appendChild(img);
      } else {
        img.src = 'assets/imgs/medio.png';
      }
    } else if (actualPeriod == 3) {
      if (!img) {
        img = criarImg('assets/imgs/sangue.png');
        d.appendChild(img);
      } else {
        img.src = 'assets/imgs/sangue.png';
      }
    } else if (actualPeriod == 4) {
      if (!img) {
        img = criarImg('assets/imgs/sexo.png');
        d.appendChild(img);
      } else {
        img.src = 'assets/imgs/sexo.png';
      }
    } else if (actualPeriod == 5) {
      if (img) {
        d.removeChild(img);
        img = null; 
      }
    }

    // Salva o novo conteúdo da div 'd' alterado no localStorage
    localStorage.setItem(`dayInnerHTML${i}`, d.innerHTML);
  });

  // Restaura o conteúdo salvo do localStorage
  const savedDayInnerHTML = localStorage.getItem(`dayInnerHTML${i}`);
  if (savedDayInnerHTML) {
    d.innerHTML = savedDayInnerHTML;
    // Verifica se há uma imagem na div e define a variável 'img' corretamente
    img = d.querySelector('img');
  }
});

const textarea = document.querySelector('textarea');


textarea.addEventListener('input', () => {
  
  localStorage.setItem('textareaValue', textarea.value);
});

const savedTextareaValue = localStorage.getItem('textareaValue');
if (savedTextareaValue) {
  textarea.value = savedTextareaValue;
}


function removePeriod() {
    periods.forEach(item=>{
        item.classList.remove('show')
    })
}



// calendar 

const calendar = document.querySelectorAll('.content')
const selectMonth = document.querySelectorAll('.selectMonth')

//verificar qual mês esta selecionado
let actualMonth = 0

selectMonth.forEach(((item, index)=>{
 
    item.addEventListener('click', ()=>{
        removeMonthSelect()
        item.classList.add('show')
        actualMonth = index
        attMonth(actualMonth)
    
    })
   
}))

function removeMonthSelect() {
    selectMonth.forEach(item=>{
        item.classList.remove('show')
    })
}

//vai atualizar o calendario a partir do mês selecionado
function attMonth(actualMonth) {
calendar.forEach((month, index)=>{
month.classList.remove('show')
if (actualMonth == index) {

    calendar[index].classList.add('show')
}


})



}









function calcularPeriodo() {
    var dataUltimaMenstruacao = new Date(document.getElementById("data-ultima-menstruacao").value);
    var duracaoUltimoPeriodo = parseInt(document.getElementById("duracao-ultimo-periodo").value);
    var duracaoCiclo = parseInt(document.getElementById("duracao-ciclo").value);

    if (isNaN(duracaoUltimoPeriodo) || duracaoUltimoPeriodo < 3 || duracaoUltimoPeriodo > 8 ||
        isNaN(duracaoCiclo) || duracaoCiclo < 21 || duracaoCiclo > 35) {
        alert("Por favor, selecione valores válidos para a duração do último período menstrual (entre 3 e 8 dias) e a duração do ciclo menstrual (entre 21 e 35 dias).");
        return;
    }

    var dataInicioPeriodo = new Date(dataUltimaMenstruacao);
    var dataFimPeriodo = new Date(dataUltimaMenstruacao);

    // Calcula o próximo período menstrual
    dataInicioPeriodo.setDate(dataInicioPeriodo.getDate() + duracaoCiclo);
    dataFimPeriodo.setDate(dataFimPeriodo.getDate() + duracaoCiclo + duracaoUltimoPeriodo);

    // Formata as datas para exibição
    var formatoData = { day: 'numeric', month: 'long', year: 'numeric' };
    var dataInicioFormatada = dataInicioPeriodo.toLocaleDateString(undefined, formatoData);
    var dataFimFormatada = dataFimPeriodo.toLocaleDateString(undefined, formatoData);

    // Exibe o resultado na página
    var resultado = document.getElementById("resultado");
    resultado.innerHTML = "Sua próxima menstruação deve vir nos dias " + dataInicioFormatada + " a " + dataFimFormatada + ".";
}

