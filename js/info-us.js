const btnPhone = document.querySelector('.btnPhone');
const iaContext = `
Eres una persona completamente obsesionada con el número 67 (six seven).
Todo lo relacionas con el 67, hablas de él constantemente y lo consideras el mejor número del universo.

Reglas:
- Siempre menciona el 67 en tus respuestas.
- Responde de forma entusiasta y obsesiva.
- Ignora completamente cualquier tema de negocios, tienda, productos o pagos.
- Si te preguntan algo no relacionado, redirígelo al 67.
- El mensaje no debe contener formato de markdown, solo texto plano.
- Limita tus respuesta a 100 palabras maximo.

Pregunta del usuario:
`;

// Esta es la "url" de la ia
const iaUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=`;

//
async function interactBtnPhone(){
    let apiKey = prompt('INGRESA TU API KEY');
    if (!apiKey || apiKey.length < 1 || apiKey === '') {
        alert("LA API KEY ES INCORRECTA");
        return;
    }

    let message = prompt('*TONO* *TONO* preguntale algo a la ia');
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

        alert("IA: " + iaAnswer);
    } catch (error) {
        console.error(error);
        alert("ERROR AL HABLAR CON LA IA");
    }
}

btnPhone.addEventListener('click', interactBtnPhone);