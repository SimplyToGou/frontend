"use client";
import "aos/dist/aos.css";
import AOS from "aos";
import React, { useState, useEffect } from "react";
import { getDataApi } from "@/services/api-observatorio";
import {getProducts, getResultsOfCart, getSizeOfProduct} from "@/services/api-simply-to-gou";
import { getCategories } from "@/services/api-simply-to-gou";
import { getProductsByCategory } from "@/services/api-simply-to-gou";
import { IProducts, IProductSize } from "@/interfaces/products";
import {IDataByComuna, IMarket, ISubcategoria} from "@/interfaces/comuna";
import { Products } from "@/data/products";
import { Comunas } from "@/data/id_comunas";
import { SizesOfProducts } from "@/data/product_sizes";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;

export default function Compare() {
  const [products, setProducts] = useState<ISubcategoria[]>([]);
  const [allProducts, setAllProducts] = useState<ISubcategoria[]>([]);
  const [categories, setCategories] = useState<IDataByComuna>();
  const [sizeOfProduct, setSizeOfProduct] = useState<IProductSize[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [idProduct, setIdProduct] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedSizeId,setSelectedSizeId] = useState<number>(0);
  const [selectedOptionsId, setSelectedOptionsId] = useState<number[]>([]);
  const [selectedOptionsSizesId, setSelectedOptionsSizesId] = useState<number[]>([]);
  const [selectedOptionsString, setSelectedOptionsString] = useState<string[]>([]);
  const [selectedOptionsSizesString, setSelectedOptionsSizesString] = useState<string[]>([]);
  const [filterByProduct, setFilterByProduct] = useState(false);  
  const [filterByDepartment, setFilterByDepartment] = useState(false);
  const [resultMarkets, setResultMarkets] = useState<IMarket[]>([])
  const MIN_QUANTITY_OF_PRODUCTS = 5;
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  const filteredCategories = categories?.categorias.filter((category) => (selectedDepartment ? category.id_departamento === parseInt(selectedDepartment) : true));

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setBudget(value ? parseInt(value) : 0);
    }, 300);
  };

  const handleChangeSelectProduct = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = parseInt(event.target.value);
    setSelectedProduct(event.target["options"][event.target["options"].selectedIndex].text);
    setIdProduct(selectedProductId);
    await getSizeOfProductFromApi(selectedProductId);

    console.log(sizeOfProduct)



    console.log("User Selected Product - ", event.target["options"][event.target["options"].selectedIndex].text);


  };

  const handleChangeSelectCategory = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    await getProductsByCategoryFromApi(parseInt(event.target.value));
    console.log("User Selected Category - ", event.target.value, " - ", event.target["options"][event.target["options"].selectedIndex].text);
  };

  const handleChangeSelectDepartment = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(event.target.value);

    console.log("User Selected Department - ", event.target.value);
  };

  const handleChangeSelectSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);

    console.log("User Selected Size - ", event.target.value);
    const selectedIndex = event.target.options.selectedIndex;
    const dkey = event.target.options[selectedIndex].getAttribute('data-key')
    setSelectedSizeId(parseInt(dkey ?? "0"))

    if (event.target.value && event.target.value != "" && dkey && selectedProduct && (!selectedOptionsId.includes(idProduct) || !selectedOptionsSizesId.includes(parseInt(dkey)))) {
      setSelectedOptionsId((prevOptions) => [...prevOptions, idProduct]);
      setSelectedOptionsString((prevOptions) => [...prevOptions, selectedProduct]);
      setSelectedOptionsSizesId((prevOptions) => [...prevOptions, parseInt(dkey)]);
      setSelectedOptionsSizesString((prevOptions) => [...prevOptions, event.target.value]);
    }
    console.log(selectedSize)
    console.log(selectedOptionsString)
    console.log(selectedOptionsSizesString)


  };

  const handleRemove = (event: React.MouseEvent, itemToRemove: string) => {
    event.preventDefault();
    setSelectedOptionsId((prevItems) => prevItems.filter((item) => item !== parseInt(itemToRemove)));
    setSelectedOptionsString((prevItems) => prevItems.filter((item) => item !== itemToRemove));
  };

  const handleChangeFilterByProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByProduct(event.target.checked);
    if (event.target.checked) {
      setProducts(allProducts);
    }
  };

  async function getProductsFromApi() {
    try {
      const response = await getProducts();
      if (!response) throw new Error(`Error al obtener los datos`);
      setProducts(response["productos"]);
      setAllProducts(response["productos"]);
      console.log(response["productos"]);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDataByComunaFromApi() {
    try {
      const response = await getCategories();
      if (!response) throw new Error(`Error al obtener los datos de las categorías`);
      setCategories(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProductsByCategoryFromApi(category_id: number) {
    try {
      const response = await getProductsByCategory(category_id);
      if (!response) throw new Error(`Error al obtener los productos por la categoría ${category_id}`);
      setProducts(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSizeOfProductFromApi(productId: number) {
    try {
      const response = await getSizeOfProduct(productId);

      if (!response) throw new Error(`Error al obtener el tamaño del producto`);
      setSizeOfProduct(response["tamanos"]);


    } catch (error) {
      console.log(error);
    }
  }

  async function HandleSubmit() {
    const reqdata: JSON[] = []
    selectedOptionsId.forEach((product, index)=>{
      let data = {"id_subcategoria": product, "id_rango": selectedOptionsSizesId[index]}

      reqdata.push(JSON.parse(JSON.stringify(data)))
    })
    const rd = JSON.stringify({"productos": reqdata})
    console.log(rd)

    const result = await getResultsOfCart(rd)
    console.log(result)
    setResultMarkets(result)
  }

  function HandleNewProduct() {
    if (selectedProduct && !selectedOptionsId.includes(idProduct) && sizeOfProduct.length == 1) {
      setSelectedOptionsId((prevOptions) => [...prevOptions, idProduct]);
      setSelectedOptionsString((prevOptions) => [...prevOptions, selectedProduct]);
      setSelectedOptionsSizesId((prevOptions) => [...prevOptions, sizeOfProduct[0].id]);
      setSelectedOptionsSizesString((prevOptions) => [...prevOptions, sizeOfProduct[0].rango_texto]);
    }

  }

  useEffect(() => {
    HandleNewProduct()
  }, [sizeOfProduct]);

  useEffect(() => {
    (async () => {
      await getProductsFromApi();
      await getDataByComunaFromApi();
    })();

  }, []);

  return (
    <div className="grid relative py-24 justify-center">
      {/* Header */}
      <div className="flex items-center justify-center max-w-7xl px-6 lg:px-8 py-10 border-b border-gray-900/10 pb-12">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="mt-6 text-md text-blue-700 font-bold" data-aos="zoom-y-out">
            Aumentando la eficiencia, Simplificando tareas
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-5xl" data-aos="zoom-y-out" data-aos-delay="150">
            Comparación de Productos
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-500 border-b border-gray-900/10 pb-6" data-aos="zoom-y-out" data-aos-delay="200">
            Nos enorgullece ser pioneros en el desarrollo de una aplicación web dedicada a comparar precios de productos de supermercados destinados a canastas familiares de programas sociales. Nos esforzamos por eliminar la ineficiencia del proceso manual y ofrecer una plataforma que no solo ahorra tiempo y recursos, sino que también maximiza el impacto positivo en las comunidades.
          </p>
          <ul className="text-sm leading-6 text-gray-500 pt-6 list-disc ml-4" data-aos-delay="250" data-aos="zoom-y-out">
            <li>Este comparador incluye los productos más comprados, especialmente alimentos</li>
            <li>No muestra los precios de cada producto, para prevenir prácticas contra la libre competencia entre empresas</li>
            <li>Incluye sólo las ofertas universales, es decir, aquellas que no exigen condiciones como llevar más unidades, entregar el ruto o pagar con una determinada tarjeta</li>
          </ul>
        </div>
      </div>

      {/* Form */}
      <form className="m-auto w-3/4 p-10" data-aos="fade-up">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Elige mínimo 5 productos</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">También puedes elegir 7, 9, 11, 13 o 5.</p>

            <div className="border-b border-gray-900/10 pb-12">

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">Elija por qué opción desea filtrar</legend>
                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input id="department_filter" name="department_filter" type="checkbox" className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 ${filterByProduct ? 'bg-gray-200 cursor-not-allowed' : ''}`} checked={filterByDepartment} onChange={(e) => setFilterByDepartment(e.target.checked)} disabled={filterByProduct}/>
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="department_filter" className="font-medium text-gray-900">
                          Filtro - Por departamentos y categorías
                        </label>
                        <p className="text-gray-500">Permite seleccionar previamente un departamento, categoría o ambos para encontrar los productos deseados.</p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input id="products_filter" name="products_filter" type="checkbox" className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 ${filterByDepartment ? 'bg-gray-200 cursor-not-allowed' : ''}`} checked={filterByProduct} onChange={handleChangeFilterByProduct} disabled={filterByDepartment}/>
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="products_filter" className="font-medium text-gray-900">
                          Filtro - Por producto
                        </label>
                        <p className="text-gray-500">Permite encontrar el producto sin un filtro previo.</p>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            { filterByProduct || filterByDepartment ? (
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Budget */}
              <div className="sm:col-span-6 sm:col-start-1">
                <label htmlFor="money" className="block text-sm font-medium leading-6 text-gray-900">
                  Dinero establecido
                </label>
                <div className="mt-2">
                  <input type="number" name="money" id="money" autoComplete="65000" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="65000" onChange={handleBudgetChange} />
                </div>
              </div>

              {/* Min Products */}
              {/* <div className="sm:col-span-3">
                <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                  Min cantidad de productos
                </label>
                <div className="mt-2">
                  <input type="number" name="quantity" id="quantity" autoComplete={`${MIN_QUANTITY_OF_PRODUCTS}`} defaultValue={0} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="5" />
                </div>
              </div> */}

              {/* Department */}
              <div className="sm:col-span-3">
                <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                  Selecciona un departamento
                </label>
                <div className="mt-2">
                  <select id="department" name="department" defaultValue="" onChange={handleChangeSelectDepartment} className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6 ${filterByProduct ? 'bg-gray-200 cursor-not-allowed' : ''}`} disabled={filterByProduct}>
                    <option value="" disabled>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    {categories?.departamentos.map((department) => (
                      <React.Fragment key={department.id}>
                        <option key={department.id} value={department.id}>
                          {department.departamento}
                        </option>
                      </React.Fragment>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category */}
              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                  Busca por categoría
                </label>
                <div className="mt-2">
                  <select id="category" name="category" defaultValue="" onChange={handleChangeSelectCategory} className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6 ${filterByProduct ? 'bg-gray-200 cursor-not-allowed' : ''}`} disabled={filterByProduct}>
                    <option value="" disabled>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    {filteredCategories?.map((category) => (
                      <React.Fragment key={category.id}>
                        <option key={category.id} value={category.id}>
                          {category.categoria}
                        </option>
                      </React.Fragment>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product */}
              <div className="sm:col-span-3">
                <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-900">
                  Busca tus productos
                </label>
                <div className="mt-2">
                  <select id="product" name="product" autoComplete="product-name" defaultValue="" onChange={handleChangeSelectProduct} className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6 ${filterByDepartment && (!selectedDepartment && !selectedCategory) ? 'bg-gray-200 cursor-not-allowed' : ''}`} disabled={filterByDepartment && (!selectedDepartment && !selectedCategory)}>
                    <option value="" disabled>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    {products.map((product) => (
                      <React.Fragment key={product.id}>
                        <option key={product.id} value={product.id}>
                          {product.subcategoria_front}
                        </option>
                      </React.Fragment>
                    ))}
                  </select>
                </div>
              </div>

              {/* Size */}
              <div className="sm:col-span-3">
                <label htmlFor="size" className="block text-sm font-medium leading-6 text-gray-900">
                  Selecciona un tamaño
                </label>
                <div className="mt-2">
                  <select id="size" name="size" defaultValue="" onChange={handleChangeSelectSize} className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6 ${filterByDepartment && !selectedProduct ? 'bg-gray-200 cursor-not-allowed' : ''}`} disabled={filterByDepartment && !selectedProduct}>
                    <option value="" disabled>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    {sizeOfProduct?.map((size) => (
                      <React.Fragment key={size.id}>
                        <option key={size.id} data-key={size.id} value={size.rango_texto}>
                          {size.rango_texto}
                        </option>
                      </React.Fragment>
                    ))}
                  </select>
                </div>
              </div>

              {/* List */}
              <div className="sm:col-span-6 w-full">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Lista de productos</h2>
                <ul className="">
                  {selectedOptionsString.map((product, index) => (
                    <li className={`flex items-center justify-between w-full mb-3 ${index < selectedOptionsString.length - 1 ? "border-b" : ""}`} key={index}>
                      <p className="">{product}</p>
                      {""}
                      <p className="">{selectedOptionsSizesString[index]}</p>
                      <button className="text-red-700 hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2 text-center m-4 dark:border-red-600 dark:text-red-600 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600" onClick={(event) => handleRemove(event, product)}>
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:col-span-6 w-full">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Supermercados resultantes</h2>
                <ul className="">
                  {resultMarkets?.sort((n1,n2) => parseInt(n1.precio) - parseInt(n2.precio)).map((market, index) => (
                      <li className={`flex mt-1 items-center justify-between w-full mb-3 ${index < selectedOptionsString.length - 1 ? "border-b" : ""}`} key={index}>
                        <p className="">{market.nombre}</p>
                        {""}
                        <p className="">{market.direccion}</p>
                        {""}
                        <p className="">${market.precio}</p>
                      </li>
                  ))}
                </ul>
              </div>

            </div>
            ) : (<></>)}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button type="button" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onClick={HandleSubmit}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
