interface ChildData {
  uniqueIdentifier: string
  propertyName: string
  propertyValue: string
}

interface SetChildrenPropsOnContainerChangeParams<T> {
  container: T
  childrenDataList: ChildData[]
  options: MutationObserverInit
}

interface CreateObserverParamsCallBackParams {
  domMutations: MutationRecord[]
  observer: MutationObserver
}

interface CreateObserverParams<T> {
  container: T
  options: MutationObserverInit
  callback: (params: CreateObserverParamsCallBackParams) => void
}

const getElementInContainerUniqueIdentifier = <T extends Element>(
  container: Element,
  uniqueIdentifier: string
): T | null => {
  const elementInParent = container.querySelector<T>(`${uniqueIdentifier}`)

  return elementInParent
}

const setPropertyOnElement = <T extends Element>(
  element: T,
  propertyName: string,
  propertyValue: string
): void => {
  element.setAttribute(propertyName, propertyValue)
}

const setChildrenPropsInContainer = <T extends Element>(
  container: T,
  childrenDataList: ChildData[]
): void => {
  childrenDataList.forEach((childData) => {
    const { uniqueIdentifier: id, propertyName, propertyValue } = childData
    const childNode = getElementInContainerUniqueIdentifier(container, id)

    if (childNode) {
      setPropertyOnElement(childNode, propertyName, propertyValue)
    }
  })
}

const createObserver = <T extends Element>(
  params: CreateObserverParams<T>
): void => {
  const { container, options, callback } = params

  const domObserver = new MutationObserver((domMutations, observer) => {
    callback({
      domMutations,
      observer,
    })
  })

  if (container) {
    domObserver.observe(container, {
      ...options,
    })
  }
}

const setChildrenPropsOnContainerChange = <T extends Element>(
  params: SetChildrenPropsOnContainerChangeParams<T>
): void => {
  const { container, childrenDataList, options } = params

  createObserver({
    container,
    options,
    callback: () => {
      setChildrenPropsInContainer(container, childrenDataList)
    },
  })
}

export {
  ChildData,
  setChildrenPropsOnContainerChange,
  getElementInContainerUniqueIdentifier,
  setPropertyOnElement,
  createObserver,
  setChildrenPropsInContainer,
}
