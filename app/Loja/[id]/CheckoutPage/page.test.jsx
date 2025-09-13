import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutPage from "./page";

describe("CheckoutPage", () => {
  it("renderiza campos obrigatórios", () => {
    render(<CheckoutPage />);
    expect(screen.getByLabelText(/Nome do Pagador/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CEP/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirmar Compra/i)).toBeInTheDocument();
  });

  it("mostra endereço após buscar CEP válido", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          logradouro: "Rua Teste",
          bairro: "Centro",
          localidade: "Cidade",
          uf: "ST",
        }),
      })
    );
    render(<CheckoutPage />);
    fireEvent.change(screen.getByPlaceholderText("00000-000"), { target: { value: "12345678" } });
    fireEvent.click(screen.getByText(/Buscar/i));
    // Aguarda o input de endereço aparecer
    expect(await screen.findByDisplayValue("Rua Teste")).toBeInTheDocument();
  });
});
