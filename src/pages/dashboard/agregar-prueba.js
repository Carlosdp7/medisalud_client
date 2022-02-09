import * as React from "react"
import Layout from "../../components/layout"
import TestForm from "../../components/test-form";
import { TestContext } from "../../context/TestContext";

const AddProduct = () => {
  const { obtainTests } = React.useContext(TestContext);

  React.useEffect(() => {
    obtainTests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <TestForm title="Agregar Prueba" />
    </Layout>
  )
}

export default AddProduct
