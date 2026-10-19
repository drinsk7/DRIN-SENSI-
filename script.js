
const configuracoes = {
  BR: {
    nome: "DRIN BR BALANCE",
    valores: [185, 178, 165, 150, 38, 150],
    dpi: 480,
    atirar: 48
  },
  AP: {
    nome: "DRIN AP PRECISÃO",
    valores: [192, 188, 172, 155, 42, 160],
    dpi: 520,
    atirar: 46
  },
  CS: {
    nome: "DRIN CS CONTROLE",
    valores: [178, 170, 158, 142, 35, 145],
    dpi: 440,
    atirar: 50
  },
  RUSH: {
    nome: "DRIN RUSH RÁPIDA",
    valores: [195, 190, 175, 158, 45, 170],
    dpi: 560,
    atirar: 45
  }
};

const campos = [
  "geral",
  "vermelho",
  "mira2",
  "mira4",
  "awm",
  "olhadinha"
];

let resultadoAtual = null;

function gerarSensi() {
  const celular = document.getElementById("celular").value;
  const modelo = document.getElementById("modelo").value.trim();
  const modo = document.getElementById("modo").value;
  const potencia = Number(
    document.getElementById("potencia").value
  );

  const base = configuracoes[modo];

  // Ajustes leves para criar variações de configuração.
  const ajuste = potencia - 2;
  const ajusteMarca = celular === "iPhone" ? 2 : 0;

  const valores = base.valores.map((valor, indice) => {
    const diferenca = indice === 4 ? ajuste * 2 : ajuste * 3;
    return Math.max(
      0,
      Math.min(200, valor + diferenca + ajusteMarca)
    );
  });

  const dpi = Math.max(
    320,
    Math.min(
      650,
      base.dpi + ajuste * 40 -
      (celular === "iPhone" ? 40 : 0)
    )
  );

  const atirar = Math.max(
    40,
    Math.min(60, base.atirar - ajuste)
  );

  campos.forEach((campo, indice) => {
    document.getElementById(campo).textContent =
      valores[indice];
  });

  document.getElementById("dpi").textContent = dpi;
  document.getElementById("atirar").textContent =
    atirar + "%";

  document.getElementById("tituloResultado").textContent =
    base.nome;

  document.getElementById("descricao").textContent =
    `${celular}${modelo ? " • " + modelo : ""} • ` +
    `Desempenho: ${
      ["Básico", "Médio", "Potente"][potencia - 1]
    } • Sugestão para testar.`;

  resultadoAtual = {
    celular,
    modelo,
    modo,
    valores,
    dpi,
    atirar
  };

  document.getElementById("mensagem").textContent = "";
}

document.getElementById("gerar").addEventListener(
  "click",
  gerarSensi
);

document.getElementById("copiar").addEventListener(
  "click",
  async () => {
    if (!resultadoAtual) return;

    const c = resultadoAtual;

    const texto = `DRIN SENSI
Celular: ${c.celular} ${c.modelo}
Modo: ${c.modo}
Geral: ${c.valores[0]}
Ponto vermelho: ${c.valores[1]}
Mira 2x: ${c.valores[2]}
Mira 4x: ${c.valores[3]}
Mira AWM: ${c.valores[4]}
Olhadinha: ${c.valores[5]}
DPI sugerido: ${c.dpi}
Botão de atirar: ${c.atirar}%

Valores iniciais para teste e ajuste pessoal.`;

    try {
      await navigator.clipboard.writeText(texto);
      document.getElementById("mensagem").textContent =
        "✓ Configuração copiada!";
    } catch (erro) {
      document.getElementById("mensagem").textContent =
        "Não foi possível copiar. Tente abrir a página no Live Server.";
    }
  }
);

// Mostra uma configuração assim que a página abre.
gerarSensi();
