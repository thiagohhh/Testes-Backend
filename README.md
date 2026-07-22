# 📋 Guia de Tipos e Etapas de Testes de Software

> Um guia rápido e prático sobre os principais conceitos, abordagens e fases de testes no ciclo de desenvolvimento de software.

## 📌 Sumário
* [💻 Testes Funcionais e Estruturais](#-testes-funcionais-e-estruturais)
* [👥 Testes de Experiência do Usuário (UX)](#-testes-de-experiencia-do-usuario-ux)
* [⚡ Teste de Desempenho](#-teste-de-desempenho)
* [🛡️ Testes de Confiabilidade e Resiliência](#%EF%B8%8F-testes-de-confiabilidade-e-resiliencia)
* [🔧 Testes de Manutenibilidade](#-testes-de-manutenibilidade)
* [🔍 Abordagens de Teste](#-abordagens-de-teste)
* [🏗️ Analogia da Construção de uma Casa](#%EF%B8%8F-analogia-da-construcao-de-uma-casa)
* [🛠️ Detalhamento das Fases de Validação](#%EF%B8%8F-detalhamento-das-fases-de-validacao)

---

## 💻 Testes Funcionais e Estruturais
* **Teste de Funcionalidade:** Avalia "o que" o sistema faz e se atende às regras de negócio.
* **Teste de Unidade:** Valida funções e métodos isolados do código.
* **Teste de Integração:** Verifica a comunicação entre diferentes módulos e APIs.
* **Teste de Sistema:** Avalia o software completo e integrado de ponta a ponta.
* **Teste de Regressão:** Garante que novos códigos não quebraram o que já estava funcionando.

## 👥 Testes de Experiência do Usuário (UX)
* **Teste de Usabilidade:** Mede a facilidade de uso, a clareza e a experiência do usuário final.
* **Teste de Aprendizado:** Avalia o quão intuitivo é o sistema para novos usuários.
* **Teste de Acessibilidade:** Garante o uso por pessoas com deficiências visuais ou motoras.

## ⚡ Teste de Desempenho
* **Performance:** Mede a velocidade, o tempo de resposta e o uso de recursos sob carga.

## 🛡️ Testes de Confiabilidade e Resiliência
* **Estabilidade:** Mede a capacidade do sistema de se manter sem falhas.
* **Teste de Resistência (Endurance):** Executa o sistema por dias para achar vazamentos de memória (*memory leaks*).
* **Teste de Recuperação:** Força quedas para ver se o sistema se recupera sem perder dados.

## 🔧 Testes de Manutenibilidade
* **Manutenibilidade:** Avalia o esforço necessário para modificar, corrigir ou evoluir o código.
* **Análise Estática:** Verifica a qualidade, padrão e complexidade do código escrito sem executá-lo.
* **Teste de Modularidade:** Garante que alterações em uma parte não afetem o resto do sistema.

---

## 🔍 Abordagens de Teste

| Tipo de Caixa | Foco principal |
| :--- | :--- |
| **⬛ CAIXA PRETA** | Focado nos dados de entrada e saída, sem olhar o código interno. |
| **⬜ CAIXA BRANCA** | Focado na estrutura interna, lógica e linhas do código. |

---

## 🏗️ Analogia da Construção de uma Casa
* 🧱 **Verificar cada tijolo** ════> `[Teste Unitário]`
* 🚪 **Avaliar o cômodo** ════> `[Teste de Integração]`
* 🏠 **Inspecionar a casa inteira** ════> `[Teste de Sistema]`
* 🔑 **Proprietário aprova a casa** ════> `[Teste de Aceitação]`

---

## 🛠️ Detalhamento das Fases de Validação

### 🔹 [TESTE UNITÁRIO]
* **O que é:** Teste da menor parte isolada do código.
* **Quem realiza:** O próprio desenvolvedor.
* **Quando:** Durante a criação do código.
* **Objetivo:** Encontrar erros pequenos e falhas de lógica interna.

### 🔹 [TESTE DE INTEGRAÇÃO]
* **O que é:** Teste de comunicação entre duas ou mais partes.
* **Quem realiza:** O desenvolvedor ou a equipe de QA (Testador).
* **Objetivo:** Garantir que os módulos conversem perfeitamente entre si.

### 🔹 [TESTE DE SISTEMA]
* **O que é:** O sistema completo testado de ponta a ponta.
* **Quem realiza:** Equipe focada em testes (QA / Testador).
* **Objetivo:** Validar a jornada completa e real do usuário.

### 🔹 [TESTE DE ACEITAÇÃO (UAT)]
* **O que é:** A validação final focada nas regras de negócio.
* **Quem realiza:** Cliente final ou usuário-chave (*Key User*).
* **Objetivo:** Verificar se o sistema atende às necessidades reais antes do lançamento.


