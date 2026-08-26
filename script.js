const messageInput =
    document.getElementById("message");

const counter =
    document.getElementById("counter");


// CONTADOR DE CARACTERES

if (messageInput && counter) {

    messageInput.addEventListener(
        "input",

        function () {

            counter.textContent =
                messageInput.value.length
                + " / 1000";

        }

    );

}


// SALVAR MENSAGEM

function saveMessage() {

    const title =
        document
            .getElementById("title")
            .value
            .trim();


    const message =
        document
            .getElementById("message")
            .value
            .trim();


    // NÃO PERMITIR MENSAGEM VAZIA

    if (message === "") {

        alert(
            "Escreva uma mensagem antes de guardar ♡"
        );

        return;

    }


    // CRIAR A NOVA MENSAGEM

    const newMessage = {

        id: Date.now(),

        title:
            title === ""
                ? "sem título ♡"
                : title,

        text: message,

        date:
            new Date().toLocaleString("pt-BR")

    };


    // PEGAR AS MENSAGENS JÁ SALVAS

    let messages =
        JSON.parse(

            localStorage.getItem(
                "blanchoriMessages"
            )

        ) || [];


    // ADICIONAR A NOVA MENSAGEM

    messages.unshift(newMessage);


    // SALVAR

    localStorage.setItem(

        "blanchoriMessages",

        JSON.stringify(messages)

    );


    // LIMPAR OS CAMPOS

    document
        .getElementById("title")
        .value = "";


    document
        .getElementById("message")
        .value = "";


    counter.textContent = "0 / 1000";


    // MOSTRAR NOTIFICAÇÃO

    const toast =
        document.getElementById("toast");


    toast.classList.add("show");


    setTimeout(

        function () {

            toast.classList.remove("show");

        },

        2500

    );

}


// MOSTRAR MENSAGENS

function loadMessages() {

    const container =
        document.getElementById(
            "messages-container"
        );


    const emptyState =
        document.getElementById(
            "empty-state"
        );


    // SE NÃO ESTIVER NA PÁGINA DE MENSAGENS

    if (!container) {

        return;

    }


    const messages =
        JSON.parse(

            localStorage.getItem(
                "blanchoriMessages"
            )

        ) || [];


    // SE NÃO EXISTIR NENHUMA MENSAGEM

    if (messages.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    // CRIAR OS CARTÕES

    messages.forEach(

        function (message) {

            const card =
                document.createElement("div");


            card.classList.add(
                "message-card"
            );


            const title =
                document.createElement("h2");


            title.textContent =
                message.title;


            const text =
                document.createElement("p");


            text.textContent =
                message.text;


            const date =
                document.createElement("span");


            date.classList.add(
                "message-date"
            );


            date.textContent =
                "guardado em "
                + message.date;


            const deleteButton =
                document.createElement("button");


            deleteButton.classList.add(
                "delete-button"
            );


            deleteButton.textContent = "×";


            deleteButton.onclick =
                function () {

                    deleteMessage(
                        message.id
                    );

                };


            card.appendChild(deleteButton);

            card.appendChild(title);

            card.appendChild(text);

            card.appendChild(date);


            container.appendChild(card);

        }

    );

}


// APAGAR MENSAGEM

function deleteMessage(id) {

    let messages =
        JSON.parse(

            localStorage.getItem(
                "blanchoriMessages"
            )

        ) || [];


    messages =
        messages.filter(

            function (message) {

                return message.id !== id;

            }

        );


    localStorage.setItem(

        "blanchoriMessages",

        JSON.stringify(messages)

    );


    location.reload();

}


// EXECUTAR

loadMessages();
