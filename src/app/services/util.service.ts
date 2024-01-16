import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import * as dayjs from "dayjs";

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    constructor() {
    }
    alertas = [];
    addAlert(titulo, mensagem) {
        this.alertas.push({
            titulo, mensagem
        });
    }

    floatToMoneyBr(numero = 0) {
        return Number(numero).toLocaleString('pt', { style: 'decimal', minimumFractionDigits: 2 })
    }

    floatToMoney(text) {
        if (!text)
            return '0,00';
        let money = this.moneyBr(Number(text).toFixed(2).split('.').join(''));
        if (Number(text) < 0) return `-${money}`
        return money;
    }

    moneyBr(text) {
        if (!text)
            return '';
        let money = String(Number(this.somenteNumero(text)));
        if (Number(money) > 9999999999999)
            money = "0";
        if (money.length < 3)
            money = this.zeroEsquerda(3, money);
        money = money.replace(/([0-9]{2})$/g, ",$1");
        if (money.length > 6)
            money = money.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        return money;
    }
    
    getTextDateTimeU(data = new Date()){
        let hora = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
        let min = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
        let seg = data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds();
        let dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
        let mes = (data.getMonth() + 1) < 10 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1);
        let ano = data.getFullYear();
        return `${ano}-${mes}-${dia} ${hora}:${min}:${seg}`;
    }

    somenteNumero(text) {
        if (!text)
            return '';
        let numeros = [];
        '0123456789'.split('')
            .map(value => numeros[value] = true);
        return String(text).split('')
            .filter(
                value => numeros[value]
            ).join('');
    }

    setValueControls(group: FormGroup, values: any = {}) {
        for (let i in group.controls) {
            try {
                group.controls[i].setValue(values[i]);
            } catch (error) {
                console.log(error)
                console.log(values[i])
                console.log('Problemas ao setar esse valor');
            }
        }
    }

    zeroEsquerda(zeros, text) {
        text = text + '';
        let resp = '';
        let size = zeros - text.length;
        for (let i = 0; i < size; i++) {
            resp += '0';
        }
        resp += text;
        return resp;
    }

    bichos = {
        1: 'AVESTRUZ',
        2: 'ÁGUIA',
        3: 'BURRO',
        4: 'BORBOLETA',
        5: 'CACHORRO',
        6: 'CABRA',
        7: 'CARNEIRO',
        8: 'CAMELO',
        9: 'COBRA',
        10: 'COELHO',
        11: 'CAVALO',
        12: 'ELEFANTE',
        13: 'GALO',
        14: 'GATO',
        15: 'JACARÉ',
        16: 'LEÃO',
        17: 'MACACO',
        18: 'PORCO',
        19: 'PAVÃO',
        20: 'PERU',
        21: 'TOURO',
        22: 'TIGRE',
        23: 'URSO',
        24: 'VEADO',
        25: 'VACA',
    };

    getDateUS(data = new Date()) {
        let dia: any = data.getDate();
        dia = dia < 10 ? '0' + dia : dia;
        let mes: any = data.getMonth() + 1;
        mes = mes < 10 ? '0' + mes : mes;
        let ano = data.getFullYear();
        return `${ano}-${mes}-${dia}`;
    }

    dia_semana(dia) {
        let semana = []
        semana[0] = 'Domingo';
        semana[1] = 'Segunda-Feira';
        semana[2] = 'Terça-Feira';
        semana[3] = 'Quarta-Feira';
        semana[4] = 'Quinta-Feira';
        semana[5] = 'Sexta-Feira';
        semana[6] = 'Sábado';
        return semana[dia]
    }

    premioLabel(array) {
        let label = '';
        array.map(
            (p, i) => {
                let ant = Number(array[i - 1]);
                let prx = Number(array[i + 1]);
                p = Number(p);
                if (!ant) {
                    label += p;
                    return true;
                }
                if (p - 1 == ant && prx != p + 1) {
                    label += 'a' + p;
                    return true;
                }
                if (p - 1 == ant && p + 1 == prx) {
                    return true;
                }
                if (prx == p + 1 && ant != p - 1) {
                    label += ',' + p;
                    return true;
                }
                if (prx != p + 1 && ant != p - 1) {
                    label += ',' + p;
                    return true;
                }
                if (!prx && ant != p - 1) {
                    label += ',' + p;
                    return true;
                }
            }
        );
        return label;
    }

    milharToGrupo(str) {
        return Math.ceil((Number(String(str).substr(-2)) || 100) / 4);
    }

    getPercentData(dataFim = null, ant = null) {

        if (!dataFim) {
            dataFim = dayjs(dayjs().format("YYYY-MM-DD") + 'T23:59:59').toDate();
        }
        let dataAtual = new Date();
        let time_padrao = ' 08:00:00';
        if (ant) {
            if (ant.encerra) {
                time_padrao = ` ${String(ant.encerra).substr(0, 2)}:${String(ant.encerra).substr(-2)}:00`;
            }
        }


        let addhora = 0;
        try {
            let sessao = JSON.parse(localStorage.getItem('sessao'));
            addhora = sessao.empresa.fuso_horario * -1;
        } catch (error) {

        }

        let dataUTC = this.getDateUS() + "T" + time_padrao.trim() + ".000Z";
        let inicioDia = dayjs(dataUTC).add(addhora, 'hour').toDate();
        let inicio = inicioDia.getTime();
        let atual = dataAtual.getTime();
        let fim = dataFim.getTime();

        let periodo = fim - inicio;
        let restante = fim - atual;
        if (restante < 0) return {
            percent: 0,
            time: null
        }
        let percent = (restante / periodo) * 100;
        let restante_segundos = restante / 1000;
        let restante_min = restante_segundos / 60;
        let hora = ('00' + Math.trunc(restante_min / 60)).substr(-2);
        let sobra = restante_min % 60;
        let min = ('00' + Math.trunc(sobra)).substr(-2);
        return {
            percent: percent < 0 ? 0 : Math.trunc(percent),
            time: percent < 0 ? null : `${hora}:${min}`
        }
    }

    getTimeHorarioFim(data_: any = new Date(), horario) {
        data_ = dayjs(data_).format("YYYY-MM-DD");
        let _sessao = localStorage.getItem('sessao');
        if (!_sessao) return this.getPercentData();
        let sessao = JSON.parse(_sessao);
        let fuso = "-03:00";
        try {
            let sessao = JSON.parse(localStorage.getItem('sessao'));
            let _fuso = sessao.empresa.fuso_horario;
            let sinal = _fuso < 0 ? "-" : "+";
            _fuso = _fuso < 0 ? _fuso * -1 : _fuso;
            fuso = `${sinal}${("00" + _fuso).substr(-2)}:00`;
        } catch (error) {

        }
        let diaAtual = dayjs(data_).day();
        let dia = sessao.empresa.dias.filter(d => d.dia == diaAtual)[0];
        if (!dia) return this.getPercentData();
        dia.horarios.sort(function (a, b) {
            if (a.encerra < b.encerra)
                return -1;
            if (a.encerra > b.encerra)
                return 1;
            return 0;
        });
        let hor = dia.horarios.filter(h => h.extracao == horario)[0];
        if (!hor) return this.getPercentData();
        let indexP = dia.horarios.indexOf(hor);
        indexP--;
        let ant = dia.horarios[indexP];
        let hora = hor.encerra ? String(hor.encerra).substr(0, 2) : "23";
        let min = hor.encerra ? String(hor.encerra).substr(-2) : "59";
        let data = `${data_}T${hora}:${min}:${hor.encerra ? '00' : '59'}.00${fuso}`;
        return this.getPercentData(new Date(data), ant);
    }

    milharToBicho(str) {
        return this.bichos[this.milharToGrupo(str)];
    }


    getTextDateTimeUsToBR(data = new Date()) {
        let hora = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
        let min = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
        let seg = data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds();
        let dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
        let mes = (data.getMonth() + 1) < 10 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1);
        let ano = data.getFullYear();
        return `${dia}/${mes}/${ano} ${hora}:${min}:${seg}`;
    }

    setValueForms(form: FormGroup, valores: any = {}){
        for(let i in form.controls){
            try {
                form.controls[i].setValue(valores[i])
            } catch (error) {
                console.log(error)
                console.log(valores[i])
                console.log('Problemas ao setar esse valor');
            }
        }
    }

}
