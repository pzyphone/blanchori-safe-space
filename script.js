// ==========================================
// CONEXÃO COM O SUPABASE
// ==========================================

const SUPABASE_URL =
    "https://dekrbhtemjmhyyxkgeqk.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_X22VRKI0BTBAjtdJogmTHw_sZ-MJUhi";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ==========================================
// ELEMENTOS
// ==========================================

const messageInput =
    document.getElementById("message");

const counter =
    document.getElementById("counter");


// ==========================================
// CONTADOR DE CARACTERES
// ==========================================

if (messageInput && counter) {

    messageInput.addEventListener(
        "input",

        function () {

            counter.textContent =
                messageInput.value.length
                + " / 30000";

        }
    );

}


// ==========================================
// SALVAR MENSAGEM
// ==========================================

async function saveMessage() {

    const titleInput =
        document.getElementById("title");

    const messageInput =
        document.getElementById("message");

    const title =
        titleInput.value.trim();

    const message =
        messageInput.value.trim();


    if (message === "") {

        alert(
            "Escreva uma mensagem antes de guardar ♡"
        );

        return;

    }


    if (message.length > 30000) {

        alert(
            "A mensagem pode ter no máximo 30.000 caracteres ♡"
        );

        return;

    }


    console.log("Tentando salvar mensagem...");


    const { data, error } =
        await supabaseClient
            .from("messages")
            .insert({

                title:
                    title === ""
                        ? "sem título ♡"
                        : title,

                text: message

            })
            .select();


    if (error) {

        console.error(
            "ERRO DO SUPABASE:",
            error
        );

        alert(
            "Erro ao guardar mensagem:\n\n"
            + error.message
        );

        return;

    }


    console.log(
        "Mensagem salva:",
        data
    );


    // ======================================
    // LIMPAR CAMPOS
    // ======================================

    titleInput.value = "";

    messageInput.value = "";


    if (counter) {

        counter.textContent =
            "0 / 30000";

    }


    // ======================================
    // NOTIFICAÇÃO
    // ======================================

    const toast =
        document.getElementById("toast");


    if (toast) {

        toast.classList.add("show");


        setTimeout(

            function () {

                toast.classList.remove("show");

            },

            2500

        );

    }

}


// ==========================================
// MOSTRAR MENSAGENS
// ==========================================

async function loadMessages() {

    const container =
        document.getElementById(
            "messages-container"
        );


    const emptyState =
        document.getElementById(
            "empty-state"
        );


    if (!container) {

        return;

    }


    const { data: messages, error } =
        await supabaseClient
            .from("messages")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "ERRO AO CARREGAR:",
            error
        );

        alert(
            "Não foi possível carregar as mensagens:\n\n"
            + error.message
        );

        return;

    }


    if (!messages || messages.length === 0) {

        if (emptyState) {

            emptyState.style.display =
                "block";

        }

        return;

    }


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


            const formattedDate =
                new Date(
                    message.created_at
                ).toLocaleString(
                    "pt-BR"
                );


            date.textContent =
                "guardado em "
                + formattedDate;


            const deleteButton =
                document.createElement("button");


            deleteButton.classList.add(
                "delete-button"
            );


            deleteButton.textContent =
                "×";


            deleteButton.onclick =
                function () {

                    deleteMessage(
                        message.id
                    );

                };


            card.appendChild(
                deleteButton
            );

            card.appendChild(
                title
            );

            card.appendChild(
                text
            );

            card.appendChild(
                date
            );


            container.appendChild(
                card
            );

        }

    );

}


// ==========================================
// APAGAR MENSAGEM
// ==========================================

async function deleteMessage(id) {

    const { error } =
        await supabaseClient
            .from("messages")
            .delete()
            .eq(
                "id",
                id
            );


    if (error) {

        console.error(
            "ERRO AO APAGAR:",
            error
        );

        alert(
            "Não foi possível apagar a mensagem:\n\n"
            + error.message
        );

        return;

    }


    location.reload();

}


// ==========================================
// EXECUTAR
// ==========================================

loadMessages();
