import { ethers } from "ethers";
import { CONTRACT_ADDRESSES } from "./addresses";

import RegistroABI from "../contracts/registroABI.json";
import AccesoABI from "../contracts/accesoABI.json";
import CursoABI from "../contracts/cursoABI.json";
import FinanzaABI from "../contracts/finanzaABI.json";
import AuditoriaABI from "../contracts/auditoriaABI.json";
import IregistroABI from "../contracts/IregistroABI.json";
import IcursoABI from "../contracts/IcursoABI.json";

const ABIs = {
  ContratoRegistro: RegistroABI,
  ContratoControlAcceso: AccesoABI,
  ContratoCurso: CursoABI,
  ContratoFinanzas: FinanzaABI,
  ContratoAuditoria: AuditoriaABI,
  InterfazRegistro: IregistroABI,
  InterfazCurso: IcursoABI,
};

// url de la red de Ganache
const GanacheURL = "http://127.0.0.1:7545";

export function getContract(name, chainId) {
  // (nombre del contrato, ID de la red)
  // verificar que MetaMask esté disponible
  if (!window.ethereum) {
    throw new Error("MetaMask no está disponible.");
  }

  // crear proveedor y firmante de ethers.js
  const provider = new ethers.providers.Web3Provider(window.ethereum); // proveedor de Web3
  const signer = provider.getSigner(); // cuenta conectada en MetaMask

  // busca la dirección y ABI del contrato por medio del nombre y el ID
  const address = CONTRACT_ADDRESSES[name]?.[chainId];
  const abi = ABIs[name];

  // validar si se encontró el contrato
  if (!address || !abi) {
    throw new Error(
      `No se encontró el contrato "${name}" para la red ${chainId}`
    );
  }

  // devolver contrato conectado
  return new ethers.Contract(address, abi, signer);
}

export async function connectWallet() {
  // verificar si MetaMask está disponible
  if (!window.ethereum) {
    // window.ethereum es el objeto que MetaMask inyecta en el navegador cuando está instalado
    throw new Error("MetaMask no está disponible.");
  }

  // solicita acceso a la cuenta del usuario en MetaMask
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

  // obtiene el ID de la red actual a la que está conectada MetaMask en hexadecimal
  const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });

  // convierte el ID hexadecimal a decimal
  const chainId = parseInt(chainIdHex, 16);

  // devuelve un objeto con la dirección de la cuenta seleccionada y el ID de la red
  return { account: accounts[0], chainId };
}

export async function switchToGanache() {
  try {
    // intenta cambiar la red a Ganache (Network ID)
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x539" }], // 0x539 = 1337 en hexadecimal
    });
  } catch (error) {
    // si falla por red no registrada (el código para ese error es el 4902)
    if (error.code === 4902) {
      // intenta agregar manualmente la red Ganache a MetaMask
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x539", // es 1337 en hexadecimal
            chainName: "Ganache",
            rpcUrls: [GanacheURL],
            nativeCurrency: {
              name: "ETH",
              symbol: "ETH",
              decimals: 18,
            },
          },
        ],
      });
    } else {
      throw error;
    }
  }
}

export async function callContractFunction(contracts, contractName, functionName, params = [], overrides = {}) { // contratos, nombre del contrato, nombre de la función, parámetros, overriders como { value }
  try {
    const contract = contracts[contractName];
    if (!contract) throw new Error(`Contrato "${contractName}" no encontrado`);

    // Buscar definición en ABI
    const abi = ABIs[contractName];
    const fnAbi = abi.find(
      (item) => item.type === "function" && item.name === functionName
    );
    if (!fnAbi)
      throw new Error(
        `Función "${functionName}" no encontrada en ABI de ${contractName}`
      );

    // Detectar si es lectura o escritura
    const isReadOnly =
      fnAbi.stateMutability === "view" || fnAbi.stateMutability === "pure";

    if (isReadOnly) {
      // Función de solo lectura
      const result = await contract[functionName](...params, overrides);
      return result;
    } else {
      // Función transaccional
      const tx = await contract[functionName](...params, overrides);
      const receipt = await tx.wait();
      return receipt;
    }
  } catch (err) {
    console.error(`Error en ${contractName}.${functionName}:`, err);
    throw err;
  }
}
