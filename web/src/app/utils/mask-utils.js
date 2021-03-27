class MaskUtils {
  cpfMask(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/^(\d{3})/g, "$1.");
    cpf = cpf.replace(/(\d{3}).(\d{3})/g, "$1.$2.");
    cpf = cpf.replace(/(\d{3}).(\d{3}).(\d{3})/g, "$1.$2.$3-");
    return cpf;
  }

  cnpjMask(cnpj) {
    return cnpj
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }
}

export const maskUtils = new MaskUtils();
