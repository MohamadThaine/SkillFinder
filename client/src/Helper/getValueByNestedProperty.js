const getValueByNestedProperty = (object, property) => {
    const properties = property.split(".");
    let value = object;
    for (let prop of properties) {
      value = value && value[prop];
    }
    return value;
  };

export default getValueByNestedProperty;