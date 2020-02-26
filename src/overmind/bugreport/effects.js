import Appocular from '../../Appocular'

export const submitBug = ({url, email, description}) => {
  Appocular.submitBug(url, email, description)
}
