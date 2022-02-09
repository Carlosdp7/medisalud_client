import * as React from "react"
import clientAxios from "../../axios/axios";
import Layout from "../../components/layout"
import TestForm from "../../components/test-form";
import { TestContext } from "../../context/TestContext";
import { useLocation } from '@reach/router';

const UpdateProduct = () => {
  const [test, setTest] = React.useState({});
  const { obtainTests } = React.useContext(TestContext);
  const location = useLocation();
  const id = location.search.substring(4);

  React.useEffect(() => {
    obtainTests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const fetchTest = async () => {
      const res = await clientAxios.get(`/test/obtain-test/${id}`)
      setTest(res.data.test)
    }
    fetchTest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <TestForm title="Editar Prueba" test={test} />
    </Layout>
  )
}

export default UpdateProduct;
