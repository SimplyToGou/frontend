export interface IDepartamento {
    id: number,
    departamento: string,
}

export interface ICategoria {
    id: number,
    id_departamento: number,
    categoria: string
}

export interface ISubcategoria {
    id: number,
    id_categoria: number,
    subcategoria_front: string,
}

export interface IComuna {
    departamentos: IDepartamento[],
    categorias: ICategoria[],
    subcategorias: ISubcategoria[],
};