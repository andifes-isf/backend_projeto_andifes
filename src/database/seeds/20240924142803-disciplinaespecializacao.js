'use strict';

import '../../database'
import DisciplinaEspecializacao from '../../app/models/curso_especializacao/disciplinaespecializacao';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const disciplinas = [
      {
        nome: "INTERNACIONALIZAÇÃO, POLÍTICA LINGUÍSTICA E REDE ISF",
        descricao: "Descricao",
        eixoTematico: "nucleo comum",
        categoria: "nucleo comum"
      },
      {
        nome: "EAD E USO DE TECNOLOGIAS PARA ENSINO DE LÍNGUAS",
        descricao: "Descricao",
        eixoTematico: "nucleo comum",
        categoria: "nucleo comum"
      },
      {
        nome: "FUNDAMENTOS TEÓRICO-METODOLÓGICOS CONTEMPORÂNEOS DE ENSINO-APRENDIZAGEM DE LÍNGUAS",
        descricao: "Descricao",
        eixoTematico: "nucleo comum",
        categoria: "nucleo comum"
      },
      {
        nome: "AVALIAÇÃO E INTERNACIONALIZAÇÃO: PRINCÍPIOS, DESCRITORES E COMPETÊNCIAS",
        descricao: "Descricao",
        eixoTematico: "nucleo comum",
        categoria: "nucleo comum"
      },
      {
        nome: "ENSINO DE LÍNGUAS PARA FINS ESPECÍFICOS E ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "nucleo comum",
        categoria: "nucleo comum"
      },
      {
        nome: "ANÁLISE E ADAPTAÇÃO DE MATERIAIS DIDÁTICOS EM LÍNGUA JAPONESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "japones"
      },
      {
        nome: "PRODUÇÃO E AUTORIA DE MATERIAIS DIDÁTICOS EM LÍNGUA JAPONESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "japones"
      },
      {
        nome: "ANÁLISE E PREPARAÇÃO DE MATERIAL DIDÁTICO PARA EXAMES DE PROFICIÊNCIA EM LÍNGUA JAPONESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "japones"
      },
      {
        nome: "DESENVOLVIMENTO DE MATERIAL DIDÁTICO PARA MEIO DIGITAL EM LÍNGUA JAPONESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "japones"
      },
      {
        nome: "ANÁLISE E ADAPTAÇÃO DE MATERIAIS DIDÁTICOS EM LÍNGUA INGLESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "ingles"
      },
      {
        nome: "PRODUÇÃO E AUTORIA DE MATERIAIS DIDÁTICOS EM LÍNGUA INGLESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "ingles"
      },
      {
        nome: "ANÁLISE E PREPARAÇÃO DE MATERIAL DIDÁTICO PARA EXAMES DE PROFICIÊNCIA EM LÍNGUA INGLESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "ingles"
      },
      {
        nome: "DESENVOLVIMENTO DE MATERIAL DIDÁTICO PARA MEIO DIGITAL EM LÍNGUA INGLESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "ingles"
      },
      {
        nome: "ANÁLISE E ADAPTAÇÃO DE MATERIAIS DIDÁTICOS EM LÍNGUA FRANCESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "frances"
      },
      {
        nome: "PRODUÇÃO E AUTORIA DE MATERIAIS DIDÁTICOS EM LÍNGUA FRANCESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "frances"
      },
      {
        nome: "ANÁLISE E PREPARAÇÃO DE MATERIAL DIDÁTICO PARA EXAMES DE PROFICIÊNCIA EM LÍNGUA FRANCESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "frances"
      },
      {
        nome: "DESENVOLVIMENTO DE MATERIAL DIDÁTICO PARA MEIO DIGITAL EM LÍNGUA FRANCESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "frances"
      },
      {
        nome: "ANÁLISE E ADAPTAÇÃO DE MATERIAIS DIDÁTICOS EM LÍNGUA PORTUGUESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "portugues"
      },
      {
        nome: "PRODUÇÃO E AUTORIA DE MATERIAIS DIDÁTICOS EM LÍNGUA PORTUGUESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "portugues"
      },
      {
        nome: "ANÁLISE E PREPARAÇÃO DE MATERIAL DIDÁTICO PARA EXAMES DE PROFICIÊNCIA EM LÍNGUA PORTUGUESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "portugues"
      },
      {
        nome: "DESENVOLVIMENTO DE MATERIAL DIDÁTICO PARA MEIO DIGITAL EM LÍNGUA PORTUGUESA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "portugues"
      },
      {
        nome: "ANÁLISE E ADAPTAÇÃO DE MATERIAIS DIDÁTICOS EM LÍNGUA ALEMÃ",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "alemao"
      },
      {
        nome: "PRODUÇÃO E AUTORIA DE MATERIAIS DIDÁTICOS EM LÍNGUA ALEMÃ",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "alemao"
      },
      {
        nome: "ANÁLISE E PREPARAÇÃO DE MATERIAL DIDÁTICO PARA EXAMES DE PROFICIÊNCIA EM LÍNGUA ALEMÃ",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "alemao"
      },
      {
        nome: "DESENVOLVIMENTO DE MATERIAL DIDÁTICO PARA MEIO DIGITAL EM LÍNGUA ALEMÃ",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "alemao"
      },
      {
        nome: "ANÁLISE E ADAPTAÇÃO DE MATERIAIS DIDÁTICOS EM LÍNGUA ITALIANA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "italiano"
      },
      {
        nome: "PRODUÇÃO E AUTORIA DE MATERIAIS DIDÁTICOS EM LÍNGUA ITALIANA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "italiano"
      },
      {
        nome: "ANÁLISE E PREPARAÇÃO DE MATERIAL DIDÁTICO PARA EXAMES DE PROFICIÊNCIA EM LÍNGUA ITALIANA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "italiano"
      },
      {
        nome: "DESENVOLVIMENTO DE MATERIAL DIDÁTICO PARA MEIO DIGITAL EM LÍNGUA ITALIANA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "italiano"
      },
      {
        nome: "ANÁLISE E ADAPTAÇÃO DE MATERIAIS DIDÁTICOS EM LÍNGUA ESPANHOLA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "espanhol"
      },
      {
        nome: "PRODUÇÃO E AUTORIA DE MATERIAIS DIDÁTICOS EM LÍNGUA ESPANHOLA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "espanhol"
      },
      {
        nome: "ANÁLISE E PREPARAÇÃO DE MATERIAL DIDÁTICO PARA EXAMES DE PROFICIÊNCIA EM LÍNGUA ESPANHOLA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "espanhol"
      },
      {
        nome: "DESENVOLVIMENTO DE MATERIAL DIDÁTICO PARA MEIO DIGITAL EM LÍNGUA ESPANHOLA",
        descricao: "Descricao",
        eixoTematico: "material didático",
        categoria: "espanhol"
      },
      {
        nome: "MÉTODOS E INSTRUMENTOS DE AVALIAÇÃO",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "para todos os idiomas"
      },
      {
        nome: "CERTIFICAÇÕES INTERNACIONAIS EM LÍNGUA JAPONESA",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "japones"
      },
      {
        nome: "CERTIFICAÇÕES INTERNACIONAIS EM LÍNGUA INGLESA",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "ingles"
      },
      {
        nome: "CERTIFICAÇÕES INTERNACIONAIS EM LÍNGUA FRANCESA",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "frances"
      },
      {
        nome: "CERTIFICAÇÕES INTERNACIONAIS EM LÍNGUA PORTUGUESA",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "portugues"
      },
      {
        nome: "CERTIFICAÇÕES INTERNACIONAIS EM LÍNGUA ALEMÃ",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "alemao"
      },
      {
        nome: "CERTIFICAÇÕES INTERNACIONAIS EM LÍNGUA ITALIANA",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "italiano"
      },
      {
        nome: "CERTIFICAÇÕES INTERNACIONAIS EM LÍNGUA ESPANHOLA",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "espanhol"
      },
      {
        nome: "AVALIAÇÃO NO CONTEXTO ESPECÍFICO E ACADÊMICO EM LÍNGUA JAPONESA",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "japones"
      },
      {
        nome: "AVALIAÇÃO NO CONTEXTO ESPECÍFICO E ACADÊMICO EM LÍNGUA INGLESA",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "ingles"
      },
      {
        nome: "AVALIAÇÃO NO CONTEXTO ESPECÍFICO E ACADÊMICO EM LÍNGUA FRANCESA",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "frances"
      },
      {
        nome: "AVALIAÇÃO NO CONTEXTO ESPECÍFICO E ACADÊMICO EM LÍNGUA PORTUGUESA",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "portugues"
      },
      {
        nome: "AVALIAÇÃO NO CONTEXTO ESPECÍFICO E ACADÊMICO EM LÍNGUA ALEMÃ",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "alemao"
      },
      {
        nome: "AVALIAÇÃO NO CONTEXTO ESPECÍFICO E ACADÊMICO EM LÍNGUA ITALIANA",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "italiano"
      },
      {
        nome: "AVALIAÇÃO NO CONTEXTO ESPECÍFICO E ACADÊMICO EM LÍNGUA ESPANHOLA",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "espanhol"
      },
      {
        nome: "EXAME CELPE-BRAS: AVALIAÇÃO DE HABILIDADES INTEGRADAS",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "portugues"
      },
      {
        nome: "O JAPAN FOUNDATION STANDARD APLICADO AO ENSINO DE JAPONÊS EM AMBIENTE ACADÊMICO",
        descricao: "Descricao",
        eixoTematico: "avaliacao",
        categoria: "japones"
      },
      {
        nome: "HABILIDADES INTEGRADAS NO ENSINO DE LÍNGUAS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "para todos os idiomas"
      },
      {
        nome: "COMPREENSÃO ORAL EM LÍNGUA JAPONESA",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "japones"
      },
      {
        nome: "COMPREENSÃO ORAL EM LÍNGUA INGLESA",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "ingles"
      },
      {
        nome: "COMPREENSÃO ORAL EM LÍNGUA FRANCESA",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "frances"
      },
      {
        nome: "COMPREENSÃO ORAL EM LÍNGUA PORTUGUESA",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "portugUes"
      },
      {
        nome: "COMPREENSÃO ORAL EM LÍNGUA ALEMÃ",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "alemao"
      },
      {
        nome: "COMPREENSÃO ORAL EM LÍNGUA ITALIANA",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "italiano"
      },
      {
        nome: "COMPREENSÃO ORAL EM LÍNGUA ESPANHOLA",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "espanhol"
      },
      {
        nome: "COMPREENSÃO ESCRITA EM LÍNGUA JAPONESA",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "japones"
      },
      {
        nome: "COMPREENSÃO ESCRITA EM LÍNGUA INGLESA",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "ingles"
      },
      {
        nome: "COMPREENSÃO ESCRITA EM LÍNGUA FRANCESA",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "frances"
      },
      {
        nome: "COMPREENSÃO ESCRITA EM LÍNGUA PORTUGUESA",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "portugUes"
      },
      {
        nome: "COMPREENSÃO ESCRITA EM LÍNGUA ALEMÃ",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "alemao"
      },
      {
        nome: "COMPREENSÃO ESCRITA EM LÍNGUA ITALIANA",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "italiano"
      },
      {
        nome: "COMPREENSÃO ESCRITA EM LÍNGUA ESPANHOLA",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "espanhol"
      },
      {
        nome: "PRODUÇÃO ESCRITA EM LÍNGUA JAPONESA EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "japones"
      },
      {
        nome: "PRODUÇÃO ESCRITA EM LÍNGUA INGLESA EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "ingles"
      },
      {
        nome: "PRODUÇÃO ESCRITA EM LÍNGUA FRANCESA EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "frances"
      },
      {
        nome: "PRODUÇÃO ESCRITA EM LÍNGUA PORTUGUESA EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "portugUes"
      },
      {
        nome: "PRODUÇÃO ESCRITA EM LÍNGUA ALEMÃ EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "alemao"
      },
      {
        nome: "PRODUÇÃO ESCRITA EM LÍNGUA ITALIANA EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "italiano"
      },
      {
        nome: "PRODUÇÃO ESCRITA EM LÍNGUA ESPANHOLA EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "espanhol"
      },
      {
        nome: "PRODUÇÃO ORAL EM LÍNGUA JAPONESA EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "japones"
      },
      {
        nome: "PRODUÇÃO ORAL EM LÍNGUA INGLESA EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "ingles"
      },
      {
        nome: "PRODUÇÃO ORAL EM LÍNGUA FRANCESA EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "frances"
      },
      {
        nome: "PRODUÇÃO ORAL EM LÍNGUA PORTUGUESA EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "portugUes"
      },
      {
        nome: "PRODUÇÃO ORAL EM LÍNGUA ALEMÃ EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "alemao"
      },
      {
        nome: "PRODUÇÃO ORAL EM LÍNGUA ITALIANA EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "italiano"
      },
      {
        nome: "PRODUÇÃO ORAL EM LÍNGUA ESPANHOLA EM GÊNEROS ACADÊMICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "espanhol"
      },
      {
        nome: "PRODUÇÃO ORAL E ESCRITA EM LÍNGUA JAPONESA EM CONTEXTOS ESPECÍFICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "japones"
      },
      {
        nome: "PRODUÇÃO ORAL E ESCRITA EM LÍNGUA INGLESA EM CONTEXTOS ESPECÍFICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "ingles"
      },
      {
        nome: "PRODUÇÃO ORAL E ESCRITA EM LÍNGUA FRANCESA EM CONTEXTOS ESPECÍFICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "frances"
      },
      {
        nome: "PRODUÇÃO ORAL E ESCRITA EM LÍNGUA PORTUGUESA EM CONTEXTOS ESPECÍFICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "portugUes"
      },
      {
        nome: "PRODUÇÃO ORAL E ESCRITA EM LÍNGUA ALEMÃ EM CONTEXTOS ESPECÍFICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "alemao"
      },
      {
        nome: "PRODUÇÃO ORAL E ESCRITA EM LÍNGUA ITALIANA EM CONTEXTOS ESPECÍFICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "italiano"
      },
      {
        nome: "PRODUÇÃO ORAL E ESCRITA EM LÍNGUA ESPANHOLA EM CONTEXTOS ESPECÍFICOS",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "espanhol"
      },
      {
        nome: "ENSINO E APRENDIZAGEM DO FRANCÊS PARA OBJETIVO PROFISSIONAL (FOS) E UNIVERSITÁRIO (FOU)",
        descricao: "Descricao",
        eixoTematico: "LÍNGUA PARA PROPÓSITOS ESPECÍFICOS E ACADÊMICOS",
        categoria: "frances"
      },
      {
        nome: "CULTURAS E IDENTIDADES NO ENSINO DE LÍNGUA JAPONESA",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "japones"
      },
      {
        nome: "CULTURAS E IDENTIDADES NO ENSINO DE LÍNGUA INGLESA",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "ingles"
      },
      {
        nome: "CULTURAS E IDENTIDADES NO ENSINO DE LÍNGUA FRANCESA",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "frances"
      },
      {
        nome: "CULTURAS E IDENTIDADES NO ENSINO DE LÍNGUA PORTUGUESA",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "portugUes"
      },
      {
        nome: "CULTURAS E IDENTIDADES NO ENSINO DE LÍNGUA ALEMÃ",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "alemao"
      },
      {
        nome: "CULTURAS E IDENTIDADES NO ENSINO DE LÍNGUA ITALIANA",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "italiano"
      },
      {
        nome: "CULTURAS E IDENTIDADES NO ENSINO DE LÍNGUA ESPANHOLA",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "espanhol"
      },
      {
        nome: "EXPRESSÕES CULTURAIS, ARTÍSTICAS E LITERÁRIAS NO ENSINO DE LÍNGUA JAPONESA",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "japones"
      },
      {
        nome: "EXPRESSÕES CULTURAIS, ARTÍSTICAS E LITERÁRIAS NO ENSINO DE LÍNGUA INGLESA",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "ingles"
      },
      {
        nome: "EXPRESSÕES CULTURAIS, ARTÍSTICAS E LITERÁRIAS NO ENSINO DE LÍNGUA FRANCESA",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "frances"
      },
      {
        nome: "EXPRESSÕES CULTURAIS, ARTÍSTICAS E LITERÁRIAS NO ENSINO DE LÍNGUA PORTUGUESA",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "portugUes"
      },
      {
        nome: "EXPRESSÕES CULTURAIS, ARTÍSTICAS E LITERÁRIAS NO ENSINO DE LÍNGUA ALEMÃ",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "alemao"
      },
      {
        nome: "EXPRESSÕES CULTURAIS, ARTÍSTICAS E LITERÁRIAS NO ENSINO DE LÍNGUA ITALIANA",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "italiano"
      },
      {
        nome: "EXPRESSÕES CULTURAIS, ARTÍSTICAS E LITERÁRIAS NO ENSINO DE LÍNGUA ESPANHOLA",
        descricao: "Descricao",
        eixoTematico: "ASPECTOS CULTURAIS",
        categoria: "espanhol"
      },
      {
        nome: "LETRAMENTO DIGITAL: PROBLEMATIZAÇÕES E PERSPECTIVAS",
        descricao: "Descricao",
        eixoTematico: "TECNOLOGIAS PARA ENSINO DE LÍNGUAS",
        categoria: "para todos os idiomas"
      },
      {
        nome: "RECURSOS E TECNOLOGIAS DIGITAIS PARA O ENSINO DE LÍNGUA JAPONESA",
        descricao: "Descricao",
        eixoTematico: "TECNOLOGIAS PARA ENSINO DE LÍNGUAS",
        categoria: "japones"
      },
      {
        nome: "RECURSOS E TECNOLOGIAS DIGITAIS PARA O ENSINO DE LÍNGUA INGLESA",
        descricao: "Descricao",
        eixoTematico: "TECNOLOGIAS PARA ENSINO DE LÍNGUAS",
        categoria: "ingles"
      },
      {
        nome: "RECURSOS E TECNOLOGIAS DIGITAIS PARA O ENSINO DE LÍNGUA FRANCESA",
        descricao: "Descricao",
        eixoTematico: "TECNOLOGIAS PARA ENSINO DE LÍNGUAS",
        categoria: "frances"
      },
      {
        nome: "RECURSOS E TECNOLOGIAS DIGITAIS PARA O ENSINO DE LÍNGUA PORTUGUESA",
        descricao: "Descricao",
        eixoTematico: "TECNOLOGIAS PARA ENSINO DE LÍNGUAS",
        categoria: "portugUes"
      },
      {
        nome: "RECURSOS E TECNOLOGIAS DIGITAIS PARA O ENSINO DE LÍNGUA ALEMÃ",
        descricao: "Descricao",
        eixoTematico: "TECNOLOGIAS PARA ENSINO DE LÍNGUAS",
        categoria: "alemao"
      },
      {
        nome: "RECURSOS E TECNOLOGIAS DIGITAIS PARA O ENSINO DE LÍNGUA ITALIANA",
        descricao: "Descricao",
        eixoTematico: "TECNOLOGIAS PARA ENSINO DE LÍNGUAS",
        categoria: "italiano"
      },
      {
        nome: "RECURSOS E TECNOLOGIAS DIGITAIS PARA O ENSINO DE LÍNGUA ESPANHOLA",
        descricao: "Descricao",
        eixoTematico: "TECNOLOGIAS PARA ENSINO DE LÍNGUAS",
        categoria: "espanhol"
      },
      {
        nome: "TELECOLABORAÇÃO NO ENSINO E APRENDIZAGEM DE LÍNGUAS",
        descricao: "Descricao",
        eixoTematico: "TECNOLOGIAS PARA ENSINO DE LÍNGUAS",
        categoria: "para todos os idiomas"
      },
      {
        nome: "AMBIENTES VIRTUAIS, DESIGN INSTRUCIONAL E ESTRATÉGIAS DE MEDIAÇÃO PARA O ENSINO DE LÍNGUAS",
        descricao: "Descricao",
        eixoTematico: "TECNOLOGIAS PARA ENSINO DE LÍNGUAS",
        categoria: "para todos os idiomas"
      },
      {
        nome: "ESTRATÉGIAS DIDÁTICAS PARA O ENSINO/APRENDIZAGEM DE ALEMÃO NA MODALIDADE HÍBRIDA",
        descricao: "Descricao",
        eixoTematico: "TECNOLOGIAS PARA ENSINO DE LÍNGUAS",
        categoria: "alemão"
      },
      {
        nome: "METODOLOGIAS ATIVAS PARA ENSINO DE LÍNGUAS",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "para todos os idiomas"
      },
      {
        nome: "LÍNGUA ESTRANGEIRA COMO MEIO DE INSTRUÇÃO (LEMI)",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "para todos os idiomas"
      },
      {
        nome: "ENSINO DE LÍNGUAS NA EDUCAÇÃO BÁSICA PARA CLASSES PLURILÍNGUES",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "para todos os idiomas"
      },
      {
        nome: "ENSINO DE LÍNGUAS ESTRANGEIRAS PARA ADULTOS EM CONTEXTOS NÃO UNIVERSITÁRIOS",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "para todos os idiomas"
      },
      {
        nome: "DEBATES CONTEMPORÂNEOS SOBRE METODOLOGIA DE ENSINO DE LÍNGUAS",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "para todos os idiomas"
      },
      {
        nome: "METODOLOGIAS DE PESQUISA NO ENSINO DE LÍNGUAS",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "para todos os idiomas"
      },
      {
        nome: "METODOLOGIAS E PRÁTICAS DE LÍNGUA INGLESA COMO MEIO DE INSTRUÇÃO",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "ingles"
      },
      {
        nome: "ENSINO DE PORTUGUÊS PARA FALANTES DE ESPANHOL - espanhol",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "espanhol"
      },
      {
        nome: "ENSINO DE PORTUGUÊS PARA FALANTES DE ESPANHOL - portugues",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "português"
      },
      {
        nome: "ENSINO DE PORTUGUÊS NOS PALOP",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "português"
      },
      {
        nome: "ENSINO DE PORTUGUÊS COMO LÍNGUA DE ACOLHIMENTO",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "português"
      },
      {
        nome: "ENSINO DE PORTUGUÊS PARA FALANTES DE INGLÊS",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "português"
      },
      {
        nome: "ENSINO DE PORTUGUÊS PARA FALANTES DE ALEMÃO",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "português"
      },
      {
        nome: "ENSINO DE PORTUGUÊS PARA FALANTES DE FRANCÊS",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "português"
      },
      {
        nome: "ENSINO DE PORTUGUÊS PARA FALANTES DE CHINÊS",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "português"
      },
      {
        nome: "ENSINO DE PORTUGUÊS PARA FALANTES DE JAPONÊS",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "português"
      },
      {
        nome: "ENSINO DE PORTUGUÊS PARA FALANTES DE ÁRABE",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "português"
      },
      {
        nome: "ENSINO DE PORTUGUÊS PARA FALANTES DE ITALIANO",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "português"
      },
      {
        nome: "ENSINO DE PORTUGUÊS COMO LÍNGUA DE HERANÇA (PLH)",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "português"
      },
      {
        nome: "MÉTODOS E TÉCNICAS DE ENSINO DE IDEOGRAMA DA LÍNGUA JAPONESA",
        descricao: "Descricao",
        eixoTematico: "METODOLOGIAS DE ENSINO DE LÍNGUAS ESTRANGEIRAS",
        categoria: "japones"
      },
    ]

    try {  
      await DisciplinaEspecializacao.bulkCreate(disciplinas, { individualHooks: true })
    } catch (error) {
      console.log(error)
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('disciplinaespecializacao', null, {})
  }
};
