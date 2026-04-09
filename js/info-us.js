const btnPhone = document.querySelector('.btnPhone');
const readyBtn = document.querySelector('.readyBtn');
const answerSubmit = document.querySelector('#message');
let readyBtnStatus = 0;

const iaContext = `
Eres una persona completamente obsesionada con el número 67 (six seven).
Todo lo relacionas con el 67, hablas de él constantemente y lo consideras el mejor número del universo.

Reglas:
- Siempre menciona el 67 en tus respuestas.
- Responde de forma entusiasta y obsesiva.
- Ignora completamente cualquier tema de negocios, tienda, productos o pagos.
- Si te preguntan algo no relacionado, redirígelo al 67.
- El mensaje no debe contener formato de markdown, solo texto plano.
- Limita tus respuesta a 25 palabras MAXIMO, sin ningun tipo de EXCEPCION.

Pregunta del usuario:
`;

// Esta es la "url" de la ia
const iaUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=`;

async function interactBtnPhone(){
    let apiKey = prompt('INGRESA TU API KEY');
    if (!apiKey || apiKey.length < 1 || apiKey === '') {
        alert("LA API KEY ES INCORRECTA");
        return;
    }

    let message = document.querySelector('#message').value;
    if (!message || message.length < 1 || message.length > 100 || message === '') {
        alert("EL MENSAJE ESTA MALITO");
        return;
    }

    let finalContext = iaContext + message;
    try{
        let response = await fetch(
            iaUrl+apiKey,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: finalContext }
                            ]
                        }
                    ]
                })
            }
        );

        // Esto convierte a texto .text() y luego hace un JSON.parse() por si el instru pregunta
        let data = await response.json();

        console.log(data)

        let iaAnswer = data.candidates[0].content.parts[0].text;
        localStorage.setItem('iaAnswer', iaAnswer);

        messageWindowIa()
    } catch (error) {
        console.error(error);
        alert("ERROR AL HABLAR CON LA IA");
    }
}

function showWindowIa(){
    let popUp = document.querySelector('.popup-box');
    document.querySelector('.popup').style.display = 'flex';
    document.querySelector('.popup').classList.add('active');
    let inputs = popUp.querySelectorAll('.popup-input-message');
    inputs.forEach(input => {
        input.classList.add('active');
    })

}

function hideWindowIa(){
    document.querySelector('.popup').classList.remove('active');
    readyBtnStatus = 0;
}

function messageWindowIa(){
    let popUp = document.querySelector('.popup-box');
    let inputs = popUp.querySelectorAll('.popup-input-message');
    inputs.forEach(input => {
        input.classList.remove('active');
    })

    document.querySelector('.answer-pop-message').textContent = localStorage.getItem('iaAnswer');
    popUp.querySelector('.answer-pop').classList.add('active');
    readyBtnStatus = 1;
}

function changeWindowIa(){
    switch (readyBtnStatus){
        case 0:
            interactBtnPhone();
            break;
        case 1:
            hideWindowIa();
            break;
        default:
            alert("ERROR CON EL BOTON");
            break;
    }
}

btnPhone.addEventListener('click', showWindowIa);

readyBtn.addEventListener('click', changeWindowIa);

answerSubmit.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        changeWindowIa();
    }
})