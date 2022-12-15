import { ReactNode } from "react";
import { CallsProvider } from "./call";
import { EquipmentProvider } from "./equipment";
import { EquipmentModelProvider } from "./equipmentModel";
import { AuthProvider } from "./user";

interface IProviders {
  children: ReactNode;
}

const Providers = ({ children }: IProviders) => {
  return (
    <AuthProvider>
      <CallsProvider>
        <EquipmentProvider>
          <EquipmentModelProvider>
              {children}
          </EquipmentModelProvider>
        </EquipmentProvider>
      </CallsProvider>
    </AuthProvider>
  );
};

export default Providers;
