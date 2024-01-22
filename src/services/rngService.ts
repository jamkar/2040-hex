import { Cell, InitParams } from "../types";

export async function retrieveCells(data: Cell[], initParams: InitParams): Promise<Cell[]> {
  const { hostname, port, radius } = initParams;

  const response = await fetch(`${hostname}:${port}/${radius}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
