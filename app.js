const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
const loader = document.querySelector(".button");
const CodeArea = document.getElementById('chatArea')


async function PostData() {
    
    let message = document.getElementById('message').value;
    let language = document.getElementById('language').value;
    CodeArea.innerText = '';
    CodeArea

    if (message != '' && language != '') {
        loader.classList.add("button--loading");
        fetch(apiUrl, {
            method: "Post",
            // mode: "no-cors",
            headers: {
                // "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(
                {
                    "model": "gpt-3.5-turbo",
                    "messages": [
                        {
                            "role": "user",
                            "content": `write a ${language} code fot this Question: ${message}`
                        }
                    ]
                })
        })
            .then(response => response.json())
            .then(data => {
                CodeArea.innerText = '';
                console.log(data.choices[0].message.content.trim())
                const resText = data.choices[0].message.content.trim();
                const card = document.createElement('pre')
                card.innerHTML = resText;
                CodeArea.appendChild(card)
                console.log('done');
                CodeArea.style.display = "block"
                loader.classList.remove("button--loading");
            })

    } else {
        CodeArea.innerText = "Enter Valid Details"

    }

}


document.getElementById("message").addEventListener(
    "keyup",
    (e) => {
        if (e.key === "Enter") {
            PostData();
        }
    });

    document.getElementById("language").addEventListener(
        "keyup",
        (e) => {
            if (e.key === "Enter") {
                PostData();
            }
        });