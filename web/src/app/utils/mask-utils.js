class MaskUtils {
    cpfMask(cpf) {
        cpf = cpf.replace(/\D/g, "");
        cpf = cpf.replace(/^(\d{3})/g, "$1.");
        cpf = cpf.replace(/(\d{3}).(\d{3})/g, "$1.$2.");
        cpf = cpf.replace(/(\d{3}).(\d{3}).(\d{3})/g, "$1.$2.$3-");
        return cpf;
    }
}

export const maskUtils = new MaskUtils()