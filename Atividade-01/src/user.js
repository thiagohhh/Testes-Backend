export const pessoa = {
    id: 1,
    nome: "Carlos",
    idade: 34,
    ativo: true,
    email: "carlos@email.com",

    endereco: {
        rua: "Rua das Flores",
        numero: 150,
        bairro: "Centro",
        cidade: "Maceió",
        estado: "AL",
        cep: "57000-000"
    },

    habilidades: [
        "JavaScript",
        "Node.js",
        "Express",
        "Git"
    ],

    cursos: [
        {
            id: 1,
            nome: "Node.js",
            cargaHoraria: 40,
            concluido: true
        },
        {
            id: 2,
            nome: "Express",
            cargaHoraria: 20,
            concluido: true
        },
        {
            id: 3,
            nome: "Vitest",
            cargaHoraria: 12,
            concluido: false
        }
    ],

    configuracoes: {
        tema: "dark",
        notificacoes: true,
        idioma: "pt-BR"
    },

    redesSociais: {
        github: "carlosdev",
        linkedin: "carlos-dev"
    }
};