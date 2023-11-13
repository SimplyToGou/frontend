"use client"
import React, { useState, useEffect } from "react";

export default function Compare() {

  async function handleEditQuestion() {}


  return (
    <div className="m-auto">

        <div className="fixed inset-0 flex items-center justify-center z-50 text-blue-900">
          <div className="fixed inset-0 bg-black opacity-50 blur"></div>

          <div className="bg-white border relative rounded-md shadow w-4/6">

            <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-300 ">
              <svg
                className=" mx-5 text-gray-400 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
              </svg>
              <h3 className="text-xl font-semibold text-blue-900 text-center">Editar Pregunta</h3>
              <button
                onClick={handleEditQuestion}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-500 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center ">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="flex flex-col p-6 space-y-6 text-base leading-relaxed text-gray-500 dark:text-gray-400">

              <div className="flex flex-col relative mb-4">
                <label htmlFor="question">Pregunta</label>
                <input
                  type="text"
                  id="question"
                  defaultValue={""}
                  onChange={(e) => {}}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="flex flex-col relative mb-4">
                <label htmlFor="mustBeAnswered">Respuesta obligatoria</label>
                <select
                  id="mustBeAnswered"
                  defaultValue={"false"}
                  onChange={(e) => {}}
                  className="w-full border rounded p-2">
                  <option value="true">Si</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="flex flex-col relative mb-4">
                <label htmlFor="answerType">Tipo de Respuesta</label>
                <select
                  id="answerType"
                  defaultValue={""}
                  onChange={(e) => {
                    
                  }}
                  className="w-full border rounded p-2">
                  <option value="TEXT">Texto</option>
                  <option value="NUMBER">Numérica</option>
                  <option value="SELECT">Menú desplegable</option>
                  <option value="RADIO">Alternativa</option>
                  <option value="CHECKBOX">Checkbox</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center p-4 space-x-4 border-t border-gray-200 rounded-b dark:border-gray-300">
              <button
                onClick={handleEditQuestion}
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                OK
              </button>
              <button
                onClick={handleEditQuestion}
                type="button"
                className="text-gray-500 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-600 focus:z-10">
                Cancelar
              </button>
            </div>

          </div>
        </div>
    </div>
  );
}
