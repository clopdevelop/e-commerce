import { Address } from "@prisma/client";

export const DisplayAddress = ({ address }: { address:Address & { cityName: string; provinceName: string; } }) => {
    console.log(address)
    return (
      <div className="mt-8">
        <div className="grid gap-4 mb-5">
          <div className="address-info">
            <strong>Dirección:</strong> {address?.name}
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="number-info">
              <strong>Número:</strong> {address?.number}
            </div>
            <div className="letter-info">
              <strong>Letra:</strong> {address?.letter}
            </div>
            <div className="staircase-info">
              <strong>Escalera:</strong> {address?.staircase}
            </div>
            <div className="block-info">
              <strong>Bloque:</strong> {address?.block}
            </div>
          </div>
          <div className="city-info">
            <strong>Ciudad:</strong> {address?.cityName}
          </div>
          <div className="province-info">
            <strong>Provincia:</strong> {address?.provinceName}
          </div>
          <div className="postal-code-info">
            <strong>Código Postal:</strong> {address?.postalcode}
          </div>
        </div>
      </div>
    );
  };
