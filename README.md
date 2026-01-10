# 🌿 GenPaper S.A. - Industrial Data Simulation

> **Ambiente de simulação corporativa para ensino de Ciência de Dados, Análise de Sistemas e Auditoria.**

![Badge](https://img.shields.io/badge/Status-Active-success)
![Badge](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-blue)
![Badge](https://img.shields.io/badge/Focus-Data%20Science-orange)

---

## 📖 Sobre o Projeto

O **GenPaper** é uma aplicação web fictícia que simula o ambiente digital de uma indústria de Papel e Celulose. O objetivo do projeto é fornecer um cenário realista ("Sandbox") onde alunos podem praticar habilidades de:

* **ETL (Extração, Transformação e Carga):** Baixar dados brutos (JSON) de sistemas corporativos.
* **Análise Exploratória:** Cruzar dados de diferentes fontes (Produção, RH, Logística).
* **Auditoria de Sistemas:** Identificar falhas de segurança e inconsistências operacionais.
* **Business Intelligence:** Gerar insights e relatórios para tomada de decisão.

A aplicação foi construída utilizando **HTML5, CSS3 e JavaScript (Vanilla)**, focando em simplicidade de execução (não requer backend ou banco de dados real) para facilitar o uso em sala de aula.

---

## 🏭 Cenário Fictício (Lore)

A **GenPaper S.A.** é uma gigante do setor de celulose, fundada pelos visionários **Samuel** e **Luyz**. Apesar de ser líder de mercado, a empresa enfrenta problemas de integração entre seus departamentos e falhas misteriosas em sua linha de produção.

Como auditores externos (ou novos analistas de dados), a missão dos alunos é acessar o sistema interno (**GenSys 2.0**), extrair os dados e resolver os mistérios que a diretoria não consegue explicar.

---

## 🚀 Como Rodar o Projeto

1.  **Clone este repositório:**
    ```bash
    git clone [https://github.com/SEU-USUARIO/genpaper.git](https://github.com/SEU-USUARIO/genpaper.git)
    ```
2.  **Abra a pasta do projeto.**
3.  **Inicie a aplicação:**
    * Basta abrir o arquivo `index.html` em qualquer navegador moderno.
    * *Recomendação:* Para uma melhor experiência, utilize a extensão **"Live Server"** no VS Code.

---

## 🕵️‍♂️ Estudos de Caso (Missões)

O sistema contém "bugs" e "falhas" intencionais nos dados para serem descobertos pelos alunos.

### Caso 1: O Incidente do Lote 404 (Produção)
* **Problema:** Um lote de papel foi devolvido pelo cliente por estar "queimado". A produção nega falha.
* **Dados Envolvidos:** Telemetria das Máquinas (`maquinas.json`), Estoque de Insumos (`insumos.json`) e Escala de Operadores (`turnos.json`).
* **Objetivo:** Cruzar a telemetria da máquina com o nível de químicos e a qualificação do operador no turno do incidente.

### Caso 2: O Mistério do Custo Fantasma (Fraude)
* **Problema:** A contabilidade aponta um gasto excessivo com Resina, mas o estoque físico está vazio.
* **Dados Envolvidos:** Notas Fiscais (`contabilidade.json`) e Pesagem de Caminhões (`logistica.json`).
* **Objetivo:** Cruzar o peso faturado na nota fiscal com o peso real aferido na balança da portaria para encontrar desvios de carga.

---

## 🔐 Credenciais de Acesso (Spoilers)

O sistema possui um mecanismo de **Controle de Acesso Baseado em Função (RBAC)** simulado. Os alunos devem começar descobrindo a falha de segurança no RH.

| Perfil | Usuário | Senha | Acesso Principal |
| :--- | :--- | :--- | :--- |
| **RH (Ponto de Entrada)** | `rh.admin` | `rh123` | Acesso à tabela de senhas de todos os usuários. |
| **Produção** | `prod.lead` | *(Descobrir)* | Dashboard de Máquinas e Turnos. |
| **Auditoria** | `audit.ext` | *(Descobrir)* | Acesso exclusivo ao **Data Lake** para download dos JSONs. |
| **Financeiro** | `fin.cfo` | *(Descobrir)* | Dados de pagamentos. |

---

## 📂 Estrutura de Arquivos

* `index.html` - Landing Page Institucional (Página Pública).
* `login.html` - Portal de Acesso ao Sistema.
* `intranet.html` - Aplicação Principal (Dashboard).
* `intranet.js` - Lógica da aplicação e **Banco de Dados (JSONs)** embutido.
* `style.css` - Estilização completa do projeto.
* `samuel.jpg` / `luyz.jpg` - Imagens dos Fundadores.

---

## 👨‍🏫 Para Professores

Este projeto é uma ferramenta de **Gamificação**.
* **Dica:** Não forneça as senhas imediatamente. Deixe que os alunos explorem o sistema como um "Pentest" inicial.
* **Avaliação:** Peça um relatório final (Jupyter Notebook, PowerBI ou PDF) onde a conclusão do aluno deve ser sustentada pelos dados extraídos do sistema.

---

## 🤝 Créditos

Desenvolvido para fins educacionais.

* **desenvolvido por:** Luyz Chiavini
* **linkedin:** https://www.linkedin.com/in/luizchiavini/

---
