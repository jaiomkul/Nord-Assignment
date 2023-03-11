import React, { useState } from "react";

const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("add");
  const [result, setResult] = useState("");

  const calculateResult = (num1, num2, operator) => {
    switch (operator) {
      case "add":
        return Number(num1) + Number(num2);
      case "subtract":
        return Number(num1) - Number(num2);
      case "multiply":
        return Number(num1) * Number(num2);
      case "divide":
        return Number(num1) / Number(num2);
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = calculateResult(num1, num2, operator);
    setResult(result);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Calculator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label className="mb-4">
          Number 1:
          <input
            type="number"
            value={num1}
            onChange={(event) => setNum1(event.target.value)}
            className="border rounded-lg px-4 py-2 ml-4"
          />
        </label>
        <label className="mb-4">
          Number 2:
          <input
            type="number"
            value={num2}
            onChange={(event) => setNum2(event.target.value)}
            className="border rounded-lg px-4 py-2 ml-4"
          />
        </label>
        <label className="mb-4">
          Operator:
          <select
            value={operator}
            onChange={(event) => setOperator(event.target.value)}
            className="border rounded-lg px-4 py-2 ml-4"
          >
            <option value="add">+</option>
            <option value="subtract">-</option>
            <option value="multiply">*</option>
            <option value="divide">/</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Calculate
        </button>
      </form>
      {result && (
        <div className="mt-4">
          Result: <span className="font-bold">{result}</span>
        </div>
      )}
    </div>
  );
};

export default Calculator;
