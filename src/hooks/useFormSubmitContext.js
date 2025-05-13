import { createContext, useContext } from "react";

export const FormSubmitContext = createContext(null);

export function useFormSubmitContext() {
  return useContext(FormSubmitContext);
}
