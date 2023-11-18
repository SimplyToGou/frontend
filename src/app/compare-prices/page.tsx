"use client";
import "aos/dist/aos.css";
import AOS from "aos";
import React, { useState, useEffect } from "react";
import { getDataApi } from "@/services/api-observatorio";
import { getProducts, getSizeOfProduct } from "@/services/api-simply-to-gou";
import { getCategories } from "@/services/api-simply-to-gou";
import { getProductsByCategory } from "@/services/api-simply-to-gou";
import { IProducts, IProductSize } from "@/interfaces/products";
import { IDataByComuna, ISubcategoria } from "@/interfaces/comuna";
import { Products } from "@/data/products";
import { Comunas } from "@/data/id_comunas";
import { SizesOfProducts } from "@/data/product_sizes";

export default function Compare() {
  const [products, setProducts] = useState<ISubcategoria[]>([]);
  const [categories, setCategories] = useState<IDataByComuna>();
  const [sizeOfProduct, setSizeOfProduct] = useState<IProductSize[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [idProduct, setIdProduct] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
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

  async function handleEditQuestion() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setBudget(value ? parseInt(value) : 0);
    }, 300);
  };

  const handleChangeSelectProduct = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = parseInt(event.target.value);
    setSelectedProduct(event.target.value);
    setIdProduct(selectedProductId);
    await getSizeOfProductFromApi(selectedProductId);
    if (event.target.value && !selectedOptions.includes(event.target.value)) {
      setSelectedOptions((prevOptions) => [...prevOptions, event.target.value]);
    }
    console.log("User Selected Product - ", event.target.value);
  };

  const handleChangeSelectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    console.log("User Selected Category - ", event.target.value);
  };

  const handleChangeSelectDepartment = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(event.target.value);
    console.log("User Selected Department - ", event.target.value);
  };

  const handleChangeSelectSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
    console.log("User Selected Size - ", event.target.value);
  };

  const handleRemove = (event: React.MouseEvent, itemToRemove: string) => {
    event.preventDefault();
    setSelectedOptions((prevItems) => prevItems.filter((item) => item !== itemToRemove));
  };

  async function getProductsFromApi() {
    try {
      const response = await getProducts();
      if (!response) throw new Error(`Error al obtener los datos`);
      setProducts(response["productos"]);
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

  async function getSizeOfProductFromApi(productId : number) {
    try {
      const response = await getSizeOfProduct(productId);
      if (!response) throw new Error(`Error al obtener el tamaño del producto`);
      setSizeOfProduct(response["tamanos"]);
      console.log(response["tamanos"]);
    } catch (error) {
      console.log(error);
    }
  }

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

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              
              {/* Budget */}
              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="money" className="block text-sm font-medium leading-6 text-gray-900">
                  Dinero establecido
                </label>
                <div className="mt-2">
                  <input type="number" name="money" id="money" autoComplete="65000" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="65000" onChange={handleBudgetChange} />
                </div>
              </div>

              {/* Min Products */}
              <div className="sm:col-span-3">
                <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                  Min cantidad de productos
                </label>
                <div className="mt-2">
                  <input type="number" name="quantity" id="quantity" autoComplete={`${MIN_QUANTITY_OF_PRODUCTS}`} defaultValue={0} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="5" />
                </div>
              </div>

              {/* Product */}
              <div className="sm:col-span-3">
                <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-900">
                  Busca tus productos
                </label>
                <div className="mt-2">
                  <select id="product" name="product" autoComplete="product-name" defaultValue="" onChange={handleChangeSelectProduct} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6">
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

              {/* Category */}
              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                  Busca por categoría
                </label>
                <div className="mt-2">
                  <select id="category" name="category" defaultValue="" onChange={handleChangeSelectCategory} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value="" disabled>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    {categories?.categorias.map((category) => (
                      <React.Fragment key={category.id}>
                        <option key={category.id} value={category.categoria}>
                          {category.categoria}
                        </option>
                      </React.Fragment>
                    ))}
                  </select>
                </div>
              </div>

              {/* Department */}
              <div className="sm:col-span-3">
                <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                  Selecciona un departamento
                </label>
                <div className="mt-2">
                  <select id="department" name="department" defaultValue="" onChange={handleChangeSelectDepartment} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value="" disabled> {" "} -- select an option --{" "} </option>
                    {categories?.departamentos.map((department) => (
                      <React.Fragment key={department.id}>
                        <option key={department.id} value={department.departamento}>
                          {department.departamento}
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
                  <select id="size" name="size" defaultValue="" onChange={handleChangeSelectSize} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value="" disabled>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    {sizeOfProduct?.map((size) => (
                      <React.Fragment key={size.id}>
                        <option key={size.id} value={size.rango_texto}>
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
                  {selectedOptions.map((product, index) => (
                    <li className={`flex items-center justify-between w-full mb-3 ${index < selectedOptions.length - 1 ? "border-b" : ""}`} key={index}>
                      <p className="">{product}</p>
                      <button className="text-red-700 hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2 text-center m-4 dark:border-red-600 dark:text-red-600 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600" onClick={(event) => handleRemove(event, product)}>
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about important changes, but you pick what else you want to hear about.</p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input id="comments" name="comments" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="comments" className="font-medium text-gray-900">
                        Comments
                      </label>
                      <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input id="candidates" name="candidates" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="candidates" className="font-medium text-gray-900">
                        Candidates
                      </label>
                      <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input id="offers" name="offers" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="offers" className="font-medium text-gray-900">
                        Offers
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
