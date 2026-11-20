import { Contact, CreateContactInput, UpdateContactInput } from "@/types/users";

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateContactInput | UpdateContactInput) => Promise<void>;
  initialData?: Contact | null;
}
