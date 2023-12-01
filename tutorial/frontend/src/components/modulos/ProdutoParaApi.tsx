class ProdutoParaApi{
    private _id : number;
    private _nome : string;
    private _preco : number;
    private _imagem : null | File;

    constructor(id: number, nome : string, preco : number, imagem : File | null){
        this._id = id;
        this._imagem = imagem;
        this._nome = nome;
        this._preco = preco;
    }

    reset(): void{
        this._id = -1;
        this._nome = '';
        this._preco = 0;
        this._imagem = null;
    }
    setNome(nome: string): void{
        this._nome = nome;
    }
    setPreco(preco : number): void{
        this._preco = preco;
    }
    setImagem(imagem : File | null): void{
        this._imagem = imagem;
    }
    getId(): number{
        return this._id;
    }
    getNome(): string{
        return this._nome;
    }
    getPreco(): number{
        return this._preco;
    }
    getImagem(): File | null{
        return this._imagem;
    }
}

export default ProdutoParaApi;