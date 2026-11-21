import { Address, CreateAddressInput, UpdateAddressInput } from "@/types/users";

export interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateAddressInput | UpdateAddressInput) => Promise<void>;
  initialData?: Address | null;
  contactName?: string;
}
