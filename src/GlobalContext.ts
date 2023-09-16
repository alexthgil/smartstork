import { createContext, useContext } from "react"
import AppModel from "./Model/AppModel"

export type GlobalContent = {
    model?: AppModel
    setModel:(c: AppModel) => void
  }
  
export const GlobalContext = createContext<GlobalContent>({
  model: undefined,
  setModel: (c: AppModel) => {},
})
  
export const useGlobalContext = () => useContext(GlobalContext)