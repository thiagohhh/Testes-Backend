📋 GUIA DE TIPOS E ETAPAS DE TESTES DE SOFTWARE


 1. 💻 TESTES FUNCIONAIS E ESTRUTURAIS                                 

• Teste de Funcionalidade: Avalia "o que" o sistema faz e se atende às regras de negócio.
 • Teste de Unidade: Valida funções e métodos isolados do código.
 • Teste de Integração: Verifica a comunicação entre diferentes módulos e APIs.
 • Teste de Sistema: Avalia o software completo e integrado de ponta a ponta.
 • Teste de Regressão: Garante que novos códigos não quebraram o que já funcionava.


 2. 👥 TESTES DE EXPERIÊNCIA DO USUÁRIO (UX)                           

 • Teste de Usabilidade: Mede a facilidade de uso, a clareza e a experiência do usuário final.
 • Teste de Aprendizado: Avalia o quão intuitivo é o sistema para novos usuários.
 • Teste de Acessibilidade: Garante o uso por pessoas com deficiências visuais ou motoras.


 3. ⚡ TESTE DE DESEMPENHO                                             

 • Performance: Mede a velocidade, o tempo de resposta e o uso de recursos sob carga.


4. 🛡️ TESTES DE CONFIABILIDADE E RESILIÊNCIA                          

 • Estabilidade: Mede a capacidade do sistema se manter no ar sem falhas.
 • Teste de Resistência (Endurance): Executa o sistema por dias para achar vazamentos de memória.
 • Teste de Recuperação: Força quedas para ver se o sistema se recupera sem perder dados.

  5. 🔧 TESTES DE MANUTENIBILIDADE                       

 • Manutenibilidade: Avalia o esforço necessário para modificar, corrigir ou evoluir o código.
 • Análise Estática: Checa a qualidade, padrão e complexidade do código escrito.
 • Teste de Modularidade: Garante que alterações em uma parte não afetem o resto do sistema.


===========================================================================
  🔍 ABORDAGENS DE TESTE
===========================================================================

  [⬛ CAIXA PRETA] -> Focado nos dados de entrada e saída, sem olhar o código.
  [⬜ CAIXA BRANCA] -> Focado na estrutura interna, lógica e linhas do código.

===========================================================================
  🏗️ ANALOGIA DA CONSTRUÇÃO DE UMA CASA
===========================================================================

  🧱 Verificar cada tijolo      ════>  [Teste Unitário]
  🚪 Avaliar o cômodo           ════>  [Teste de Integração]
  🏠 Inspecionar a casa inteira  ════>  [Teste de Sistema]
  🔑 Proprietário aprova a casa  ════>  [Teste de Aceitação]

===========================================================================
  🛠️ DETALHAMENTO DAS FASES DE VALIDAÇÃO
===========================================================================

 🔹 [TESTE UNITÁRIO]
 ─────────────────────────────────────────────────────────────────────────
   • O que é: Teste da menor parte isolada do código.
   • Quem realiza: O próprio desenvolvedor.
   • Quando: Durante a criação do código.
   • Objetivo: Encontrar erros pequenos e falhas de lógica interna.

 🔹 [TESTE DE INTEGRAÇÃO]
 ─────────────────────────────────────────────────────────────────────────
   • O que é: Teste de comunicação entre duas ou mais partes.
   • Quem realiza: O desenvolvedor ou a equipe de QA (Testador).
   • Objetivo: Garantir que os módulos conversem perfeitamente entre si.

 🔹 [TESTE DE SISTEMA]
 ─────────────────────────────────────────────────────────────────────────
   • O que é: O sistema completo testado de ponta a ponta.
   • Quem realiza: Equipe focada em testes (QA / Testador).
   • Objetivo: Validar a jornada completa e real do usuário.

 🔹 [TESTE DE ACEITAÇÃO (UAT)]
 ─────────────────────────────────────────────────────────────────────────
   • O que é: A validação final focada nas regras de negócio.
   • Quem realiza: Cliente final ou usuário-chave (Key User).
   • Objetivo: Verificar se o sistema atende às reais necessidades antes do lançamento.

===========================================================================

